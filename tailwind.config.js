/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}", "src/**/*.{html,js,jsx,scss}"],
  theme: {
    extend: {
      colors: {
        gray: "rgba(34,37,43,.7)",
        primary: "#0663ef",
        secondary: "#ebf3fe",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
