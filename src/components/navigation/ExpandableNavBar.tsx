import React, { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { Logo } from "./Logo";
import { DesktopLinks } from "./DesktopLinks";
import { MobileLinks } from "./MobileLinks";
import { Announcement } from "./Announcement";
import { Button } from "../shared/Button";
import { LinkType } from "./constants";

export const ExpandableNavBar = ({
  children,
  links,
}: {
  children?: ReactNode;
  links: LinkType[];
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-50">
        <div className="bg-indigo-600">
          <Announcement />
        </div>
        <nav className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Logo />
                <DesktopLinks links={links} />
              </div>
              <a
                href="https://calendly.com/hello-deployai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-full border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2 text-sm font-bold text-white shadow-[3px_3px_0px_#18181b] transition-all hover:scale-105 hover:shadow-[4px_4px_0px_#18181b] md:inline-flex"
              >
                Book Free AI Strategy Call
              </a>
              <button
                onClick={() => setMobileNavOpen((pv) => !pv)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-zinc-900 bg-white text-zinc-900 shadow-[2px_2px_0px_#18181b] transition-all hover:shadow-[3px_3px_0px_#18181b] md:hidden"
              >
                <FiMenu className="h-5 w-5" />
              </button>
            </div>
            <MobileLinks links={links} open={mobileNavOpen} />
          </div>
        </nav>
      </div>
      <motion.main layout>
        <div className="bg-white">{children}</div>
      </motion.main>
    </>
  );
};
