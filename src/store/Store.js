import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
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
                    attack: 0.1,
                    urls: {
                        A1: "hh.wav",
                        A2: "hh2.wav",
                        A3: "hh3.wav",
                        B1: "snare.wav",
                        B2: "snare2.wav",
                        B3: "snare3.wav",
                        C1: "kick.wav",
                        C2: "kick2.wav",
                        C3: "kick3.wav",
                        D1: "clap.wav",
                        D2: "clap2.wav",
                        D3: "clap3.wav",
                        E1: "perc.wav",
                        E2: "perc2.wav",
                        E3: "perc3.wav",
                    },
                    baseUrl: "src/assets/sons/",
                    selected: "A1",
                    options: [
                        { name: "Hihat", value: "A1" },
                        { name: "Hihat 2", value: "A2" },
                        { name: "Hihat 3", value: "A3" },
                        { name: "Snare", value: "B1" },
                        { name: "Snare 2", value: "B2" },
                        { name: "Snare 3", value: "B3" },
                        { name: "Kick", value: "C1" },
                        { name: "Kick 2", value: "C2" },
                        { name: "Kick 3", value: "C3" },
                        { name: "Clap", value: "D1" },
                        { name: "Clap 2", value: "D2" },
                        { name: "Clap 3", value: "D3" },
                        { name: "perc", value: "E1" },
                        { name: "Perc 2", value: "E2" },
                        { name: "Perc 3", value: "E3" },

                    ],
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
                    events: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                    value: 0,
                    subdivision: "32",
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

                break;
            }
            case "autoFilter": {
                const data = {
                    baseFrequency: 200,
                    type: "sine",
                    depth: 1,
                    frequency: 400,
                    octaves: 3,
                    wet: 1,
                    filter: {
                        type: "lowpass",
                        rolloff: -12,
                        Q: 1,
                    }
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
            case "bpm": {
                const data = {
                    bpm: 120,
                };
                const position = { x: 0, y: 0 };
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
            case "reverb": {
                const data = {
                    decay: 1.5,
                    preDelay: 0.01,
                    wet: 0.5,
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
            case "feedbackDelay": {
                const data = {
                    delayTime: 0.25,
                    feedback: 0.5,
                    maxDelay: 2,
                    wet: 0.25,
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
            case "pitchShift": {
                const data = {
                    pitch: 0,
                    delayTime: 0,
                    feedback: 0,
                    wet: 0,
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
            default:
                break;
        }
    },
    setCurrentColumn(id, value) {
        set((state) => ({
            nodes: state.nodes.map((node) => {
                if (node.id === id) {
                    return { ...node, data: { ...node.data, value } };
                }
                return node;
            }),
        }));
    },
    async reset() {
        const nodes = await get().nodes;
        const edges = await get().edges;
        await edges.forEach((edges) => {
            disconnect(edges);
        }
        );
        await nodes.forEach((node) => {
            removeAudioNode(node.id);
        });
        await set({ nodes: [], edges: [] });
    },
    createNodeFromData(dataRef) {
        const id = dataRef.id;
        const type = dataRef.type;
        const position = dataRef.position;
        const data = { ...dataRef.data };

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
        const edge = { id, ...data, animated: true };
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
        const newData = {
            ...data,
            nodes: data.nodes.map(node => {
                if (node.type === "sequencer") {
                    console.log(node.data);
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            outputs: Array.from(node.data.outputs).map(output => {
                                return {
                                    id: output.id,
                                    type: "",
                                    data: {},
                                };
                            })
                        }
                    }
                }
                return node;
            })
        }

        return newData;
    },
    updateNode(id, data) {
        updateAudioNode(id, data);
        set((state) => ({
            nodes: state.nodes.map((node) => (node.id === id ? { ...node, data: { ...node.data, ...data } } : node)),
        }));
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