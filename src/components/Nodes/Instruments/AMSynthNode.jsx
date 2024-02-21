import { Handle } from "reactflow"
import { shallow } from "zustand/shallow"

import { useStore } from "../../../store/Store.js"

const selector = (id) => (store) => ({
  setOccilatorType: (e) => store.updateNode(id, { occilator: { type: e.target.value } }),
  setOccilatorAttack: (e) => store.updateNode(id, { occilator: { attack: e.target.value } }),
  setOccilatorDecay: (e) => store.updateNode(id, { occilator: { decay: e.target.value } }),
  setOccilatorSustain: (e) => store.updateNode(id, { occilator: { sustain: e.target.value } }),
  setOccilatorRelease: (e) => store.updateNode(id, { occilator: { release: e.target.value } }),
  setModulationType: (e) => store.updateNode(id, { modulation: { type: e.target.value } }),
  setModulationAttack: (e) => store.updateNode(id, { modulation: { attack: e.target.value } }),
  setModulationDecay: (e) => store.updateNode(id, { modulation: { decay: e.target.value } }),
  setModulationSustain: (e) => store.updateNode(id, { modulation: { sustain: e.target.value } }),
  setModulationRelease: (e) => store.updateNode(id, { modulation: { release: e.target.value } }),
  setPortamento: (e) => store.updateNode(id, { portamento: e.target.value }),
  setHarmonicity: (e) => store.updateNode(id, { harmonicity: e.target.value }),
  setVolume: (e) => store.updateNode(id, { volume: e.target.value }),
})

const AMSynthNode = ({ id, data }) => {
  const {
    setOccilatorType,
    setOccilatorAttack,
    setOccilatorDecay,
    setOccilatorSustain,
    setOccilatorRelease,
    setModulationType,
    setModulationAttack,
    setModulationDecay,
    setModulationSustain,
    setModulationRelease,
    setPortamento,
    setHarmonicity,
    setVolume,
  } = useStore(selector(id), shallow)

  

  return (
    <div className='node amsynthnode'>
      <div className='amsynthnode__container'>
        <h3>AMSynth</h3>
        <div className="sound">
          <section className="amsynthocc">
            <h4>Occilateur</h4>
            <div className="type">
              <label>Sine</label>
              <select
                value={data.occilator.type || "sine"}
                onChange={setOccilatorType}
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
                  value={data.occilator.attack || 0.1}
                  onChange={setOccilatorAttack}
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
                  value={data.occilator.decay || 0.2}
                  onChange={setOccilatorDecay}
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
                  value={data.occilator.sustain || 0.3}
                  onChange={setOccilatorSustain}
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
                  value={data.occilator.release || 0.4}
                  onChange={setOccilatorRelease}
                />
              </div>
            </div>
          </section>
          <section className="amsynthmodulation">
            <h4>Modulation</h4>
            <div className="type">
              <label>Type</label>
              <select
                value={data.modulation.type || "sine"}
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
                  value={data.modulation.attack || 0.1}
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
                  value={data.modulation.decay || 0.2}
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
                  value={data.modulation.sustain || 0.3}
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
                  value={data.modulation.release || 0.4}
                  onChange={setModulationRelease}
                />
              </div>
            </div>
          </section>
        </div>
        <div className="right">
          <div className="knob">
            <label>Portamento</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              className='nodrag'
              value={data.portamento || 0.5}
              onChange={setPortamento}
            />
          </div>
          <div className="knob">
            <label>Harmonicity</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              className='nodrag'
              value={data.harmonicity || 0.6}
              onChange={setHarmonicity}
            />
          </div>
          <div className="knob">
            <label>Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              className='nodrag'
              value={data.volume || 0.6}
              onChange={setVolume}
            />
          </div>
        </div>
      </div>
      <Handle type="source" position="bottom" id="a" />
      <Handle type="source" position="bottom" id="b" />
    </div>
  )
}

export default AMSynthNode