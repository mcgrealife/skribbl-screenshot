// Observe mutations in the DOM
const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      for (const node of mutation.addedNodes) {
        console.log('checking')
        // if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("The word was")) {
        if (node.nodeType === Node.TEXT_NODE) {
          // Send message to background script to capture screenshot
          chrome.runtime.sendMessage({ action: "captureScreenshot" })
          observer.disconnect()
          break
        }
      }
    }
  }
})

// Start observing the body for mutations
observer.observe(document.body, { childList: true, subtree: true })
