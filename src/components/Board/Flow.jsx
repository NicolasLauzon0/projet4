import ReactFlow, { Background, Controls, Panel } from "reactflow";
import { useStore } from "../../store/Store.js";
import { shallow } from "zustand/shallow";

import OscillatorNode from "../Nodes/Instruments/OscillatorNode";
import AMSynthNode from "../Nodes/Instruments/AMSynthNode.jsx";

import GainNode from "../Nodes/Effects/GainNode";

import Sequencer from "../Nodes/Events/Sequencer.jsx";

import OutNode from "../Nodes/Master/OutNode.jsx";

import "reactflow/dist/style.css";
import Player from "../Nodes/Source/Player.jsx";


const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  onNodesDelete: store.onNodesDelete,
  onEdgesDelete: store.onEdgesDelete,
  createNode: store.createNode,
});

const nodeTypes = {
  oscillator: OscillatorNode,
  amSynth: AMSynthNode,
  gain: GainNode,
  out: OutNode,
  player: Player,
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
      <Panel position="top-right">
        <button onClick={() => {
          store.createNode("amSynth");
        }}>
          Add Synth
        </button>
        <button onClick={() => {
          store.createNode("gain");
        }}>
          Add Gain
        </button>
        <button onClick={() => {
          store.createNode("player");
        }}>
          Add Player
        </button>
      </Panel>
      <Background color="#aaa" />
      <Controls />
    </ReactFlow>
  );
};

export default Flow;

// Chad was here