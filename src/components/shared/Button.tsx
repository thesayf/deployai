import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  ["uppercase", "transition-all", "duration-200", "font-semibold"],
  {
    variants: {
      intent: {
        primary: [
          "bg-gradient-to-r",
          "from-orange-500",
          "to-red-500",
          "hover:from-orange-600",
          "hover:to-red-600",
          "text-white",
          "shadow-lg",
          "hover:shadow-xl",
          "hover:scale-105",
          "active:scale-95",
          "border-2",
          "border-orange-400",
        ],
        secondary: ["bg-zinc-900", "hover:bg-zinc-700", "text-white"],
        outline: ["bg-white", "hover:bg-zinc-200", "border", "border-zinc-900"],
        cta: [
          "bg-gradient-to-r",
          "from-orange-500",
          "to-red-500",
          "hover:from-orange-600",
          "hover:to-red-600",
          "text-white",
          "shadow-2xl",
          "hover:shadow-3xl",
          "hover:scale-110",
          "active:scale-95",
          "border-2",
          "border-orange-400",
          "ring-4",
          "ring-orange-200",
          "animate-pulse",
          "hover:animate-none",
        ],
      },
      size: {
        small: ["px-3", "py-1.5", "rounded-md", "text-sm"],
        medium: ["p-3", "rounded-lg", "text-base"],
        large: [
          "px-8",
          "py-4",
          "rounded-xl",
          "text-lg",
          "md:px-10",
          "md:py-5",
          "md:text-xl",
        ],
      },
    },
    compoundVariants: [
      { intent: "primary", size: "medium", class: "uppercase" },
    ],
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  size,
  ...props
}) => <button className={button({ intent, size, className })} {...props} />;
