import styles from "./Faq.module.css";

const faqs = [
  {
    question: "What is Dholera Now or Never Investor Event in Gurgaon?",
    answer:
      "Dholera Now or Never is a Dholera Smart City investment event in Gurgaon. It is a face-to-face session designed to show you where Dholera stands today and help you understand the opportunity with greater clarity.",
  },
  {
    question: "Is Dholera Smart City a Good Investment?",
    answer:
      "Yes, Dholera Smart City is a good investment due to government-backed industrial development, improving connectivity, and planned infrastructure.",
  },
  {
    question: "Who is BookMyAssets ?",
    answer:
      "BookMyAssets (BMA Group of Companies) is a trusted real estate developer in Dholera, helping investors with verified opportunities, legal guidance, due diligence, site visits, and complete support for a smooth investment journey.",
  },
  {
    question: "When and Where is the Dholera Investor Event?",
    answer:
      "The Dholera Now or Never Investor event is on 21-22 November 2026 in Sector 48, Gurgaon (Gurugram), Haryana. The event is open to investors interested in understanding Dholera Smart City and residential plot investments.",
  },
  {
    question: "Is Registration for the Dholera Investor Summit Free?",
    answer: (
      <>
        Yes, Dholera Now or Never Investor Summit 2026 offers free registration.
        Simply fill out the registration form at{" "}
        <a href="https://www.dholeranowornever.com">dholeranowornever.com</a>{" "}
        to register for the event.
      </>
    ),
  },
];

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="faq-title" className={styles.title}>FAQ<span className={styles.titleAccent}>s</span></h2>
          <span className={styles.headerRule} aria-hidden="true" />
        </header>

        <div className={styles.list}>
          {faqs.map(({ question, answer }, index) => (
            <details
              key={question}
              name="event-faq"
              className={styles.item}
            >
              <summary className={styles.question}>
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.questionText}>{question}</h3>
                <span className={styles.toggle} aria-hidden="true" />
              </summary>
              <div className={styles.answer}>
                <p>{answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
