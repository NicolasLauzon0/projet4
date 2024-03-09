import ReactFlow, { Background, MiniMap, Panel, useReactFlow } from "reactflow";
import { useSaveAndLoad } from "../../context/SaveAndLoadContext.jsx";
import { useStore } from "../../store/Store.js";
import { shallow } from "zustand/shallow";
import CustomEdge from "../CustomEdge/CustomEdge.jsx";

import OutNode from "../Nodes/Master/OutNode.jsx";

import Sampler from "../Nodes/Instruments/Sampler.jsx";
import AMSynth from "../Nodes/Instruments/AMSynth.jsx";
import DuoSynth from "../Nodes/Instruments/DuoSynth.jsx";
import FMSynth from "../Nodes/Instruments/FMSynth.jsx";
import MonoSynth from "../Nodes/Instruments/MonoSynth.jsx";
import MembraneSynth from "../Nodes/Instruments/MembraneSynth.jsx";
import PluckSynth from "../Nodes/Instruments/PluckSynth.jsx";
import Cheby from "../Nodes/Effects/Cheby.jsx";

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

import { menu, menuProject } from "./Menu/NodesT.js";
import ContextMenu from "./Menu/ContextMenu.jsx";

import "reactflow/dist/style.css";
import { useCallback, useEffect, useRef, useState } from "react";

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  onConnect: store.onConnect,
  onNodesDelete: store.onNodesDelete,
  onEdgesDelete: store.onEdgesDelete,
  createNode: store.createNode,
  reset: store.reset,
  updateNode: store.updateNode,
  isValidConnection: store.isValidConnection,
});

const nodeTypes = {
  amSynth: AMSynth,
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
  chorus: Chorus,
};

const edgesTypes = {
  custom: CustomEdge,
};

const Flow = () => {
  const store = useStore(selector, shallow);
  const { seeFiles, fitView, setFitViewF } = useSaveAndLoad();
  const reactFlowInstance = useReactFlow();
  const [menuContext, setMenuContext] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    reactFlowInstance.fitView();
  }, [fitView]);

  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();
      const bounds = ref.current.getBoundingClientRect();

      setMenuContext({
        id: node.id,
        top: event.clientY < bounds.height - 200 && event.clientY,
        left: event.clientX < bounds.width - 200 && event.clientX,
        right:
          event.clientX >= bounds.width - 200 && bounds.width - event.clientX,
        bottom:
          event.clientY >= bounds.height - 200 && bounds.height - event.clientY,
      });
    },
    [setMenuContext]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX,
      y: event.clientY,
    });
    console.log(position);
    store.createNode(type, position);
  }, [reactFlowInstance]); 
  return (
    <>
      <Login />
      <NomProjet />
      {seeFiles && <FilesPopUp />}
      <ReactFlow
        ref={ref}
        nodes={store.nodes}
        edges={store.edges}
        onNodesChange={store.onNodesChange}
        onEdgesChange={store.onEdgesChange}
        onNodesDelete={store.onNodesDelete}
        onConnect={store.onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onEdgesDelete={store.onEdgesDelete}
        isValidConnection={store.isValidConnection}
        nodeTypes={nodeTypes}
        fitView
        edgeTypes={edgesTypes}
        className="flow"
        maxZoom={2}
        minZoom={0.15}
        nodeOrigin={[0.5, 0]}
        onNodeContextMenu={onNodeContextMenu}
      >
        <Panel position="bottom-right">
          <Menu menuProject={menuProject} menu={menu} store={store} />
        </Panel>
        <Background
          color="var(--blanc)"
          gap={32}
          size={3}
          style={{
            borderRadius: "5px",
            backgroundColor: "#222222",
            padding: "0",
            zoom: "1",
          }}
        />
        {menuContext && (
          <ContextMenu {...menuContext} action={() => setMenuContext(false)} />
        )}

        <MiniMap
          nodeColor={(n) => {
            if (n.type === "out") {
              return "#ff6060";
            } else if (n.type === "sequencer") {
              return "var(--jaune)";
            }
            return "var(--turquoise)";
          }}
          position="bottom-left"
          nodeBorderRadius={"1rem"}
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
