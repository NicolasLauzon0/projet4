import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";

const selector = (id) => (store) => ({
  setDelayTime: (e) => {
    store.updateNode(id, { delayTime: +e.target.value });
  },
  setFeedback: (e) => {
    store.updateNode(id, { feedback: +e.target.value });
  },
  setMaxDelay: (e) => {
    store.updateNode(id, { maxDelay: +e.target.value });
  },
  setWet: (e) => {
    store.updateNode(id, { wet: +e.target.value });
  },
});
const FeedBackDelay = ({ id, data }) => {
  const { setDelayTime, setFeedback, setMaxDelay, setWet } = useStore(
    selector(id),
    shallow
  );
  return (
    <div className="node feedbackDelay">
      <Handle type="target" position="top" id="a" />
      <div className="feedbackDelay__container">
        <h3>Delay</h3>
        <label>
          Durée du delay
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.01"
            value={data.delayTime}
            onChange={setDelayTime}
            className="nodrag"
          />
        </label>
        <label>
          Feedback
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.01"
            value={data.feedback}
            onChange={setFeedback}
            className="nodrag"
          />
        </label>
        <label>
          Delay maximum
          <input
            type="range"
            min="0"
            max="4"
            step="0.1"
            value={data.maxDelay}
            onChange={setMaxDelay}
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
      <Handle type="source" position="bottom" id="b" />
    </div>
  );
};

export default FeedBackDelay;
