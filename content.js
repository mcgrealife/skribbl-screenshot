// Observe mutations in the DOM
const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("The word was")) {
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
