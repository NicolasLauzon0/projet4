import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import { Tone } from "tone/build/esm/core/Tone.js";
import { useEffect, useMemo } from "react";

const selector = (id, data) => (store) => ({
  setRows: (e) => store.updateNode(id, { rows: e.target.value }),
  setColumns: (e) => store.updateNode(id, { cols: e.target.value }),
  setNotes: (e) => store.updateNode(id, { notes: e }),
});

const Sequencer = ({ id, data }) => {
  const { setRows, setColumns, setNotes } = useStore(selector(id), shallow);

  const notes = useMemo(() => {
    const notes = [];
    for (let i = 0; i < data.rows; i++) {
      notes[i] = [];
      for (let j = 0; j < data.cols; j++) {
        notes[i][j] = false;
      }
    }
    return notes;
  }, [data.rows, data.cols]);

  console.log(notes);
  useEffect(() => {
    setNotes(notes);
  }, []);

  return (
    <div className="node sequencer">
      <div className="sequencer__container">
        <div className="sequencer__controls">
          <label>
            Rows
            <input type="number" value={data.rows} onChange={setRows} min={1} />
          </label>
          <label>
            Columns
            <input
              type="number"
              value={data.cols}
              onChange={setColumns}
              min={2}
            />
          </label>
        </div>
        <h3>Sequencer</h3>
        <div className="sequencer__grid">
          {Array.from({ length: data.rows }).map((_, rowId) => (
            <div className="row" key={rowId}>
              {Array.from({ length: data.cols }).map((_, colId) => {
                const ids = rowId + "-" + colId;
                return (
                  <div className="cell" key={ids}>
                    <label key={ids}>
                      <input
                        type="checkbox"
                        id={ids}
                        checked={notes[rowId][colId]}
                        onChange={(e) => {
                          notes[rowId][colId] = e.target.checked;
                          setNotes(notes);
                        }}
                      />
                    </label>
                  </div>
                );
              })}
              <Handle type="source" position="right" id={rowId + ""} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sequencer;
