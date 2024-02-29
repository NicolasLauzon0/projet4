import { useCallback, useEffect, useState } from "react";
import ReactFlow, { Background, Controls, Panel } from "reactflow";
import { useStore } from "../../store/Store.js";
import { shallow } from "zustand/shallow";

import OscillatorNode from "../Nodes/Instruments/OscillatorNode";
import AMSynthNode from "../Nodes/Instruments/AMSynthNode.jsx";

import GainNode from "../Nodes/Effects/GainNode";
import AutoFilter from "../Nodes/Effects/AutoFilter.jsx";

import Sequencer from "../Nodes/Event/Sequencer.jsx";

import OutNode from "../Nodes/Master/OutNode.jsx";

import "reactflow/dist/style.css";
import Sampler from "../Nodes/Source/Sampler.jsx";
import Menu from "./Menu/Menu.jsx";
import { useSaveAndLoad } from "../../context/SaveAndLoadContext.jsx";


const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  onNodesDelete: store.onNodesDelete,
  onEdgesDelete: store.onEdgesDelete,
  createNode: store.createNode,
  createNodeFromData: store.createNodeFromData,
  createEdgeFromData: store.createEdgeFromData,
  reset: store.reset,
  updateNode: store.updateNode,
});

const nodeTypes = {
  oscillator: OscillatorNode,
  amSynth: AMSynthNode,
  gain: GainNode,
  out: OutNode,
  sampler: Sampler,
  sequencer: Sequencer,
  autoFilter: AutoFilter,
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
      {
        name: "AutoFilter",
        type: "autoFilter",
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
  const { saveProject, loadProject } = useSaveAndLoad();

  const loadProjectfromStore = useCallback(() => {
    const fetchData = async () => {
      const data = await JSON.parse(localStorage.getItem("project"))

      await store.reset();
      await data.nodes.forEach((node) => {
        console.log(node);
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
      fitView
    >
      <Panel position="bottom-right">
        <Menu menuProject={menuProject} menu={menu} store={store} loadProject={loadProject} saveProject={saveProject} />
      </Panel>
      <Background color="#aaa" />
      <Controls />
    </ReactFlow>
  );
};

export default Flow;

// Chad was here
