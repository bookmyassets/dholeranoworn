import { FiArrowRight, FiGrid, FiMapPin, FiShield, FiTrendingUp } from "react-icons/fi";
import { PopupFormButton } from "@/app/components/Form";
import styles from "./Whyjoin.module.css";

const highlights = [
  { title: "India's First Greenfield Smart City", icon: FiGrid },
  { title: "Strategic Location and Connectivity", icon: FiMapPin },
  { title: "Government Backed Developments", icon: FiShield },
  { title: "High Appreciation Potential", icon: FiTrendingUp },
];

export default function WhyJoin() {
  return (
    <section id="why-dholera" aria-labelledby="why-dholera-title" className={`content-section ${styles.section}`}>
      <div className={styles.container}>
        <ol className={styles.highlights} aria-label="Dholera investment highlights">
          {highlights.map(({ title, icon: Icon }, index) => (
            <li key={title} className={styles.highlight} data-reveal style={{ "--reveal-delay": `${index * 80}ms` }}>
              <div className={styles.cardTop}>
                <span className={styles.iconFrame}><Icon aria-hidden="true" /></span>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{title}</h3>
              <span className={styles.cardRule} aria-hidden="true" />
              <Icon className={styles.cardIllustration} aria-hidden="true" />
            </li>
          ))}
        </ol>

        <div className={styles.details} data-reveal="right">
          <h2 id="why-dholera-title" className={styles.title}>Why Dholera Smart City?</h2>
          <p className={styles.description}>
            Dholera Smart City is a planned greenfield industrial region in Gujarat,
            developed as part of the Delhi-Mumbai Industrial Corridor. With
            government-backed infrastructure development, strategic connectivity,
            and major industrial investments, Dholera is emerging as a destination
            for long-term growth and investment opportunities.
          </p>
          <blockquote className={styles.quote}>Be part of India&apos;s next big growth story.</blockquote>
          <div className={styles.action}>
            <PopupFormButton className={styles.cta}>Reserve Your Slot Today <FiArrowRight aria-hidden="true" /></PopupFormButton>
            <a href="#why-attend" className={styles.explore}>Explore the event <FiArrowRight aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
