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
    createAudioNode,
    playPlayerNode,
} from '../Audio';
import HH from '../assets/sons/hh.wav';

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
            case "player": {
                const data = {
                    gain: 0.5,
                    loop: true,
                    url: HH,
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
            case "sequencer": {
                const data = {
                    rows: 2,
                    cols: 16,
                    notes: [2][16]
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
        connect(data.source, data.target);
    },
    onNodesDelete(nodes) {
        for (const { id } of nodes) {
            removeAudioNode(id);
        }
    },
    onEdgesDelete(edges) {
        for (const { source, target } of edges) {
            disconnect(source, target);
        }
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