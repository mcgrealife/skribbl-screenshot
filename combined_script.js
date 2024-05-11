// combined_script.js

// Background script logic
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "captureScreenshot") {
    // Execute content script in the active tab to capture the screenshot
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]
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

// Content script logic
const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("The word was")) {
          chrome.runtime.sendMessage({ action: "captureScreenshot" })
          observer.disconnect()
          break
        }
      }
    }
  }
})

observer.observe(document.body, { childList: true, subtree: true })
