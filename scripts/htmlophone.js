function walkTheDOM(node, func) {
  func(node);
  node = node.firstElementChild;

  while (node) {
    walkTheDOM(node, func);
    node = node.nextElementSibling;
  }
}

let skipHiddenElements = true
let noteChoices = ["Cb3", "Eb3", "Gb3", "Bb3", "Cb4", "Eb4", "Gb4", "Bb4"]
let nodeDict = new Map();
// subdivisions are given as subarrays
let nodeSequence = []

function sonifyElement(element) {
  let name = element.nodeName;
  if (nodeDict.get(name) == undefined) {
    // For now, add a random note from 
    
    if (name == "div") { nodeDict.set(name, "C4") } else {
      let note = noteChoices[Math.floor(Math.random() * noteChoices.length)];
      nodeDict.set(name, note)
    }
  }
  nodeSequence.push({element, note: nodeDict.get(name)})
}

async function playHTMLophone() {
  // # TODO: shift setup to its own function that is called once on load
  console.log("Is Tone module loaded?", Tone)
  await Tone.start();
  console.log("audio is ready");

  //create a synth and connect it to the main output (your speakers)
  const synth = new Tone.Synth().toDestination();

  // Get the DOM 
  const body = document.querySelector("body");
  walkTheDOM(body, sonifyElement)

  let lastElement;

  const seq = new Tone.Sequence((time, {element, note}) => {
    if (lastElement){
      lastElement.style.outline = "unset";
    }
    synth.triggerAttackRelease(note, 0.1, time);
    element.style.outline = "dashed black";
    element.scrollIntoView(false, { inline: "center", block: "center", behavior: "smooth" })
    lastElement = element;
  }, nodeSequence).start(0);
  seq.loop = false;
  Tone.Transport.start();
}

// Do the thing!
playHTMLophone()


// TODO next:
// make hitting play multiple times....not error?
// better note choices?
// faster playback and/or progress tracking for larger pages
// note duration variation?
// ignore hidden elements?

// Feature creep:
// something that plays tracking info more...loudly? or something 
