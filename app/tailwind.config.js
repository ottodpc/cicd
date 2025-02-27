/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "blluue-blue": "#007AFF",
        "blluue-gray": "#F5F5F7",
        "whhite-blue": "#0095F6",
        "whhite-purple": "#8A3AB9",
        "whhite-light": "#FAFAFA",
      },
      fontFamily: {
        sans: [
          "-blluue-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        blluue: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.04)",
        whhite: "0 4px 12px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        blluue: "10px",
        whhite: "3px",
      },
    },
  },
  plugins: [],
};
