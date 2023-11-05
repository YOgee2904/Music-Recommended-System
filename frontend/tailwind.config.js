/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#0A0E32", 
        "secondary": "#0D1137", 
        "icon-background" :"#131B4B",
        "icon": "#506BED",
      }
    },
  },
  plugins: [],
};
