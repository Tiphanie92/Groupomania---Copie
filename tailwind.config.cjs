/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        show: {
          "0%": { opacity: "0", zIndex: "1" },
          "49%": {
            opacity: "0",
            zIndex: "1",
          },
          "50%": {
            opacity: "1",
            zIndex: "10",
          },
        },
      },
    },
  },
  plugins: [],
};
