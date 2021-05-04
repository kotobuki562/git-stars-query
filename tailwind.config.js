const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    colors: {
      red: colors.rose,
      yellow: colors.amber,
      blue: colors.blue,
      teal: colors.teal,
      white: colors.white,
      gray: colors.gray,
      HTML: "#E34C25",
      CSS: "#563D7C",
      JavaScript: "#F0E05A",
      TypeScript: "#2B7489",
      Vue: "#2C3E4F",
      Elixir: "#6E4B7E",
      Dart: "#00B4AA",
      Lue: "#010080",
      SCSS: "#C6538C",
      Docker: "#384C54",
      Python: "#3573A5",
      Ruby: "#701417",
      PHP: "#4F5D95",
      "C++": "#F34B7D",
      C: "#555555",
      Shell: "#88E051",
      Other: "#EDEDED",
      M4: "#CCCCCC",
      Go: "#03ADD8",
      Assemby: "#6E4C14",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
