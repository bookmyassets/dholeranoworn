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
  "Rental and Resale Support",
];

function SectionEyebrow({ children, inverted = false }) {
  return (
    <p
      className={`font-special text-[length:var(--fs-special)] tracking-[0.14em] uppercase ${
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
            <SectionEyebrow inverted>
              Dholera Now or Never
            </SectionEyebrow>
            <h2
              id="why-attend-title"
              className="mt-[clamp(0.75rem,0.5rem+0.8vw,1.25rem)] max-w-[14ch] font-heading text-[length:var(--fs-h2)] leading-[1.08] font-bold"
            >
              Why You Should Not Miss This Event
            </h2>
            <p className="mt-[clamp(1.25rem,0.85rem+1.2vw,2rem)] font-body text-[length:var(--fs-body)] leading-[1.8]">
              This isn&apos;t just another Real Estate seminar. It is a
              face-to-face session designed to show you where Dholera stands
              today and help you understand the opportunity with greater
              clarity.
            </p>
            <PopupFormButton className="mt-[clamp(1.75rem,1.25rem+1.6vw,3rem)] inline-flex min-h-[clamp(2.75rem,2.4rem+1vw,3.5rem)] items-center justify-center rounded-full border border-accent bg-accent px-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] font-special text-[length:var(--fs-special)] text-[var(--color-base)] transition-colors hover:bg-base hover:text-accent focus-visible:bg-base focus-visible:text-accent">
              Reserve a Free Seat
            </PopupFormButton>
          </div>

          <ol className="grid gap-[clamp(0.75rem,0.5rem+0.8vw,1.25rem)] sm:grid-cols-2">
            {eventTopics.map((topic, index) => (
              <li
                key={topic}
                className="flex min-h-[clamp(6rem,5rem+3vw,8rem)] items-center gap-[clamp(0.75rem,0.55rem+0.6vw,1.1rem)] rounded-[clamp(0.75rem,0.55rem+0.6vw,1.25rem)] border border-base p-[clamp(1rem,0.75rem+0.8vw,1.5rem)]"
              >
                <span className="flex h-[clamp(2.25rem,2rem+0.8vw,2.9rem)] w-[clamp(2.25rem,2rem+0.8vw,2.9rem)] shrink-0 items-center justify-center rounded-full bg-accent font-special text-[clamp(0.75rem,0.7rem+0.2vw,0.95rem)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-body text-[length:var(--fs-body)] leading-snug font-medium">
                  {topic}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="bookmyassets"
        aria-labelledby="trendsetter-title"
        className="bg-base px-[clamp(1rem,0.5rem+4vw,4rem)] py-[var(--space-section)] text-ink"
      >
        <div className="mx-auto w-full max-w-[90rem]">
          <div className="grid items-end gap-[clamp(2rem,1rem+4vw,6rem)] lg:grid-cols-2">
            <div>
              <SectionEyebrow>BookMyAssets</SectionEyebrow>
              <h2
                id="trendsetter-title"
                className="mt-[clamp(0.75rem,0.5rem+0.8vw,1.25rem)] max-w-[15ch] font-heading text-[length:var(--fs-h2)] leading-[1.08] font-bold"
              >
                A Trendsetter in Dholera
              </h2>
            </div>

            <blockquote className="border-l-[clamp(0.2rem,0.15rem+0.15vw,0.3rem)] border-accent pl-[clamp(0.75rem,0.5rem+0.8vw,1.25rem)] font-special text-[clamp(1.1rem,0.9rem+0.8vw,1.6rem)] leading-snug text-accent">
              We are not waiting for Dholera to become a city. We are helping
              create the foundation for people to live there.
            </blockquote>
          </div>

          <div className="mt-[clamp(2.5rem,1.5rem+3vw,5rem)] grid gap-[clamp(1rem,0.6rem+1.2vw,1.75rem)] sm:grid-cols-2 lg:grid-cols-4">
            {foundations.map((foundation, index) => (
              <article
                key={foundation}
                className="relative min-h-[clamp(10rem,8rem+6vw,14rem)] rounded-[clamp(0.75rem,0.55rem+0.6vw,1.25rem)] border border-ink p-[clamp(1.25rem,0.9rem+1vw,2rem)]"
              >
                <span className="font-special text-[clamp(1.25rem,1rem+0.8vw,1.8rem)] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-[clamp(1.5rem,1rem+1.5vw,2.5rem)] font-heading text-[clamp(1.15rem,1rem+0.5vw,1.5rem)] leading-tight font-semibold">
                  {foundation}
                </h3>
              </article>
            ))}
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
                className="flex items-center gap-[clamp(0.75rem,0.55rem+0.6vw,1.1rem)] border-b border-base py-[clamp(0.9rem,0.7rem+0.6vw,1.25rem)] font-body text-[length:var(--fs-body)] font-medium"
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
