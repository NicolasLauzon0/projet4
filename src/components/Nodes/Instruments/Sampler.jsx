import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";
import DropDownMenu from "../../utils/DropDownMenu.jsx";
import Input from "../../utils/Input.jsx";
import Button from "../../utils/Button.jsx";
import Infobulle from "../../utils/Infobulle.jsx";

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
      <Infobulle titre="Sampler">
        <>
          This is a sampler. You can load a sound and play it with the sequencer.
        </>
      </Infobulle>
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
