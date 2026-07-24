import Image from "next/image";
import solarPanelIcon from "@/assets/icons/solar-panel.png";
import chipIcon from "@/assets/icons/chip.png";
import freightIcon from "@/assets/icons/train-cargo.png";
import airportIcon from "@/assets/icons/airplane.png";
import { PopupFormButton } from "@/app/components/Form";

const highlights = [
  {
    number: "01",
    title: "Planned Greenfield Smart Industrial City",
    icon: solarPanelIcon,
  },
  {
    number: "02",
    title: "India’s First Commercial Semiconductor Fab",
    icon: chipIcon,
  },
  {
    number: "03",
    title: "Expressway, Rail and DFC Connectivity",
    icon: freightIcon,
  },
  {
    number: "04",
    title: "International Airport and Cargo Hub",
    icon: airportIcon,
  },
];

const facts = [
  {
    value: "920",
    suffix: "sq. km",
    label: "Planned Special Investment Region",
  },
  {
    value: "₹6 Lakh",
    suffix: "crore",
    label: "Global Investment",
  },
  {
    value: "Govt of India + Govt of Gujarat",
    suffix: "",
    label: "Centre-State Development Partnership",
  },
];

export default function WhyJoin() {
  return (
    <section
      id="why-dholera"
      aria-labelledby="why-dholera-title"
      className="bg-base px-[clamp(1rem,0.5rem+4vw,4rem)] py-[var(--space-section)] text-ink"
    >
      <div className="mx-auto grid w-full max-w-[90rem] items-center gap-[clamp(3rem,1.5rem+5vw,8rem)] lg:grid-cols-[0.95fr_1.05fr]">
        <ul className="order-2 grid grid-cols-2 gap-x-[clamp(1rem,0.5rem+3vw,4rem)] gap-y-[clamp(2rem,1rem+3vw,4.5rem)] lg:order-1">
          {highlights.map(({ number, title, icon }) => (
            <li key={title} className="flex flex-col items-center text-center">
              <div className="relative flex h-[clamp(7.5rem,13vw,10rem)] w-[clamp(7.5rem,13vw,10rem)] items-center justify-center rounded-full border border-ink bg-base">
                <Image
                  src={icon}
                  alt=""
                  className="h-[clamp(3rem,5vw,4.25rem)] w-[clamp(3rem,5vw,4.25rem)] object-contain"
                  sizes="4.25rem"
                />

                <span className="absolute top-0 right-0 flex h-[clamp(2.1rem,3.5vw,2.75rem)] w-[clamp(2.1rem,3.5vw,2.75rem)] items-center justify-center rounded-full bg-accent font-special text-[clamp(0.75rem,0.7rem+0.2vw,0.95rem)] text-[var(--color-base)]">
                  {number}
                </span>
              </div>

              <h3 className="mt-[clamp(0.75rem,0.5rem+0.8vw,1.25rem)] max-w-[15rem] font-heading text-[clamp(1rem,0.88rem+0.45vw,1.3rem)] leading-tight font-semibold">
                {title}
              </h3>
            </li>
          ))}
        </ul>

        <div className="order-1 lg:order-2">
          <p className="font-special text-[length:var(--fs-p-special)] tracking-[0.14em] text-accent uppercase">
            Why Dholera?
          </p>

          <h2
            id="why-dholera-title"
            className="mt-[clamp(0.75rem,0.5rem+0.8vw,1.25rem)] max-w-[14ch] font-heading text-[length:var(--fs-h2)] leading-[1.08] font-bold"
          >
            From Vision to Reality
          </h2>

          <blockquote className="mt-[clamp(1.5rem,1rem+1.5vw,2.5rem)] border-l-[clamp(0.2rem,0.15rem+0.15vw,0.3rem)] border-accent pl-[clamp(0.75rem,0.5rem+0.8vw,1.25rem)] font-special text-[clamp(1.1rem,0.9rem+0.8vw,1.6rem)] leading-snug text-accent">
            Be part of India&apos;s next big growth story.
          </blockquote>

          <p className="mt-[clamp(1.25rem,0.85rem+1.2vw,2rem)] max-w-[42rem] font-body text-[length:var(--fs-p-body)] leading-[1.8]">
            Dholera is a planned greenfield smart industrial city being
            developed through a partnership between the Government of India
            and the Government of Gujarat, with major transport and industrial
            projects moving into execution.
          </p>

          <dl className="mt-[clamp(1.75rem,1.2rem+1.8vw,3rem)] grid gap-[clamp(1rem,0.6rem+1.2vw,1.75rem)] sm:grid-cols-3">
            {facts.map(({ value, suffix, label }) => (
              <div
                key={label}
                className="border-t-[clamp(0.15rem,0.1rem+0.1vw,0.2rem)] border-accent pt-[clamp(0.75rem,0.55rem+0.5vw,1rem)]"
              >
                <dt className="font-special text-[clamp(1.25rem,1rem+0.8vw,1.8rem)] text-accent">
                  {value}
                  {suffix && (
                    <span className="ml-[0.3em] text-[0.6em]">{suffix}</span>
                  )}
                </dt>
                <dd className="mt-[clamp(0.35rem,0.25rem+0.25vw,0.5rem)] font-body text-[clamp(0.8rem,0.76rem+0.15vw,0.9rem)] leading-relaxed">
                  {label}
                </dd>
              </div>
            ))}
          </dl>

          <PopupFormButton className="mt-[clamp(1.75rem,1.25rem+1.6vw,3rem)] inline-flex min-h-[clamp(2.75rem,2.4rem+1vw,3.5rem)] items-center justify-center rounded-full border border-accent bg-accent px-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] font-special text-[length:var(--fs-special)] text-[var(--color-base)] transition-colors hover:bg-base hover:text-accent focus-visible:bg-base focus-visible:text-accent">
            Reserve a Free Seat
          </PopupFormButton>
        </div>
      </div>
    </section>
  );
}
