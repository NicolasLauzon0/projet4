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
            {
                name: "Synthétiseur FM",
                type: "fmSynth",
            },
            {
                name: "Synthétiseur Duo",
                type: "duoSynth",
            },
            {
                name: "Synthétiseur Mono",
                type: "monoSynth",
            },
            {
                name: "Synthétiseur de membrane",
                type: "membraneSynth",
            },
            {
                name: "Synthétiseur de pluck",
                type: "pluckSynth",
            }
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
                name: "Moduleur de pitch",
                type: "pitchShift",
            },
            {
                name: "BitCrusher",
                type: "bitCrusher",
            },
            {
                name: "Cheby",
                type: "cheby",
            },
            {
                name: "Addition",
                type: "add",
            }
        ],
    },

    {
        name: "Audio",
        children: [
            {
                name: "Sortie",
                type: "out",
            },
        ],
    },
];

export { menu, menuProject };