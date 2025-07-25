import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  ["uppercase", "transition-all", "duration-200", "font-bold", "tracking-wider"],
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
          "border-3",
          "border-black",
          "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
          "hover:-translate-x-0.5",
          "hover:-translate-y-0.5",
          "active:translate-x-0.5",
          "active:translate-y-0.5",
          "active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
        ],
        secondary: [
          "bg-zinc-900",
          "hover:bg-zinc-700",
          "text-white",
          "border-3",
          "border-black",
          "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
          "hover:-translate-x-0.5",
          "hover:-translate-y-0.5",
          "active:translate-x-0.5",
          "active:translate-y-0.5",
          "active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
        ],
        outline: [
          "bg-white",
          "hover:bg-gray-100",
          "text-black",
          "border-3",
          "border-black",
          "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
          "hover:-translate-x-0.5",
          "hover:-translate-y-0.5",
          "active:translate-x-0.5",
          "active:translate-y-0.5",
          "active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
        ],
        cta: [
          "bg-gradient-to-r",
          "from-orange-500",
          "to-red-500",
          "hover:from-orange-600",
          "hover:to-red-600",
          "text-white",
          "border-3",
          "border-black",
          "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
          "hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
          "hover:-translate-x-1",
          "hover:-translate-y-1",
          "active:translate-x-0.5",
          "active:translate-y-0.5",
          "active:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
          "animate-pulse",
          "hover:animate-none",
        ],
      },
      size: {
        small: ["px-4", "py-2", "text-sm"],
        medium: ["px-6", "py-3", "text-base"],
        large: [
          "px-8",
          "py-4",
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
