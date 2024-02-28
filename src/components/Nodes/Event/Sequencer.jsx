import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import { useEffect, useRef } from "react";
import { nodes } from "../../../Audio.js";

const selector = (id, data) => (store) => ({
  setRows: (e) => {
    const newRows = parseInt(e.target.value);
    if (newRows < 1) return;
    const { cols } = data;
    const notes = [];

    // Construire un nouveau tableau de notes avec les nouvelles lignes
    for (let i = 0; i < newRows; i++) {
      notes[i] = [];
      for (let j = 0; j < cols; j++) {
        notes[i][j] = data.notes[i]?.[j] || false;
      }
    }

    const updatedOutputs = Array.from({ length: newRows }, (_, index) => {
      if (newRows > data.rows) {
        if (data.outputs[index]) {
          return data.outputs[index];
        }
        return { id: index.toString(), type: "", data: {} };
      } else {
        return data.outputs[index];
      }
    });

    const newNotes = Array.from({ length: newRows }).map((_, i) => {
      return i < data.rows ? data.notes[i] : Array(data.cols).fill(false);
    });
    // Update data in the store
    store.updateNode(id, {
      rows: newRows,
      notes: newNotes,
    });

    // Update outputs in the store
    store.updateNode(id, { outputs: updatedOutputs });
  },
  setColumns: (e) => {
    const newCols = parseInt(e.target.value);

    const newNotes = Array.from({ length: newCols }).map((_, i) => {
      return i < data.rows ? data.notes[i] : Array(data.cols).fill(false);
    });

    // Mettre à jour les données dans le magasin
    store.updateNode(id, {
      cols: newCols,
      notes: newNotes,
    });
  },
  setNotes: (e) => {
    const [row, col] = e.target.id.split("-").map(Number);

    const updatedNotes = data.notes.map((rowData, rowIndex) => {
      return rowIndex === row
        ? rowData.map((val, colIndex) =>
            colIndex === col ? e.target.checked : val
          )
        : rowData;
    });

    // Update data in the store
    store.updateNode(id, { notes: updatedNotes });
  },
});

const Sequencer = ({ id, data }) => {
  const { setRows, setColumns, setNotes } = useStore(
    selector(id, data),
    shallow
  );
  const notes = useRef(null);

  useEffect(() => {
    notes.current.querySelectorAll(".row").forEach((row, index) => {
      row.querySelectorAll(".cell").forEach((cell, cellIndex) => {
        if (cellIndex === data.value) {
          cell.style.transform = "scale(1.2)";
        } else {
          cell.style.transform = "scale(1)";
        }
      });
    });
  }, [data.value, data.notes]);


  return (
    <div className="node sequencer">
      <div className="sequencer__container">
      <h3>Sequencer</h3>
        <div className="sequencer__controls">
          <label>
            Rows
            <input type="number" value={data.rows} onChange={setRows} min={2} />
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
        <div className="sequencer__grid" ref={notes}>
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
                        onChange={setNotes}
                        checked={data.notes?.[rowId]?.[colId] || false}
                      />
                    </label>
                  </div>
                );
              })}
              <Handle type="source" position="right" id={rowId.toString()} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sequencer;
