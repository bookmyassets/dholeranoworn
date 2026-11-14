"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "@/assets/logo-white.png";
import logoBlack from "@/assets/logo.png";

const navigationItems = [
  { label: "Why Dholera", href: "#why-dholera" },
  { label: "Why Attend", href: "#why-attend" },
  { label: "About Us", href: "#trendsetter" },
  { label: "What We Offer", href: "#services" },
  { label: "FAQs", href: "#faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        document.getElementById("navigation-toggle")?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 0);

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    return () => window.removeEventListener("scroll", updateNavbar);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 h-[var(--header-height)] w-full transition-colors ${
        isScrolled || isMenuOpen ? "border-b border-ink bg-base" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-full w-full items-center justify-between px-[clamp(1rem,0.5rem+4vw,4rem)]"
      >
        <Link href="#" aria-label="Back to top" onClick={() => setIsMenuOpen(false)} className="h-[var(--header-height)] w-[var(--header-height)] shrink-0">
          <Image
            src={isScrolled || isMenuOpen ? logoBlack : logo}
            alt="logo"
            className="h-full w-full object-contain"
          />
        </Link>

        <div className="flex items-center gap-[clamp(0.5rem,0.2rem+1.2vw,1.5rem)]">
          <div className="hidden items-center gap-[clamp(1.25rem,0.75rem+1.5vw,2.5rem)] lg:flex">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`font-body text-[clamp(0.875rem,0.82rem+0.2vw,1rem)] font-medium transition-colors hover:text-accent focus-visible:text-accent ${
                  isScrolled ? "text-ink" : "text-base"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <Link
              href="https://wa.me/919910994247?text=Hi%20I'm%20Registering%20for%20Event"
          className="rounded-full border border-accent bg-accent px-[clamp(1rem,0.8rem+0.8vw,1.5rem)] py-[clamp(0.5rem,0.42rem+0.25vw,0.625rem)] font-special text-[length:var(--fs-special)] text-[var(--color-base)] transition-colors hover:bg-base hover:text-accent focus-visible:bg-base focus-visible:text-accent">
            Register Now
          </Link>
          <button
            id="navigation-toggle"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setIsMenuOpen((open) => !open)}
            className={`flex min-h-[clamp(2.75rem,2.5rem+1vw,3rem)] min-w-[clamp(2.75rem,2.5rem+1vw,3rem)] items-center justify-center rounded-full border font-body text-[length:var(--fs-special)] font-medium transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:hidden ${isScrolled || isMenuOpen ? "border-ink text-ink" : "border-base text-base"}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              {isMenuOpen ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        <div
          id="mobile-navigation"
          hidden={!isMenuOpen}
          className="absolute top-full right-0 left-0 border-b border-ink bg-base px-[clamp(1rem,0.5rem+4vw,4rem)] py-[clamp(0.75rem,0.5rem+1vw,1.25rem)] text-ink lg:hidden"
        >
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block py-[clamp(0.75rem,0.5rem+1vw,1rem)] font-body text-[length:var(--fs-body)] font-medium transition-colors hover:text-accent focus-visible:text-accent"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
