/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05070D",
        navy: "#0A1226",
        "navy-2": "#0F1B38",
        "navy-3": "#182a54",
        royal: "#2A4AA0",
        "royal-light": "#5578CC",
        "royal-dim": "#16234A",
        gold: "#C7A15C",
        "gold-light": "#E7D2A0",
        ash: "#8E9AB8",
        "ash-dim": "#5C6584",
        paper: "#F4F5F8",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Manrope'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-fine": "linear-gradient(rgba(142,154,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(142,154,184,0.08) 1px, transparent 1px)",
      },
      keyframes: {
        drift: {
          "0%,100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(12px,-16px)" },
        },
        pulseGlow: {
          "0%,100%": { opacity: 0.35 },
          "50%": { opacity: 0.75 },
        },
        dash: {
          to: { strokeDashoffset: "0" },
        },
        flowDot: {
          "0%": { offsetDistance: "0%", opacity: 0 },
          "8%": { opacity: 1 },
          "92%": { opacity: 1 },
          "100%": { offsetDistance: "100%", opacity: 0 },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        drift: "drift 9s ease-in-out infinite",
        pulseGlow: "pulseGlow 6s ease-in-out infinite",
        fadeUp: "fadeUp 0.8s cubic-bezier(.16,1,.3,1) forwards",
      },
    },
  },
  plugins: [],
}
