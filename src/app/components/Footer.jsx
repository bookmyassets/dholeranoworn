import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { PopupFormButton } from "./Form";
import Image from "next/image";
import logo from "@/assets/logo-white.png";

const footerLinks = [
  { label: "Why Dholera", href: "#why-dholera" },
  { label: "Why Attend", href: "#why-attend" },
  { label: "The TrendSetter", href: "#trendsetter" },
  { label: "What We Do", href: "#services" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/dholeranowornever?igsh=ZzMxZWhhZnRyOHdm",
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1Gnydg8T3H/?mibextid=wwXIfr",
    icon: FaFacebookF,
  },
  {
    label: "X",
    href: "https://x.com/dholeranon?s=21",
    icon: FaXTwitter,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@DholeraNoworNever",
    icon: FaYoutube,
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-[var(--color-base)]">
      <div className="mx-auto w-full max-w-[90rem] px-[clamp(1rem,0.5rem+4vw,4rem)]">
        <div className="grid gap-[clamp(2rem,1rem+3vw,4rem)] border-b border-base py-[clamp(3rem,2rem+4vw,6rem)] lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-semibold text-[length:var(--fs-p-special)] tracking-[0.14em] text-accent uppercase">
              08 August 2026
            </p>
            <h2 className="mt-[clamp(0.75rem,0.5rem+0.8vw,1.25rem)] max-w-[16ch] font-heading text-[length:var(--fs-h2)] leading-[1.08] font-bold">
              Dholera Now or Never
            </h2>
            <p className="mt-[clamp(1rem,0.75rem+0.8vw,1.5rem)] max-w-[38rem] font-body text-[length:var(--fs-p-body)] leading-relaxed">
              Understand Dholera, explore the opportunities, and get clarity
              directly from property experts.
            </p>
          </div>

          <PopupFormButton className="inline-flex min-h-[clamp(3rem,2.7rem+0.8vw,3.75rem)] w-fit items-center justify-center rounded-full border border-accent bg-accent px-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] font-special text-[length:var(--fs-special)] text-[var(--color-base)] transition-colors hover:bg-base hover:text-accent focus-visible:bg-base focus-visible:text-accent">
            Reserve Your Free Seat
          </PopupFormButton>
        </div>

        <div className="grid gap-[clamp(2.5rem,1.5rem+3vw,5rem)] py-[clamp(2.5rem,1.5rem+3vw,4.5rem)] sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <Link
              href="#"
              aria-label="Return to the top"
              className="inline-flex items-center gap-[clamp(0.625rem,0.5rem+0.35vw,0.875rem)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <Image
                src={logo}
                alt="Dholera Now or Never"
                className="h-auto w-[clamp(5.5rem,7vw,7.5rem)]"
                sizes="7.5rem"
              />
            </Link>

            <p className="mt-[clamp(1.25rem,0.9rem+1vw,2rem)] max-w-[28rem] font-body text-[length:var(--fs-p-body)] leading-relaxed">
              Dholera Now or Never is your opportunity to understand the
              development, investment potential and future of one of India's
              most ambitious planned cities.
            </p>

            <ul
              className="mt-[clamp(1.25rem,0.9rem+1vw,2rem)] flex flex-wrap gap-[clamp(0.625rem,0.5rem+0.35vw,0.875rem)]"
              aria-label="Social media"
            >
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Dholera Now or Never on ${label}`}
                    title={label}
                    className="flex h-[clamp(2.75rem,2.5rem+0.7vw,3.25rem)] w-[clamp(2.75rem,2.5rem+0.7vw,3.25rem)] items-center justify-center rounded-full border border-base text-[clamp(1rem,0.9rem+0.35vw,1.25rem)] text-base transition-colors hover:border-accent hover:bg-accent focus-visible:border-accent focus-visible:bg-accent focus-visible:outline-none"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer navigation">
            <p className="font-special text-[length:var(--fs-p-special)] tracking-[0.12em] text-accent uppercase">
              Explore
            </p>
            <ul className="mt-[clamp(1rem,0.75rem+0.8vw,1.5rem)] grid gap-[clamp(0.75rem,0.55rem+0.5vw,1rem)]">
              {footerLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-[length:var(--fs-body)] transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-special text-[length:var(--fs-p-special)] tracking-[0.12em] text-accent uppercase">
              Event
            </p>
            <dl className="mt-[clamp(1rem,0.75rem+0.8vw,1.5rem)] grid gap-[clamp(1rem,0.75rem+0.8vw,1.5rem)]">
              <div>
                <dt className="font-body text-[clamp(0.75rem,0.7rem+0.18vw,0.875rem)] tracking-[0.1em] uppercase">
                  Date
                </dt>
                <dd className="mt-1 font-special text-[length:var(--fs-special)]">
                  <time dateTime="2026-08-08">08 August 2026</time>
                </dd>
              </div>
              <div>
                <dt className="font-body text-[clamp(0.75rem,0.7rem+0.18vw,0.875rem)] tracking-[0.1em] uppercase">
                  Location
                </dt>
                <dd className="mt-1 font-special text-[length:var(--fs-special)]">
                  -------
                </dd>
              </div>
              <div>
                <dt className="font-body text-[clamp(0.75rem,0.7rem+0.18vw,0.875rem)] tracking-[0.1em] uppercase">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a
                    href="tel:+919910994247"
                    className="font-special text-[length:var(--fs-special)] transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
                  >
                    +91 99 10 99 42 47
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-base py-[clamp(1.25rem,1rem+0.8vw,1.75rem)] font-body text-[clamp(0.75rem,0.7rem+0.18vw,0.875rem)] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[length:var(--fs-p-small)]">
            © 2026 Dholera Now or Never.
          </p>
          <p className="font-special text-[length:var(--fs-p-special)] tracking-[0.08em] text-accent uppercase">
            Decisions begin here
          </p>
        </div>
      </div>
    </footer>
  );
}
