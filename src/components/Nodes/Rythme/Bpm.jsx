import { useState } from "react";
import * as Tone from "tone";

const Bpm = () => {
  const [bpm, setBpm] = useState(120);

  const handleBpmChange = (e) => {
    if (e.target.value > 300) {
      e.target.value = 300;
    }
    setBpm(e.target.value);
    Tone.Transport.bpm.value = e.target.value;
  };
  return (
    <div className="node bpm">
      <div className="bpm__container">
        <h4>BPM/Tempo</h4>
        <div className="knobs">
          <div className="knob">
            <label>BPM</label>
            <input
              type="number"
              value={bpm}
              onChange={handleBpmChange}
              min="40"
              max="300"
              step="1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bpm;
