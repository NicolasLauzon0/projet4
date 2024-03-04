import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";

const selector = (id) => (store) => ({
  setAttack: (e) => {
    store.updateNode(id, { attackNoise: +e.target.value });
  },
  setDampening: (e) => {
    store.updateNode(id, { dampening: +e.target.value });
  },
  setResonance: (e) => {
    store.updateNode(id, { resonance: +e.target.value });
  },
});
const PluckSynth = ({ id, data }) => {
  const { setAttack, setDampening, setResonance } = useStore(
    selector(id),
    shallow
  );

  return (
    <div className="node pluckSynth">
      <CustomHandle type={"target"} position={"top"} id={"a"}/>
      <div className="pluckSynth__container">
        <h3>Synthétiseur de pluck</h3>

        <label>
          Attack
          <input
            type="range"
            min="0.1"
            max="20"
            step="0.01"
            value={data.attackNoise}
            onChange={setAttack}
            className="nodrag"
          />
        </label>

        <label>
          Dampening
          <input
            type="range"
            min="2000"
            max="6000"
            step="1"
            value={data.dampening}
            onChange={setDampening}
            className="nodrag"
          />
        </label>

        <label>
          Résonance
          <input
            type="range"
            min="0.1"
            max="0.99"
            step="0.01"
            value={data.resonance}
            onChange={setResonance}
            className="nodrag"
          />
        </label>
      </div>
      <CustomHandle type={"source"} position={"bottom"} id={"b"} />
    </div>
  );
};

export default PluckSynth;
