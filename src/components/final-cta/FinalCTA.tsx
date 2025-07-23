import React from "react";
import { Button } from "../shared/Button";
import Image from "next/image";
import { HeadingH2 } from "@/components/heading-h2";

export const FinalCTA = () => {
  return (
    <section id="final-cta" className="bg-white px-2 py-24 md:px-4">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        {/* Booking Screenshot Image */}
        <div className="mb-10 w-full overflow-hidden rounded-3xl border-4 border-zinc-900 bg-zinc-200 shadow-[8px_8px_0px_0px_rgb(234,88,12)]">
          <a
            href="https://calendly.com/hello-deployai/30min"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book your free call"
          >
            <Image
              src="/booking.png"
              alt="Booking system screenshot"
              width={900}
              height={400}
              className="h-auto w-full cursor-pointer rounded-3xl object-cover transition-transform hover:scale-105"
            />
          </a>
        </div>
        <HeadingH2
          variant="stamp"
          accentColor="red"
          size="xl"
          align="center"
          animate={true}
          className="mb-6"
        >
          Get Your Solution Built in 30 Days
        </HeadingH2>
        <p className="mx-auto mb-8 max-w-3xl text-center text-xl leading-relaxed text-zinc-700 md:text-2xl">
          Book a free strategy call and see how fast you can go from idea to
          launch. No obligation, no credit card required.
        </p>
        {/* Calendly CTA Button */}
        <a
          href="https://calendly.com/hello-deployai/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-lg font-bold text-white shadow-[4px_4px_0px_0px_rgb(234,88,12)] transition-transform hover:scale-105"
        >
          Book Your Free Call
        </a>
      </div>
    </section>
  );
};
