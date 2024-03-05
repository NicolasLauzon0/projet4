import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";
import Input from "../Input.jsx";
import RadioInputs from "../../RadioInputs.jsx";
import ModulationSection from "../ModulationSection.jsx";
import svgs from "../../../assets/img/svg/svg.jsx";

const selector = (id, data) => (store) => ({
  setEnvelope: (type, value) => {
    store.updateNode(id, {
      envelope: { [type]: +value },
    });
  },
  setOscilatorType: (e) => {
    console.log(e);
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
  setHarmonicity: (e) => {
    store.updateNode(id, { harmonicity: +e });
  },
  setDetune: (e) => {
    store.updateNode(id, { detune: +e });
  },
});

const AMSynth = ({ id, data }) => {
  const {
    setOscilatorType,
    setEnvelope,
    setModulationEnvelope,
    setModulationType,
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
            <ModulationSection
              envelope={data.envelope}
              setEnvelope={setEnvelope}
            />
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

            <ModulationSection
              envelope={data.modulationEnvelope}
              setEnvelope={setModulationEnvelope}
            />
          </section>
        </div>
        <div className="side right">
          <div className="knobs">
            <Input
              value={data.harmonicity}
              setValue={setHarmonicity}
              label={"Harmonicity"}
              min={0.1}
              max={10}
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
