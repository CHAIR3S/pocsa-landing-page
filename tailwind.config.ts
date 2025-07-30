import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          a0: "#976222",
          a10: "#919722",
          a20: "#579722",
          a30: "#225797",
          a40: "#622297",
        },
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to right, #976222, #919722, #579722, #225797, #622297)",
      },
    },
  },
  plugins: [],
};

export default config;
