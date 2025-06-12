module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./context/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        'ml-20',
        'w-fit',
        'text-3xl',
        'bg-yellow-100',
        'bg-blue-100',
        'border',
        'border-red-500',
        'border-green-600',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    darkMode: "class",
};
