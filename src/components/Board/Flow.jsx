import ReactFlow, { Background, Controls } from "reactflow";
import { useStore } from "../../store/Store.js";
import { shallow } from "zustand/shallow";

import SampleNode from "../Nodes/Sample/SampleNode";
import OscillatorNode from "../Nodes/Instruments/OscillatorNode";
import AMSynthNode from "../Nodes/Instruments/AMSynthNode.jsx";
import GainNode from "../Nodes/Effects/GainNode";
import OutNode from "../Nodes/Master/OutNode.jsx";

import "reactflow/dist/style.css";


const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  onNodesDelete: store.onNodesDelete,
  onEdgesDelete: store.onEdgesDelete,
});

const nodeTypes = {
    sample: SampleNode,
    oscillator: OscillatorNode,
    amSynth: AMSynthNode,
    gainNode: GainNode,
    outNode: OutNode,
};

const Flow = () => {


  const store = useStore(selector, shallow);

  return (
    <ReactFlow
      nodes={store.nodes}
      edges={store.edges}
      onNodesChange={store.onNodesChange}
      onEdgesChange={store.onEdgesChange}
      onNodesDelete={store.removeNode}
      onConnect={store.addEdge}
      onEdgesDelete={store.onEdgesDelete}
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