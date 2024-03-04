import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";

const selector = (id) => (store) => ({
  setDelayTime: (e) => {
    store.updateNode(id, { delayTime: +e.target.value });
  },
  setDepth: (e) => {
    store.updateNode(id, { depth: +e.target.value });
  },
  setFeedback: (e) => {
    store.updateNode(id, { feedback: +e.target.value });
  },
  setFrequency: (e) => {
    store.updateNode(id, { frequency: +e.target.value });
  },
  setSpread: (e) => {
    store.updateNode(id, { spread: +e.target.value });
  },
  setType: (e) => {
    store.updateNode(id, { type: e.target.value });
  },
  setWet: (e) => {
    store.updateNode(id, { wet: +e.target.value });
  },
});

const Chorus = ({ id, data }) => {
  const {
    setDelayTime,
    setDepth,
    setFeedback,
    setFrequency,
    setSpread,
    setType,
    setWet,
  } = useStore(selector(id), shallow);

  return (
    <div className="node chorus">
      <CustomHandle type={"target"} position={"top"} id={"a"} isConnectable={2} />
      <div className="chorus__container">
        <h3>Chorus</h3>
        <label>
          Durée du delay
          <input
            type="range"
            min="0"
            max="7"
            step="0.1"
            value={data.delayTime}
            onChange={setDelayTime}
            className="nodrag"
          />
        </label>
        <label>
          Profondeur
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={data.depth}
            onChange={setDepth}
            className="nodrag"
          />
        </label>
        <label>
          Feedback
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={data.feedback}
            onChange={setFeedback}
            className="nodrag"
          />
        </label>
        <label>
          Fréquence
          <input
            type="range"
            min="0"
            max="200"
            step="0.01"
            value={data.frequency}
            onChange={setFrequency}
            className="nodrag"
          />
        </label>
        <label>
          Spread
          <input
            type="range"
            min="0"
            max="180"
            step="1"
            value={data.spread}
            onChange={setSpread}
            className="nodrag"
          />
        </label>
        <label>
          Type d'oscillation
          <select value={data.type} onChange={setType} className="nodrag">
            <option value="sine">sine</option>
            <option value="triangle">triangle</option>
            <option value="sawtooth">sawtooth</option>
            <option value="square">square</option>
          </select>
        </label>
        <label>
          Ratio
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={data.wet}
            onChange={setWet}
            className="nodrag"
          />
        </label>
      </div>
      <CustomHandle type={"source"} position={"bottom"} id={"b"} isConnectable={2} />
    </div>
  );
};

export default Chorus;
