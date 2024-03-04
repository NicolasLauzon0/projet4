import React from "react";

const RadioInputs = ({
  options = [],
  selected,
  setSelected,
  type = "label",
}) => {
  return (
    <div className="radio-inputs">
      <fieldset className="nodrag">
        {options.map((option, index) => (
          <label key={option.value + index}>
            {type === "label"
              ? option.text
              : type === "svg"
              ? option.svg
              : option.text}
            <input
              type="radio"
              value={option.value}
              checked={selected === option.value}
              onChange={(e) => setSelected(e.target.value)}
            />
          </label>
        ))}
      </fieldset>
    </div>
  );
};

export default RadioInputs;
