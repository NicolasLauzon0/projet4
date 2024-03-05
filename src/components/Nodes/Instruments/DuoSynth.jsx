import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";
import Input from "../Input.jsx";
import RadioInputs from "../../RadioInputs.jsx";
import svgs from "../../../assets/img/svg/svg.jsx";
import ModulationSection from "../ModulationSection.jsx";

const selector = (id, data) => (store) => ({
  setVibratoAmount: (value) => {
    store.updateNode(id, { vibratoAmount: +value });
  },
  setVibratoRate: (value) => {
    store.updateNode(id, { vibratoRate: +value });
  },
  setHarmonicity: (value) => {
    store.updateNode(id, { harmonicity: +value });
  },
  setVoice0Portamento: (value) => {
    store.updateNode(id, { voice0: { voice0, portamento: +value } });
  },
  setVoice0OscillatorType: (e) => {
    store.updateNode(id, {
      voice0: { oscillator: { type: e } },
    });
  },
  setVoice0FilterEnvelope: (type, value) => {
    store.updateNode(id, {
      voice0: {
        filterEnvelope: { [type]: +value },
      },
    });
  },
  setVoice0Envelope: (type, value) => {
    store.updateNode(id, {
      voice0: { envelope: { [type]: +value } },
    });
  },
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
  } = useStore(selector(id, data), shallow);
  return (
    <div className="node duoSynth">
      <CustomHandle type={"target"} position={"top"} id={"a"} />
      <h3>Synthétiseur Duo</h3>
      <div className="duoSynth__container node__container">
        <div className="duoSynth__controls">
          <Input
            min={0.1}
            max={0.99}
            step={0.01}
            value={data.vibratoAmount}
            setValue={setVibratoAmount}
            label={"Taux de vibrato"}
          />
          <Input
            min={0.1}
            max={2000}
            step={0.01}
            value={data.vibratoRate}
            setValue={setVibratoRate}
            label={"Amplitude de vibrato"}
          />

          <Input
            min={0.1}
            max={20}
            step={0.01}
            value={data.harmonicity}
            setValue={setHarmonicity}
            label={"Harmonicité"}
          />
        </div>

        <div className="voice0">
          <section className="envelopeSection">
            <div className="type">
              <h4>Voice 0</h4>
              <RadioInputs
                options={svgs}
                selected={data.voice0.oscillator.type}
                setSelected={setVoice0OscillatorType}
                type={"svg"}
                label={"Type d'oscillateur"}
              />
            </div>

            <ModulationSection
              envelope={data.voice0.filterEnvelope}
              setEnvelope={setVoice0FilterEnvelope}
            />
            <Input
              min={0.1}
              max={2}
              step={0.01}
              value={data.voice0.portamento}
              setValue={setVoice0Portamento}
              label={"Portamento"}
            />
          </section>
          <section className="envelopeSection">
            <ModulationSection
              envelope={data.voice0.envelope}
              setEnvelope={setVoice0Envelope}
            />
          </section>
        </div>
      </div>
      <CustomHandle type={"source"} position={"bottom"} id={"b"} />
    </div>
  );
};

export default DuoSynth;
