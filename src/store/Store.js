import { applyNodeChanges, applyEdgeChanges, getOutgoers, } from 'reactflow';
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
                        "C2": "/hh.wav",
                    },
                    baseUrl: "../assets/sons/",
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
    isValidConnection(connection) {
        const target = get().nodes.find((node) => node.id === connection.target);
        const hasCycle = (node, visited = new Set()) => {
            if (visited.has(node.id)) return false;

            visited.add(node.id);

            for (const outgoer of getOutgoers(node, get().nodes, get().edges)) {
                if (outgoer.id === connection.source) return true;
                if (hasCycle(outgoer, visited)) return true;
            }
        };

        if (target.id === connection.source) return false;
        return !hasCycle(target);

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