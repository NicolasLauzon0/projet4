import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";
import Input from "../Input.jsx";
import Button from "../Button.jsx";

const selector = (id) => (store) => ({
  setDelayTime: (e) => {
    store.updateNode(id, { delayTime: +e });
  },
  setFeedback: (e) => {
    store.updateNode(id, { feedback: +e});
  },
  setMaxDelay: (e) => {
    store.updateNode(id, { maxDelay: +e});
  },
  setWet: (e) => {
    store.updateNode(id, { wet: +e });
  },
  removeNode: store.removeNode,
});
const FeedBackDelay = ({ id, data }) => {
  const { setDelayTime, setFeedback, setMaxDelay, setWet, removeNode } = useStore(
    selector(id),
    shallow
  );
  return (
    <div className="node feedbackDelay">
      <CustomHandle type={"target"} position={"top"} id={"a"} />
      <Button action={() => removeNode(id)} />
      <h3>Delay</h3>
      <div className="feedbackDelay__container node__container">
        <div className="knobs">
          <Input
            value={data.delayTime}
            setValue={setDelayTime}
            label={"Delay Time"}
            min={0.1}
            max={2}
            step={0.01}
          />
          <Input
            value={data.feedback}
            setValue={setFeedback}
            label={"Feedback"}
            min={0.1}
            max={1}
            step={0.01}
          />
          <Input
            value={data.maxDelay}
            setValue={setMaxDelay}
            label={"Max Delay"}
            min={0}
            max={4}
            step={0.1}
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

export default FeedBackDelay;
