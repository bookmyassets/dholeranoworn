"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is the Dholera Now or Never event?",
    answer:
      "Dholera Now or Never is a free investor event in Gurgaon. The event is designed to help investors understand the Dholera vision, explore real estate opportunities, learn about locations and pricing, and get clarity on legal and documentation requirements.",
  },
  {
    question: "When and where is the event taking place?",
    answer:
      "The event will take place on 8 August 2026, from 10:00 AM to 6:00 PM, at ABC Hall, Gurgaon.",
  },
  {
    question: "Who should attend this Dholera event?",
    answer:
      "The event is open to anyone interested in understanding Dholera and its future growth. It is suitable for first-time investors, experienced investors, business owners, Delhi NCR residents, NRIs visiting India, and anyone exploring Dholera real estate opportunities.",
  },
  {
    question: "Is registration for the event free?",
    answer: "Yes, the event is completely free of cost.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="bg-base px-[clamp(1rem,0.5rem+4vw,4rem)] py-[var(--space-section)] text-ink"
    >
      <div className="mx-auto w-full max-w-[90rem]">
        <header
          data-reveal="right"
          className="mb-[clamp(2.5rem,1.5rem+3vw,5rem)] max-w-[48rem]"
        >
          <p className="mb-[clamp(0.75rem,0.5rem+0.8vw,1.25rem)] font-special text-[length:var(--fs-special)] tracking-[0.12em] text-accent uppercase">
            Common questions
          </p>
          <h2
            id="faq-title"
            className="font-heading text-[length:var(--fs-h2)] leading-[1.08] font-bold text-ink"
          >
            FAQs
          </h2>
          {/* <p className="mt-[clamp(1rem,0.75rem+0.8vw,1.5rem)] max-w-[35rem] font-body text-[length:var(--fs-body)] leading-[1.75] text-ink/80">
            Find the essential event details, then reserve your place for free.
          </p> */}
        </header>

        <div className="grid items-start gap-[clamp(2.5rem,1.5rem+4vw,6rem)] lg:grid-cols-[1.35fr_0.65fr]">
          <div className="grid gap-[clamp(0.9rem,0.65rem+0.8vw,1.35rem)]">
            {faqs.map(({ question, answer }, index) => {
              const isOpen = openIndex === index;
              const answerId = `faq-answer-${index}`;

              return (
                <article
                  key={question}
                  className={`relative overflow-hidden transition-[background-color,color,box-shadow,transform] duration-300 ${
                    isOpen
                      ? "bg-ink text-[color:var(--color-base)] shadow-[0_clamp(1rem,0.75rem+1vw,2rem)_clamp(2rem,1.5rem+2vw,4rem)_rgba(23,23,26,0.18)]"
                      : "bg-base text-ink shadow-[0_clamp(0.35rem,0.2rem+0.5vw,0.75rem)_clamp(1rem,0.75rem+1vw,2rem)_rgba(23,23,26,0.10)] hover:-translate-y-1"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="group flex w-full items-center gap-[clamp(0.75rem,0.55rem+0.6vw,1.1rem)] px-[clamp(1.25rem,0.9rem+1.2vw,2rem)] py-[clamp(1.25rem,0.9rem+1vw,2rem)] text-left"
                    >
                      <span className="min-w-[2ch] font-special text-[length:var(--fs-special)] text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex-1 font-heading text-[clamp(1.1rem,0.95rem+0.55vw,1.5rem)] leading-snug font-semibold transition-colors duration-300 ${
                          isOpen
                            ? "text-[color:var(--color-base)]"
                            : "group-hover:text-accent"
                        }`}
                      >
                        {question}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`faq-toggle relative h-[clamp(1.25rem,1rem+0.6vw,1.75rem)] w-[clamp(1.25rem,1rem+0.6vw,1.75rem)] shrink-0 ${
                          isOpen ? "is-open" : ""
                        }`}
                      />
                    </button>
                  </h3>

                  <div
                    id={answerId}
                    className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[48rem] px-[clamp(1.25rem,0.9rem+1.2vw,2rem)] pb-[clamp(1.5rem,1rem+1.2vw,2.5rem)] pl-[clamp(3.25rem,2.5rem+2vw,5rem)] font-body text-[length:var(--fs-p-body)] leading-[1.8] text-[color:var(--color-base)] opacity-80">
                        {answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside
            data-reveal="right"
            aria-label="Event registration"
            className="relative overflow-hidden bg-ink p-[clamp(1.5rem,1rem+2vw,3rem)] text-[color:var(--color-base)] shadow-[0_clamp(1rem,0.75rem+1vw,2rem)_clamp(2rem,1.5rem+2vw,4rem)_rgba(23,23,26,0.18)] lg:sticky lg:top-[clamp(6rem,5rem+3vw,8rem)]"
          >
            <span
              aria-hidden="true"
              className="absolute top-[clamp(1rem,0.5rem+2vw,2.5rem)] right-[clamp(1rem,0.5rem+2vw,2.5rem)] font-heading text-[clamp(4rem,2rem+7vw,8rem)] leading-none font-bold text-[color:var(--color-base)] opacity-10"
            >
              ?
            </span>
            <p className="relative font-special text-[length:var(--fs-special)] tracking-[0.12em] text-accent uppercase">
              Free investor event
            </p>
            <h3 className="relative mt-[clamp(1rem,0.75rem+1vw,1.75rem)] max-w-[10ch] font-heading text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-[1.08] font-bold">
              Ready to see the bigger picture?
            </h3>
            <p className="relative mt-[clamp(1rem,0.75rem+0.8vw,1.5rem)] font-body text-[length:var(--fs-body)] leading-[1.7] text-[color:var(--color-base)] opacity-80">
              Meet the experts, understand the opportunity, and get your
              questions answered in person.
            </p>
            <div className="relative mt-[clamp(1.75rem,1.25rem+1.5vw,2.75rem)]">
              <p className="font-special text-[length:var(--fs-special)] text-[color:var(--color-base)] opacity-70">
                8 August 2026 · Sec 48, Gurugram
              </p>
              <a
                href="https://wa.me/919910994247?text=Hi%20I'm%20Registering%20for%20Event"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-[clamp(1.25rem,1rem+0.8vw,1.75rem)] flex w-full items-center justify-between bg-accent px-[clamp(1rem,0.8rem+0.8vw,1.5rem)] py-[clamp(0.9rem,0.75rem+0.5vw,1.15rem)] font-special text-[length:var(--fs-special)] text-[color:var(--color-base)] transition-transform duration-300 hover:-translate-y-1"
              >
                Register for free
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
