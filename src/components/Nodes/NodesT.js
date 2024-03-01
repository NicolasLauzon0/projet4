const menuProject = [
    {
        name: "Project",
        children: [
            {
                name: "Save",
                type: "save",
            },
            {
                name: "Load",
                type: "load",
            },
        ],
    },
];
const menu = [
    {
        name: "Audio",
        children: [
            {
                name: "Ouput",
                type: "out",
            },
        ],
    },
    {
        name: "Instruments",
        children: [
            {
                name: "Sampler",
                type: "sampler",
            },
            {
                name: "Oscillateur",
                type: "oscillator",
            },
            {
                name: "AM Synth",
                type: "amSynth",
            },
        ],
    },
    {
        name: "Effets",
        children: [
            {
                name: "Gain",
                type: "gain",
            },
            {
                name: "AutoFilter",
                type: "autoFilter",
            },
            {
                name: "Reverb",
                type: "reverb",
            },
            {
                name: "FeedBackDelay",
                type: "feedbackDelay",
            },
        ],
    },
    {
        name: "Rythme et Séquence",
        children: [
            {
                name: "Séquenceur",
                type: "sequencer",
            },
            {
                name: "BPM",
                type: "bpm",
            }
        ],
    },
];

export { menu, menuProject };