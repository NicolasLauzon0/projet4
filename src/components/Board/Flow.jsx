import { useCallback, useMemo, useState } from "react"
import ReactFlow, { Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge} from "reactflow"
import SampleNode from "../Nodes/Sample/SampleNode"
import "reactflow/dist/style.css"


function Flow () {
  const nodeTypes = useMemo(() => ({
    sample: SampleNode
  }), [])

  const initialNodes = [
    {
      id: "3",
      type: "sample",
      data: { label: "Input Node" },
      position: { x: 250, y: 25 }
    },
    {
      id: "4",
      type: "sample",
      data: { label: "Output Node" },
      position: { x: 250, y: 250 }
    }
  ]

  const initialEdges = []

  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)
  console.log(edges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );


  return (
    <ReactFlow
      style={{ width: "100%", height: "100vh" }}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      >
      <Background color="#aaa" />
      <Controls />
    </ReactFlow>
  )
}

export default Flow













































// Chad was here