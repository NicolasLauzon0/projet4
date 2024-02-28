import * as Tone from 'tone';
import { useStore } from './store/Store';

// Create a gain node connected to the destination
const outNode = new Tone.Gain().toDestination();
const sequencers = new Map();

// Now you can continue connecting other audio nodes to the gain node or other Tone.js audio nodes without creating new audio contexts

// default nodes
const nodes = new Map();
nodes.set('1', outNode);


export function updateAudioNode(id, data) {
  const node = nodes.get(id);
  node.data = { ...node.data, ...data };
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
  console.log(node);
}



export function createAudioNode(id, type, data) {

  if (nodes.has(id)) return;
  switch (type) {
    case 'amSynth': {
      const node = new Tone.AMSynth(data);
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
    case 'sampler': {
      const node = new Tone.Sampler(data);
      node.data = data;
      nodes.set(id, node);
      break;
    }

    case 'sequencer': {
      const node = createSequence(data);
      nodes.set(id, node);
      console.log(nodes);
      break;
    }
    default:
      break;
  }
}



function createSequence(data) {
  // Initialize sequence data
  const sequenceData = {
    outputs: data.outputs,
    notes: data.notes,
    cols: data.cols,
    id: data.id,
    rows: data.rows,
    subdivision: data.subdivision,
    name: "Sequence",
  };

  // Start the sequence
  const sequence = Tone.Transport.scheduleRepeat(() => {
    // Get the current column index based on the transport time and the subdivision
    const currentTime = Tone.now();
    const currentColumn = Math.floor(currentTime / Tone.Time(data.subdivision).toSeconds()) % data.cols;
    // Iterate through each output in the sequence
    sequenceData.outputs.forEach((output, index) => {
      // Check if the note is scheduled to be played at the current column index
      if (sequenceData.notes[index][currentColumn]) {
        // Check the type of the output
        if (output.type === "Gain" || output.type === "") return;
        // If the output is a Sampler, trigger the attack of note "C2"
        if (output.type === "Sampler") {
          output.data.triggerAttackRelease(output.data.urls.C2, currentTime);
          // Rechargez l'échantillon dès qu'il a fini de jouer
          output.data.onended = () => {
            output.data.load(output.data.urls.C2);
          };
        }
        // Otherwise, trigger the attack of note "C4" (or any other default note)
        output.data.triggerAttackRelease("C4", currentTime);
      }
    });
  }, data.subdivision);

  // Store the sequencer in the sequencers map
  sequencers.set(data.id, sequenceData);
  console.log(sequencers);

  // Return the sequence data
  return sequenceData;
}







function handleSequencerConnection(source, id, data, sourceHandle) {
  console.log(source, id, data, sourceHandle);
  const outputRef = source.data.outputs;
  console.log(outputRef);
  const updatedOutputs = outputRef.map((output, index) => {
    if (sourceHandle === index.toString()) {
      return { id: index.toString(), type: data.name, data: data };
    }
    return output;
  });

  useStore.getState().updateOutputs(id, { outputs: updatedOutputs });

  updateAudioNode(id, { outputs: updatedOutputs });
}



export function connect(data) {
  const {
    source: sourceId,
    sourceHandle: sourceHandle,
    target: targetId,
    targetHandle: targetHandle
  } = data;

  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);

  if (source.name === "Sequence") {
    handleSequencerConnection(source, sourceId, target, sourceHandle);
    return;
  }
  source.connect(target);
}



function handleSequencerDisconnection(source, id, sourceHandle) {
  const outputRef = source.data.outputs;
  const updatedOutputs = outputRef.map((output, index) => {
    if (sourceHandle === index.toString()) {
      return { id: index.toString(), type: "", data: {} };
    }
    return output;
  });

  useStore.getState().updateNode(id, { outputs: updatedOutputs });
}



// Function to disconnect two audio nodes
export function disconnect(edge) {
  const {
    source: sourceId,
    sourceHandle,
    target: targetId,
    targetHandle } = edge;

  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);
  if (source.name === "Sequence") {
    handleSequencerDisconnection(source, sourceId, sourceHandle);
    return;
  }

  source.dispose();
  source.disconnect(target);
}



// Function to remove an audio node
export function removeAudioNode(id) {
  const node = nodes.get(id);

  if (node.name === "Sequence") {
    node.dispose();
    nodes.delete(id);
    return;
  }

  // Si ce n'est pas un séquenceur, déconnectez simplement le nœud et supprimez-le
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
      Tone.Transport.stop();
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
