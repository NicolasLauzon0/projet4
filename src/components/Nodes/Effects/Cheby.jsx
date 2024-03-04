import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";

const selector = (id) => (store) => ({
  setOrder: (e) => {
    store.updateNode(id, { order: +e.target.value });
  },
  setWet: (e) => {
    store.updateNode(id, { wet: +e.target.value });
  },
});
const Cheby = ({ id, data }) => {
  const { setOrder, setWet } = useStore(selector(id), shallow);
  return (
    <div className="node cheby">
      <CustomHandle type={"target"} position={"top"} id={"a"} />
      <div className="cheby__container">
        <h3>Cheby</h3>
        <label>
          Puissance
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={data.order}
            onChange={setOrder}
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

export default Cheby;
