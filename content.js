// Function to log a message when the text content includes "The word was"
const logMessageWhenWordFound = function (mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      // Check each added node for text content including "The word was"
      mutation.addedNodes.forEach(node => {
        // Check if the node is a <span> element and contains the text "The word was"
        // if (node.tagName === 'SPAN' && node.textContent.includes("The word was")) {
        if (node.textContent.includes("The word was")) {
          const word = node.textContent.split("The word was ")[1]
          console.log('the word was', word, '.', 'notifying chrome.runtime.sendMessage')
          // Send message to background script to capture screenshot
          chrome.runtime.sendMessage({ action: "captureScreenshot", word })
          console.log('message sent to background.js.')
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


// Disconnect the observer when the tab is closing
window.onbeforeunload = function () {
  observer.disconnect()
  console.log('Observer disconnected. Tab is closing.')
}