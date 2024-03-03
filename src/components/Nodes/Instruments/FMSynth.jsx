import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";

const selector = (id, data) => (store) => ({
  setHarmonicity: (e) => {
    store.updateNode(id, { harmonicity: +e.target.value });
  },
  setModulationIndex: (e) => {
    store.updateNode(id, { modulationIndex: +e.target.value });
  },
  setDetune: (e) => {
    store.updateNode(id, { detune: +e.target.value });
  },
  setEnvelopeAttack: (e) => {
    store.updateNode(id, {
      envelope: {
        ...data.envelope,
        attack: +e.target.value,
      },
    });
  },
  setEnvelopeDecay: (e) => {
    store.updateNode(id, {
      envelope: {
        ...data.envelope,
        decay: +e.target.value,
      },
    });
  },
  setEnvelopeSustain: (e) => {
    store.updateNode(id, {
      envelope: {
        ...data.envelope,
        sustain: +e.target.value,
      },
    });
  },
  setEnvelopeRelease: (e) => {
    store.updateNode(id, {
      envelope: {
        ...data.envelope,
        release: +e.target.value,
      },
    });
  },
});
const FMSynth = ({ id, data }) => {
  const {
    setHarmonicity,
    setModulationIndex,
    setDetune,
    setEnvelopeAttack,
    setEnvelopeDecay,
    setEnvelopeSustain,
    setEnvelopeRelease,
  } = useStore(selector(id, data), shallow);
  return (
    <div className="node fmSynth">
      <Handle type="target" position="top" id="a" />
      <div className="fmSynth__container">
        <h3>Synthétiseur FM</h3>
        <label>
          Harmonicité
          <input
            type="range"
            min="0.1"
            max="20"
            step="0.01"
            value={data.harmonicity}
            onChange={setHarmonicity}
            className="nodrag"
          />
        </label>
        <label>
          Indice de modulation
          <input
            type="range"
            min="0.1"
            max="20"
            step="0.01"
            value={data.modulationIndex}
            onChange={setModulationIndex}
            className="nodrag"
          />
        </label>
        <label>
          Détune
          <input
            type="range"
            min="-3000"
            max="3000"
            step="0.01"
            value={data.detune}
            onChange={setDetune}
            className="nodrag"
          />
        </label>
        <label>
          Enveloppe Attaque
          <input
            type="range"
            min="0.1"
            max="0.99"
            step="0.01"
            value={data.envelope.attack}
            onChange={setEnvelopeAttack}
            className="nodrag"
          />
        </label>
        <label>
          Enveloppe Decay
          <input
            type="range"
            min="0.1"
            max="0.99"
            step="0.01"
            value={data.envelope.decay}
            onChange={setEnvelopeDecay}
            className="nodrag"
          />
        </label>
        <label>
          Enveloppe Sustain
          <input
            type="range"
            min="0.1"
            max="0.99"
            step="0.01"
            value={data.envelope.sustain}
            onChange={setEnvelopeSustain}
            className="nodrag"
          />
        </label>
        <label>
          Enveloppe Release
          <input
            type="range"
            min="0.1"
            max="0.99"
            step="0.01"
            value={data.envelope.release}
            onChange={setEnvelopeRelease}
            className="nodrag"
          />
        </label>
      </div>
      <Handle type="source" position="bottom" id="b" />
    </div>
  );
};

export default FMSynth;
