import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";

import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";
import Button from "../Button.jsx";

const selector = (store) => ({
  isRunning: store.isRunning,
  toggleVolume: () => store.toggleVolume(),
  removeNode: store.removeNode,
});

const Out = ({ id, data }) => {
  const { isRunning, toggleVolume, removeNode } = useStore(selector, shallow);

  return (
    <div className="node out">
      <CustomHandle
        type={"target"}
        position={"top"}
        id={"1"}
        nodeType={"out"}
      />
      <div className="out__container node__container">
        <Button action={() => removeNode(id)} />
        <h3>Output</h3>
        <button onClick={toggleVolume}>
          {!isRunning ? (
            <span role="img" aria-label="mute">
              🔇
            </span>
          ) : (
            <span role="img" aria-label="unmute">
              🔈
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Out;
