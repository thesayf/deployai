import React from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiTwitter,
  FiLinkedin,
  FiGithub,
  FiArrowRight,
  FiClock,
} from "react-icons/fi";
import { Button } from "../shared/Button";
import Image from "next/image";
import { HeadingH2 } from "@/components/heading-h2";

export const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white">
      {/* Final CTA Section */}
      <div className="border-b-4 border-zinc-700 bg-zinc-800 py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <HeadingH2
            variant="offset-border"
            accentColor="orange"
            size="xl"
            align="center"
            animate={true}
            className="mb-6"
          >
            Ready to Deploy AI and Eliminate Tool Costs Forever?
          </HeadingH2>
          <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-zinc-300 md:text-2xl">
            Book a 15-minute AI strategy call. We'll analyze your current operations and show you exactly where AI can replace expensive tools and automate manual processes.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {/* Calendly CTA Button */}
            <a
              href="https://calendly.com/hello-deployai/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-lg font-bold text-white shadow-[4px_4px_0px_0px_rgb(234,88,12)] transition-transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                🚀 Book Free Strategy Call
                <FiArrowRight />
              </span>
            </a>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <FiClock className="h-4 w-4" />
              <span>Usually responds within 2 hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <Image
                    src="/white-logo.png"
                    alt="deployAI logo"
                    width={160}
                    height={160}
                    className="h-40 w-40 rounded-2xl object-contain"
                  />
                </div>
                <p className="leading-relaxed text-zinc-300">
                  We build custom AI solutions that eliminate SaaS subscriptions
                  and give you 100% ownership. Transform your business in 30
                  days.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-6 text-lg font-bold text-orange-400">
                Quick Links
              </h3>
              <div className="space-y-3">
                <FooterLink href="#how-it-works">How It Works</FooterLink>
                <FooterLink href="#pricing">Pricing</FooterLink>
                <FooterLink href="#testimonials">Testimonials</FooterLink>
                <FooterLink href="#case-studies">Case Studies</FooterLink>
                <FooterLink href="#blog">Blog</FooterLink>
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h3 className="mb-6 text-lg font-bold text-orange-400">
                Get In Touch
              </h3>
              <div className="space-y-4">
                <ContactItem
                  icon={FiMail}
                  text="hello@deployai.studio"
                  href="mailto:hello@deployai.studio"
                />
                <ContactItem
                  icon={FiMapPin}
                  text="Deploy AI Studio, Dairy Farm Pl, London, United Kingdom"
                  href="#"
                />
              </div>

              {/* Response Time Badge */}
              <div className="mt-6 rounded-2xl border-2 border-green-500 bg-green-500/10 p-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                  <span className="text-sm font-semibold text-green-400">
                    We're online now!
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-300">
                  Average response time: 2 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-4 border-zinc-700 bg-zinc-800 py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col gap-2 text-center text-sm text-zinc-400 md:flex-row md:gap-6 md:text-left">
              <span>© 2024 deployAI Studio. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <a
                href="#privacy"
                className="transition-colors hover:text-orange-400"
              >
                Privacy Policy
              </a>
              <span className="hidden md:inline">•</span>
              <a
                href="#terms"
                className="transition-colors hover:text-orange-400"
              >
                Terms of Service
              </a>
              <span className="hidden md:inline">•</span>
              <a
                href="#cookies"
                className="transition-colors hover:text-orange-400"
              >
                Cookie Policy
              </a>
            </div>

            <div className="text-center text-sm text-zinc-400 md:text-right">
              <p>Built with ❤️ for businesses tired of SaaS subscriptions</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => {
  return (
    <a
      href={href}
      className="block text-zinc-300 transition-colors transition-transform hover:translate-x-1 hover:text-orange-400"
    >
      {children}
    </a>
  );
};

interface ContactItemProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  href: string;
}

const ContactItem = ({ icon: Icon, text, href }: ContactItemProps) => {
  return (
    <a
      href={href}
      className="group flex items-center gap-3 text-zinc-300 transition-all hover:text-orange-400"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 transition-all group-hover:border-orange-400 group-hover:bg-orange-500">
        <Icon className="h-4 w-4" />
      </div>
      <span>{text}</span>
    </a>
  );
};
