import Link from "next/link";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { Button } from "../shared/Button";

export const Copy = () => {
  return (
    <>
      <div className="mb-1.5 rounded-full bg-zinc-600">
        <Link
          href="https://www.producthunt.com/"
          target="_blank"
          rel="nofollow"
          className="flex origin-top-left items-center rounded-full border border-zinc-900 bg-white p-0.5 text-sm transition-transform hover:-rotate-2"
        >
          <span className="rounded-full bg-[#FF6154] px-2 py-0.5 font-medium text-white">
            HEY!
          </span>
          <span className="ml-1.5 mr-1 inline-block">
            We're live on Product Hunt!
          </span>
          <FiArrowUpRight className="mr-2 inline-block" />
        </Link>
      </div>
      <h1 className="max-w-4xl text-center text-4xl font-black leading-[1.15] md:text-7xl md:leading-[1.15]">
        Deploy AI Into Your Business in 30 Days
      </h1>
      <p className="mx-auto my-4 max-w-3xl text-center text-base leading-relaxed md:my-6 md:text-2xl md:leading-relaxed">
        Stop paying $5K-$20K monthly for tools you don't own. Deploy custom AI
        solutions that eliminate recurring fees and automate your biggest
        challenges.
      </p>
      <Button>
        <span className="font-bold">Get started - </span> no CC required
      </Button>
    </>
  );
};
