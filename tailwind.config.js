const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "0px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.75rem" }],
      lg: ["1.125rem", { lineHeight: "2rem" }],
      xl: ["1.25rem", { lineHeight: "2rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["2rem", { lineHeight: "2.5rem" }],
      "4xl": ["2.5rem", { lineHeight: "3.5rem" }],
      "5xl": ["3rem", { lineHeight: "3.5rem" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1.1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    extend: {
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        "cyber-grape-700": "#362D52",
        "cyber-grape-600": "#413663",
        "cyber-grape-500": "#4B3F72",
        "cyber-grape-400": "#5F5092",
        "cyber-grape-300": "#7666AB",
        "cyber-grape-250": "#9285BC",
        "cyber-grape-200": "#ADA3CD",
        "cyber-grape-150": "#BBB3D5",
        "cyber-grape-100": "#D6D1E6",
        "cyber-grape-50": "#F1F0F7",
        "cyber-grape-tone-1": "#4E456E",
        "cyber-grape-tone-2": "#514A68",
        "cyber-grape-hue-400": "#3F4573",
        "cyber-grape-hue-200": "#3F5673",
        "cyber-grape-hue-600": "#5D3F73",
        "cyber-grape-hue-800": "#6F3F73",

      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ["Lexend", ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        "2xl": "40rem",
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
};
