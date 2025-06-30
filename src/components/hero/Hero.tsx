import React from "react";
import { MockupScreen } from "./MockupScreen";
import { Copy } from "./Copy";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center px-12 pb-48 pt-10 md:pt-12"
    >
      <Copy />
      {/* <MockupScreen /> */}
    </section>
  );
};
