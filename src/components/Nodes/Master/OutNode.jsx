import { Handle } from "reactflow"
import { shallow } from "zustand/shallow"

import { useStore } from "../../../store/Store.js"

const selector = (store) => ({
    isRunning: store.isRunning,
    toggleAudio: () => store.toggleAudio(),
})

const Out = ({ id, data }) => {
    const { isRunning, toggleAudio } = useStore(selector, shallow)

    return (
        <div>
            <Handle type="target" position="top" />
            <div>
                <p>Output Node</p>

                <button onClick={toggleAudio}>
                    {isRunning ? (
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