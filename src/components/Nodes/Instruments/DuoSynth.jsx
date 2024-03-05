import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import CustomHandle from "../../Handle/CustomHandle.jsx";
import Input from "../Input.jsx";
import RadioInputs from "../../RadioInputs.jsx";
import svgs from "../../../assets/img/svg/svg.jsx";
import ModulationSection from "../ModulationSection.jsx";

const selector = (id) => (store) => ({
  setVibratoAmount: (value) => {
    store.updateNode(id, {vibratoAmount: +value,
    });
  },
  setVibratoRate: (value) => {
    store.updateNode(id, { vibratoRate: +value });
  },
  setHarmonicity: (value) => {
    store.updateNode(id, {  harmonicity: +value });
  },
  setVoice0Portamento: (value) => {
    store.updateNode(id, { voice0: { voice0, portamento: +value },
    });
  },
  setVoice0OscillatorType: (e) => {
    store.updateNode(id, {
      voice0: { oscillator: { type: e } },
    });
  },
  setVoice0FilterEnvelope: (type, value) => {
    store.updateNode(id, {
      voice0: { filterEnvelope: { [type]: +value },
      },
    });
  },
  setVoice0Envelope: (type, value) => {
    store.updateNode(id, {
      voice0: {envelope: {[type]: +value },
      },
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
    setVoice1Portamento,
    setVoice1OscillatorType,
    setVoice1FilterEnvelopeAttack,
    setVoice1FilterEnvelopeDecay,
    setVoice1FilterEnvelopeSustain,
    setVoice1FilterEnvelopeRelease,
    setVoice1EnvelopeAttack,
    setVoice1EnvelopeDecay,
    setVoice1EnvelopeSustain,
    setVoice1EnvelopeRelease,
  } = useStore(selector(id, data), shallow);
  console.log(data.voice0.filterEnvelope);
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
                selected={data.voice0.oscillator?.type}
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

        <div className="voice1">
          <h4>Voice 1</h4>
          <label>
            Portamento
            <input
              type="range"
              min="0.1"
              max="0.99"
              step="0.01"
              value={data.voice1.portamento}
              onChange={setVoice1Portamento}
              className="nodrag"
            />
          </label>
          <label>
            Type
            <select
              value={data.voice1.oscillator.type}
              onChange={setVoice1OscillatorType}
            >
              <option value="sine">Sine</option>
              <option value="triangle">Triangle</option>
              <option value="square">Square</option>
              <option value="sawtooth">Sawtooth</option>
            </select>
          </label>
          <label>
            Attack
            <input
              type="range"
              min="0.1"
              max="0.99"
              step="0.01"
              value={data.voice1.filterEnvelope.attack}
              onChange={setVoice1FilterEnvelopeAttack}
              className="nodrag"
            />
          </label>
          <label>
            Decay
            <input
              type="range"
              min="0.1"
              max="0.99"
              step="0.01"
              value={data.voice1.filterEnvelope.decay}
              onChange={setVoice1FilterEnvelopeDecay}
              className="nodrag"
            />
          </label>
          <label>
            Sustain
            <input
              type="range"
              min="0.1"
              max="0.99"
              step="0.01"
              value={data.voice1.filterEnvelope.sustain}
              onChange={setVoice1FilterEnvelopeSustain}
              className="nodrag"
            />
          </label>
          <label>
            Release
            <input
              type="range"
              min="0.1"
              max="0.99"
              step="0.01"
              value={data.voice1.filterEnvelope.release}
              onChange={setVoice1FilterEnvelopeRelease}
              className="nodrag"
            />
          </label>
          <label>
            Attack
            <input
              type="range"
              min="0.1"
              max="0.99"
              step="0.01"
              value={data.voice1.envelope.attack}
              onChange={setVoice1EnvelopeAttack}
              className="nodrag"
            />
          </label>
          <label>
            Decay
            <input
              type="range"
              min="0.1"
              max="0.99"
              step="0.01"
              value={data.voice1.envelope.decay}
              onChange={setVoice1EnvelopeDecay}
              className="nodrag"
            />
          </label>
          <label>
            Sustain
            <input
              type="range"
              min="0.1"
              max="0.99"
              step="0.01"
              value={data.voice1.envelope.sustain}
              onChange={setVoice1EnvelopeSustain}
              className="nodrag"
            />
          </label>
          <label>
            Release
            <input
              type="range"
              min="0.1"
              max="0.99"
              step="0.01"
              value={data.voice1.envelope.release}
              onChange={setVoice1EnvelopeRelease}
              className="nodrag"
            />
          </label>
        </div>
      </div>
      <CustomHandle type={"source"} position={"bottom"} id={"b"} />
    </div>
  );
};

export default DuoSynth;
