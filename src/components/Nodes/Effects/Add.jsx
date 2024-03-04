import { Handle } from "reactflow";
import CustomHandle from "../../Handle/CustomHandle";

const Add = () => {
  return (
    <div className="node add">
      <CustomHandle type={"target"} position={"top"} id={"a"}  />
      <CustomHandle type={"target"} position={"left"} id={"b"} />
      <div className="add__container">
        <h3>Addition</h3>
      </div>
      <CustomHandle type={"source"} position={"bottom"} id={"c"}  />
    </div>
  );
};

export default Add;
