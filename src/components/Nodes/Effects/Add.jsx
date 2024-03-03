import { Handle } from "reactflow";

const Add = () => {
  return (
    <div className="node add">
      <Handle type="target" position="top" id="a" />
      <Handle type="target" position="left" id="c" />
      <div className="add__container">
        <h3>Addition</h3>
      </div>
      <Handle type="source" position="bottom" id="b" />
    </div>
  );
};

export default Add;
