// Function to log a message when the text content includes "The word was"
const logMessageWhenWordFound = function (mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      // Check each added node for text content including "The word was"
      mutation.addedNodes.forEach(node => {
        console.log('checking', node)
        console.log(node.textContent.includes("The word was"))
        // Check if the node is a <span> element and contains the text "The word was"
        if (node.tagName === 'SPAN' && node.textContent.includes("The word was")) {
          console.log('the word was!!!')
          // Send message to background script to capture screenshot
          chrome.runtime.sendMessage({ action: "captureScreenshot" })
          console.log('message sent to background.js')
          observer.disconnect() // Disconnect the observer after capturing the screenshot
        }
      })
    }
  }
}

// Select the parent element to observe
const parentElement = document.querySelector("#game-chat > div > div.chat-content")

// Create a MutationObserver instance
const observer = new MutationObserver(logMessageWhenWordFound)

// Start observing the parent element for changes in its child elements
observer.observe(parentElement, { childList: true })
