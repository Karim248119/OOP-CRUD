/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      primary: "#E2E2E2",
      secondary: "#555555",
      black: "#212529",
      white: "#fff",
      palette1: "#FF305B",
      palette2: "#BD30FF",
      palette3: "#3078FF",
      palette4: "#30FFA9",
      palette5: "#FCFF30",
      palette6: "#FF9E30",
      palette7: "#FF3030",
      palette8: "#FF30A9",
    },
    extend: {
      aspectRatio: {
        "8/3": "8 / 3",
        "2/1": "5/3 ",
        "3/1": "3/1 ",
      },
      fontSize: {
        responsive: "clamp(0.5rem, 1vw + 1rem, 0.01rem)",
      },
    },
  },
  plugins: [],
};
