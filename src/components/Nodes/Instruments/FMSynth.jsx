import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";
import Input from "../Input.jsx";
import RadioInputs from "../../RadioInputs.jsx";
import svgs from "../../../assets/img/svg/svg.jsx";
import ModulationSection from "../ModulationSection.jsx";

const selector = (id, data) => (store) => ({
  setHarmonicity: (e) => {
    store.updateNode(id, { harmonicity: +e.target.value });
  },
  setModulationIndex: (e) => {
    store.updateNode(id, { modulationIndex: +e.target.value });
  },
  setDetune: (e) => {
    store.updateNode(id, { detune: +e.target.value });
  },
  setEnvelope: (type, value) => {
    store.updateNode(id, {
      envelope: { [type]: +value },
    });
  },
  setOscilatorType: (e) => {
    store.updateNode(id, {
      oscillator: {
        type: e,
      },
    });
  },
  setModulationType: (e) => {
    store.updateNode(id, {
      modulation: {
        type: e,
      },
    });
  },
  setModulationEnvelope: (type, value) => {
    store.updateNode(id, {
      envelope: { [type]: +value },
    });
  },

});
const FMSynth = ({ id, data }) => {
  const {
    setHarmonicity,
    setModulationIndex,
    setDetune,
    setEnvelope,
    setOscilatorType,
    setModulationType,
    setModulationEnvelope,
  } = useStore(selector(id, data), shallow);
  return (
    <div className="node fmSynth">
      <CustomHandle type={"target"} position={"top"} id={"a"} />
      <h3>FM Synth</h3>
      <div className="fmSynth__container node__container">
        <div className="side left">
          <section className="fmsynthoscilator envelopeSection">
            <div className="type">
              <h4>oscillator</h4>
              <RadioInputs options={svgs} selected={data.oscillator.type} setSelected={setOscilatorType} type={"svg"} />
            </div>
            <ModulationSection envelope={data.envelope} setEnvelope={setEnvelope} />
          </section>

          <section className="fmsynthmodulation envelopeSection">
            <div className="type">
              <h4>modulation</h4>
              <RadioInputs options={svgs} selected={data.modulation.type} setSelected={setModulationType} type={"svg"} />
            </div>
            <ModulationSection envelope={data.modulationEnvelope} setEnvelope={setModulationEnvelope} />
          </section>
        </div>
        <div className="side right">
          <div className="knobs">
            <Input value={data.harmonicity} setValue={setHarmonicity} label={"Harmonicity"} min={0.1} max={20} step={0.01} />
            <Input value={data.modulationIndex} setValue={setModulationIndex} label={"Index"} min={0.1} max={20} step={0.01} />
            <Input value={data.detune} setValue={setDetune} label={"Detune"} min={-3000} max={3000} step={0.01} />
          </div>
        </div>
      </div>
      <CustomHandle type={"source"} position={"bottom"} id={"b"} />
    </div>
  );
};

export default FMSynth;
