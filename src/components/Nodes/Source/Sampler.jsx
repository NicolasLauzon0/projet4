import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";

const selector = (id) => (store) => ({
  setAttack: (e) => store.updateNode(id, { attack: +e.target.value }),
  setUrl: (e) => store.updateNode(id, { urls: { C2: e.target.value } }),
});

const Sampler = ({ id, data }) => {
  const { setAttack, setUrl } = useStore(selector(id), shallow);

  return (
    <div className="node sampler">
      <Handle type="target" position="top" id="a" />
      <div className="sampler__container">
        <h3>Sampler</h3>

        <select value={data.urls.C2} onChange={setUrl} className="nodrag">
          <option value="snare.wav">Snare</option>
          <option value="kick.wav">Kick</option>
          <option value="hh.wav">Hihat</option>
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
