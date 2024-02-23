import * as Tone from 'tone';

// Create a gain node connected to the destination
const outNode = new Tone.Gain().toDestination();

// Now you can continue connecting other audio nodes to the gain node or other Tone.js audio nodes without creating new audio contexts

// default nodes
const nodes = new Map();
nodes.set('1', outNode);


export function updateAudioNode(id, data) {
  const node = nodes.get(id);
  for (const [key, val] of Object.entries(data)) {
    if (typeof val === 'object' && !Array.isArray(val)) {
      for (const [k, v] of Object.entries(val)) {
        if (key in node && typeof node[key] === 'object' && k in node[key]) {
          node[key][k] = v;
        }
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


export function createAudioNode(id, type, data) {
  switch (type) {
    case 'amSynth': {
      const node = new Tone.AMSynth()
      node.data = data;
      nodes.set(id, node);
      break;
    }
    case 'gain': {
      const node = new Tone.Gain();
      node.data = data;
      nodes.set(id, node);
      break;
    }
    case 'out': {
      const node = new Tone.Gain().toDestination();
      node.data = data;
      nodes.set(id, node);
      break;
    }
    case 'player': {
      const node = new Tone.Player(data.url);
      node.autostart = true;
      node.loop = data.loop;
      
      node.data = data;
      nodes.set(id, node);
      break;
    }
    case 'sequencer': {
      console.log(data);
      const node = new Tone.Sequence((time, note) => {
      }, [data.notes], "8n")
      node.start(0);
      node.data = data;
      nodes.set(id, node);
      break;
    }
    default:
      break;
  }
}


function handleSequencerConnection(source, target) {
  for (let i = 0; i < source.data.rows; i++) {
    source.callback = (time, note) => {
      console.log("triggered handleSequencerConnection");
      if (source.data.notes[i][note]) {
        target.triggerAttackRelease("C2", "8n", time);
      }
    };
  }
}

// Function to connect two audio nodes
export function connect(sourceId, targetId) {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);

  if (source.name === "Sequence") {
    handleSequencerConnection(source, target);
    return;
  }
  source.connect(target);
}

// Function to disconnect two audio nodes
export function disconnect(sourceId, targetId) {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);

  if (source.name === "Sequence") {
    source.callback = null;
    source.dispose();
    return;
  }
  source.disconnect(target);
}




export function playPlayerNode(id) {

  const node = nodes.get(id);
  if (Tone.Transport.state === 'started') {
    node.load().then(() => {
      node.start();
    });
  }
  
}

// Function to remove an audio node
export function removeAudioNode(id) {
  const node = nodes.get(id);
  node.disconnect();
  nodes.delete(id);
}




// Function to check if audio is running
export function isRunning() {
  return Tone.Transport.state === 'started';
}

// Fonction pour démarrer ou arrêter la lecture audio
export function toggleAudio() {
  return new Promise((resolve, reject) => {
    if (isRunning()) {
      // Mettez en pause la lecture audio
      Tone.Transport.pause();
      resolve();
    } else {
      // Essayez de démarrer la lecture audio
      try {
        // Démarrer la lecture audio
        Tone.Transport.start();
        resolve();
      } catch (error) {
        // Rejeter la promesse en cas d'erreur
        reject(error);
      }
    }
  });
}
