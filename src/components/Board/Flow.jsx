import { useMemo } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import { useStore } from "../../store/Store.js";
import { shallow } from "zustand/shallow";

import SampleNode from "../Nodes/Sample/SampleNode";
import OscillatorNode from "../Nodes/Instruments/OscillatorNode";

import "reactflow/dist/style.css";

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
});

const Flow = () => {
  const nodeTypes = useMemo(
    () => ({
      sample: SampleNode,
      oscillator: OscillatorNode,
    }),
    []
  );

  const store = useStore(selector, shallow);
  // console.log(store);

  return (
    <ReactFlow
      nodes={store.nodes}
      edges={store.edges}
      onNodesChange={store.onNodesChange}
      onEdgesChange={store.onEdgesChange}
      onConnect={store.addEdge}
      fitView
    >
      <Background color="#aaa" />
      <Controls />
    </ReactFlow>
  );
};

export default Flow;

// Chad was here
