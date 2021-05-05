module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                darkGray: 'hsla(0,0%,100%,.5)',
                nobelGray: '#9C9C9C',
                creamWhite: '#D7FFB8',
                brightGreen: '#4fb802',
                oliveGreen: '#468302',
                mistyRose: '#FFDFE0',
                alizarinRed: '#EA2B2B',
                sunsetOrange: '#FF4B4B',
                successGreen: '#779645',
                primaryColor: '#fff',
                easternBlue: '#0b80b7',
                dodgerBlue: '#38b6f2',
            },
            opacity: {},
            borderWidth: {
                '1.6px': '1.6px',
                '3px': '3px',
                '6px': '6px',
            },
            height: {
                7: '1.75rem',
                35: '8.75rem',
                75: '18.75rem',
                120: '30rem',
            },
            width: {
                7: '1.75rem',
                35: '8.75rem',
                75: '18.75rem',
                125: '31.25rem',
                195: '48.75rem',
            },
            maxWidth: {},
            minWidth: {},
            maxHeight: {},
            minHeight: {},
            lineHeight: {},
            fontSize: {
                '15px': '15px',
            },
            spacing: {
                '1px': '1px',
                '30px': '30px',
            },
            padding: {},
            margin: {},
            inset: {
                '1/2': '50%',
            },
            boxShadow: {
                card:
                    ' -3px -3px 7px #ffffff73, 3px 3px 5px rgba(94, 104, 121, 0.671)',
                'card-active':
                    'inset -3px -3px 7px #ffffff73, inset 3px 3px 5px rgba(94, 104, 121, 0.671)',
            },
            borderColor: {},
            borderRadius: {
                '12px': '12px',
                '16px': '16px',
                '26px': '26px',
                '30px': '30px',
            },
            gap: {},
            zIndex: {},
            gradientColorStops: {
                blackGradient: '#00000099',
            },
            keyframes: {},
        },
    },
    variants: {
        borderWidth: ['last'],
        stroke: ['group-hover', 'hover'],
    },
    plugins: [],
};
