import { useCallback, useState } from "react";
import Input from "./Input";

const ModulationSection = ({ envelope, setEnvelope }) => {
  const setEnvelopeS = useCallback(
    (key, value) => {
      setEnvelope(key, value);
    },
    [envelope, setEnvelope]
  );
  return (
    <div className="knobs">
      <Input
        value={envelope?.attack}
        setValue={(value) => setEnvelopeS("attack", value)}
        label={"Attack"}
        min={0.1}
        max={0.99}
        step={0.01}
      />
      <Input
        value={envelope?.decay}
        setValue={(value) => setEnvelopeS("decay", value)}
        label={"Decay"}
        min={0.1}
        max={0.99}
        step={0.01}
      />
      <Input
        value={envelope?.sustain}
        setValue={(value) => setEnvelopeS("sustain", value)}
        label={"Sustain"}
        min={0.1}
        max={0.99}
        step={0.01}
      />
      <Input
        value={envelope?.release}
        setValue={(value) => setEnvelopeS("release", value)}
        label={"Release"}
        min={0.1}
        max={0.99}
        step={0.01}
      />
    </div>
  );
};
export default ModulationSection;
