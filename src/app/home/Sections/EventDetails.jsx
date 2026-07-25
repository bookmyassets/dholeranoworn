import { PopupFormButton } from "@/app/components/Form";

const eventTopics = [
  "Understanding the Dholera vision",
  "Latest developments in Dholera",
  "Explore top real estate opportunities",
  "Understand locations and pricing",
  "Get clarity on legal documents and approvals",
  "Speak directly with property experts",
];

const foundations = [
  "Livable Homes",
  "Habitation",
  "Real Development",
  "The Basics of a Future City",
];

const services = [
  "Verified Dholera Opportunities",
  "Legal and Documentation Support",
  "Due Diligence Team",
  "Expert Guidance",
  "Site Visit Assistance",
  "Villa Construction",
];

function SectionEyebrow({ children, inverted = false }) {
  return (
    <p
      className={`font-semibold text-[length:var(--fs-p-special)] tracking-[0.14em] uppercase ${
        inverted ? "text-accent" : "text-accent"
      }`}
    >
      {children}
    </p>
  );
}

export default function EventDetails() {
  return (
    <>
      <section
        id="why-attend"
        aria-labelledby="why-attend-title"
        className="bg-ink px-[clamp(1rem,0.5rem+4vw,4rem)] py-[var(--space-section)] text-[var(--color-base)]"
      >
        <div className="mx-auto grid w-full max-w-[90rem] gap-[clamp(3rem,1.5rem+5vw,7rem)] lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionEyebrow inverted>Dholera Now or Never</SectionEyebrow>
            <h2
              id="why-attend-title"
              className="mt-[clamp(0.75rem,0.5rem+0.8vw,1.25rem)] max-w-[14ch] font-heading text-[length:var(--fs-h2)] leading-[1.08] font-bold"
            >
              Why You Should Attend This Event?
            </h2>
            <p className="mt-[clamp(1.25rem,0.85rem+1.2vw,2rem)] font-body text-[length:var(--fs-p-body)] leading-[1.8]">
              This isn&apos;t just another Real Estate seminar. It is a
              face-to-face session designed to show you where Dholera stands
              today and help you understand the opportunity with greater
              clarity.
            </p>
            <PopupFormButton className="mt-[clamp(1.75rem,1.25rem+1.6vw,3rem)] inline-flex min-h-[clamp(2.75rem,2.4rem+1vw,3.5rem)] items-center justify-center rounded-full border border-accent bg-accent px-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] font-special text-[length:var(--fs-special)] text-[var(--color-base)] transition-colors hover:bg-base hover:text-accent focus-visible:bg-base focus-visible:text-accent">
              Reserve a Free Seat
            </PopupFormButton>
          </div>

          <ul className="grid gap-[clamp(0.75rem,0.5rem+0.8vw,1.25rem)] sm:grid-cols-2">
            {eventTopics.map((service, index) => (
              <li
                key={service}
                data-reveal="line"
                className="service-line relative flex items-center gap-[clamp(0.75rem,0.55rem+0.6vw,1.1rem)] py-[clamp(0.9rem,0.7rem+0.6vw,1.25rem)] font-body text-[length:var(--fs-body)] font-medium"
                style={{ "--reveal-delay": `${index * 90}ms` }}
              >
                <span className="font-special text-[length:var(--fs-special)] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {service}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="trendsetter"
        aria-labelledby="trendsetter-title"
        className="bg-base px-[clamp(1rem,0.5rem+4vw,4rem)] py-[var(--space-section)] text-ink"
      >
        <div className="mx-auto grid w-full max-w-[90rem] items-center gap-[clamp(3rem,1.5rem+5vw,8rem)] lg:grid-cols-[0.95fr_1.05fr]">
          <ul className="order-2 grid grid-cols-2 gap-x-[clamp(1rem,0.5rem+3vw,4rem)] gap-y-[clamp(2rem,1rem+3vw,4.5rem)] lg:order-1">
            {foundations.map((foundation, index) => (
              <li
                key={foundation}
                data-reveal="circle"
                className="motion-circle flex flex-col items-center text-center"
                style={{ "--reveal-delay": `${index * 100}ms` }}
              >
                <div className="relative flex h-[clamp(7.5rem,13vw,10rem)] w-[clamp(7.5rem,13vw,10rem)] items-center justify-center rounded-full border border-ink bg-base px-[clamp(0.75rem,0.5rem+0.8vw,1.25rem)]">
                  <span className="font-heading text-[clamp(1rem,0.88rem+0.45vw,1.3rem)] leading-tight font-semibold">
                    {foundation}
                  </span>

                  <span className="absolute top-0 right-0 flex h-[clamp(2.1rem,3.5vw,2.75rem)] w-[clamp(2.1rem,3.5vw,2.75rem)] items-center justify-center rounded-full bg-accent font-special text-[clamp(0.75rem,0.7rem+0.2vw,0.95rem)] text-[var(--color-base)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div data-reveal="right" className="order-1 lg:order-2">
            <p className="font-special text-[length:var(--fs-p-special)] font-semibold tracking-[0.14em] text-accent uppercase">
              Who We Are?
            </p>

            <h2
              id="trendsetter-title"
              className="mt-[clamp(0.75rem,0.5rem+0.8vw,1.25rem)] max-w-[15ch] font-heading text-[length:var(--fs-h2)] leading-[1.08] font-bold"
            >
              A Trendsetter in Dholera
            </h2>

            <blockquote className="mt-[clamp(1.5rem,1rem+1.5vw,2.5rem)] border-l-[clamp(0.2rem,0.15rem+0.15vw,0.3rem)] border-accent pl-[clamp(0.75rem,0.5rem+0.8vw,1.25rem)] font-special text-[clamp(1.1rem,0.9rem+0.8vw,1.6rem)] leading-snug text-accent">
              We are not waiting for Dholera to become a city.
            </blockquote>

            <blockquote className="mt-[clamp(1rem,0.75rem+0.8vw,1.5rem)] border-l-[clamp(0.2rem,0.15rem+0.15vw,0.3rem)] border-accent pl-[clamp(0.75rem,0.5rem+0.8vw,1.25rem)] font-special text-[clamp(1.1rem,0.9rem+0.8vw,1.6rem)] leading-snug text-accent">
              We are helping create the foundation for people to live there.
            </blockquote>
          </div>
        </div>
      </section>

      <section
        id="services"
        aria-labelledby="services-title"
        className="bg-ink px-[clamp(1rem,0.5rem+4vw,4rem)] py-[var(--space-section)] text-[var(--color-base)]"
      >
        <div className="mx-auto grid w-full max-w-[90rem] gap-[clamp(3rem,1.5rem+5vw,7rem)] lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionEyebrow inverted>What We Do</SectionEyebrow>
            <h2
              id="services-title"
              className="mt-[clamp(0.75rem,0.5rem+0.8vw,1.25rem)] max-w-[16ch] font-heading text-[length:var(--fs-h2)] leading-[1.08] font-bold"
            >
              From Understanding Dholera to Making Better Decisions
            </h2>
            <PopupFormButton className="mt-[clamp(1.75rem,1.25rem+1.6vw,3rem)] inline-flex min-h-[clamp(2.75rem,2.4rem+1vw,3.5rem)] items-center justify-center rounded-full border border-accent bg-accent px-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] font-special text-[length:var(--fs-special)] text-[var(--color-base)] transition-colors hover:bg-base hover:text-accent focus-visible:bg-base focus-visible:text-accent">
              Reserve a Free Seat
            </PopupFormButton>
          </div>

          <ul className="grid gap-[clamp(0.75rem,0.5rem+0.8vw,1.25rem)] sm:grid-cols-2">
            {services.map((service, index) => (
              <li
                key={service}
                data-reveal="line"
                className="service-line relative flex items-center gap-[clamp(0.75rem,0.55rem+0.6vw,1.1rem)] py-[clamp(0.9rem,0.7rem+0.6vw,1.25rem)] font-body text-[length:var(--fs-body)] font-medium"
                style={{ "--reveal-delay": `${index * 90}ms` }}
              >
                <span className="font-special text-[length:var(--fs-special)] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {service}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
