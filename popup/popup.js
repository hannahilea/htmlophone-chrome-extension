async function getCurrentTabID() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log("TAB", tab)
  return tab;
}

document.getElementById("button-play-page").addEventListener("click", async () => {
  console.log("Logging to special dev tools...")
  let tab = await getCurrentTabID()
  console.log("Tab", tab)

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["scripts/Tone.min.js", "scripts/htmlophone.js"],
  })
    .then(() => console.log("script injected"))
  console.log("done")
});
