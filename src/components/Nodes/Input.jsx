import { useCallback, useEffect, useRef, useState } from "react";

const Input = ({ value, setValue, label, min, max, step }) => {
  const knob = useRef(null);
  const [valueToshow, setValueToshow] = useState(value);

  const calculateDeg = (e) => {
    const knobRect = knob.current.getBoundingClientRect();
    const x = e.clientX - knobRect.left - knobRect.width / 2;
    const y = e.clientY - knobRect.top - knobRect.height / 2;
    const deg = Math.atan2(y, x) * (180 / Math.PI);
    return deg;
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const deg = calculateDeg(e) - 135;
      let newValue = degToValue(deg);
      if (deg <= 0 && deg >= -45) {
        newValue = min;
      } else if (deg >= -90 && deg < -45) {
        newValue = max;
      } else {
        knob.current.style.transform = `rotate(${deg - 135}deg)`;
      }

      setValue(newValue.toFixed(2));
      setValueToshow(newValue.toFixed(1));
    };

    const handleMouseDown = (e) => {
      if (knob.current && knob.current.contains(e.target)) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const degToValue = (deg) => {
      const range = max - min;
      let normalizedDeg = (deg + 360) % 360;
      if (normalizedDeg >= 270) {
        normalizedDeg -= 360;
      }
      const valueInRange = (normalizedDeg / 270) * range + min;
      const newValue = Math.round(valueInRange / step) * step;
      return Math.min(max, Math.max(min, newValue));
    };

    if (knob.current) {
      knob.current.addEventListener("mousedown", handleMouseDown);
    }

    return () => {
      if (knob.current) {
        knob.current.removeEventListener("mousedown", handleMouseDown);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  return (
    <div className="slider nodrag">
      <div className="infoknob">
        <label>{label}</label>
        <span>{valueToshow}</span>
      </div>
      <div className="knob" ref={knob}></div>
    </div>
  );
};

export default Input;
