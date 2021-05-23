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
                28: '7rem',
                35: '8.75rem',
                75: '18.75rem',
                125: '31.25rem',
                195: '48.75rem',
                '350px': '350px',
                '400px': '400px',
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
            boxShadow: {},
            borderColor: {},
            borderRadius: {
                '12px': '12px',
                '16px': '16px',
                '26px': '26px',
                '30px': '30px',
            },
            gap: {},
            zIndex: {
                '-1': '-1',
            },
            gradientColorStops: {
                blackGradient: '#00000099',
            },
            keyframes: {},
            screens: {
                ss: '376px',
                xs: '426px',
                sm: '641px',
                md: '769px',
                lg: '1025px',
                xl: '1281px',
            },
        },
    },
    variants: {
        borderWidth: ['last'],
        stroke: ['group-hover', 'hover'],
        textColor: ['group-hover', 'hover'],
        display: ['responsive', 'hover', 'focus', 'group-hover'],
        rotate: ['group-hover'],
        margin: ['group-hover', 'responsive', 'hover'],
        opacity: ['group-hover'],
    },
    plugins: [],
};
