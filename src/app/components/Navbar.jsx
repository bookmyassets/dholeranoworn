"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "@/assets/logo-white.png";
import logoBlack from "@/assets/logo.png";
import { PopupFormButton } from "./Form";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigationItems = ["Products", "Customers", "Resources", "Careers"];

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 0);

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    return () => window.removeEventListener("scroll", updateNavbar);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 h-28 w-full transition-colors ${
        isScrolled ? "border-b border-ink bg-base" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-full w-full items-center justify-between px-[clamp(1rem,0.5rem+4vw,4rem)]"
      >
        <Link href="#" className="h-28 w-28">
          <Image
            src={isScrolled ? logoBlack : logo}
            alt="logo"
            className="h-28 w-28"
          />
        </Link>

        <div className="flex items-center gap-[clamp(0.5rem,0.2rem+1.2vw,1.5rem)]">
          <div className="hidden items-center gap-[clamp(1.25rem,0.75rem+1.5vw,2.5rem)]">
            {navigationItems.map((item) => (
              <a
                key={item}
                href="#"
                className={`font-body text-[clamp(0.875rem,0.82rem+0.2vw,1rem)] font-medium transition-colors hover:text-accent focus-visible:text-accent ${
                  isScrolled ? "text-ink" : "text-base"
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          <PopupFormButton className="rounded-full border border-accent bg-accent px-[clamp(1rem,0.8rem+0.8vw,1.5rem)] py-[clamp(0.5rem,0.42rem+0.25vw,0.625rem)] font-special text-[length:var(--fs-special)] text-[var(--color-base)] transition-colors hover:bg-base hover:text-accent focus-visible:bg-base focus-visible:text-accent">
            Register Now
          </PopupFormButton>
        </div>
      </nav>
    </header>
  );
}
