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
    createAudioNode,
    playPlayerNode,
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
                break;
            }
            default:
                break;
        }
    },
    reset() {
        set({
            nodes: [],
            edges: [],
        });

        const nodes = get().nodes;
        const edges = get().edges;
    },
    test() {
        const nodes = get().nodes;
        const edges = get().edges;
        console.log(nodes);
        console.log(edges);
    },
    createNodeFromData(data) {
        let id;
        let type;
        let position;
        let dataData;
        if (data.data.type === "sequencer") {
            id = data.data.id;
            type = data.data.type;
            position = data.data.position;
            dataData = data.data;
        } else {
            id = data.id;
            type = data.type;
            position = data.position;
            dataData = data.data;
        }
        console.log(position);
        createAudioNode(id, type, data);
        set({
            nodes: [
                ...get().nodes,
                {
                    id,
                    type,
                    data: dataData,
                    position,
                },
            ],
        });
    },
    createEdgeFromData(data) {
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
        console.log(changes);
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
        console.log(outputs);
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
        console.log(nodes);
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
                    console.log(node);
                    return {
                        ...node.data,
                        outputs: Object.values(node.data.outputs).map(output => {
                            return {
                                ...output,
                                data: {}
                            }
                        })
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
        updateAudioNode(id, data);
        set((state) => ({
            nodes: state.nodes.map((node) => {
                if (node.id === id) {
                    // Pour chaque clé dans data, vérifier si c'est un objet imbriqué et nécessite une fusion profonde
                    const newData = Object.keys(data).reduce((acc, key) => {
                        if (typeof data[key] === 'object' && data[key] !== null) {
                            // Si c'est un objet, fusionner profondément
                            acc[key] = { ...node.data[key], ...data[key] };
                        } else {
                            // Sinon, juste mettre à jour la valeur
                            acc[key] = data[key];
                        }
                        return acc;
                    }, {});
                    return { ...node, data: { ...node.data, ...newData } };
                }
                return node;
            }),
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