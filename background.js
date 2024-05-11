// Access chrome APIs here
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "captureScreenshot") {
    // Execute content script in the active tab to capture the screenshot
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]
      console.log('chrome scripting', chrome.scripting)
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: () => {
          chrome.tabs.captureVisibleTab((dataUrl) => {
            const a = document.createElement('a')
            a.href = dataUrl
            a.download = 'screenshot.png'
            a.click()
          })
        },
      })
    })
  }
})
