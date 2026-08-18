import { Hanken_Grotesk, Lora, Roboto } from "next/font/google";

// Legacy export — kept for the dormant SaaS/template generator (DynamicTemplate,
// old marketing pages). Not used by the new marketing site. Do not build on it.
export const font = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

// Deploy AI Studio type system. Sans headings are weight 300 (not bold);
// the serif accent is Lora italic, used only for the emphasized word in a heading.
export const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-hanken",
});

export const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  display: "swap",
  variable: "--font-lora",
});

export const fontVariables = `${hanken.variable} ${lora.variable}`;
