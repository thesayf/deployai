import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
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
                FREE AI Readiness Audit - Only 5 Spots Left This Month
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
      <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile Layout: Hamburger (left) - Logo (center) - Phone (right) */}
            <div className="flex md:hidden flex-1 items-center justify-between">
              {/* Mobile menu button */}
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

              {/* Logo centered on mobile */}
              <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                <img src="/logo.png" alt="deployAI" className="h-10 w-auto" />
              </Link>

              {/* WhatsApp on mobile */}
              <a
                href="https://wa.me/447852806618"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-0.5"
              >
                <span className="text-xs font-medium text-zinc-900">Message Us</span>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600">
                  <FaWhatsapp className="h-4 w-4 text-white" />
                </div>
              </a>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
              {/* Logo and Navigation */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center">
                  <img src="/logo.png" alt="deployAI" className="h-12 w-auto" />
                </Link>

                {/* Desktop Navigation */}
                <div className="ml-10 flex items-center space-x-8">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.title}
                      href={link.href}
                      className="text-base font-medium text-zinc-700 transition-colors hover:text-orange-600"
                    >
                      {link.title}
                    </a>
                  ))}
                </div>
              </div>

              {/* Desktop CTA */}
              <div className="flex items-center space-x-4">
                <a
                  href="https://wa.me/447852806618"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 transition-all hover:bg-green-700">
                    <FaWhatsapp className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-zinc-700">+44 7852 806618</span>
                </a>
                <a
                  href="https://calendly.com/hello-deployai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:scale-105 hover:shadow-md"
                >
                  Book Free Strategy Call
                </a>
              </div>
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
                <div className="mt-4 space-y-3">
                  <a
                    href="https://wa.me/447852806618"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-50"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600">
                      <FaWhatsapp className="h-4 w-4 text-white" />
                    </div>
                    <span>+44 7852 806618</span>
                  </a>
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
