// Single source of truth for the 7-page link graph. Reused by Navbar + Footer.
// Mock hrefs (mock-<x>.html) translate to Next routes (/<x>); home = "/".

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Deployment Diagnostic", href: "/deployment-diagnostic" },
  { label: "Data Residency", href: "/data-residency" },
  { label: "About", href: "/about" },
];

export const primaryCta: NavItem = { label: "Free AI Fit Check", href: "/fit-check" };

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: "Start",
    links: [
      { label: "AI Fit Check", href: "/fit-check" },
      { label: "Deployment Diagnostic", href: "/deployment-diagnostic" },
      { label: "Book a call", href: "/book" },
    ],
  },
  {
    title: "Firm",
    links: [
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Data Residency", href: "/data-residency" },
      { label: "Contact", href: "/book" },
      { label: "LinkedIn", href: "#" },
    ],
  },
];

