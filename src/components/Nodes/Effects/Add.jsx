import { Handle } from "reactflow";
import CustomHandle from "../../Handle/CustomHandle";

const Add = () => {
  return (
    <div className="node add">
      <CustomHandle type={"target"} position={"top"} id={"a"} isConnectable={3} />
      <CustomHandle type={"target"} position={"top"} id={"b"} isConnectable={3} />
      <div className="add__container">
        <h3>Addition</h3>
      </div>
      <CustomHandle type={"source"} position={"bottom"} id={"c"} isConnectable={3} />
    </div>
  );
};

export default Add;
