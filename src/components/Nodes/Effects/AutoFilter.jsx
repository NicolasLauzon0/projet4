import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";

import { useStore } from "../../../store/Store.js";

const selector = (id, data) => (store) => ({
  setBaseFrequency: (e) => {
    store.updateNode(id, { baseFrequency: +e.target.value });
  },
  setDepth: (e) => {
    store.updateNode(id, { depth: +e.target.value });
  },
  setFrequency: (e) => {
    store.updateNode(id, { frequency: +e.target.value });
  },
  setOctaves: (e) => {
    store.updateNode(id, { octaves: +e.target.value });
  },
  setWet: (e) => {
    store.updateNode(id, { wet: +e.target.value });
  },
  setGain: (e) => {
    store.updateNode(id, { filter: { ...data.filter, gain: +e.target.value } });
  },
});

const Filtre = ({ id, data }) => {
  const {
    setBaseFrequency,
    setDepth,
    setFrequency,
    setOctaves,
    setWet,
    setQ,
    setGain,
  } = useStore(selector(id, data), shallow);

  return (
    <div className="node Filtre">
      <Handle type="target" position="top" id="a" />
      <div className="Filtre__container">
        <h3>Filtre</h3>
        <label>
          Fréquence de base
          <input
            type="range"
            min="0.1"
            max="400"
            step="1"
            value={data.baseFrequency}
            onChange={setBaseFrequency}
            className="nodrag"
          />
        </label>
        <label>
          Profondeur
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.01"
            value={data.depth}
            onChange={setDepth}
            className="nodrag"
          />
        </label>
        <label>
          Fréquence
          <input
            type="range"
            min="0"
            max="4000"
            step="0.01"
            value={data.frequency}
            onChange={setFrequency}
            className="nodrag"
          />
        </label>
        <label>
          Octaves
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={data.octaves}
            onChange={setOctaves}
            className="nodrag"
          />
        </label>
        <label>
          Ratio
          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.01"
            value={data.wet}
            onChange={setWet}
            className="nodrag"
          />
        </label>
      </div>
      <Handle type="source" position="bottom" id="b" />
    </div>
  );
};

export default Filtre;
