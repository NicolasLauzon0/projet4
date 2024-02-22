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
} from '../Audio';

export const useStore = createWithEqualityFn((set, get) => ({
    nodes: [
        {
            type: "amSynth",
            id: "1",
            data: {
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
                portamento: 0.5,
                harmonicity: 0.5,
                volume: 0.5,
            },
            position: { x: 250, y: 5 },
        },
        {
            type: "gainNode",
            id: "2",
            data: {
                gain: 0.5,
            },
            position: { x: 250, y: 200 },
        },
        {
            type: "outNode",
            id: "3",
            data: {},
            position: { x: 250, y: 350 },
        },
    ],
    edges: [],
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
            set({ isRunning: !get().isRunning });
        });
    }

}));