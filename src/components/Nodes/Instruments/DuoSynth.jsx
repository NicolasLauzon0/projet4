import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";

const selector = (id, data) => (store) => ({
  setVibratoAmount: (e) => {
    store.updateNode(id, { vibratoAmount: +e.target.value });
  },
  setVibratoRate: (e) => {
    store.updateNode(id, { vibratoRate: +e.target.value });
  },
  setHarmonicity: (e) => {
    store.updateNode(id, { harmonicity: +e.target.value });
  },
  setVoice0Portamento: (e) => {
    store.updateNode(id, {
      voice0: {
        ...data.voice0,
        portamento: +e.target.value,
      },
    });
  },
  setVoice0OscillatorType: (e) => {
    store.updateNode(id, {
      voice0: {
        ...data.voice0,
        oscillator: {
          ...data.voice0.oscillator,
          type: e.target.value,
        },
      },
    });
  },
  setVoice0FilterEnvelopeAttack: (e) => {
    store.updateNode(id, {
      voice0: {
        ...data.voice0,
        filterEnvelope: {
          ...data.voice0.filterEnvelope,
          attack: +e.target.value,
        },
      },
    });
  },
  setVoice0FilterEnvelopeDecay: (e) => {
    store.updateNode(id, {
      voice0: {
        ...data.voice0,
        filterEnvelope: {
          ...data.voice0.filterEnvelope,
          decay: +e.target.value,
        },
      },
    });
  },
  setVoice0FilterEnvelopeSustain: (e) => {
    store.updateNode(id, {
      voice0: {
        ...data.voice0,
        filterEnvelope: {
          ...data.voice0.filterEnvelope,
          sustain: +e.target.value,
        },
      },
    });
  },
  setVoice0FilterEnvelopeRelease: (e) => {
    store.updateNode(id, {
      voice0: {
        ...data.voice0,
        filterEnvelope: {
          ...data.voice0.filterEnvelope,
          release: +e.target.value,
        },
      },
    });
  },
  setVoice0EnvelopeAttack: (e) => {
    store.updateNode(id, {
      voice0: {
        ...data.voice0,
        envelope: {
          ...data.voice0.envelope,
          attack: +e.target.value,
        },
      },
    });
  },
  setVoice0EnvelopeDecay: (e) => {
    store.updateNode(id, {
      voice0: {
        ...data.voice0,
        envelope: {
          ...data.voice0.envelope,
          decay: +e.target.value,
        },
      },
    });
  },
  setVoice0EnvelopeSustain: (e) => {
    store.updateNode(id, {
      voice0: {
        ...data.voice0,
        envelope: {
          ...data.voice0.envelope,
          sustain: +e.target.value,
        },
      },
    });
  },
  setVoice0EnvelopeRelease: (e) => {
    store.updateNode(id, {
      voice0: {
        ...data.voice0,
        envelope: {
          ...data.voice0.envelope,
          release: +e.target.value,
        },
      },
    });
  },
  setVoice1Portamento: (e) => {
    store.updateNode(id, {
      voice1: {
        ...data.voice1,
        portamento: +e.target.value,
      },
    });
  },
  setVoice1OscillatorType: (e) => {
    store.updateNode(id, {
      voice1: {
        ...data.voice1,
        oscillator: {
          ...data.voice1.oscillator,
          type: e.target.value,
        },
      },
    });
  },

  setVoice1FilterEnvelopeAttack: (e) => {
    store.updateNode(id, {
      voice1: {
        ...data.voice1,
        filterEnvelope: {
          ...data.voice1.filterEnvelope,
          attack: +e.target.value,
        },
      },
    });
  },
  setVoice1FilterEnvelopeDecay: (e) => {
    store.updateNode(id, {
      voice1: {
        ...data.voice1,
        filterEnvelope: {
          ...data.voice1.filterEnvelope,
          decay: +e.target.value,
        },
      },
    });
  },
  setVoice1FilterEnvelopeSustain: (e) => {
    store.updateNode(id, {
      voice1: {
        ...data.voice1,
        filterEnvelope: {
          ...data.voice1.filterEnvelope,
          sustain: +e.target.value,
        },
      },
    });
  },
  setVoice1FilterEnvelopeRelease: (e) => {
    store.updateNode(id, {
      voice1: {
        ...data.voice1,
        filterEnvelope: {
          ...data.voice1.filterEnvelope,
          release: +e.target.value,
        },
      },
    });
  },
  setVoice1EnvelopeAttack: (e) => {
    store.updateNode(id, {
      voice1: {
        ...data.voice1,
        envelope: {
          ...data.voice1.envelope,
          attack: +e.target.value,
        },
      },
    });
  },
  setVoice1EnvelopeDecay: (e) => {
    store.updateNode(id, {
      voice1: {
        ...data.voice1,
        envelope: {
          ...data.voice1.envelope,
          decay: +e.target.value,
        },
      },
    });
  },
  setVoice1EnvelopeSustain: (e) => {
    store.updateNode(id, {
      voice1: {
        ...data.voice1,
        envelope: {
          ...data.voice1.envelope,
          sustain: +e.target.value,
        },
      },
    });
  },
  setVoice1EnvelopeRelease: (e) => {
    store.updateNode(id, {
      voice1: {
        ...data.voice1,
        envelope: {
          ...data.voice1.envelope,
          release: +e.target.value,
        },
      },
    });
  },
});

const DuoSynth = ({ id, data }) => {
  const {
    setVibratoAmount,
    setVibratoRate,
    setHarmonicity,
    setVoice0Portamento,
    setVoice0OscillatorType,
    setVoice0FilterEnvelopeAttack,
    setVoice0FilterEnvelopeDecay,
    setVoice0FilterEnvelopeSustain,
    setVoice0FilterEnvelopeRelease,
    setVoice0EnvelopeAttack,
    setVoice0EnvelopeDecay,
    setVoice0EnvelopeSustain,
    setVoice0EnvelopeRelease,
    setVoice1Portamento,
    setVoice1OscillatorType,
    setVoice1FilterEnvelopeAttack,
    setVoice1FilterEnvelopeDecay,
    setVoice1FilterEnvelopeSustain,
    setVoice1FilterEnvelopeRelease,
    setVoice1EnvelopeAttack,
    setVoice1EnvelopeDecay,
    setVoice1EnvelopeSustain,
    setVoice1EnvelopeRelease,
  } = useStore(selector(id, data), shallow);

  return (
    <div className="node duoSynth">
      <CustomHandle type={"target"} position={"top"} id={"a"} isConnectable={1} />
      <div className="duoSynth__container">
        <h3>Synthétiseur Duo</h3>
        <label>
          Taux de vibrato
          <input
            type="range"
            min="0.1"
            max="0.99"
            step="0.01"
            value={data.vibratoAmount}
            onChange={setVibratoAmount}
            className="nodrag"
          />
        </label>

        <label>
          Amplitude de vibrato
          <input
            type="range"
            min="0.1"
            max="2000"
            step="0.01"
            value={data.vibratoRate}
            onChange={setVibratoRate}
            className="nodrag"
          />
        </label>

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

        <div className="voice0">
          <h4>Voice 0</h4>
          <label>
            Portamento
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.01"
              value={data.voice0.portamento}
              onChange={setVoice0Portamento}
              className="nodrag"
            />
          </label>
          <label>
            Type d'oscillateur
            <select
              value={data.voice0.oscillator.type}
              onChange={setVoice0OscillatorType}
            >
              <option value="sine">Sine</option>
              <option value="triangle">Triangle</option>
              <option value="square">Square</option>
              <option value="sawtooth">Sawtooth</option>
            </select>
          </label>
          <label>
            Enveloppe de filtre Attack
            <input
              type="range"
              min="0.1"
              max="0.99"
              step="0.01"
              value={data.voice0.filterEnvelope.attack}
              onChange={setVoice0FilterEnvelopeAttack}
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
              value={data.voice0.filterEnvelope.decay}
              onChange={setVoice0FilterEnvelopeDecay}
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
              value={data.voice0.filterEnvelope.sustain}
              onChange={setVoice0FilterEnvelopeSustain}
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
              value={data.voice0.filterEnvelope.release}
              onChange={setVoice0FilterEnvelopeRelease}
              className="nodrag"
            />
          </label>
          <label>
            Enveloppe Attack
            <input
              type="range"
              min="0.1"
              max="0.99"
              step="0.01"
              value={data.voice0.envelope.attack}
              onChange={setVoice0EnvelopeAttack}
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
              value={data.voice0.envelope.decay}
              onChange={setVoice0EnvelopeDecay}
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
              value={data.voice0.envelope.sustain}
              onChange={setVoice0EnvelopeSustain}
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
              value={data.voice0.envelope.release}
              onChange={setVoice0EnvelopeRelease}
              className="nodrag"
            />
          </label>
        </div>

        <div className="voice1">
          <h4>Voice 1</h4>
          <label>
            Portamento
            <input
              type="range"
              min="0.1"
              max="0.99"
              step="0.01"
              value={data.voice1.portamento}
              onChange={setVoice1Portamento}
              className="nodrag"
            />
          </label>
          <label>
            Type d'oscillateur
            <select
              value={data.voice1.oscillator.type}
              onChange={setVoice1OscillatorType}
            >
              <option value="sine">Sine</option>
              <option value="triangle">Triangle</option>
              <option value="square">Square</option>
              <option value="sawtooth">Sawtooth</option>
            </select>
          </label>
          <label>
            Enveloppe de filtre Attack
            <input
              type="range"
              min="0.1"
              max="0.99"
              step="0.01"
              value={data.voice1.filterEnvelope.attack}
              onChange={setVoice1FilterEnvelopeAttack}
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
              value={data.voice1.filterEnvelope.decay}
              onChange={setVoice1FilterEnvelopeDecay}
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
              value={data.voice1.filterEnvelope.sustain}
              onChange={setVoice1FilterEnvelopeSustain}
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
              value={data.voice1.filterEnvelope.release}
              onChange={setVoice1FilterEnvelopeRelease}
              className="nodrag"
            />
          </label>
          <label>
            Enveloppe Attack
            <input
              type="range"
              min="0.1"
              max="0.99"
              step="0.01"
              value={data.voice1.envelope.attack}
              onChange={setVoice1EnvelopeAttack}
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
              value={data.voice1.envelope.decay}
              onChange={setVoice1EnvelopeDecay}
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
              value={data.voice1.envelope.sustain}
              onChange={setVoice1EnvelopeSustain}
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
              value={data.voice1.envelope.release}
              onChange={setVoice1EnvelopeRelease}
              className="nodrag"
            />
          </label>
        </div>
      </div>
      <CustomHandle type={"source"} position={"bottom"} id={"b"} isConnectable={1} />
    </div>
  );
};

export default DuoSynth;
