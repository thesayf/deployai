import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LinkType } from "./constants";

export const MobileLinks = ({
  links,
  open,
}: {
  links: LinkType[];
  open: boolean;
}) => {
  return (
    <AnimatePresence mode="popLayout">
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden border-t border-zinc-200 md:hidden"
        >
          <div className="space-y-1 py-4">
            {links.map((l) => (
              <a
                key={l.title}
                href={l.href}
                className="block rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-orange-600"
              >
                {l.title}
              </a>
            ))}
            <div className="mt-4 px-4">
              <a
                href="https://calendly.com/hello-deployai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-full border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2 text-center text-sm font-bold text-white shadow-[3px_3px_0px_#18181b]"
              >
                Book Free AI Strategy Call
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
