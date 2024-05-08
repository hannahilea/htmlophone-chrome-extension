let isPlaying = false;

document.getElementById("button-play-page").addEventListener("click", async () => {
  console.log("clicked")

  isPlaying = !isPlaying;
  console.log("Set playback to", isPlaying);
  document.getElementById("button-play-page").innerHTML = isPlaying ? "Stop playing page!" : "Play my page!"

  getCurrentTabID().then((tab) => {
    chrome.tabs.sendMessage(tab.id, { play: isPlaying })
      .then((response) => {
        console.log("Message from the content script:");
        console.log(response.response);
      })
      .catch(onError);
  });

});

async function getCurrentTabID() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log("TAB", tab)
  return tab;
}

getCurrentTabID().then((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["scripts/Tone.min.js", "scripts/htmlophone.js"],
  })
    .then(() => console.log("script injected"))
})
