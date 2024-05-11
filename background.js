// Access chrome APIs here
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "captureScreenshot") {
    // Execute content script in the active tab to capture the screenshot
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]
      chrome.tabs.captureVisibleTab(activeTab.windowId, { format: "png" }, (dataUrl) => {
        // Use the chrome.downloads API to download the screenshot
        chrome.downloads.download({
          url: dataUrl,
          filename: `${message.word}-${Date.now().toString()}.png`,
          saveAs: false  // Change to true if you want to prompt the user to choose the download location
        }, (downloadId) => {
          console.log('Download started with ID:', downloadId)
        })
      })
    })
  }
})