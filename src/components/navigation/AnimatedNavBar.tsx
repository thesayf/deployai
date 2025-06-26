import React, { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

const NAV_LINKS = [
  { title: "Home", href: "#top" },
  { title: "Case Studies", href: "#case-studies" },
  { title: "How It Works", href: "#how-it-works" },
  { title: "Testimonials", href: "#testimonials" },
  { title: "Pricing", href: "#pricing" },
];

export const AnimatedNavBar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Announcement banner height (approximately 40px)
  const announcementHeight = 40;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > announcementHeight ? true : false);
  });

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href === "#top") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Announcement Banner */}
      <div className="bg-indigo-600">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Link
              href="https://calendly.com/hello-deployai/30min"
              target="_blank"
              className="flex items-center gap-2 text-sm font-medium text-white hover:underline"
            >
              <span>
                🎉 Limited Time: Save 40% on AI Strategy Calls - Ends This
                Friday!
              </span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navbar wrapper to maintain space when fixed */}
      <div className={scrolled ? "h-20" : ""}>
        <nav
          className={`z-50 w-full px-6 transition-all duration-300 ease-out lg:px-12
          ${
            scrolled
              ? "fixed top-0 bg-zinc-900 py-3 shadow-xl"
              : "relative bg-zinc-900/0 py-6 shadow-none"
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="deployAI"
                className={`h-12 w-auto transition-all duration-300 ${
                  scrolled ? "brightness-0 invert" : ""
                }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 lg:flex">
              <div className="flex gap-6">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`text-base font-medium transition-colors ${
                      scrolled
                        ? "text-white hover:text-orange-400"
                        : "text-zinc-900 hover:text-orange-600"
                    }`}
                  >
                    {link.title}
                  </a>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href="https://calendly.com/hello-deployai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full border-2 px-6 py-2 text-sm font-semibold transition-all hover:scale-105 ${
                  scrolled
                    ? "border-white bg-white text-zinc-900 hover:bg-zinc-100"
                    : "border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-[3px_3px_0px_#18181b]"
                }`}
              >
                Book Free Strategy Call
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className={`block text-2xl lg:hidden ${
                scrolled ? "text-white" : "text-zinc-900"
              }`}
            >
              {mobileNavOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Mobile menu */}
          <motion.div
            initial={false}
            animate={{
              height: mobileNavOpen ? "auto" : 0,
              opacity: mobileNavOpen ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="space-y-1 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  onClick={(e) => {
                    handleLinkClick(e, link.href);
                    setMobileNavOpen(false);
                  }}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    scrolled
                      ? "text-white hover:bg-zinc-800"
                      : "text-zinc-900 hover:bg-zinc-100"
                  }`}
                >
                  {link.title}
                </a>
              ))}
              <div className="mt-4 px-3">
                <a
                  href="https://calendly.com/hello-deployai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-center text-base font-semibold text-white shadow-sm"
                >
                  Book Free Strategy Call
                </a>
              </div>
            </div>
          </motion.div>
        </nav>
      </div>
    </>
  );
};
