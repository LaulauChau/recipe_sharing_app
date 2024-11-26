const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};

module.exports = config;
