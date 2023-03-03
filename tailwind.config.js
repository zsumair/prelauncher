/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // extends: {},
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        xl: "1140px",
        "2xl": "1140px",
      },
    },
  },
  plugins: [require("daisyui")],
};
