import {
    applyNodeChanges,
    applyEdgeChanges,
} from 'reactflow';
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

const MIN_DISTANCE = 1000;

console.log("Store.js");

export const useStore = createWithEqualityFn((set, get) => ({
    nodes: [{
        id: "1",
        type: "out",
        data: {},
        position: { x: 0, y: 0 },
    }],


    edges: [],
    createNode(type) {
        const id = nanoid();
        switch (type) {
            case "pluckSynth": {
                const data = {
                    attackNoise: 1,
                    dampening: 4000,
                    resonance: 0.7,
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
                        }
                    ],
                });
                break;
            }
            case "membraneSynth": {
                const data = {
                    pitchDecay: 5,
                    octaves: 5,
                    oscillator: {
                        type: "sine",
                    },
                    envelope: {
                        attack: 0.5,
                        decay: 0.5,
                        sustain: 0.5,
                        release: 0.5,
                    },
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
                    harmonicity: 5,
                    detune: 0,
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
            case "duoSynth": {
                const data = {
                    vibratoAmount: 0.5,
                    vibratoRate: 1000,
                    harmonicity: 10,
                    voice0: {
                        portamento: 1,
                        oscillator: {
                            type: "sine",
                        },
                        filterEnvelope: {
                            attack: 0.5,
                            decay: 0.5,
                            sustain: 0.5,
                            release: 0.5
                        },
                        envelope: {
                            attack: 0.5,
                            decay: 0.5,
                            sustain: 0.5,
                            release: 0.5
                        }
                    },
                    voice1: {
                        portamento: 0,
                        oscillator: {
                            type: "sine",
                        },
                        filterEnvelope: {
                            attack: 0.5,
                            decay: 0.5,
                            sustain: 0.5,
                            release: 0.5
                        },
                        envelope: {
                            attack: 0.5,
                            decay: 0.5,
                            sustain: 0.5,
                            release: 0.5
                        }
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
            case "fmSynth": {
                const data = {
                    harmonicity: 10,
                    modulationIndex: 10,
                    detune: 0,
                    oscillator: {
                        type: "sine",
                    },
                    envelope: {
                        attack: 0.5,
                        decay: 0.5,
                        sustain: 0.5,
                        release: 0.5
                    },
                    modulation: {
                        type: "sine",
                    },
                    modulationEnvelope: {
                        attack: 0.5,
                        decay: 0.5,
                        sustain: 0.5,
                        release: 0.5
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
            case "monoSynth": {
                const data = {
                    oscillator: {
                        type: "sine",
                    },
                    envelope: {
                        attack: 0.5,
                        decay: 0.5,
                        sustain: 0.5,
                        release: 0.5
                    },
                    filterEnvelope: {
                        attack: 0.5,
                        decay: 0.5,
                        sustain: 0.5,
                        release: 0.5,
                    },
                    detune: 0,
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
                    depth: 0.5,
                    frequency: 2000,
                    octaves: 5,
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
                    decay: 5,
                    preDelay: 1,
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
                    delayTime: 0.5,
                    feedback: 0.5,
                    maxDelay: 2,
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
            case "bitCrusher": {
                const data = {
                    bits: 8,
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
            case "cheby": {
                const data = {
                    order: 50,
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
            case "add": {
                const data = {
                    value: 0.5,
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
            case "chorus": {
                const data = {
                    delayTime: 3.5,
                    depth: 0.5,
                    feedback: 0.5,
                    frequency: 1.5,
                    spread: 180,
                    type: "sine",
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
        set({ nodes: [], edges: [] });
    },
    async createNodeFromData(dataRef) {
        const id = await dataRef.id;
        const type = await dataRef.type;
        const position = await dataRef.position;
        const data = await { ...dataRef.data };

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
    onConnect(data) {
        const id = nanoid(6);
        const edge = { id, ...data, animated: true, className: "" };
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
        Array.from(edges).forEach((edge) => {
            disconnect(edge);
        });
    },
    isValidConnection(connection) {
        const source = get().nodes.find((node) => node.id === connection.source);
        const target = get().nodes.find((node) => node.id === connection.target);

        if (source.id === target.id) {
            console.log("Source and target are the same");
            return false;
        }

        const sourceType = source.type;
        const targetType = target.type;
        console.log(sourceType, targetType);


        const instrumentTypes = ["sampler", "fmSynth", "monoSynth", "duoSynth", "amSynth", "membraneSynth", "pluckSynth"];
        const effectTypes = ["autoFilter", "bpm", "reverb", "feedbackDelay", "pitchShift", "bitCrusher", "cheby", "add", "chorus"];
        const sequencerTypes = ["sequencer"];

        if (instrumentTypes.includes(sourceType) && instrumentTypes.includes(targetType)) {
            return false;
        } else if (effectTypes.includes(sourceType) && instrumentTypes.includes(targetType)) {
            return false;
        } else if (sequencerTypes.includes(sourceType) && effectTypes.includes(targetType)) {
            return false;
        } else if (sequencerTypes.includes(sourceType) && targetType === "out") {
            return false;
        }
        else {
            return true;
        }
    },
    async loadProject(data) {
        data.nodes.forEach((node) => {
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
    removeEdge(id) {
        set((state) => ({
            edges: state.edges.filter((edge) => edge.id !== id),
        }));
    },
    updateNode(id, data) {
        const updateNestedData = (nodeData, newData) => {
            for (const [key, val] of Object.entries(newData)) {
                if (typeof val === 'object' && !Array.isArray(val)) {
                    const nestedNode = nodeData[key];
                    if (nestedNode && typeof nestedNode === 'object') {
                        updateNestedData(nestedNode, val);
                    } else {
                        nodeData[key] = { ...val };
                    }
                } else {
                    nodeData[key] = val;
                }
            }
        };
        updateAudioNode(id, data);
        set((state) => ({
            nodes: state.nodes.map((node) => {
                if (node.id === id) {
                    const updatedData = { ...node.data };
                    updateNestedData(updatedData, data);
                    return { ...node, data: updatedData };
                } else {
                    return node;
                }
            }),
        }));
    },

    isRunning: isRunning(),
    toggleVolume() {
        toggleAudio().then(() => {
            set({ isRunning: isRunning() });
        });
    },
}));