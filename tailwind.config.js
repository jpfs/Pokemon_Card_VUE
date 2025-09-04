/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pokemon: {
          primary: "#667eea",
          secondary: "#764ba2",
          accent: "#f093fb",
        },
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
        "pulse-slow": "pulse 3s infinite",
        "spin-slow": "spin 2s linear infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        pokemon: "0 20px 40px rgba(102, 126, 234, 0.3)",
        "pokemon-hover": "0 25px 50px rgba(102, 126, 234, 0.4)",
      },
    },
  },
  plugins: [],
};
