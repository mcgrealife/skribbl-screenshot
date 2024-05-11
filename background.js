chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "captureScreenshot") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]
      chrome.tabs.captureVisibleTab(activeTab.windowId, { format: "png" }, (dataUrl) => {
        chrome.downloads.download({
          url: dataUrl,
          filename: `${message.word}-${Date.now().toString()}.png`,
          saveAs: false
        })
      })

    })

  }
})