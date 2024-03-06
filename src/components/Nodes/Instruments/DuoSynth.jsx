import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";
import Input from "../../utils/Input.jsx";
import RadioInputs from "../../utils/RadioInputs.jsx";
import svgs from "../../../assets/img/svg/svg.jsx";
import ModulationSection from "../../utils/ModulationSection.jsx";
import Button from "../../utils/Button.jsx";

const selector = (id, data) => (store) => ({
  setVibratoAmount: (value) => {
    store.updateNode(id, { ...data, vibratoAmount: +value });
  },
  setVibratoRate: (value) => {
    store.updateNode(id, { ...data, vibratoRate: +value });
  },
  setHarmonicity: (value) => {
    store.updateNode(id, { ...data, harmonicity: +value });
  },
  setVoice0Portamento: (value) => {
    store.updateNode(id, { voice0: { ...data.voice0, portamento: +value } });
  },
  setVoice0OscillatorType: (e) => {
    store.updateNode(id, {
      voice0: { ...data.voice0, oscillator: { ...data.oscillator, type: e } },
    });
  },
  setVoice0FilterEnvelope: (type, value) => {
    store.updateNode(id, {
      voice0: {
        ...data.voice0,
        filterEnvelope: {
          ...data.voice0.filterEnvelope,
          [type]: +value,
        },
      },
    });
  },
  setVoice0Envelope: (type, value) => {
    store.updateNode(id, {
      voice0: {
        ...data.voice0,
        envelope: {
          ...data.voice0.envelope,
          [type]: +value,
        },
      },
    });
  },
  setVoice1Portamento: (value) => {
    store.updateNode(id, { voice1: { ...data.voice1, portamento: +value } });
  },
  setVoice1OscillatorType: (e) => {
    store.updateNode(id, {
      voice1: { ...data.voice1, oscillator: { ...data.oscillator, type: e } },
    });
  },
  setVoice1FilterEnvelope: (type, value) => {
    store.updateNode(id, {
      voice1: {
        ...data.voice1,
        filterEnvelope: {
          ...data.voice1.filterEnvelope,
          [type]: +value,
        },
      },
    });
  },
  setVoice1Envelope: (type, value) => {
    store.updateNode(id, {
      voice1: {
        ...data.voice1,
        envelope: {
          ...data.voice1.envelope,
          [type]: +value,
        },
      },
    });
  },
  removeNode: store.removeNode,
});

const DuoSynth = ({ id, data }) => {
  const {
    setVibratoAmount,
    setVibratoRate,
    setHarmonicity,
    setVoice0Portamento,
    setVoice0OscillatorType,
    setVoice0FilterEnvelope,
    setVoice0Envelope,
    setVoice1Portamento,
    setVoice1OscillatorType,
    setVoice1FilterEnvelope,
    setVoice1Envelope,
    removeNode,
  } = useStore(selector(id, data), shallow);
  return (
    <div className="node duoSynth">
      <CustomHandle type={"target"} position={"top"} id={"a"} />
      <Button action={() => removeNode(id)} />
      <h3>Duo Synth</h3>
      <div className="duoSynth__container node__container">
        <div className="duoSynth__controls global__controls">
          <h4>Global</h4>
          <div className="knobs">
            <Input
              min={0.1}
              max={0.99}
              step={0.01}
              value={data.vibratoAmount}
              setValue={setVibratoAmount}
              label={"Vibrato Amount"}
            />
            <Input
              min={0.1}
              max={2000}
              step={0.01}
              value={data.vibratoRate}
              setValue={setVibratoRate}
              label={"Vibrato Rate"}
            />

            <Input
              min={0.1}
              max={20}
              step={0.01}
              value={data.harmonicity}
              setValue={setHarmonicity}
              label={"Harmonicity"}
            />
          </div>
        </div>
        <section className="voices">
          <div className="voice0">
            <section className="envelopeSection">
              <div className="type">
                <h4>Voice 0</h4>
                <RadioInputs
                  options={svgs}
                  selected={data.voice0.oscillator.type}
                  setSelected={setVoice0OscillatorType}
                  type={"svg"}
                  label={"Oscillator"}
                />
              </div>
              <div className="envelopes">
                <div className="left side">
                  <h4>Filter Envelope</h4>
                  <ModulationSection
                    envelope={data.voice0.filterEnvelope}
                    setEnvelope={setVoice0FilterEnvelope}
                  >
                    <Input
                      min={0.1}
                      max={2}
                      step={0.01}
                      value={data.voice0.portamento}
                      setValue={setVoice0Portamento}
                      label={"Portamento"}
                    />
                  </ModulationSection>
                </div>
                <div className="right side">
                  <h4>Envelope</h4>
                  <ModulationSection
                    envelope={data.voice0.envelope}
                    setEnvelope={setVoice0Envelope}
                  />
                </div>
              </div>
            </section>
          </div>
          <div className="voice1">
            <section className="envelopeSection">
              <div className="type">
                <h4>Voice 1</h4>
                <RadioInputs
                  options={svgs}
                  selected={data.voice1.oscillator.type}
                  setSelected={setVoice1OscillatorType}
                  type={"svg"}
                  label={"Oscillator"}
                />
              </div>
              <div className="envelopes">
                <div className="left side">
                  <h4>Filter Envelope</h4>
                  <ModulationSection
                    envelope={data.voice1.filterEnvelope}
                    setEnvelope={setVoice1FilterEnvelope}
                  >
                    <Input
                      min={0.1}
                      max={2}
                      step={0.01}
                      value={data.voice1.portamento}
                      setValue={setVoice1Portamento}
                      label={"Portamento"}
                    />
                  </ModulationSection>
                </div>
                <div className="right side">
                  <h4>Envelope</h4>
                  <ModulationSection
                    envelope={data.voice1.envelope}
                    setEnvelope={setVoice1Envelope}
                  />
                </div>
              </div>
            </section>

          </div>
        </section>
      </div>
      <CustomHandle type={"source"} position={"bottom"} id={"b"} />
    </div>
  );
};

export default DuoSynth;
