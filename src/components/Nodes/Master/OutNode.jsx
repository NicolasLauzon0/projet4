import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";

import { useStore } from "../../../store/Store.js";

const selector = (store) => ({
  isRunning: store.isRunning,
  toggleVolume: () => store.toggleVolume(),
});

const Out = ({ id, data }) => {
  const { isRunning, toggleVolume } = useStore(selector, shallow);

  return (
    <div className="node out">
      <Handle type="target" position="top" id="0" />
      <div>
        <p>Sortie</p>

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
