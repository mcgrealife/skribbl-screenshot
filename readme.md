# Developer Mode Chrome Extension

`frontend/content.js` registers a listener for `The word was` in the game chat div. <br/>
The listener handler will `chrome.runtime.sendMessage` to `backend/background.js` where [chrome.tabs](<[url](https://developer.chrome.com/docs/extensions/reference/api/tabs)>) is defined and has permissions to captureScreenshot.

_`background.js` is defined using the `service_worker` key of the Manifest V3, but does not register an actual service worker._

## Install

- download this code (unzip if needed). Move the folder somewhere stable and easy to find.
- in chrome, open `chrome://extensions/`
- toggle `Developer mode` in top right
- click `Load unpacked` button in top left
- select this folder
- navigate to https://skribbl.io/
- play a game (this only works in the game room)
- optional: in chrome toolbar (to the right of URL), click the extension icon and PIN this extension.
  - right click extension icon and "Inspect Popup" to view background console.logs
- when the game posts a message in the chat, "The word was", a png screenshot will be downloaded of the tab, named based on the word and time
- to see code changes, requires clicking the reload icon in the developer mode extension card and refreshing the Skribbl tab

<details><summary>Dev notes</summary>

- The initial shell was created via chatGpt.
- It was a quick start, but also combined Manifest V2 and V3 syntax.
- Often, it's solutions tried to use keys from chrome objects which didn't exist.
- It required asking gpt questions like "Are you sure this" and "Shouldn't this be like...".
- But it was easy to console.log(chrome) to see what was available in that context. And then reference chrome.tabs API docs from there.
- Overall, it was pleasant and a good way to quickly learn the overall shape of Chrome Extensions workflow.

</details>
