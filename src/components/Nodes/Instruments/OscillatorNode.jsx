import React from "react";

const OscillatorNode = ({ id, data }) => {
  return (
    <div className="Node">
      <div className="oscillator__container">
        <div className="oscillator__container__header">
          <h3>Oscillator</h3>
          <span>Frequency</span>
        </div>
      </div>
    </div>
  );
};

export default OscillatorNode;
