const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            screens: {
                desk: '1440px',
            },
            colors: {
                'semi-white': '#F7F8FA',
                'cancel-white': '#E0E0E0',
                'natural-white': '#fff',
                'option-white': 'rgba(255, 255, 255, 0.50)',
                'scroll-white': '#9BD0AF',
                'light-grey': 'rgba(29, 30, 33, 0.40)',
                'border-grey': 'rgba(29, 30, 33, 0.10)',
                'modal-grey': 'rgba(29, 30, 33, 0.30)',
                'medium-grey': '#E6E6E6',
                'icon-grey': '#DCDDDF',
                'main-black': '#1D1E21',
                'light-black': 'rgba(29, 30, 33, 0.80)',
                'mint-green': '#E7F1ED',
                'light-green': '#59B17A',
                'l-green': 'rgba(89, 177, 122, 0.10)',
                'klein-blue': '#3A75C4',
                'light-aqua': 'rgba(126, 252, 252, 0.10)',
                'violet-eggplant': '#991199',
                'light-thistle': 'rgba(216, 191, 216, 0.10)',
                'main-red': '#E85050',
                'light-red': 'rgba(232, 80, 80, 0.10)',
                purple: '#CC8899',
                'light-purple': 'rgba(128, 89, 228, 0.10)',
                orange: '#F79042',
                'light-orange': 'rgba(247, 144, 66, 0.10)',
                blue: '#70A6E8',
                'light-blue': 'rgba(112, 166, 232, 0.10)',
            },
        },
    },
    darkMode: 'class',
    plugins: [nextui(), require('tailwind-scrollbar')],
};
