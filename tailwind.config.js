/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--color-primary)",
        "primary-color-light": "var(--color-primary-light)",
        "secondary-color": "var(--color-secondary)",
        "red-color": "var(--color-red)",
        "white-color": "var(--color-white)",
      },
    },
  },
  plugins: [],
});
