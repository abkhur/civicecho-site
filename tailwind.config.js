// tailwind.config.js
export const content = [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
    extend: {
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
            serif: ['Roboto', 'serif'],
        },
        colors: {
            // Custom colors for dark mode (if you want to change them from default)
            darkBackground: '#121212',
            darkText: '#e0e0e0',
            darkCard: '#333333',
        }
    },
};
export const darkMode = 'class';
export const plugins = [];
  