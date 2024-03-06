import { useState } from "react";
import * as Tone from "tone";
import Input from "../Input";
import Button from "../Button";
import { useStore } from "../../../store/Store.js";
import { shallow } from "zustand/shallow";

const selector = (store) => ({
  removeNode: store.removeNode,
});

const Bpm = ({ id }) => {
  const { removeNode } = useStore(selector, shallow);
  const [bpm, setBpm] = useState(120);

  const handleBpmChange = (e) => {
    if (e > 300) {
      e = 300;
    }
    setBpm(e);
    Tone.Transport.bpm.value = e;
  };
  return (
    <div className="node bpm">
      <h3>BPM</h3>
        <Button action={() => removeNode(id)} />
      <div className="bpm__container node__container">
        <div className="knobs">
          <Input
            value={bpm}
            setValue={handleBpmChange}
            label={"BPM"}
            min={60}
            max={300}
            step={1}
          />
        </div>
      </div>
    </div>
  );
};

export default Bpm;
