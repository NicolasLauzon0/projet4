import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";

const selector = (id) => (store) => ({
  setDecay: (e) => {
    store.updateNode(id, { decay: +e.target.value });
  },
  setPreDelay: (e) => {
    store.updateNode(id, { preDelay: +e.target.value });
  },
  setWet: (e) => {
    store.updateNode(id, { wet: +e.target.value });
  },
});
const Reverb = ({ id, data }) => {
  const { setDecay, setPreDelay, setWet } = useStore(selector(id), shallow);
  return (
    <div className="node reverb">
      <CustomHandle type={"target"} position={"top"} id={"a"} isConnectable={1} />
      <div className="reverb__container">
        <h3>Réverbération</h3>
        <label>
          Decay
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={data.decay}
            onChange={setDecay}
            className="nodrag"
          />
        </label>
        <label>
          Pré-delay
          <input
            type="range"
            min="0"
            max="2"
            step="0.01"
            value={data.preDelay}
            onChange={setPreDelay}
            className="nodrag"
          />
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
      <CustomHandle type={"source"} position={"bottom"} id={"b"} isConnectable={1} />
    </div>
  );
};

export default Reverb;
