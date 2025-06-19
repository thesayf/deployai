import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

const NAV_LINKS = [
  { title: "How It Works", href: "#how-it-works" },
  { title: "Case Studies", href: "#case-studies" },
  { title: "Testimonials", href: "#testimonials" },
  { title: "Pricing", href: "#pricing" },
];

export const ModernNavBar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <p className="text-center text-sm font-medium text-white">
              <span className="inline-flex items-center gap-2">
                🎉 Limited Time: Save 40% on AI Strategy Calls - Ends This Friday!
                <Link
                  href="https://calendly.com/hello-deployai/30min"
                  target="_blank"
                  className="underline hover:no-underline"
                >
                  Book Now →
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <img
                  src="/logo.png"
                  alt="deployAI"
                  className="h-8 w-auto"
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:ml-10 md:flex md:items-center md:space-x-8">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    className="text-sm font-medium text-zinc-700 hover:text-orange-600 transition-colors"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex md:items-center">
              <a
                href="https://calendly.com/hello-deployai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:shadow-md transition-all hover:scale-105"
              >
                Book Free Strategy Call
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
              >
                <span className="sr-only">Open main menu</span>
                {mobileNavOpen ? (
                  <FiX className="h-6 w-6" />
                ) : (
                  <FiMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden"
            >
              <div className="space-y-1 px-4 pb-3 pt-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="block rounded-md px-3 py-2 text-base font-medium text-zinc-700 hover:bg-zinc-100 hover:text-orange-600"
                  >
                    {link.title}
                  </a>
                ))}
                <div className="mt-4">
                  <a
                    href="https://calendly.com/hello-deployai/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-base font-semibold text-white shadow-sm"
                  >
                    Book Free Strategy Call
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};