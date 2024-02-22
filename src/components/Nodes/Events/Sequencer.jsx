import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import { useState } from "react";
import { Tone } from "tone/build/esm/core/Tone.js";



const Sequencer = ({ id, data }) => {


    return (
        <div className="node sequencer">
            <div className="sequencer__container">
                <h3>Sequencer</h3>
                <div className="sequencer__grid">

                </div>

            </div>
            <Handle type="source" position="bottom" />
        </div>
    );
}

export default Sequencer;
