import * as Tone from 'tone';
import { useStore } from './store/Store';

// Create a gain node connected to the destination
const outNode = new Tone.Gain().toDestination();
const sequencers = new Map();

// Now you can continue connecting other audio nodes to the gain node or other Tone.js audio nodes without creating new audio contexts

// default nodes
export const nodes = new Map();
nodes.set('1', outNode);


export function updateAudioNode(id, data) {
  const node = nodes.get(id);
  node.data = { ...node.data, ...data };
  console.log(data);
  for (const [key, val] of Object.entries(data)) {
    if (typeof val === 'object' && !Array.isArray(val)) {
      const nestedNode = node[key];
      if (nestedNode && typeof nestedNode === 'object') {
        for (const [nestedKey, nestedVal] of Object.entries(val)) {
          if (nestedKey in nestedNode && typeof nestedNode[nestedKey] !== 'undefined') {
            if (typeof nestedVal === 'object') {
              Object.assign(nestedNode[nestedKey], nestedVal);
            } else {
              nestedNode[nestedKey] = nestedVal;
            }
          }
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
      const node = new Tone.Gain(data);
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
      const node = new Tone.Sampler({
        urls: {
          A1: data.urls.A1,
          A2: data.urls.A2,
          A3: data.urls.A3,
          B1: data.urls.B1,
          B2: data.urls.B2,
          B3: data.urls.B3,
          C1: data.urls.C1,
          C2: data.urls.C2,
          C3: data.urls.C3,
          D1: data.urls.D1,
          D2: data.urls.D2,
          D3: data.urls.D3,
          E1: data.urls.E1,
          E2: data.urls.E2,
          E3: data.urls.E3,
        },
        baseUrl: data.baseUrl,
      })
      node.data = data;
      nodes.set(id, node);
      break;
    }
    case 'sequencer': {
      const node = createSequence(data, id);
      node.data = data;
      nodes.set(id, node);

      break;
    }
    case 'autoFilter': {
      const node = new Tone.AutoFilter().start();
      node.data = data;
      nodes.set(id, node);

      break;
    }
    case 'reverb': {
      const node = new Tone.Reverb(data);
      node.data = data;
      nodes.set(id, node);
      break;
    }
    case 'feedbackDelay': {
      const node = new Tone.FeedbackDelay(data);
      node.data = data;
      nodes.set(id, node);
      break;
    }
    case 'pitchShift': {
      const node = new Tone.PitchShift(data);
      node.data = data;
      nodes.set(id, node);
      break;
    }
    case 'duoSynth': {
      const node = new Tone.DuoSynth(data);
      node.data = data;
      nodes.set(id, node);
      break;
    }
    case 'fmSynth': {
      const node = new Tone.FMSynth(data);
      node.data = data;
      nodes.set(id, node);
      break;
    }
    case 'monoSynth': {
      const node = new Tone.MonoSynth(data);
      node.data = data;
      nodes.set(id, node);
      break;
    }
    case "membraneSynth": {
      const node = new Tone.MembraneSynth(data);
      node.data = data;
      nodes.set(id, node);
      break;
    }
    case "pluckSynth": {
      const node = new Tone.PluckSynth(data);
      node.data = data;
      nodes.set(id, node);
      break;
    }
    case "bitCrusher": {
      const node = new Tone.BitCrusher()
      node.data = data;
      nodes.set(id, node);
      break;
    }
    case "cheby": {
      const node = new Tone.Chebyshev(data);
      node.data = data;
      nodes.set(id, node);
      break;
    }
    case "add": {
      const node = new Tone.Add(data);
      node.data = data;
      nodes.set(id, node);
      break;
    }
    case "chorus": {
      const node = new Tone.Chorus(data);
      node.data = data;
      nodes.set(id, node);
      break;
    }

    default:
      break;
  }
}



function createSequence(data, id) {
  const sequence = new Tone.Sequence(
    (time, note) => {
      useStore.getState().setCurrentColumn(id, note);
      sequencers.events = sequence.data.events;
      sequence.data.outputs.forEach((output, index) => {
        if (sequence.data.notes[index][note]) {
          if (output.type === "Gain" || output.type === "") return;
          if (output.type === "Sampler") {

            const url = output.data.data.selected;
            output.data?.triggerAttack(url, time);
          } else {
            output.data?.triggerAttackRelease("C4", sequence.data.subdivision + "n", time);
          }
        }
      });
    }, [...Array(data.subdivision).keys()].map((i, index) => index.toString()), data.subdivision + "n"
  )
  sequence.events = data.events;

  sequence.start(0);
  return sequence;
}







function handleSequencerConnection(source, id, data, sourceHandle) {
  const outputRef = source.data.outputs;

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

  if (source.name === "Sequence" && target.name !== "Gain") {
    handleSequencerConnection(source, sourceId, target, sourceHandle);
    return;
  } else if (source.name === "Sequence" && target.name === "Gain") {
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

  updateAudioNode(id, { outputs: updatedOutputs });
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

  source.disconnect(target);
}



// Function to remove an audio node
export async function removeAudioNode(id) {
  const node = await nodes.get(id);
  if (node === undefined || node === null) return;

  if (await node?.name === "Sequence") {
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
        Tone.start();
        Tone.Transport.start();
        resolve();
      } catch (error) {
        // Rejeter la promesse en cas d'erreur
        reject(error);
      }
    }
  });
}


