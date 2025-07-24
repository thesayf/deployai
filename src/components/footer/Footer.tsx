import React from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiTwitter,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";
import { Button } from "../shared/Button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white">
      {/* Main Footer Content */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Company Info */}
            <div className="lg:col-span-4">
              <div className="mb-6">
                <div className="mb-6">
                  <Image
                    src="/white-logo.png"
                    alt="deployAI logo"
                    width={120}
                    height={120}
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <p className="text-sm leading-relaxed text-zinc-400 lg:pr-8">
                  We build production-ready MVPs in 30 days. Full code ownership,
                  no recurring fees, just your vision brought to life fast.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">
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

            {/* Services */}
            <div className="lg:col-span-2">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                Services
              </h3>
              <div className="space-y-3">
                <FooterLink href="#mvp">MVP Development</FooterLink>
                <FooterLink href="#ai">AI Integration</FooterLink>
                <FooterLink href="#automation">Process Automation</FooterLink>
                <FooterLink href="#consulting">Technical Consulting</FooterLink>
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-4">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">
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
                  text="London, United Kingdom"
                  href="#"
                />
              </div>

              {/* Response Time Badge */}
              <div className="mt-6 rounded-lg bg-green-500/10 p-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                  <span className="text-sm font-semibold text-green-500">
                    We're online now!
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-400">
                  Average response time: 2 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800 py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col gap-2 text-center text-xs text-zinc-500 md:flex-row md:gap-6 md:text-left">
              <span>© 2024 deployAI Studio</span>
              <span className="hidden md:inline">·</span>
              <a
                href="#privacy"
                className="transition-colors hover:text-zinc-400"
              >
                Privacy
              </a>
              <span className="hidden md:inline">·</span>
              <a
                href="#terms"
                className="transition-colors hover:text-zinc-400"
              >
                Terms
              </a>
              <span className="hidden md:inline">·</span>
              <a
                href="#cookies"
                className="transition-colors hover:text-zinc-400"
              >
                Cookies
              </a>
            </div>

            <div className="text-center text-xs text-zinc-500 md:text-right">
              <p>Building MVPs that actually ship 🚀</p>
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
      className="block text-sm text-zinc-400 transition-all hover:text-white hover:translate-x-1"
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
      className="group flex items-start gap-3 text-sm text-zinc-400 transition-all hover:text-white"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 transition-all group-hover:bg-zinc-700">
        <Icon className="h-5 w-5" />
      </div>
      <span className="mt-2">{text}</span>
    </a>
  );
};
