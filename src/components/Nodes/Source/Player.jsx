import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";

const selector = (id) => (store) => ({
    setGain: (e) => store.updateNode(id, { gain: e.target.value }),
    setLoop: (e) => store.updateNode(id, { loop: e.target.checked }),
    play: () => store.play(id),
})

const Player = ({id,data}) => {

    const { setGain, setLoop, play } = useStore(selector(id), shallow)
    return (
        <div className="node player">
            <Handle type="target" position="top" id="a"/>
            <div className="player__container">
                <h3>Player</h3>
                <div className="player__grid">
                    <div>
                        <label>Gain</label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            className="nodrag"
                            value={data.gain}
                            onChange={setGain}
                        />
                    </div>
                    <button onClick = {play}>Play</button>
                    <div>
                        <label>Loop</label>
                        <input
                            type="checkbox"
                            value={data.loop}
                            onChange={setLoop}
                        />
                    </div>
                </div>
            </div>
            <Handle type="source" position="bottom" id="b"/>
        </div>
    )
}

export default Player