import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { FiX } from "react-icons/fi";

export const Announcement = () => {
  const [dismissed, setDismissed] = useState(false);
  return (
    <div className="overflow-hidden">
      <AnimatePresence>
        {dismissed || (
          <motion.div
            className="relative"
            exit={{
              height: "-0px",
            }}
          >
            <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
              <Link
                href="https://calendly.com/hello-deployai/30min"
                target="_blank"
                className="flex items-center justify-center gap-2 text-sm text-white hover:underline"
              >
                <span className="font-semibold">🎉 Limited Time</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">
                  Save 40% on AI Strategy Calls - Ends This Friday!
                </span>
                <span className="sm:hidden">40% OFF - Ends Friday!</span>
              </Link>
              <button
                onClick={() => setDismissed(true)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
