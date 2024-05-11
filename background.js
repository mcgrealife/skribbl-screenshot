chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            for (const node of mutation.addedNodes) {
              if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("The word was")) {
                chrome.scripting.executeScript({
                  target: { tabId: tab.id },
                  function: () => {
                    chrome.tabs.captureVisibleTab((dataUrl) => {
                      const a = document.createElement('a')
                      a.href = dataUrl
                      a.download = 'screenshot.png'
                      a.click()
                    })
                  }
                })
                observer.disconnect()
                break
              }
            }
          }
        }
      })

      observer.observe(document.body, { childList: true, subtree: true })
    }
  })
})
