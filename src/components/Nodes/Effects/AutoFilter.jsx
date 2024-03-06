import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";

import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";
import Input from "../Input.jsx";
import Button from "../Button.jsx";

const selector = (id, data) => (store) => ({
  setBaseFrequency: (e) => {
    store.updateNode(id, { baseFrequency: +e });
  },
  setDepth: (e) => {
    store.updateNode(id, { depth: +e });
  },
  setFrequency: (e) => {
    store.updateNode(id, { frequency: +e });
  },
  setOctaves: (e) => {
    store.updateNode(id, { octaves: +e });
  },
  setWet: (e) => {
    store.updateNode(id, { wet: +e });
  },
  removeNode: store.removeNode,
});

const Filtre = ({ id, data }) => {
  const { setBaseFrequency, setDepth, setFrequency, setOctaves, setWet, removeNode } =
    useStore(selector(id, data), shallow);

  return (
    <div className="node Filtre">
      <CustomHandle type={"target"} position={"top"} id={"a"} />
      <Button action={() => removeNode(id)} />
      <h3>AutoFilter</h3>
      <div className="Filtre__container node__container">
        <div className="knobs">
          <Input
            value={data.baseFrequency}
            setValue={setBaseFrequency}
            label={"Base Frequency"}
            min={0.1}
            max={400}
            step={1}
          />

          <Input
            value={data.depth}
            setValue={setDepth}
            label={"Depth"}
            min={0.1}
            max={1}
            step={0.01}
          />

          <Input
            value={data.frequency}
            setValue={setFrequency}
            label={"Frequency"}
            min={0}
            max={4000}
            step={0.01}
          />

          <Input
            value={data.octaves}
            setValue={setOctaves}
            label={"Octaves"}
            min={0}
            max={10}
            step={1}
          />

          <Input
            value={data.wet}
            setValue={setWet}
            label={"Wet"}
            min={0.1}
            max={0.9}
            step={0.01}
          />
        </div>
      </div>
      <CustomHandle type={"source"} position={"bottom"} id={"b"} />
    </div>
  );
};

export default Filtre;
