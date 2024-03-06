import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";
import Input from "../../utils/Input.jsx";
import Button from "../../utils/Button.jsx";
import Infobulle from "../../utils/Infobulle.jsx";

const selector = (id) => (store) => ({
  setDelayTime: (e) => {
    store.updateNode(id, { delayTime: +e });
  },
  setFeedback: (e) => {
    store.updateNode(id, { feedback: +e });
  },
  setPitch: (e) => {
    store.updateNode(id, { pitch: +e });
  },
  setWet: (e) => {
    store.updateNode(id, { wet: +e });
  },
  removeNode: store.removeNode,
});

const PitchShift = ({ id, data }) => {
  const { setDelayTime, setFeedback, setPitch, setWet, removeNode } = useStore(
    selector(id),
    shallow
  );
  return (
    <div className="node pitchShift">
      <CustomHandle type={"target"} position={"top"} id={"a"} />
      <Infobulle titre="Pitch Shift">
        <>
          This is a pitch shift effect. It changes the pitch of the sound.
        </>
      </Infobulle>
      <Button action={() => removeNode(id)} />
      <h3>Pitch Shift</h3>
      <div className="pitchShift__container node__container">
        <div className="knobs">
          <Input
            value={data.pitch}
            setValue={setPitch}
            label={"Pitch"}
            min={-12}
            max={12}
            step={1}
          />
          <Input
            value={data.delayTime}
            setValue={setDelayTime}
            label={"Delay"}
            min={0}
            max={1}
            step={0.05}
          />
          <Input
            value={data.feedback}
            setValue={setFeedback}
            label={"Feedback"}
            min={0}
            max={1}
            step={0.01}
          />
          <Input
            value={data.wet}
            setValue={setWet}
            label={"Ratio"}
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

export default PitchShift;
