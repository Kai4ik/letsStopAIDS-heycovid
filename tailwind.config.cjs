/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    }),
  ],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    extend: {
      zIndex: {
        80: "80",
        90: "90",
        100: "100",
      },
      fontFamily: {
        lexend: [
          "Lexend",
          {
            fontVariationSettings: '"wght" 400',
          },
        ],
        headings: ["Almarai", "Helvetica"],
        paragraphs: ["Lexend", "Helvetica"],
      },
      colors: {
        "base-yellow": "#FFCA0E",
        "base-green": "#9CCA62",
        "base-pink": "#FF70C3",
        "base-blue": "#48BDFF",
      },
    },
  },
};
