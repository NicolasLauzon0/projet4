import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";
import Input from "../../utils/Input.jsx";
import Button from "../../utils/Button.jsx";
import Infobulle from "../../utils/Infobulle.jsx";

const selector = (id) => (store) => ({
  setOrder: (e) => {
    store.updateNode(id, { order: +e });
  },
  setWet: (e) => {
    store.updateNode(id, { wet: +e });
  },
  removeNode: store.removeNode,
});
const Cheby = ({ id, data }) => {
  const { setOrder, setWet, removeNode } = useStore(selector(id), shallow);
  return (
    <div className="node cheby">
      <CustomHandle type={"target"} position={"top"} id={"a"} />
      <Infobulle titre="Cheby">
        <>
          This is a Cheby effect. It is a waveshaper which is good for making different types of distortion sounds.
        </>
      </Infobulle>
      <Button action={() => removeNode(id)} />
      <h3>Cheby</h3>
      <div className="cheby__container node__container">
        <div className="knobs">
          <Input
            value={data.order}
            setValue={setOrder}
            label={"Order"}
            min={1}
            max={100}
            step={1}
          />
          <Input
            value={data.wet}
            setValue={setWet}
            label={"Wet"}
            min={0}
            max={1}
            step={0.01}
          />
        </div>
      </div>
      <CustomHandle type={"source"} position={"bottom"} id={"b"} />
    </div>
  );
};

export default Cheby;
