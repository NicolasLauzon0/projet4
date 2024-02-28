import { applyNodeChanges, applyEdgeChanges, useReactFlow } from 'reactflow';
import { nanoid } from "nanoid";
import { createWithEqualityFn } from "zustand/traditional";
import {
    updateAudioNode,
    removeAudioNode,
    disconnect,
    connect,
    isRunning,
    toggleAudio,
    createAudioNode
} from '../Audio';


export const useStore = createWithEqualityFn((set, get) => ({
    nodes: [
        {
            id: "1",
            type: "out",
            data: {},
            position: { x: 0, y: 0 },
        },
    ],
    edges: [],
    createNode(type) {
        const id = nanoid();
        switch (type) {
            case "amSynth": {
                const data = {
                    oscillator: {
                        type: "sine",
                    },
                    envelope: {
                        attack: 0.5,
                        decay: 0.5,
                        sustain: 0.5,
                        release: 0.5,
                    },
                    modulation: {
                        type: "sine",
                    },
                    modulationEnvelope: {
                        attack: 0.5,
                        decay: 0.5,
                        sustain: 0.5,
                        release: 0.5,
                    },
                    harmonicity: 0.5,
                };
                const position = { x: 300, y: -300 };
                createAudioNode(id, type, data);
                set({
                    nodes: [
                        ...get().nodes,
                        {
                            id,
                            type,
                            data,
                            position,
                        },
                    ],
                });
                break;
            }
            case "gain": {

                const data = {
                    gain: 0.5,
                };
                const position = { x: 0, y: 0 };
                createAudioNode(id, type, data);
                set({
                    nodes: [
                        ...get().nodes,
                        {
                            id,
                            type,
                            data,
                            position,
                        },
                    ],
                });
                break;
            }
            case "out": {
                const data = {};
                const position = { x: 0, y: 0 };
                createAudioNode(id, type, data);
                set({
                    nodes: [
                        ...get().nodes,
                        {
                            id,
                            type,
                            data,
                            position,
                        },
                    ],
                });
                break;
            }
            case "sampler": {
                const data = {
                    attack: 0.5,
                    urls: {
                        C2: "hh.wav",
                    },
                    baseUrl: "src/assets/sons/",
                }
                const position = { x: 0, y: 0 };
                createAudioNode(id, type, data);
                set({
                    nodes: [
                        ...get().nodes,
                        {
                            id,
                            type,
                            data,
                            position,
                        },
                    ],
                });
                break;
            }
            case "sequencer": {
                const data = {
                    rows: 1,
                    cols: 16,
                    notes: [
                        [
                            false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
                        ]
                    ],
                    outputs: [{
                        id: "0",
                        type: "",
                        data: {},
                    }],
                    subdivision: "16",
                };
                const position = { x: -600, y: -400 };
                createAudioNode(id, type, data);
                set({
                    nodes: [
                        ...get().nodes,
                        {
                            id,
                            type,
                            data,
                            position,
                        },
                    ],

                });
                console.log(get().nodes);
                break;
            }
            default:
                break;
        }
    },
    reset() {
        const nodes = get().nodes;
        const edges = get().edges;
        Array.from(edges).forEach((edge) => {
            disconnect(edge);
        });
        for (const { id } of nodes) {
            removeAudioNode(id);
        }
        set({
            nodes: [],
            edges: [],
        });


    },
    test() {
        const nodes = get().nodes;
        const edges = get().edges;
    },
    createNodeFromData(dataRef) {
        const id = dataRef.id;
        const type = dataRef.type;
        const data = dataRef.data;
        const position = dataRef.position;
        console.log(data);
        createAudioNode(id, type, data);
        set({
            nodes: [
                ...get().nodes,
                {
                    id,
                    type,
                    data,
                    position,
                },
            ],
        });
        console.log(get().nodes);
    },
    createEdgeFromData(data) {
        connect(data);
        set({
            edges: [
                ...get().edges,
                data,
            ],
        });
    },
    onNodesChange(changes) {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange(changes) {

        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    addEdge(data) {
        const id = nanoid(6);
        const edge = { id, ...data };
        set({
            edges: [edge, ...get().edges],
        });
        connect(data);
    },

    updateOutputs(id, outputs) {
        set((state) => ({
            nodes: state.nodes.map((node) => {
                if (node.id === id) {
                    return { ...node, data: { ...node.data, ...outputs } };
                }
                return node;
            }),
        }));
    },
    onNodesDelete(nodes) {

        for (const { id } of nodes) {
            removeAudioNode(id);
        }
    },
    onEdgesDelete(edges) {
        console.log(edges);
        Array.from(edges).forEach((edge) => {
            disconnect(edge);
        });
    },
    saveProject() {
        const data = {
            nodes: get().nodes,
            edges: get().edges,
        };
        console.log(data);
        const newData = {
            ...data,
            nodes: data.nodes.map(node => {
                if (node.type === "sequencer") {
                    console.log(node);
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            outputs: Object.keys(node.data.outputs).map((key, index) => {
                                return {
                                    id: key,
                                    type: "",
                                    data: "",
                                }
                            }
                            )
                        }
                    }
                }
                return { ...node }
            })
        };
        console.log(newData);

        const file = JSON.stringify(newData);
        console.log(file);
        localStorage.setItem("project", file);

    },
    updateNode(id, data) {
        console.log(id, data);
        updateAudioNode(id, data);
        set((state) => ({
            nodes: state.nodes.map((node) => (node.id === id ? { ...node, data: { ...node.data, ...data } } : node)),
        }));
        console.log(get().nodes);
    },
    isRunning: isRunning(),
    toggleVolume() {
        toggleAudio().then(() => {
            set({ isRunning: isRunning() });
        });
    },
    play(id) {
        playPlayerNode(id);
    }
}));