import React from "react";

interface ScreenDemoProps {
  children: React.ReactNode;
  className?: string;
}

export const ScreenDemo: React.FC<ScreenDemoProps> = ({ children, className = "" }) => {
  return (
    <div className={`w-full h-full p-6 ${className}`}>
      {children}
    </div>
  );
};