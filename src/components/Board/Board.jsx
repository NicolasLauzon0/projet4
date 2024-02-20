import ReactFlow, { Background, Controls } from "reactflow"
import Flow from "./Flow"
const Board = () => {
  return (
    <div className="board" style={{width: "100%", height: "100vh"}}>
      <Flow />
    </div>
  )
}

export default Board