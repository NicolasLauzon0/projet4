import { Handle } from "reactflow"
import { shallow } from "zustand/shallow"

import { useStore } from "../../../store/Store.js"

const selector = (store) => ({
    isRunning: store.isRunning,
    toggleVolume: () => store.toggleVolume(),
})

const Out = ({ id, data }) => {
    const { isRunning, toggleVolume } = useStore(selector, shallow)

    return (
        <div>
            <Handle type="target" position="top" />
            <div>
                <p>Output Node</p>

                <button onClick={toggleVolume}>
                    {!isRunning ? (
                        <span role="img" aria-label="mute">
                            🔇
                        </span>
                    ) : (
                        <span role="img" aria-label="unmute">
                            🔈
                        </span>
                    )}
                </button>
            </div>
        </div>
    )
}

export default Out