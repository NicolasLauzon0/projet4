import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";

const selector = (id, data) => (store) => ({
  setDetune: (e) => {
    store.updateNode(id, { detune: +e.target.value });
  },
  setOscillatorType: (e) => {
    store.updateNode(id, {
      oscillator: {
        ...data.oscillator,
        type: e.target.value,
      },
    });
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
  setFilterAttack: (e) => {
    store.updateNode(id, {
      filterEnvelope: {
        ...data.filterEnvelope,
        attack: +e.target.value,
      },
    });
  },
  setFilterDecay: (e) => {
    store.updateNode(id, {
      filterEnvelope: {
        ...data.filterEnvelope,
        decay: +e.target.value,
      },
    });
  },
  setFilterSustain: (e) => {
    store.updateNode(id, {
      filterEnvelope: {
        ...data.filterEnvelope,
        sustain: +e.target.value,
      },
    });
  },
  setFilterRelease: (e) => {
    store.updateNode(id, {
      filterEnvelope: {
        ...data.filterEnvelope,
        release: +e.target.value,
      },
    });
  },
});
const MonoSynth = ({ id, data }) => {
  const {
    setDetune,
    setOscillatorType,
    setEnvelopeAttack,
    setEnvelopeDecay,
    setEnvelopeSustain,
    setEnvelopeRelease,
    setFilterAttack,
    setFilterDecay,
    setFilterSustain,
    setFilterRelease,
  } = useStore(selector(id, data), shallow);
  return (
    <div className="node monoSynth">
      <Handle type="target" position="top" id="a" />
      <div className="monoSynth__container">
        <h3>Synthétiseur mono</h3>
        <label>
          Détune
          <input
            type="range"
            min="-3000"
            max="3000"
            step="1"
            value={data.detune}
            onChange={setDetune}
            className="nodrag"
          />
        </label>
        <label>
          Type d'oscillateur
          <select
            value={data.oscillator.type}
            onChange={setOscillatorType}
            className="nodrag"
          >
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="sawtooth">Sawtooth</option>
            <option value="triangle">Triangle</option>
          </select>
        </label>
        <label>
          Enveloppe Attack
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
        <label>
          Enveloppe de filtre Attack
          <input
            type="range"
            min="0.1"
            max="0.99"
            step="0.01"
            value={data.filterEnvelope.attack}
            onChange={setFilterAttack}
            className="nodrag"
          />
        </label>
        <label>
          Enveloppe de filtre Decay
          <input
            type="range"
            min="0.1"
            max="0.99"
            step="0.01"
            value={data.filterEnvelope.decay}
            onChange={setFilterDecay}
            className="nodrag"
          />
        </label>
        <label>
          Enveloppe de filtre Sustain
          <input
            type="range"
            min="0.1"
            max="0.99"
            step="0.01"
            value={data.filterEnvelope.sustain}
            onChange={setFilterSustain}
            className="nodrag"
          />
        </label>
        <label>
          Enveloppe de filtre Release
          <input
            type="range"
            min="0.1"
            max="0.99"
            step="0.01"
            value={data.filterEnvelope.release}
            onChange={setFilterRelease}
            className="nodrag"
          />
        </label>
      </div>
      <Handle type="source" position="bottom" id="b" />
    </div>
  );
};

export default MonoSynth;
