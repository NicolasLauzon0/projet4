import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";

const selector = (id, data) => (store) => ({
  setPitchDecay: (e) => {
    store.updateNode(id, { pitchDecay: +e.target.value });
  },
  setOctaves: (e) => {
    store.updateNode(id, { octaves: +e.target.value });
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
});
const MembraneSynth = ({ id, data }) => {
  const {
    setPitchDecay,
    setOctaves,
    setOscillatorType,
    setEnvelopeAttack,
    setEnvelopeDecay,
    setEnvelopeSustain,
    setEnvelopeRelease,
  } = useStore(selector(id, data), shallow);
  return (
    <div className="node membraneSynth">
      <CustomHandle type={"target"} position={"top"} id={"a"} />
      <div className="membraneSynth__container">
        <h3>Synthétiseur à membrane</h3>
        <label>
          Pitch Decay
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.01"
            value={data.pitchDecay}
            onChange={setPitchDecay}
            className="nodrag"
          />
        </label>
        <label>
          Octaves
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.01"
            value={data.octaves}
            onChange={setOctaves}
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
      </div>
      <CustomHandle type={"source"} position={"bottom"} id={"b"} />
    </div>
  );
};

export default MembraneSynth;
