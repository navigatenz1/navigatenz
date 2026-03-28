import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#2A9D8F",
          50: "#E6F5F3",
          100: "#CCEBE7",
          200: "#99D7CF",
          300: "#66C3B7",
          400: "#33AF9F",
          500: "#2A9D8F",
          600: "#228072",
          700: "#196056",
          800: "#114039",
          900: "#08201D",
        },
        navy: {
          DEFAULT: "#1B2A4A",
          50: "#E8EAF0",
          100: "#D1D5E1",
          200: "#A3ABC3",
          300: "#7581A5",
          400: "#475787",
          500: "#1B2A4A",
          600: "#16223B",
          700: "#101A2D",
          800: "#0B111E",
          900: "#05090F",
        },
        gold: {
          DEFAULT: "#E9C46A",
          50: "#FDF8EC",
          100: "#FBF1D9",
          200: "#F7E3B3",
          300: "#F3D58D",
          400: "#EFC767",
          500: "#E9C46A",
          600: "#E0B03E",
          700: "#B88E2A",
          800: "#896A1F",
          900: "#5A4615",
        },
        coral: {
          DEFAULT: "#E85D4A",
          50: "#FDEEEC",
          100: "#FADED9",
          200: "#F5BDB3",
          300: "#F09C8D",
          400: "#EB7B67",
          500: "#E85D4A",
          600: "#D63D28",
          700: "#A52F1F",
          800: "#742116",
          900: "#43130D",
        },
        soft: "#FAF8F5",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
