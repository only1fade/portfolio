/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: "#bac8bd",
          dark: "#0A0A0A",
        },
        sage: {
          DEFAULT: "#99AD9F",
          dark: "#7A8C80",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          light: "#2A2A2A",
        },
        oxblood: {
          DEFAULT: "#7F1D1D",
          light: "#991B1B",
        },
        navy: {
          DEFAULT: "#1E3A8A",
        },
      },
      fontFamily: {
        sans: ["Inter", "Geist Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        rude: ["Rude", "Ruda", "sans-serif"],
        display: ["Outfit", "sans-serif"],
        archivo: ["Archivo Black", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        signature: ["Momo Signature", "cursive"],
        changa: ["Changa One", "sans-serif"]
      },
    },
  },
  plugins: [],
};
