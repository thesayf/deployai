import React from "react";
import { MockupScreen } from "./MockupScreen";
import { Copy } from "./Copy";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center px-12 pb-48 pt-16 md:pt-20"
    >
      <Copy />
      {/* <MockupScreen /> */}
    </section>
  );
};
