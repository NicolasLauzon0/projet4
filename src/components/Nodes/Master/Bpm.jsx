import React from "react";

const Bpm = () => {
  return (
    <div className="node bpm">
      <div className="bpm__container">
        <h3>BPM</h3>
        <div className="knobs">
          <div className="knob">
            <label>BPM</label>
            <input
              type="range"
              min="60"
              max="240"
              step="1"
              className="nodrag"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bpm;
