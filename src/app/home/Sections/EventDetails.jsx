import { PopupFormButton } from '@/app/components/Form'
import {
  FiArrowRight,
  FiGrid,
  FiMapPin,
  FiCheckCircle,
  FiFileText,
  FiSearch,
  FiUsers,
  FiHome,
  FiLayers,
  FiArrowUpRight
} from 'react-icons/fi'
import styles from './EventDetails.module.css'
const topicIcons = [
  FiGrid,
  FiHome,
  FiMapPin,
  FiFileText,
  FiUsers
]

const eventTopics = [
  "Discover Dholera's Latest Developments",
  'Explore Residential Plot Investment Opportunities',
  'Understand Plot Locations & Pricing',
  'Get Clarity on Legal Documents & Approvals',
  'Connect Directly with Dholera Experts'
]

const foundations = [
  'Livable Homes',
  'Habitation',
  'Real Development',
  'The Basics of a Future City'
]

const foundationIcons = [FiHome, FiUsers, FiGrid, FiLayers]

const services = [
  'Verified Dholera Opportunities',
  'Legal and Documentation Support',
  'Due Diligence Team',
  'Expert Guidance',
  'Site Visit Assistance',
  'Villa Construction'
]

const serviceIcons = [FiCheckCircle, FiFileText, FiSearch, FiUsers, FiMapPin, FiHome]

function SectionArtwork () {
  return (
        <svg
          className={styles.artwork}
          viewBox='0 0 1440 740'
          preserveAspectRatio='xMidYMax slice'
          fill='none'
          aria-hidden='true'
        >
          <g stroke='currentColor' strokeWidth='1'>
            <path d='M0 680H1440M65 680v-28h20v28m12 0v-59h25v59m14 0v-34h19v34m17 0v-92h26v92m16 0v-123l32 12v111m15 0v-47h22v47m18 0v-99h29v99m18 0v-143l30-18 22 18v143m-38-150v150m14-158v158m38 0v-62h20v62m15 0v-94l29-15 22 15v94m-35-100v100m52 0v-40h24v40m18 0v-85l29-12v97' />
            <path d='M680 740c100-95 235-49 412-111s194-127 348-160M905 740c-145-89 140-52 296-132s152-126 239-157M930 740c-143-81 131-53 287-132s147-117 223-144M1440 0c-57 88-87 137-177 191' />
          </g>
        </svg>
  )
}

export default function EventDetails () {
  return (
    <>
      <section
        id='why-attend'
        aria-labelledby='why-attend-title'
        className={`content-section ${styles.attend}`}
      >
        <SectionArtwork />
        <div className={styles.attendLayout}>
          <div className={styles.intro} data-reveal>
            <h2 id='why-attend-title' className={styles.title}>
              Why Should One Not Miss This Investor Event in Gurgaon?
            </h2>
            <p className={styles.description}>
              Dholera Now or Never event in Gurgaon is the opportunity for
              Investors to understand the Actual development of Dholera, explore
              residential plot investments, and get clarity before making an
              investment decision in Dholera Smart City.
            </p>
          </div>
          <ul className={styles.topics}>
            {eventTopics.map((topic, index) => {
              const Icon = topicIcons[index]
              return (
                <li
                  key={topic}
                  data-reveal
                  style={{ '--reveal-delay': `${index * 70}ms` }}
                  className={styles.topic}
                >
                  <span className={styles.topicIcon}>
                    <Icon aria-hidden='true' />
                  </span>
                  <span>{topic}</span>
                </li>
              )
            })}
          </ul>
          <div className={styles.action} data-reveal>
            <a href="https://wa.me/919910994247?text=Hi%20I'm%20Registering%20for%20Event" className={styles.cta}>
              Reserve Your Slot Today <FiArrowRight aria-hidden='true' />
            </a>
          </div>
        </div>
      </section>
      <section
        id='trendsetter'
        aria-labelledby='trendsetter-title'
        className={`content-section ${styles.trendsetter}`}
      >
        <div className={styles.trendsetterLayout}>
          <ol className={styles.foundations} aria-label='Our city-building foundations'>
            {foundations.map((foundation, index) => {
              const Icon = foundationIcons[index]
              return (
                <li key={foundation} data-reveal className={styles.foundation}
                  style={{ '--reveal-delay': `${index * 80}ms` }}>
                  <span className={styles.foundationIcon}><Icon aria-hidden='true' /></span>
                  <h3>{foundation}</h3>
                  <span className={styles.foundationRule} aria-hidden='true' />
                </li>
              )
            })}
          </ol>
          <div data-reveal='right' className={styles.trendsetterDetails}>
            <p className={styles.eyebrow}>Who We Are?</p>
            <h2 id='trendsetter-title' className={styles.trendsetterTitle}>
              A Trendsetter in <span className={styles.titleAccent}>Dholera</span>
            </h2>
            <p className={styles.trendsetterDescription}>
              We are a real-estate and development company focused on shaping
              livable, well-planned communities in Dholera. From early
              infrastructure to everyday living, we bring together development,
              people, and opportunity to build a future-ready city.
            </p>
          
          </div>
        </div>
      </section>

      <section
        id='services'
        aria-labelledby='services-title'
        className={`content-section ${styles.attend}`}
      >
        <SectionArtwork />
        <div className={`${styles.attendLayout} ${styles.servicesLayout}`}>
          <div className={styles.intro} data-reveal>
            <h2
              id='services-title'
              className={styles.title}
            >
              Helping You Invest in Dholera with Confidence
            </h2>
          </div>

          <ul className={styles.topics}>
            {services.map((service, index) => {
              const Icon = serviceIcons[index]
              return (
              <li
                key={service}
                data-reveal
                className={styles.topic}
                style={{ '--reveal-delay': `${index * 90}ms` }}
              >
                <span className={styles.topicIcon}>
                  <Icon aria-hidden='true' />
                </span>
                <span>{service}</span>
              </li>
              )
            })}
          </ul>
          <div className={styles.action} data-reveal>
            <PopupFormButton className={styles.cta}>
              Reserve Your Session <FiArrowRight aria-hidden='true' />
            </PopupFormButton>
          </div>
        </div>
      </section>
    </>
  )
}
