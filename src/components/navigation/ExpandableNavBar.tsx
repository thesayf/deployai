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
      <div className="bg-indigo-600 pt-2">
        <Announcement />
        <nav className="rounded-t-2xl bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Logo />
              <DesktopLinks links={links} />
            </div>
            <a
              href="https://calendly.com/hello-deployai/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border-2 border-zinc-900 bg-zinc-900 px-6 py-2 text-sm font-bold text-white shadow transition-transform hover:scale-105 md:block"
            >
              Book Free AI Strategy Call
            </a>
            <button
              onClick={() => setMobileNavOpen((pv) => !pv)}
              className="block text-2xl md:hidden"
            >
              <FiMenu />
            </button>
          </div>
          <MobileLinks links={links} open={mobileNavOpen} />
        </nav>
      </div>
      <motion.main layout>
        <div className="bg-white">{children}</div>
      </motion.main>
    </>
  );
};
