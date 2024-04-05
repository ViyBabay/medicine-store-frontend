/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                desk: '1440px',
            },
            colors: {
                'semi-white': '#F7F8FA',
                'light-grey': 'rgba(29, 30, 33, 0.40)',
                'border-grey': 'rgba(29, 30, 33, 0.10)',
                'modal-grey': 'rgba(29, 30, 33, 0.30)',
                'medium-grey': '#E6E6E6',
                'icon-grey': '#DCDDDF',
                'main-black': '#1D1E21',
                'mint-green': '#E7F1ED',
                'light-green': '#59B17A',
                'main-red': '#E85050',
                'light-red': 'rgba(232, 80, 80, 0.10)',
                purple: '#8059E4',
                'light-purple': 'rgba(128, 89, 228, 0.10)',
                orange: '#F79042',
                'light-orange': 'rgba(247, 144, 66, 0.10)',
                blue: '#70A6E8',
                'light-blue': 'rgba(112, 166, 232, 0.10)',
            },
        },
    },
    plugins: [],
};
