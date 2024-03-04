import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";

import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";

const selector = (id) => (store) => ({
  setGain: (e) => store.updateNode(id, { gain: e.target.value }),
});

const GainNode = ({ id, data }) => {
  const { setGain } = useStore(selector(id), shallow);
  return (
    <div className="node gainnode">
      <CustomHandle
        type={"target"}
        position={"top"}
        id={"a"}
      />
      <div>
        <label>
          Gain/Volume
          <input
            type="range"
            min="0"
            max="2"
            step="0.01"
            className="nodrag"
            value={data.gain || 0.5}
            onChange={setGain}
          />
        </label>
      </div>
      <CustomHandle
        type={"source"}
        position={"bottom"}
        id={"b"}
      />
    </div>
  );
};

export default GainNode;
