// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "captureScreenshot") {
    chrome.tabs.captureVisibleTab((dataUrl) => {
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = 'screenshot.png'
      a.click()
    })
  }
})
