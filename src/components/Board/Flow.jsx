import { useCallback, useEffect, useState } from "react";
import ReactFlow, { Background, Controls, Panel } from "reactflow";
import { useStore } from "../../store/Store.js";
import { shallow } from "zustand/shallow";

import OscillatorNode from "../Nodes/Instruments/OscillatorNode";
import AMSynthNode from "../Nodes/Instruments/AMSynthNode.jsx";

import GainNode from "../Nodes/Effects/GainNode";

import Sequencer from "../Nodes/Event/Sequencer.jsx";

import OutNode from "../Nodes/Master/OutNode.jsx";

import "reactflow/dist/style.css";
import Sampler from "../Nodes/Source/Sampler.jsx";
import Menu from "./Menu/Menu.jsx";

import file from "../../store/SaveTest.json";

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  onNodesDelete: store.onNodesDelete,
  onEdgesDelete: store.onEdgesDelete,
  createNode: store.createNode,
  isValidConnection: store.isValidConnection,
  saveProject: store.saveProject,
  createNodeFromData: store.createNodeFromData,
  createEdgeFromData: store.createEdgeFromData,
  reset: store.reset,
});

const nodeTypes = {
  oscillator: OscillatorNode,
  amSynth: AMSynthNode,
  gain: GainNode,
  out: OutNode,
  sampler: Sampler,
  sequencer: Sequencer,
};


const menuProject = [
  {
    name: "Project",
    children: [
      {
        name: "Save",
        type: "save",
      },
      {
        name: "Load",
        type: "load",
      },
    ],
  },
];
const menu = [
  {
    name: "Instruments",
    children: [
      {
        name: "Oscillator",
        type: "oscillator",
      },
      {
        name: "AM Synth",
        type: "amSynth",
      },
    ],
  },
  {
    name: "Effets",
    children: [
      {
        name: "Gain",
        type: "gain",
      },
    ],
  },
  {
    name: "Events",
    children: [
      {
        name: "Sequencer",
        type: "sequencer",
      },
    ],
  },
  {
    name: "Source",
    children: [
      {
        name: "Sampler",
        type: "sampler",
      },
    ],
  },
];

const Flow = () => {
  const store = useStore(selector, shallow);

  const loadProject = useCallback(() => {
    const fetchData = async () => {
      const data = await JSON.parse(localStorage.getItem("project"))

      await store.reset();
      await data.nodes.forEach((node) => {
        store.createNodeFromData(node);
      });
      await data.edges.forEach((edge) => {
        store.createEdgeFromData(edge);
      });
    }
    fetchData();
  }, []);
  return (
    <ReactFlow
      nodes={store.nodes}
      edges={store.edges}
      onNodesChange={store.onNodesChange}
      onEdgesChange={store.onEdgesChange}
      onNodesDelete={store.onNodesDelete}
      onConnect={store.addEdge}
      onEdgesDelete={store.onEdgesDelete}
      nodeTypes={nodeTypes}
      isValidConnection={store.isValidConnection}
      fitView
    >
      <Panel position="bottom-right">
        <Menu menuProject={menuProject} menu={menu} store={store} loadProject={loadProject} />
      </Panel>
      <Background color="#aaa" />
      <Controls />
    </ReactFlow>
  );
};

export default Flow;

// Chad was here
