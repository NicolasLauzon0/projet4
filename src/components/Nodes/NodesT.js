const menuProject = [
    {
        name: "Projet",
        children: [
            {
                name: "Sauvegarder",
                type: "save",
            },
            {
                name: "Charger",
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
                name: "Sortie",
                type: "out",
            },
        ],
    },
    {
        name: "Instruments",
        children: [
            {
                name: "Sons de base",
                type: "sampler",
            },
            {
                name: "Synthétiseur AM",
                type: "amSynth",
            },
        ],
    },
    {
        name: "Effets",
        children: [
            {
                name: "Gain/Volume",
                type: "gain",
            },
            {
                name: "Filtre",
                type: "autoFilter",
            },
            {
                name: "Réverbération",
                type: "reverb",
            },
            {
                name: "Delay",
                type: "feedbackDelay",
            }, 
            {
                name: "Pitch modulator",
                type: "pitchShift",
            }
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
                name: "BPM/Tempo",
                type: "bpm",
            }
        ],
    },
];

export { menu, menuProject };