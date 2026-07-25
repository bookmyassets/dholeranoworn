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
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="bg-base px-[clamp(1rem,0.5rem+4vw,4rem)] py-[var(--space-section)] text-ink"
    >
      <div className="mx-auto grid w-full max-w-[90rem] gap-[clamp(3rem,1.5rem+5vw,7rem)] lg:grid-cols-[0.72fr_1.28fr]">
        <div data-reveal="right">
          <h2
            id="faq-title"
            className="mt-[clamp(0.75rem,0.5rem+0.8vw,1.25rem)] text-accent max-w-[12ch] font-heading text-[length:var(--fs-h2)] leading-[1.08] font-bold"
          >
            FAQs
          </h2>
         
        </div>

        <div className="border-t border-ink">
          {faqs.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <article
                key={question}
                data-reveal="line"
                className="faq-line relative"
                style={{ "--reveal-delay": `${index * 90}ms` }}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="group flex w-full items-center gap-[clamp(0.75rem,0.55rem+0.6vw,1.1rem)] py-[clamp(1.25rem,0.9rem+1vw,2rem)] text-left"
                  >
                    <span className="font-special text-[length:var(--fs-special)] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-heading text-[clamp(1.1rem,0.95rem+0.55vw,1.5rem)] leading-snug font-semibold">
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
                  className={`faq-answer ${isOpen ? "is-open" : ""}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[48rem] pb-[clamp(1.25rem,0.9rem+1vw,2rem)] pl-[clamp(2rem,1.5rem+1.5vw,3.25rem)] font-body text-[length:var(--fs-p-body)] leading-[1.8]">
                      {answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
