import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";
import DropDownMenu from "../DropDownMenu.jsx";
import Input from "../Input.jsx";
import Button from "../Button.jsx";

const selector = (id) => (store) => ({
  setAttack: (e) => {
    store.updateNode(id, { attack: +e });
  },
  setUrl: (e) => {
    store.updateNode(id, { selected: e });
  },
  removeNode: store.removeNode,
});

const Sampler = ({ id, data }) => {
  const { setAttack, setUrl, removeNode } = useStore(selector(id), shallow);

  return (
    <div className="node sampler">
      <CustomHandle type={"target"} position={"top"} id={"a"} />
      <Button action={() => removeNode(id)} />
      <h3>Sampler</h3>
      <div className="sampler__container node__container">
        <DropDownMenu
          options={data.urls}
          selected={data.selected}
          setSelected={setUrl}
        />
        <Input
          value={data.attack}
          setValue={setAttack}
          label={"Attack"}
          min={0.1}
          max={0.99}
          step={0.01}
        />
      </div>
      <CustomHandle type={"source"} position={"bottom"} id={"b"} />
    </div>
  );
};

export default Sampler;
