import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";

const selector = (id) => (store) => ({
  setAttack: (e) => {
    store.updateNode(id, { attack: +e.target.value });
  },
  setUrl: (e) => {

    store.updateNode(id, { selected: e.target.value });
  },
});

const Sampler = ({ id, data }) => {
  const { setAttack, setUrl } = useStore(selector(id), shallow);

  return (
    <div className="node sampler">
      <CustomHandle type={"target"} position={"top"} id={"a"} />
      <div className="sampler__container">
        <h3>Sons de base</h3>

        <select value={data.selected} onChange={setUrl} className="nodrag">
          {data?.options?.map((option, index) => {
            return (
              <option key={index} value={option.value} onChange={setUrl}>
                {option.name}
              </option>
            );
          })}
        </select>

        <label>
          Attack
          <input
            type="range"
            min="0.1"
            max="0.99"
            step="0.01"
            value={data.attack}
            onChange={setAttack}
            className="nodrag"
          />
        </label>
      </div>
      <CustomHandle type={"source"} position={"bottom"} id={"b"}  />
    </div>
  );
};

export default Sampler;
