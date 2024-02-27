import { Handle } from "reactflow"
import { shallow } from "zustand/shallow"

import { useStore } from "../../../store/Store.js"

const selector = (id) => (store) => ({
  setOscilatorType: (e) => store.updateNode(id, { oscillator: { type: e.target.value } }),
  setOscilatorAttack: (e) => store.updateNode(id, { envelope: { attack: +e.target.value } }),
  setOscilatorDecay: (e) => store.updateNode(id, { envelope: { decay: +e.target.value } }),
  setOscilatorSustain: (e) => store.updateNode(id, { envelope: { sustain: +e.target.value } }),
  setOscilatorRelease: (e) => store.updateNode(id, { envelope: { release: +e.target.value } }),
  setModulationType: (e) => store.updateNode(id, { modulation: { type: e.target.value } }),
  setModulationAttack: (e) => store.updateNode(id, { modulationEnvelope: { attack: +e.target.value } }),
  setModulationDecay: (e) => store.updateNode(id, { modulationEnvelope: { decay: +e.target.value } }),
  setModulationSustain: (e) => store.updateNode(id, { modulationEnvelope: { sustain: +e.target.value } }),
  setModulationRelease: (e) => store.updateNode(id, { modulationEnvelope: { release: +e.target.value } }),
  setHarmonicity: (e) => store.updateNode(id, { harmonicity: +e.target.value }),
})
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
  } = useStore(selector(id), shallow)

  return (
    <div className='node amsynthnode'>
      <Handle type="target" position="top" id="a" />
      <div className='amsynthnode__container'>
        <h3>AMSynth</h3>
        <div className="sound">
          <section className="amsynthocc">
            <h4>Occilateur</h4>
            <div className="type">
              <label>Sine</label>
              <select
                value={data.oscillator?.type}
                onChange={setOscilatorType}
              >
                <option value="sine">Sine</option>
                <option value="triangle">Triangle</option>
                <option value="square">Square</option>
                <option value="sawtooth">Sawtooth</option>
              </select>
            </div>
            <div className="knobs">
              <div className="knob">
                <label>Attack</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  className="nodrag"
                  value={data.envelope?.attack}
                  onChange={setOscilatorAttack}
                />
              </div>
              <div className="knob">
                <label>Decay</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  className="nodrag"
                  value={data.envelope?.decay }
                  onChange={setOscilatorDecay}
                />
              </div>
              <div className="knob">
                <label>Sustain</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  className="nodrag"
                  value={data.envelope?.sustain}
                  onChange={setOscilatorSustain}
                />
              </div>
              <div className="knob">
                <label>Release</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  className="nodrag"
                  value={data.envelope?.release}
                  onChange={setOscilatorRelease}
                />
              </div>
            </div>
          </section>
          <section className="amsynthmodulation">
            <h4>Modulation</h4>
            <div className="type">
              <label>Type</label>
              <select
                value={data.modulation?.type}
                onChange={setModulationType}
              >
                <option value="sine">Sine</option>
                <option value="triangle">Triangle</option>
                <option value="square">Square</option>
                <option value="sawtooth">Sawtooth</option>
              </select>
            </div>
            <div className="knobs">
              <div className="knob">
                <label>Attack</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  className='nodrag'
                  value={data.modulationEnvelope?.attack}
                  onChange={setModulationAttack}
                />
              </div>
              <div className="knob">
                <label>Decay</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  className='nodrag'
                  value={data.modulationEnvelope?.decay}
                  onChange={setModulationDecay}
                />
              </div>
              <div className="knob">
                <label>Sustain</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  className='nodrag'
                  value={data.modulationEnvelope?.sustain}
                  onChange={setModulationSustain}
                />
              </div>
              <div className="knob">
                <label>Release</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  className='nodrag'
                  value={data.modulationEnvelope?.release}
                  onChange={setModulationRelease}
                />
              </div>
            </div>
          </section>
        </div>
        <div className="right">
          <div className="knob">
            <label>Harmonicity</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              className='nodrag'
              value={data?.harmonicity}
              onChange={setHarmonicity}
            />
          </div>
        </div>
      </div>
      <Handle type="source" position="bottom" id="b" />
    </div>
  )
}

export default AMSynthNode