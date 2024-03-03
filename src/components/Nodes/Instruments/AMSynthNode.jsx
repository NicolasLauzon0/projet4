import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";

import { useStore } from "../../../store/Store.js";

const selector = (id, data) => (store) => ({
  setOscilatorType: (e) => {
    store.updateNode(id, { oscillator: { type: e.target.value } });
  },
  setOscilatorAttack: (e) => {
    store.updateNode(id, {
      envelope: {
        ...data.envelope,
        attack: e.target.value,
      },
    });
  },
  setOscilatorDecay: (e) => {
    store.updateNode(id, {
      envelope: {
        ...data.envelope,
        decay: e.target.value,
      },
    });
  },
  setOscilatorSustain: (e) => {
    store.updateNode(id, {
      envelope: {
        ...data.envelope,
        sustain: e.target.value,
      },
    });
  },
  setOscilatorRelease: (e) => {
    store.updateNode(id, {
      envelope: {
        ...data.envelope,
        release: e.target.value,
      },
    });
  },
  setModulationType: (e) => {
    store.updateNode(id, { modulation: { type: e.target.value } });
  },
  setModulationAttack: (e) => {
    store.updateNode(id, {
      modulationEnvelope: {
        ...data.modulationEnvelope,
        attack: e.target.value,
      },
    });
  },
  setModulationDecay: (e) => {
    store.updateNode(id, {
      modulationEnvelope: {
        ...data.modulationEnvelope,
        decay: e.target.value,
      },
    });
  },
  setModulationSustain: (e) => {
    store.updateNode(id, {
      modulationEnvelope: {
        ...data.modulationEnvelope,
        sustain: e.target.value,
      },
    });
  },
  setModulationRelease: (e) => {
    store.updateNode(id, {
      modulationEnvelope: {
        ...data.modulationEnvelope,
        release: e.target.value,
      },
    });
  },
  setHarmonicity: (e) => {
    store.updateNode(id, { harmonicity: e.target.value });
  },
  setDetune: (e) => {
    store.updateNode(id, { detune: e.target.value });
  },
});
const AMSynthNode = ({ id, data }) => {
  const {
    setOscilatorType,
    setOscilatorAttack,
    setOscilatorDecay,
    setOscilatorSustain,
    setOscilatorRelease,
    setModulationType,
    setModulationAttack,
    setModulationDecay,
    setModulationSustain,
    setModulationRelease,
    setHarmonicity,
    setDetune,
  } = useStore(selector(id, data), shallow);

  return (
    <div className="node amsynthnode">
      <Handle type="target" position="top" id="a" />
      <div className="amsynthnode__container">
        <h3>Synthétiseur AM</h3>
        <div className="sound">
          <section className="amsynthocc">
            <h4>Occilateur</h4>
            <div className="type">
              <label>
                Type d'oscillateur
                <select
                  value={data.oscillator.type}
                  onChange={setOscilatorType}
                >
                  <option value="sine">Sine</option>
                  <option value="triangle">Triangle</option>
                  <option value="square">Square</option>
                  <option value="sawtooth">Sawtooth</option>
                </select>
              </label>
            </div>
            <div className="knobs">
              <div className="knob">
                <label>
                  Attack
                  <input
                    type="range"
                    min="0.1"
                    max="0.99"
                    step="0.01"
                    className="nodrag"
                    value={data.envelope?.attack}
                    onChange={setOscilatorAttack}
                  />
                </label>
              </div>
              <div className="knob">
                <label>
                  Decay
                  <input
                    type="range"
                    min="0.1"
                    max="0.99"
                    step="0.01"
                    className="nodrag"
                    value={data.envelope?.decay}
                    onChange={setOscilatorDecay}
                  />
                </label>
              </div>
              <div className="knob">
                <label>
                  Sustain
                  <input
                    type="range"
                    min="0.1"
                    max="0.99"
                    step="0.01"
                    className="nodrag"
                    value={data.envelope?.sustain}
                    onChange={setOscilatorSustain}
                  />
                </label>
              </div>
              <div className="knob">
                <label>
                  Release
                  <input
                    type="range"
                    min="0.1"
                    max="0.99"
                    step="0.01"
                    className="nodrag"
                    value={data.envelope?.release}
                    onChange={setOscilatorRelease}
                  />
                </label>
              </div>
            </div>
          </section>
          <section className="amsynthmodulation">
            <h4>Modulation</h4>
            <div className="type">
              <label>
                Type
                <select
                  value={data.modulation.type}
                  onChange={setModulationType}
                >
                  <option value="sine">Sine</option>
                  <option value="triangle">Triangle</option>
                  <option value="square">Square</option>
                  <option value="sawtooth">Sawtooth</option>
                </select>
              </label>
            </div>
            <div className="knobs">
              <div className="knob">
                <label>
                  Attack
                  <input
                    type="range"
                    min="0.1"
                    max="0.99"
                    step="0.01"
                    className="nodrag"
                    value={data.modulationEnvelope.attack}
                    onChange={setModulationAttack}
                  />
                </label>
              </div>
              <div className="knob">
                <label>
                  Decay
                  <input
                    type="range"
                    min="0.1"
                    max="0.99"
                    step="0.01"
                    className="nodrag"
                    value={data.modulationEnvelope.decay}
                    onChange={setModulationDecay}
                  />
                </label>
              </div>
              <div className="knob">
                <label>
                  Sustain
                  <input
                    type="range"
                    min="0.1"
                    max="0.99"
                    step="0.01"
                    className="nodrag"
                    value={data.modulationEnvelope.sustain}
                    onChange={setModulationSustain}
                  />
                </label>
              </div>
              <div className="knob">
                <label>
                  Release
                  <input
                    type="range"
                    min="0.1"
                    max="0.99"
                    step="0.01"
                    className="nodrag"
                    value={data.modulationEnvelope.release}
                    onChange={setModulationRelease}
                  />
                </label>
              </div>
            </div>
          </section>
        </div>
        <div className="right">
          <div className="knob">
            <label>
              Harmonicité
              <input
                type="range"
                min="0.1"
                max="0.99"
                step="0.01"
                className="nodrag"
                value={data.harmonicity}
                onChange={setHarmonicity}
              />
            </label>
            <label>
              Détune
              <input
                type="range"
                min="-2000"
                max="2000"
                step="1"
                className="nodrag"
                value={data.detune}
                onChange={setDetune}
              />
            </label>
          </div>
        </div>
      </div>
      <Handle type="source" position="bottom" id="b" />
    </div>
  );
};

export default AMSynthNode;
