import { Handle } from "reactflow";
import CustomHandle from "../../Handle/CustomHandle";
import Button from "../../utils/Button";
import { useStore } from "../../../store/Store";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  removeNode: store.removeNode,
});

const Add = ({ id }) => {
  const { removeNode } = useStore(selector(id), shallow);
  return (
    <div className="node add">
      <CustomHandle type={"target"}  id={"a"}  />
      <CustomHandle type={"target"}  id={"b"} />
      <div className="add__container node__container">
        <Button action={() => removeNode(id)} />
        <h3>Add</h3>
      </div>
      <CustomHandle type={"source"} position={"bottom"} id={"c"}  />
    </div>
  );
};

export default Add;
