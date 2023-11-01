/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        kfield: "#EEEEEE",
        error: "#FF5757",
        kTextColor2: "#949494",
        kTextColor1: "#434343",
      },
    },
  },
  plugins: [],
};
