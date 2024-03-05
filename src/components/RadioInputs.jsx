import React, { useCallback, useState } from "react";

const RadioInputs = ({
  options = [],
  selected,
  setSelected,
  type = "label",
}) => {
  const [selectedS, setSelectedS] = useState();

  const handleSelect = (e) => {
    setSelectedS(e.target.value);
    setSelected(selectedS);

    console.log(e.target.value);
  };
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
              checked={selectedS === option.value}
              onChange={(e) => handleSelect(e)}
            />
          </label>
        ))}
      </fieldset>
    </div>
  );
};

export default RadioInputs;
