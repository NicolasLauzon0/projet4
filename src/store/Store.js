import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { nanoid } from "nanoid";
import { createWithEqualityFn } from "zustand/traditional";

export const useStore = createWithEqualityFn((set, get) => ({
    nodes: [
        {
            id: "1",
            type: "input",
            data: { label: "Input Node" },
            position: { x: 250, y: 25 },
        },
        {
            id: "2",
            data: { label: "Another Node" },
            position: { x: 100, y: 125 },
        },
        {
            id: "3",
            data: { label: "Node 3" },
            position: { x: 400, y: 125 },
        }
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
    updateNode(id, data) {
        set({
            nodes: get().nodes.map((node) => {
                node.id === id ? { ...node, data } : node;
            }
            ),
        },
        );
    }
}));