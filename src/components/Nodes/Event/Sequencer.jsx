import { Handle, useUpdateNodeInternals } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import { useCallback } from "react";

const selector = (id, data) => (store) => ({
  setRows: (e) => {
    const newRows = parseInt(e.target.value);
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

    console.log(updatedOutputs);

    // Mettre à jour les données dans le magasin
    store.updateNode(id, {
      rows: newRows,
      notes: notes,
      outputs: updatedOutputs,
    });
  },
  setColumns: (e) => {
    const newCols = parseInt(e.target.value);
    const { rows } = data;
    const notes = [];

    // Construire un nouveau tableau de notes avec les nouvelles colonnes
    for (let i = 0; i < rows; i++) {
      notes[i] = [];
      for (let j = 0; j < newCols; j++) {
        notes[i][j] = data.notes[i]?.[j] || false;
      }
    }

    // Mettre à jour les données dans le magasin
    store.updateNode(id, { cols: newCols, notes: notes });
  },
  setNotes: (e) => {
    const [row, col] = e.target.id.split("-").map(Number);
    const { rows, cols } = data;
    const notes = [];

    // Construire un tableau de notes avec les bonnes dimensions
    for (let i = 0; i < rows; i++) {
      notes[i] = [];
      for (let j = 0; j < cols; j++) {
        notes[i][j] = data.notes[i]?.[j] || false;
      }
    }

    // Mettre à jour la valeur de la case à cocher
    notes[row][col] = e.target.checked;

    // Mettre à jour les données dans le magasin
    store.updateNode(id, { notes: notes });
  },
});

const Sequencer = ({ id, data }) => {
  const { setRows, setColumns, setNotes } = useStore(
    selector(id, data),
    shallow
  );

  const updateNode = useCallback(() => {
    useUpdateNodeInternals(id);
  }, [id, data]);
  return (
    <div className="node sequencer">
      <div className="sequencer__container">
        <div className="sequencer__controls">
          <label>
            Rows
            <input type="number"
              value={data.rows}
              onChange={(e) => {
                setRows(e);
                updateNode;
              }}
              readOnly
              min={1} />
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
                      <input type="checkbox" id={ids} onChange={setNotes} />
                    </label>
                  </div>
                );
              })}
              <Handle
                type="source"
                position="right"
                id={rowId + ""} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sequencer;
