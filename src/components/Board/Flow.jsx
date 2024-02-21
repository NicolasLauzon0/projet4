import { useMemo } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import { useStore } from "../../store/Store.js";
import { shallow } from "zustand/shallow";

import SampleNode from "../Nodes/Sample/SampleNode";
import OscillatorNode from "../Nodes/Instruments/OscillatorNode";
import AMSynthNode from "../Nodes/Instruments/AMSynthNode.jsx";
import GainNode from "../Nodes/Effects/GainNode";

import "reactflow/dist/style.css";
import OutNode from "../Nodes/Master/OutNode.jsx";

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  onNodesDelete: store.removeNode,
});

const Flow = () => {
  const nodeTypes = useMemo(
    () => ({
      sample: SampleNode,
      oscillator: OscillatorNode,
      amSynth: AMSynthNode,
      gainNode: GainNode,
      outNode: OutNode,
    }),
    []
  );

  const store = useStore(selector, shallow);

  return (
    <ReactFlow
      nodes={store.nodes}
      edges={store.edges}
      onNodesChange={store.onNodesChange}
      onEdgesChange={store.onEdgesChange}
      onNodesDelete={store.removeNode}
      onConnect={store.addEdge}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background color="#aaa" />
      <Controls />
    </ReactFlow>
  );
};

export default Flow;

// Chad was here