import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";
import RadioInputs from "../RadioInputs.jsx";
import svgs from "../../../assets/img/svg/svg.jsx";
import Input from "../Input.jsx";
import Button from "../Button.jsx";

const selector = (id) => (store) => ({
  setDelayTime: (e) => {
    store.updateNode(id, { delayTime: +e });
  },
  setDepth: (e) => {
    store.updateNode(id, { depth: +e });
  },
  setFeedback: (e) => {
    store.updateNode(id, { feedback: +e });
  },
  setFrequency: (e) => {
    store.updateNode(id, { frequency: +e });
  },
  setSpread: (e) => {
    store.updateNode(id, { spread: +e });
  },
  setType: (e) => {
    store.updateNode(id, { type: e });
  },
  setWet: (e) => {
    store.updateNode(id, { wet: +e });
  },
  removeNode: store.removeNode,
});

const Chorus = ({ id, data }) => {
  const {
    setDelayTime,
    setDepth,
    setFeedback,
    setFrequency,
    setSpread,
    setType,
    setWet,
    removeNode,
  } = useStore(selector(id), shallow);

  return (
    <div className="node chorus">
      <CustomHandle type={"target"} position={"top"} id={"a"} />
      <Button action={() => removeNode(id)} />
      <h3>Chorus</h3>
      <div className="chorus__container node__container">
        <section className="chorus envelopeSection">
          <div className="type">
            <h4>Oscillator</h4>
            <RadioInputs
              name={"oscillator"}
              options={svgs}
              selected={data.type}
              setSelected={setType}
              type={"svg"}
            />
          </div>
          <div className="knobs">
            <Input
              value={data.delayTime}
              setValue={setDelayTime}
              label={"Delay Time"}
              min={0}
              max={7}
              step={0.1}
            />
            <Input
              value={data.depth}
              setValue={setDepth}
              label={"Depth"}
              min={0}
              max={1}
              step={0.01}
            />
            <Input
              value={data.feedback}
              setValue={setFeedback}
              label={"Feedback"}
              min={0}
              max={1}
              step={0.01}
            />
            <Input
              value={data.frequency}
              setValue={setFrequency}
              label={"Frequency"}
              min={0}
              max={200}
              step={0.01}
            />
            <Input
              value={data.spread}
              setValue={setSpread}
              label={"Spread"}
              min={0}
              max={180}
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
        </section>
      </div>
      <CustomHandle type={"source"} position={"bottom"} id={"b"} />
    </div>
  );
};

export default Chorus;
