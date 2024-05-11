const notifyBackendWhenTheWordWas = function (mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach(node => {
        if (node.textContent.includes("The word was")) {
          chrome.runtime.sendMessage(
            {
              action: "captureScreenshot",
              word: node.textContent.split("The word was ")[1]
            }
          )
          console.log('message sent to background.js')
        }
      })
    }
  }
}


const observer = new MutationObserver(notifyBackendWhenTheWordWas)


observer.observe(
  document.querySelector("#game-chat > div > div.chat-content"),
  { childList: true }
)

window.onbeforeunload = () => observer.disconnect() 