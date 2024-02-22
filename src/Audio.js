import * as Tone from 'tone';

// Create a gain node connected to the destination
const outNode = new Tone.Gain().toDestination();

// Create a gain node to control the volume
const gainNode = new Tone.Gain();

// Create an AM synth connected to the gain node
const amSynth = new Tone.AMSynth().connect(gainNode);

const loop = new Tone.Loop((time) => {
  amSynth.triggerAttackRelease('C4', '8n', time);
}
, '4n').start(0);

loop.start();
// Connect the gain node to the destination
gainNode.connect(outNode);

// Start the Tone.js context
Tone.start();

// Now you can continue connecting other audio nodes to the gain node or other Tone.js audio nodes without creating new audio contexts

// Add your audio nodes to the map
const nodes = new Map();
nodes.set('1', amSynth);
nodes.set('2', gainNode);
nodes.set('3', outNode);

// Function to update audio node parameters
export function updateAudioNode(id, data) {
  const node = nodes.get(id);

  for (const [key, val] of Object.entries(data)) {
    if (typeof val === 'object') {
      for (const [k, v] of Object.entries(val)) {
        node[key][k] = v;
      }
    } else {
      if (key in node) {
        if (typeof node[key] === 'object' && 'value' in node[key]) {
          node[key].value = val;
        } else {
          node[key] = val;
        }
      }
    }
  }
}

// Function to remove an audio node
export function removeAudioNode(id) {
  const node = nodes.get(id);
  node.disconnect();
  nodes.delete(id);
}

// Function to disconnect two audio nodes
export function disconnect(sourceId, targetId) {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);
  source.disconnect(target);
}

// Function to connect two audio nodes
export function connect(sourceId, targetId) {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);
  source.connect(target);
}

// Function to check if audio is running
export function isRunning() {
  return Tone.Transport.state === 'started';
}

// Function to toggle audio playback
export function toggleAudio() {
  return new Promise((resolve, reject) => {
    if (isRunning()) {
      Tone.Transport.pause();
      resolve();
    } else {
      Tone.Transport.start();
      resolve();
    }
  });
}
