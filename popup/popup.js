document.getElementById("button-play-page").addEventListener("click", async () => {
  console.log("imported tone?", Tone);
  await Tone.start();
  console.log("audio is ready");
  playHTMLophone();
});

function playHTMLophone() {
  console.log("playing!")

  // For now, play backing track
  const player = new Tone.Player("https://tonejs.github.io/audio/drum-samples/breakbeat.mp3").toDestination();
  player.autostart = true
  player.volume.value = -12 // "twice" as quiet as default playback volume
  player.loop = true

  //create a synth and connect it to the main output (your speakers)
  const synth = new Tone.Synth().toDestination();

  // //play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease("C4", "8n");
}
