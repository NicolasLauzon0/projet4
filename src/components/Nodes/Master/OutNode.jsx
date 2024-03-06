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
        <div className="muteUnmute">
          {!isRunning ? (
            <svg className="decalage"
              onClick={toggleVolume}
              width="145"
              height="145"
              viewBox="0 0 125 145"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M114.25 65.9623C118.917 68.6566 118.917 75.3923 114.25 78.0866L10.5 137.987C5.83334 140.681 6.66384e-06 137.313 6.89938e-06 131.924L1.2136e-05 12.1244C1.23716e-05 6.73575 5.83335 3.36787 10.5 6.06217L114.25 65.9623Z"
                fill="var(--vert)"
              />
            </svg>
          ) : (
            <svg
              onClick={toggleVolume}
              width="61"
              height="98"
              viewBox="0 0 61 98"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 10L10 88"
                stroke="var(--vert)"
                strokeWidth={20}
                strokeLinecap="round"
              />
              <path
                d="M51 10L51 88"
                stroke="var(--vert)"
                strokeWidth={20}
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default Out;
