/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "react-select__value-container",
    "react-select__control",
    "react-select__input-container",
    "react-select__input",
    "react-select__indicator",
    "react-select__indicator-separator",
    "react-select__placeholder",
    "react-select__single-value",
    "react-select__option",
    "react-select__menu",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
