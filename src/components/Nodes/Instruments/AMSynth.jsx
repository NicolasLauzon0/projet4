import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";
import Input from "../Input.jsx";
import RadioInputs from "../../RadioInputs.jsx";

const selector = (id, data) => (store) => ({
  setOscilatorType: (value) => {
    store.updateNode(id, {
      oscillator: {
        ...data.oscillator,
        type: value,
      },
    });
  },
  setOscilatorAttack: (value) => {
    store.updateNode(id, {
      envelope: {
        ...data.envelope,
        attack: +value,
      },
    });
  },
  setOscilatorDecay: (value) => {
    store.updateNode(id, {
      envelope: {
        ...data.envelope,
        decay: +value,
      },
    });
  },
  setOscilatorSustain: (value) => {
    store.updateNode(id, {
      envelope: {
        ...data.envelope,
        sustain: +value,
      },
    });
  },
  setOscilatorRelease: (value) => {
    store.updateNode(id, {
      envelope: {
        ...data.envelope,
        release: +value,
      },
    });
  },
  setModulationType: (value) => {
    store.updateNode(id, {
      modulation: {
        ...data.modulation,
        type: value,
      },
    });
  },
  setModulationAttack: (value) => {
    store.updateNode(id, {
      modulationEnvelope: {
        ...data.modulationEnvelope,
        attack: +value,
      },
    });
  },
  setModulationDecay: (value) => {
    store.updateNode(id, {
      modulationEnvelope: {
        ...data.modulationEnvelope,
        decay: +value,
      },
    });
  },
  setModulationSustain: (value) => {
    store.updateNode(id, {
      modulationEnvelope: {
        ...data.modulationEnvelope,
        sustain: +value,
      },
    });
  },
  setModulationRelease: (value) => {
    store.updateNode(id, {
      modulationEnvelope: {
        ...data.modulationEnvelope,
        release: +value,
      },
    });
  },
  setHarmonicity: (value) => {
    store.updateNode(id, {
      ...data,
      harmonicity: +value,
    });
  },
  setDetune: (value) => {
    store.updateNode(id, {
      ...data,
      detune: +value,
    });
  },
});

const svgs = [
  {
    text: "Sine",
    value: "sine",
    svg: (
      <svg
        width="36"
        height="28"
        viewBox="0 0 36 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 27C10.1624 25.5585 11.0786 2.49636 17.4923 1.05496C23.9059 -0.386427 24.8221 27 34.9007 27"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    text: "Triangle",
    value: "triangle",
    svg: (
      <svg
        width="37"
        height="31"
        viewBox="0 0 37 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.11914 30L17.7556 2L35.6477 30"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    text: "Square",
    value: "square",
    svg: (
      <svg
        width="34"
        height="31"
        viewBox="0 0 34 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.35498 30V1H32.7446V30"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    text: "Sawtooth",
    value: "sawtooth",
    svg: (
      <svg
        width="38"
        height="33"
        viewBox="0 0 38 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 32V3L36.1563 32"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const AMSynth = ({ id, data }) => {
  const {
    setOscilatorType,
    setOscilatorAttack,
    setOscilatorDecay,
    setOscilatorSustain,
    setOscilatorRelease,
    setModulationType,
    setModulationAttack,
    setModulationDecay,
    setModulationSustain,
    setModulationRelease,
    setHarmonicity,
    setDetune,
  } = useStore(selector(id, data), shallow);

  return (
    <div className="node amsynthnode">
      <CustomHandle type={"target"} position={"top"} id={"a"} />
      <h3>Synthétiseur AM</h3>
      <div className="amsynthnode__container node__container">
        <div className="side left">
          <section className="amsynthoscilator envelopeSection">
            <div className="type">
              <h4>Occilateur</h4>
              <RadioInputs
                options={svgs}
                selected={data.oscillator.type}
                setSelected={setOscilatorType}
                type={"svg"}
              />
            </div>
            <div className="knobs">
              <Input
                value={data.envelope.attack}
                setValue={setOscilatorAttack}
                label={"Attack"}
                min={0.1}
                max={0.99}
                step={0.01}
              />
              <Input
                value={data.envelope.decay}
                setValue={setOscilatorDecay}
                label={"Decay"}
                min={0.1}
                max={0.99}
                step={0.01}
              />
              <Input
                value={data.envelope.sustain}
                setValue={setOscilatorSustain}
                label={"Sustain"}
                min={0.1}
                max={0.99}
                step={0.01}
              />
              <Input
                value={data.envelope.release}
                setValue={setOscilatorRelease}
                label={"Release"}
                min={0.1}
                max={0.99}
                step={0.01}
              />
            </div>
          </section>
          <section className="amsynthmodulation envelopeSection">
            <div className="type">
              <h4>Modulation</h4>
              <RadioInputs
                options={svgs}
                selected={data.modulation.type}
                setSelected={setModulationType}
                type={"svg"}
              />
            </div>
            <div className="knobs">
              <Input
                value={data.modulationEnvelope.attack}
                setValue={setModulationAttack}
                label={"Attack"}
                min={0.1}
                max={0.99}
                step={0.01}
              />
              <Input
                value={data.modulationEnvelope.decay}
                setValue={setModulationDecay}
                label={"Decay"}
                min={0.1}
                max={0.99}
                step={0.01}
              />
              <Input
                value={data.modulationEnvelope.sustain}
                setValue={setModulationSustain}
                label={"Sustain"}
                min={0.1}
                max={0.99}
                step={0.01}
              />
              <Input
                value={data.modulationEnvelope.release}
                setValue={setModulationRelease}
                label={"Release"}
                min={0.1}
                max={0.99}
                step={0.01}
              />
            </div>
          </section>
        </div>
        <div className="side right">
          <div className="knobs">
            <Input
              value={data.harmonicity}
              setValue={setHarmonicity}
              label={"Harmonicity"}
              min={0.1}
              max={0.99}
              step={0.01}
            />
            <Input
              value={data.detune}
              setValue={setDetune}
              label={"Detune"}
              min={-2000}
              max={2000}
              step={1}
            />
          </div>
        </div>
      </div>
      <CustomHandle type={"source"} position={"bottom"} id={"b"} />
    </div>
  );
};

export default AMSynth;
