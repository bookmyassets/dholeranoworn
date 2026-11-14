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
              <span className={styles.iconFrame}><Icon aria-hidden="true" /></span>
              <div className={styles.cardContent}>
                <h3>{title}</h3>
                <span className={styles.cardRule} aria-hidden="true" />
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.details} data-reveal="right">
          <h2 id="why-dholera-title" className={styles.title}>Why <span className={styles.titleAccent}>Dholera Smart City ?</span></h2>
          <div className={styles.descriptionWrap}>
            <p className={styles.description}>
              Dholera Smart City is a planned greenfield industrial region in Gujarat,
              developed as part of the Delhi-Mumbai Industrial Corridor.
            </p>
            <p className={styles.description}>
              With government-backed infrastructure development, strategic connectivity,
              and major industrial investments, Dholera is emerging as a destination
              for long-term growth and investment opportunities.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
