import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";

const selector = (id) => (store) => ({
  setAttack: (e) => {
    store.updateNode(id, { attack: +e.target.value });
  },
  setUrl: (e) => {
    console.log(e.target.value);
    store.updateNode(id, { selected: e.target.value  });
  },
});

const Sampler = ({ id, data }) => {
  const { setAttack, setUrl } = useStore(selector(id), shallow);

  return (
    <div className="node sampler">
      <Handle type="target" position="top" id="a" />
      <div className="sampler__container">
        <h3>Sampler</h3>

        <select value={data.selected} onChange={setUrl} className="nodrag">
          <option value="C2">Hihat</option>
          <option value="C3">Snare</option>
          <option value="C4">Kick</option>
          <option value="C5">Clap</option>
        </select>

        <label>
          Attack
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={data.attack}
            onChange={setAttack}
            className="nodrag"
          />
        </label>
      </div>
      <Handle type="source" position="bottom" id="b" />
    </div>
  );
};

export default Sampler;
