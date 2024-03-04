import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";

import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";

const selector = (store) => ({
  isRunning: store.isRunning,
  toggleVolume: () => store.toggleVolume(),
});

const Out = ({ id, data }) => {
  const { isRunning, toggleVolume } = useStore(selector, shallow);

  return (
    <div className="node out">
      <CustomHandle type={"target"} position={"top"} id={"1"} nodeType={"out"} />
      <div>
        <h4>Sortie</h4>

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
