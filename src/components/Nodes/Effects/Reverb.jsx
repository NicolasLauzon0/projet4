import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";
import Input from "../../utils/Input.jsx";
import Button from "../../utils/Button.jsx";

const selector = (id) => (store) => ({
  setDecay: (e) => {
    store.updateNode(id, { decay: +e });
  },
  setPreDelay: (e) => {
    store.updateNode(id, { preDelay: +e });
  },
  setWet: (e) => {
    store.updateNode(id, { wet: +e });
  },
  removeNode: store.removeNode,
});
const Reverb = ({ id, data }) => {
  const { setDecay, setPreDelay, setWet, removeNode } = useStore(selector(id), shallow);
  return (
    <div className="node reverb">
      <CustomHandle type={"target"} position={"top"} id={"a"} />
      <Button action={() => removeNode(id)} />
      <h3>Reverb</h3>
      <div className="reverb__container node__container">
        <div className="knobs">
          <Input
            value={data.decay}
            setValue={setDecay}
            label={"Decay"}
            min={0.1}
            max={10}
            step={0.1}
          />
          <Input
            value={data.preDelay}
            setValue={setPreDelay}
            label={"Pre-delay"}
            min={0}
            max={2}
            step={0.01}
          />
          <Input
            value={data.wet}
            setValue={setWet}
            label={"Wet"}
            min={0}
            max={1}
            step={0.01}
          />
        </div>
      </div>
      <CustomHandle type={"source"} position={"bottom"} id={"b"} />
    </div>
  );
};

export default Reverb;
