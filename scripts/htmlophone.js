// Move to user params
let highlightElementsDuringPlayback = true

// Global vars
let noteChoices = ["C3", "D3", "E3", "G3", "A3", "C4", "D4", "E4", "G4", "A4"]
let nodeDict = new Map();
let nodeSequence = []

function sonifyElement(element) {
  let name = element.nodeName;
  if (nodeDict.get(name) == undefined) {
    // For now, add a random note from 
    
    // if (name == "div") { nodeDict.set(name, "D2") } else {
      let note = noteChoices[nodeDict.size % noteChoices.length];
      nodeDict.set(name, note)
    // }
    console.log
  }
  nodeSequence.push({element, note: nodeDict.get(name)})
}

function walkTheDOM(node, func) {
  func(node);
  node = node.firstElementChild;

  while (node) {
    walkTheDOM(node, func);
    node = node.nextElementSibling;
  }
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
    if (highlightElementsDuringPlayback){
      element.style.outline = "dashed black";
      element.scrollIntoView(false, { inline: "center", block: "center", behavior: "smooth" })
      lastElement = element;
    }
    
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
