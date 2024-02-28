import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../store/Store.js";

const selector = (id, data) => (store) => ({
  setRows: (e) => {
    const newRows = parseInt(e.target.value);
    const updatedOutputs = data.outputs.slice();

    if (newRows > data.rows) {
      for (let i = data.rows; i < newRows; i++) {
        updatedOutputs.push({ id: i.toString(), type: "", data: {} });
      }
    } else {
      updatedOutputs.splice(newRows, data.rows - newRows);
    }

    console.log(updatedOutputs);

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
  console.log("render sequencer");
  return (
    <div className="node sequencer">
      <div className="sequencer__container">
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
