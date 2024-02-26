import { useEffect, useState } from "react";
import ReactFlow, { Background, Controls, Panel } from "reactflow";
import { useStore } from "../../store/Store.js";
import { shallow } from "zustand/shallow";

import OscillatorNode from "../Nodes/Instruments/OscillatorNode";
import AMSynthNode from "../Nodes/Instruments/AMSynthNode.jsx";

import GainNode from "../Nodes/Effects/GainNode";

import Sequencer from "../Nodes/Event/Sequencer.jsx";

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
  onEdgeUpdateStart: store.onEdgeUpdateStart,
  onEdgeUpdate: store.onEdgeUpdate,
  onEdgeUpdateEnd: store.onEdgeUpdateEnd,
});

const nodeTypes = {
  oscillator: OscillatorNode,
  amSynth: AMSynthNode,
  gain: GainNode,
  out: OutNode,
  player: Player,
  sequencer: Sequencer,
};

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
    name: "Master",
    children: [
      {
        name: "Out",
        type: "out",
      },
    ],
  },
  {
    name: "Source",
    children: [
      {
        name: "Player",
        type: "player",
      },
    ],
  },
];



const Flow = () => {
  const store = useStore(selector, shallow);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  console.log("render");
  return (
    <ReactFlow
      nodes={store.nodes}
      edges={store.edges}
      onNodesChange={store.onNodesChange}
      onEdgesChange={store.onEdgesChange}
      onNodesDelete={store.onNodesDelete}
      onEdgeUpdateStart={store.onEdgeUpdateStart}
      onEdgeUpdate={store.onEdgeUpdate}
      onEdgeUpdateEnd={store.onEdgeUpdateEnd}
      onConnect={store.addEdge}
      onEdgesDelete={store.onEdgesDelete}
      nodeTypes={nodeTypes}
      fitView
    >
      <Panel position="bottom-right">
        <div className="menu">
          <div onClick={(e) => {
            setMenuOpen(!menuOpen)
            e.target.classList.add("menubutton__container--active")
          }}
            className="menubutton"
          >
            <div className="menubutton__container">

            </div>
          </div>
          <div className="menu-items">
            {menuOpen &&
              menu.map((item, index) => (
                <div key={index} className="menu-item" onClick={() =>
                  selectedMenu === item ? setSelectedMenu(null) : setSelectedMenu(item)
                }>
                  {item.name}
                  {selectedMenu === item &&
                    item.children.map((child, index) => (
                      <div
                        key={index}
                        className="menu-item"
                        onClick={() => {
                          store.createNode(child.type);
                          setMenuOpen(false);
                        }}
                      >
                        {child.name}
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </Panel>
      <Background color="#aaa" />
      <Controls />
    </ReactFlow>
  );
};

export default Flow;

// Chad was here