import { Handle } from "reactflow"
import { shallow } from "zustand/shallow"

import { useStore } from "../../../store/Store.js"

const selector = (id) => (store) => ({
    setGain: (e) => store.updateNode(id, { gain: e.target.value }),
})

const GainNode = ({ id, data }) => {
    const { setGain } = useStore(selector(id), shallow)
    return (
        <div className='node gainnode'>
            <Handle
                type="target"
                position="top"
            />
            <div>
                <label>Gain</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    className="nodrag"
                    value={data.gain || 0.5}
                    onChange={setGain}
                />
            </div>
            <Handle
                type="source"
                position="bottom"
            />
        </div>
    )
}

export default GainNode