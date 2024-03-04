import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";

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
      <CustomHandle type={"target"} position={"top"} id={"a"} isConnectable={2} />
      <div className="pitchShift__container">
        <h3>Moduleur de pitch</h3>
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
          Delay
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
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
      <CustomHandle type={"source"} position={"bottom"} id={"b"} isConnectable={2} />
    </div>
  );
};

export default PitchShift;
