// content.js
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
