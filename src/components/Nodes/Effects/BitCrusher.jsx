import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";

const selector = (id) => (store) => ({
  setBits: (e) => {
    store.updateNode(id, { bits: +e.target.value });
  },
  setWet: (e) => {
    store.updateNode(id, { wet: +e.target.value });
  },
});
const BitCrusher = ({ id, data }) => {
  const { setBits, setWet } = useStore(selector(id), shallow);
  return (
    <div className="node bitCrusher">
      <CustomHandle type={"target"} position={"top"} id={"a"} />
      <div className="bitCrusher__container">
        <h3>BitCrusher</h3>
        <label>
          Bits
          <input
            type="range"
            min="1"
            max="8"
            step="1"
            value={data.bits}
            onChange={setBits}
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
      <CustomHandle type={"source"} position={"bottom"} id={"b"} />
    </div>
  );
};

export default BitCrusher;
