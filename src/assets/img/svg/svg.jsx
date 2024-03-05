const svgs = [
    {
        text: "Sine",
        value: "sine",
        svg: (
            <svg
                width="36"
                height="28"
                viewBox="0 0 36 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M1 27C10.1624 25.5585 11.0786 2.49636 17.4923 1.05496C23.9059 -0.386427 24.8221 27 34.9007 27"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        text: "Triangle",
        value: "triangle",
        svg: (
            <svg
                width="37"
                height="31"
                viewBox="0 0 37 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M1.11914 30L17.7556 2L35.6477 30"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        text: "Square",
        value: "square",
        svg: (
            <svg
                width="34"
                height="31"
                viewBox="0 0 34 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M1.35498 30V1H32.7446V30"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        text: "Sawtooth",
        value: "sawtooth",
        svg: (
            <svg
                width="38"
                height="33"
                viewBox="0 0 38 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M1 32V3L36.1563 32"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
];

export default svgs;