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
  setPitch: (e) => {
    store.updateNode(id, { pitch: +e.target.value });
  },
  setWet: (e) => {
    store.updateNode(id, { wet: +e.target.value });
  },
});

const PitchShift = ({ id, data }) => {
  const { setDelayTime, setFeedback, setPitch, setWet } = useStore(
    selector(id),
    shallow
  );
  return (
    <div className="node pitchShift">
      <Handle type="target" position="top" id="a" />
      <div className="pitchShift__container">
        <h3>PitchShift</h3>
        <label>
          Pitch
          <input
            type="range"
            min="-12"
            max="12"
            step="1"
            value={data.pitch}
            onChange={setPitch}
            className="nodrag"
          />
        </label>
        <label>
          DelayTime
          <input
            type="range"
            min="0"
            max="1"
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
            min="0"
            max="1"
            step="0.01"
            value={data.feedback}
            onChange={setFeedback}
            className="nodrag"
          />
        </label>
        <label>
          Wet
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

export default PitchShift;
