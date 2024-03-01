import ReactFlow, { Background, Controls, MiniMap, Panel } from "reactflow";
import { useSaveAndLoad } from "../../context/SaveAndLoadContext.jsx";
import { useStore } from "../../store/Store.js";
import { shallow } from "zustand/shallow";

import OutNode from "../Nodes/Master/OutNode.jsx";

import Sampler from "../Nodes/Instruments/Sampler.jsx";
import OscillatorNode from "../Nodes/Instruments/OscillatorNode";
import AMSynthNode from "../Nodes/Instruments/AMSynthNode.jsx";

import GainNode from "../Nodes/Effects/GainNode";
import AutoFilter from "../Nodes/Effects/AutoFilter.jsx";
import Reverb from "../Nodes/Effects/Reverb.jsx";
import FeedBackDelay from "../Nodes/Effects/FeedBackDelay.jsx";
import PitchShift from "../Nodes/Effects/PitchShift.jsx";

import Sequencer from "../Nodes/Event/Sequencer.jsx";
import Bpm from "../Nodes/Master/Bpm.jsx";

import Menu from "./Menu/Menu.jsx";

import Login from "../Connexion/Login.jsx";
import NomProjet from "./NomProjet.jsx";
import FilesPopUp from "./Menu/FilesPopUp.jsx";

import { menu, menuProject } from "../Nodes/NodesT.js";

import "reactflow/dist/style.css";
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
  bpm: Bpm,
  reverb: Reverb,
  feedbackDelay: FeedBackDelay,
  pitchShift: PitchShift,
};

const Flow = () => {
  const store = useStore(selector, shallow);
  const { seeFiles } = useSaveAndLoad();

  return (
    <>
      <Login />
      <NomProjet />
      {
        // <FilesPopUp />
        seeFiles && <FilesPopUp />
      }
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
          <Menu menuProject={menuProject} menu={menu} store={store} />
        </Panel>
        <Background 
          color="var(--gris)" 
          gap={16} 
          size={1.2}
            style={{
              borderRadius: "5px",
              backgroundColor: "var(--blanc)",
              padding: "0",
              zoom: "1.2",
            }}
            

        />
        <MiniMap
          nodeColor={"var(--vert)"}
          position="bottom-left"
          nodeBorderRadius={2}
          style={{ 
            border: "3px solid var(--vert)",
            borderRadius: "5px",
            backgroundColor: "var(--gris)",
            padding: "0",
            zoom: "1.2",    
          }}
          zoomable={true}
          pannable={true}
          maskColor="var(--noir)"

        />
      </ReactFlow>
    </>
  );
};

export default Flow;

// Chad was here
