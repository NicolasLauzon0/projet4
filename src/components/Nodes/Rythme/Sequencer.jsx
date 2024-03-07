import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";
import { useEffect, useRef } from "react";
import { useUpdateNodeInternals } from 'reactflow';
import CustomHandle from "../../Handle/CustomHandle.jsx";
import Button from "../../utils/Button.jsx";
import Infobulle from "../../utils/Infobulle.jsx";

const selector = (id, data) => (store) => ({
  removeNode: store.removeNode,
  setRows: (e) => {
    const newRows = parseInt(e.target.value);
    if (newRows < 1 || newRows !== Math.floor(newRows) || newRows > 16) return;
    const { cols } = data;
    let newNotes = [];

    // Construire un nouveau tableau de notes avec les nouvelles lignes
    for (let i = 0; i < newRows; i++) {
      newNotes[i] = [];
      for (let j = 0; j < cols; j++) {
        newNotes[i][j] = data.notes[i]?.[j] || false;
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
    const deletedRows = data.rows - newRows;
    if (deletedRows > 0) {
      const incomingEdges = store.edges.filter((edge) => edge.source === id);
      incomingEdges.forEach((edge) => {
        if (parseInt(edge.sourceHandle) >= newRows) {
          store.removeEdge(edge.id);
        }
      });
    }

    // Update data in the store
    store.updateNode(id, {
      rows: newRows,
      notes: newNotes,
      outputs: updatedOutputs,
    });
  },
  setColumns: (e) => {
    const newCols = parseInt(e.target.value);
    if (newCols < 2 || newCols !== Math.floor(newCols) || newCols > 64) return;
    let newNotes = [];

    // Copiez les anciennes notes
    for (let i = 0; i < data.rows; i++) {
      newNotes[i] = data.notes[i] ? [...data.notes[i]] : [];
    }
    if (newCols > data.cols) {
      for (let i = 0; i < data.rows; i++) {
        for (let j = data.cols; j < newCols; j++) {
          newNotes[i][j] = false;
        }
      }
    } else if (newCols < data.cols) {
      // Conservez uniquement les notes correspondant aux nouvelles colonnes
      for (let i = 0; i < data.rows; i++) {
        newNotes[i] = newNotes[i].slice(0, newCols);
      }
    }
    const events = Array.from({ length: newCols }, (_, index) => index);

    // Mettre à jour les données dans le magasin
    store.updateNode(id, {
      cols: newCols,
      notes: newNotes,
      events: events,
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
  const updateNodeInternals = useUpdateNodeInternals();
  const { setRows, setColumns, setNotes, removeNode } = useStore(
    selector(id, data),
    shallow
  );
  const notes = useRef(null);

  useEffect(() => {
    notes.current.querySelectorAll(".row").forEach((row, index) => {
      row.querySelectorAll(".cell").forEach((cell, cellIndex) => {
        if (cellIndex === data.value) {
          cell.classList.add("active");
        } else {
          cell.classList.remove("active");
        }
      });
    });
  }, [data.value, data.notes]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [data.rows, data.cols]);

  return (
    <div className="node sequencer">
      <Infobulle titre="Sequencer">
        <>
          This is a sequencer. Draw notes and plug the output to an instrument to play them.
        </>
      </Infobulle>
      <Button action={() => removeNode(id)} />
      <h3>Sequencer</h3>
      <div className="sequencer__container">
        <div className="sequencer__controls">
          <div>
            <p>Rows</p>
            <div className="sequencer__controls__value nodrag">
              <p>{data.rows}</p>
            </div>
            <div className="ajout">
              <button onClick={() => setRows({ target: { value: data.rows - 1 } })} className="nodrag"></button>
              <button onClick={() => setRows({ target: { value: data.rows + 1 } })} className="nodrag"></button>
            </div>
          </div>
          <div>
            <p>Columns</p>
            <div className="sequencer__controls__value nodrag">
              {data.cols}
            </div>
            <div className="ajout">
              <button onClick={() => setColumns({ target: { value: data.cols - 1 } })} className="nodrag"></button>
              <button onClick={() => setColumns({ target: { value: data.cols + 1 } })} className="nodrag"></button>
            </div>
          </div>

        </div>
        <div className="sequencer__grid" ref={notes}>
          {Array.from({ length: data.rows }).map((_, rowId) => (
            <div className="row" key={rowId}>
              {Array.from({ length: data.cols }).map((_, colId) => {
                const ids = rowId + "-" + colId;
                return (
                  <div className="cell nodrag" key={ids}>
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
              <CustomHandle
                type={"source"}
                position={"right"}
                id={rowId.toString()}
                key={rowId}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sequencer;
