import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";

import { useStore } from "../../../store/Store.js";

const selector = (id) => (store) => ({
  setBaseFrequency: (e) =>
    store.updateNode(id, { baseFrequency: e.target.value }),
  setDepth: (e) => store.updateNode(id, { depth: e.target.value }),
  setFrequency: (e) => store.updateNode(id, { frequency: e.target.value }),
  setFilterType: (e) =>
    store.updateNode(id, { filter: { type: e.target.value } }),
  setOctaves: (e) => store.updateNode(id, { octaves: e.target.value }),
  setType: (e) => store.updateNode(id, { type: e.target.value }),
  setWet: (e) => store.updateNode(id, { wet: e.target.value }),
});

const AutoFilter = ({ id, data }) => {
  const {
    setBaseFrequency,
    setDepth,
    setFrequency,
    setFilterType,
    setOctaves,
    setType,
    setWet,
  } = useStore(selector(id, data), shallow);

  return (
    <div className="node autofilter">
      <Handle type="target" position="top" />
      <div className="autofilter__container">
        <h3>AutoFilter</h3>
        <div className="knobs">
          <div className="knob">
            <label>Base Frequency</label>
            <input
              type="range"
              min="0"
              max="2000"
              step="1"
              onChange={setBaseFrequency}
              value={data.baseFrequency}
              className="nodrag"
            />
          </div>
          <div className="knob">
            <label>Depth</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              onChange={setDepth}
              className="nodrag"
              value={data.depth}
            />
          </div>
          <div className="knob">
            <label>Frequency</label>
            <input
              type="range"
              min="0"
              max="2000"
              step="1"
              onChange={setFrequency}
              className="nodrag"
              value={data.frequency}
            />
          </div>
          <div className="knob">
            <label>Type</label>
            <select
              onChange={setFilterType}
              className="nodrag"
              value={data.filter}
            >
                <option value="lowpass">Lowpass</option>
                <option value="highpass">Highpass</option>
                <option value="bandpass">Bandpass</option>
                <option value="lowshelf">Lowshelf</option>
                <option value="highshelf">Highshelf</option>
                <option value="peaking">Peaking</option>
                <option value="notch">Notch</option>
            </select>
          </div>
          <div className="knob">
            <label>Octaves</label>
            <input
              type="range"
              min="0"
              max="8"
              step="1"
              onChange={setOctaves}
              className="nodrag"
              value={data.octaves}
            />
          </div>
          <div className="knob">
            <label>Type</label>
            <select onChange={setType} className="nodrag" value={data.type}>
              <option value="sine">Sine</option>
              <option value="triangle">Triangle</option>
              <option value="sawtooth">Sawtooth</option>
              <option value="square">Square</option>
            </select>
          </div>
          <div className="knob">
            <label>Wet</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              onChange={setWet}
              className="nodrag"
              value={data.wet}
            />
          </div>
        </div>
      </div>
      <Handle type="source" position="bottom" />
    </div>
  );
};

export default AutoFilter;
