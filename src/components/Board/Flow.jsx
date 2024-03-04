import { useCallback } from "react";
import ReactFlow, { Background, Controls, MiniMap, Panel } from "reactflow";
import { useSaveAndLoad } from "../../context/SaveAndLoadContext.jsx";
import { useStore } from "../../store/Store.js";
import { shallow } from "zustand/shallow";

import OutNode from "../Nodes/Master/OutNode.jsx";

import Sampler from "../Nodes/Instruments/Sampler.jsx";
import AMSynthNode from "../Nodes/Instruments/AMSynthNode.jsx";
import DuoSynth from "../Nodes/Instruments/DuoSynth.jsx";
import FMSynth from "../Nodes/Instruments/FMSynth.jsx";
import MonoSynth from "../Nodes/Instruments/MonoSynth.jsx";
import MembraneSynth from "../Nodes/Instruments/MembraneSynth.jsx";
import PluckSynth from "../Nodes/Instruments/PluckSynth.jsx";
import Cheby from "../Nodes/Effects/Cheby.jsx";
import Add from "../Nodes/Effects/Add.jsx";

import GainNode from "../Nodes/Effects/GainNode";
import AutoFilter from "../Nodes/Effects/AutoFilter.jsx";
import Reverb from "../Nodes/Effects/Reverb.jsx";
import FeedBackDelay from "../Nodes/Effects/FeedBackDelay.jsx";
import PitchShift from "../Nodes/Effects/PitchShift.jsx";
import BitCrusher from "../Nodes/Effects/BitCrusher.jsx";
import Chorus from "../Nodes/Effects/Chorus.jsx";

import Sequencer from "../Nodes/Rythme/Sequencer.jsx";
import Bpm from "../Nodes/Rythme/Bpm.jsx";

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
  onConnect: store.onConnect,
  onNodesDelete: store.onNodesDelete,
  onEdgesDelete: store.onEdgesDelete,
  createNode: store.createNode,
  createNodeFromData: store.createNodeFromData,
  createEdgeFromData: store.createEdgeFromData,
  reset: store.reset,
  updateNode: store.updateNode,
  isValidConnection: store.isValidConnection,
});

const nodeTypes = {
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
  duoSynth: DuoSynth,
  fmSynth: FMSynth,
  monoSynth: MonoSynth,
  membraneSynth: MembraneSynth,
  pluckSynth: PluckSynth,
  bitCrusher: BitCrusher,
  cheby: Cheby,
  add: Add,
  chorus: Chorus,
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
        onConnect={store.onConnect}
        onEdgesDelete={store.onEdgesDelete}
        isValidConnection={store.isValidConnection}
        nodeTypes={nodeTypes}
        fitView
        className="flow"
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
          nodeColor={(n) => {
            if (n.type === "out") {
              return "var(--vert)";
            } else if (n.type === "sequencer") {
              return "var(--jaune)";
            }
            return "var(--turquoise)";
          }}
          position="bottom-left"
          nodeBorderRadius={2}
          style={{
            border: "3px solid var(--vert)",
            borderRadius: "5px",
            backgroundColor: "var(--gris)",
            padding: "0",
            cursor: "grab",
            opacity: "0.9",
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
