import React, { ReactNode } from "react";

export const SectionSubheading = ({ children }: { children: ReactNode }) => {
  return (
    <p className="mx-auto mb-8 max-w-3xl text-center text-base leading-relaxed md:mb-12 md:text-xl md:leading-relaxed">
      {children}
    </p>
  );
};
