import * as Tone from 'tone'

const audioContext = new AudioContext();
const nodes = new Map();

const amSynth = new Tone.AMSynth();
amSynth.frequency.value = 440;
const gainNode = new Tone.Gain(0.5);
gainNode.gain.value = 0.5;

const outNode = audioContext.destination;

nodes.set('amSynth', amSynth);
nodes.set('gainNode', gainNode);
nodes.set('outNode', outNode);

export function updateAudioNode(id, data) {
    const node = nodes.get(id);
   
    for (const [key, val] of Object.entries(data)) {
      if (node[key] instanceof Tone.Signal) {
        node[key].value = val;
      } else {
        node[key] = val;
      }
    }
  }


export function removeAudioNode(id) {
    const node = nodes.get(id);

    node.disconnect();
    nodes.stop?.();

    nodes.delete(id);
}

export function connect(sourceId, targetId) {
    const source = nodes.get(sourceId);
    const target = nodes.get(targetId);

    source.connect(target);
}