import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deploy AI Studio — Slalom-measured palette (source of truth: mock-home.html :root)
        blue: "#0C62FB",
        royal: "#002FAF",
        navy: "#000A25",
        statnavy: "#020A23",
        indigo: "#0F1C41",
        ltblue: "#6DA1FD",
        brightblue: "#2472FB",
        peri: "#B6D0FE",
        lime: "#DEFF4D",
        coral: "#FF7987",
        cyan: "#1BE1F2",
        red: "#FF4D5F",
        lavender: "#C7B9FF",
        ink: "#292929",
        field: "#F5F5F5",
        grey: "#696969",
      },
      fontFamily: {
        sans: ["var(--font-hanken)", "Helvetica Neue", "Arial", "sans-serif"],
        serif: ["var(--font-lora)", "Georgia", "serif"],
      },
      maxWidth: {
        wrap: "1720px",
        narrow: "1456px",
      },
    },
  },
  plugins: [],
};
export default config;
