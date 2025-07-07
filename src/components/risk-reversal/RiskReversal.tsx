import React from "react";
import { motion } from "framer-motion";
import { CardSpotlight } from "../ui/card-spotlight";

export const RiskReversal = () => {
  return (
    <section className="bg-zinc-900 px-4 py-24 text-zinc-50">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{
            scale: 0.5,
            y: 50,
            opacity: 0,
          }}
          whileInView={{
            scale: 1,
            y: 0,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            mass: 3,
            stiffness: 400,
            damping: 50,
          }}
        >
          <CardSpotlight
            className="border border-zinc-700 bg-zinc-800 p-8 text-3xl leading-snug"
            spotlightColor="rgba(249, 115, 22, 0.2)"
          >
            <p>
              Risk Free Development.{" "}
              <span className="text-zinc-400">
                Get started with just 25% down payment and only pay the
                remaining balance when your custom software is delivered and
                operational. No hidden fees, no upfront risks - just complete
                confidence in your investment.
              </span>
            </p>
          </CardSpotlight>
        </motion.div>
      </div>
    </section>
  );
};
