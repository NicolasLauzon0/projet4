import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { nanoid } from "nanoid";
import { createWithEqualityFn } from "zustand/traditional";
import { updateAudioNode, removeAudioNode } from '../Audio';

export const useStore = createWithEqualityFn((set, get) => ({
    nodes: [
        {
            type: "amSynth",
            id: "1",
            data: {
                occilator: {
                    type: "sine",
                    attack: 0.1,
                    decay: 0.2,
                    sustain: 0.3,
                    release: 0.4,
                },
                modulation: {
                    type: "sine",
                    attack: 0.1,
                    decay: 0.2,
                    sustain: 0.3,
                    release: 0.4,
                },
                portamento: 0.5,
                harmonicity: 0.6,
                volume: 0.6,
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
    },
    removeNode(nodes) {
        for (const {id} of nodes) {
            removeAudioNode(id);
        }
    },
    updateNode(id, data) {
        updateAudioNode(id, data);
        set({
            nodes: get().nodes.map(node =>
                node.id === id
                    ? { ...node, data: { ...node.data, ...data } }
                    : node
            )
        });
    },
    isRunning: false,
    toggleAudio() {
        set({ isRunning: !get().isRunning });
    },
}));