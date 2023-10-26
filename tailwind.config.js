/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "text-teal-600",
    "bg-teal-500",
    "bg-teal-300",
    "text-blue-600",
    "bg-blue-500",
    "bg-blue-300",
    "text-yellow-600",
    "bg-yellow-500",
    "bg-yellow-300",
    "text-green-600",
    "bg-green-500",
    "bg-green-300",
    "text-purple-600",
    "bg-purple-500",
    "bg-purple-300",
    "text-red-600",
    "bg-red-500",
    "bg-red-300",
    "text-indigo-600",
    "bg-indigo-500",
    "bg-indigo-300",
    "text-pink-600",
    "bg-pink-500",
    "bg-pink-300",
    "text-orange-600",
    "bg-orange-500",
    "bg-orange-300",
    "text-gray-600",
    "bg-gray-500",
    "bg-gray-300",
    "text-cyan-600",
    "bg-cyan-500",
    "bg-cyan-300",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        mont: ["var(--font-mont)", ...fontFamily.sans],
      },
      colors: {
        dark: "#1b1b1b",
        light: "#f5f5f5",
        primary: "#B63E96", // 240,86,199
        primaryDark: "#58E6D9", // 80,230,217
        teal: {
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
        },
        blue: {
          100: "#BEE3F8",
          200: "#90CDF4",
          300: "#63B3ED",
          400: "#4299E1",
          500: "#3182CE",
          600: "#2B6CB0",
          700: "#2C5282",
          800: "#2A4365",
          900: "#1A365D",
        },
        yellow: {
          100: "#FEFCBF",
          200: "#FAF089",
          300: "#F6E05E",
          400: "#ECC94B",
          500: "#D69E2E",
          600: "#B7791F",
          700: "#975A16",
          800: "#744210",
          900: "#5F370E",
        },
        green: {
          100: "#C6F6D5",
          200: "#A7F1B0",
          300: "#69E66E",
          400: "#3DCC5E",
          500: "#27AE60",
          600: "#199473",
          700: "#147D64",
          800: "#0C6B58",
          900: "#014B40",
        },
        purple: {
          100: "#D9C3F0",
          200: "#BAA0E7",
          300: "#8C76DA",
          400: "#7254A6",
          500: "#553C9A",
          600: "#44337A",
          700: "#392762",
          800: "#26103D",
          900: "#1C0920",
        },
        red: {
          100: "#FED7D7",
          200: "#FEB2B2",
          300: "#FC8181",
          400: "#F56565",
          500: "#E53E3E",
          600: "#C53030",
          700: "#9B2C2C",
          800: "#822727",
          900: "#63171B",
        },
        indigo: {
          100: "#B2AEEA",
          200: "#8981E7",
          300: "#695DD9",
          400: "#667EEA",
          500: "#5A67D8",
          600: "#4D53C2",
          700: "#3E4F63",
          800: "#363F39",
          900: "#1F2937",
        },
        pink: {
          100: "#FED7E2",
          200: "#FBB6CE",
          300: "#F687B3",
          400: "#ED64A6",
          500: "#D53F8C",
          600: "#B83280",
          700: "#97266D",
          800: "#702459",
          900: "#521B41",
        },
        orange: {
          100: "#FEEBC8",
          200: "#FBD38D",
          300: "#F6AD55",
          400: "#FF8E53",
          500: "#DD6B20",
          600: "#C05621",
          700: "#9C4221",
          800: "#7B341E",
          900: "#652B19",
        },
        gray: {
          100: "#E2E8F0",
          200: "#CBD5E0",
          300: "#A0AEC0",
          400: "#718096",
          500: "#4A5568",
          600: "#2D3748",
          700: "#1F2937",
          800: "#161E2E",
          900: "#101C27",
        },
        cyan: {
          100: "#CFFAFE",
          200: "#A5F3FC",
          300: "#67E8F9",
          400: "#6D7EFA",
          500: "#93C5FD",
          600: "#2F7DA2",
          700: "#185A9D",
          800: "#153E75",
          900: "#1A365D",
        },
      },

      animation: {
        "spin-slow": "spin 8s linear infinite",
      },
      backgroundImage: {
        circularLight:
          "repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#f5f5f5 5px,#f5f5f5 100px)",

        circularDark:
          "repeating-radial-gradient(rgba(255,255,255,0.5) 2px,#1b1b1b 8px,#1b1b1b 100px)",

        circularLightLg:
          "repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#f5f5f5 5px,#f5f5f5 80px)",

        circularDarkLg:
          "repeating-radial-gradient(rgba(255,255,255,0.5) 2px,#1b1b1b 8px,#1b1b1b 80px)",

        circularLightMd:
          "repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#f5f5f5 5px,#f5f5f5 60px)",

        circularDarkMd:
          "repeating-radial-gradient(rgba(255,255,255,0.5) 2px,#1b1b1b 6px,#1b1b1b 60px)",

        circularLightSm:
          "repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#f5f5f5 5px,#f5f5f5 40px)",

        circularDarkSm:
          "repeating-radial-gradient(rgba(255,255,255,0.5) 2px,#1b1b1b 4px,#1b1b1b 40px)",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "479px" },
      // => @media (max-width: 479px) { ... }
    },
  },
  plugins: [],
};
