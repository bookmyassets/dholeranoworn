'use client'

import { useId, useRef, useState } from 'react'
import Image from 'next/image'
import { FiArrowUpRight, FiCalendar, FiChevronLeft, FiChevronRight, FiImage, FiMapPin, FiMinus, FiPlus, FiX } from 'react-icons/fi'
import styles from './SuccessfulEvents.module.css'

function EventGallery ({ title, media, dialogRef, activeIndex, setActiveIndex }) {
  const titleId = useId()
  const item = media[activeIndex]

  const move = offset => {
    setActiveIndex(index => (index + offset + media.length) % media.length)
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.gallery}
      aria-labelledby={titleId}
      onClose={() => setActiveIndex(null)}
      onKeyDown={event => {
        if (event.target.closest('video') || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return
        event.preventDefault()
        move(event.key === 'ArrowLeft' ? -1 : 1)
      }}
    >
      <div className={styles.galleryHeader}>
        <h3 id={titleId}>{title}</h3>
        <button type='button' className={styles.iconButton} aria-label='Close gallery' onClick={() => dialogRef.current.close()}>
          <FiX aria-hidden='true' />
        </button>
      </div>
      {item && (
        <>
          <div className={styles.galleryMedia}>
            {item.type === 'video' ? (
              <video
                key={item.src}
                src={item.src}
                poster={item.poster}
                aria-label={item.label}
                controls
                playsInline
                preload='none'
              />
            ) : (
              <Image key={item.src} src={item.src} alt={item.alt} fill sizes='(min-width: 52rem) 48rem, 90vw' />
            )}
          </div>
          <div className={styles.galleryControls}>
            <button type='button' className={styles.iconButton} aria-label='Previous media' onClick={() => move(-1)}>
              <FiChevronLeft aria-hidden='true' />
            </button>
            <p aria-live='polite'>{item.type === 'video' ? 'Video' : 'Photo'} · {activeIndex + 1} / {media.length}</p>
            <button type='button' className={styles.iconButton} aria-label='Next media' onClick={() => move(1)}>
              <FiChevronRight aria-hidden='true' />
            </button>
          </div>
        </>
      )}
    </dialog>
  )
}

function EventCard ({ event, number, expanded, onSelect }) {
  const id = useId()
  const headingId = `${id}-heading`
  const panelId = `${id}-panel`
  const ExpandIcon = expanded ? FiMinus : FiPlus
  const dialogRef = useRef(null)
  const [activeMedia, setActiveMedia] = useState(null)
  const cover = event.media?.find(item => item.type === 'photo')
  const numberLabel = String(number).padStart(2, '0')

  return (
    <li className={styles.card} data-expanded={expanded}>
      {cover && (
        <div className={styles.photo}>
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes='(min-width: 64rem) min(48vw, 42rem), min(83vw, 29rem)'
            style={{ objectPosition: cover.position }}
          />
        </div>
      )}
      <h3 id={headingId}>
        <button
          type='button'
          className={`${styles.cardHeading} ${styles.toggle}`}
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-disabled={expanded || undefined}
          onClick={onSelect}
        >
          <span className={styles.number} aria-hidden='true'>{numberLabel}</span>
          <span className={styles.icon} aria-hidden='true'><ExpandIcon /></span>
          <span className={styles.eventTitle}>{event.title}</span>
        </button>
        <span className={`${styles.cardHeading} ${styles.staticHeading}`}>
          <span className={styles.number} aria-hidden='true'>{numberLabel}</span>
          <span className={styles.eventTitle}>{event.title}</span>
        </span>
      </h3>
      <div
        id={panelId}
        className={styles.details}
        role='region'
        aria-labelledby={headingId}
      >
        <div className={styles.meta}>
          <span>
            <FiCalendar aria-hidden='true' />
            <span>
              <time dateTime={event.date.value}>{event.date.label}</time>
              {event.endDate && <>–<time dateTime={event.endDate.value}>{event.endDate.label}</time></>}
            </span>
          </span>
          <span><FiMapPin aria-hidden='true' />{event.venue}</span>
        </div>
        <p>{event.description}</p>
        {event.collaboration && <p>In collaboration with {event.collaboration}.</p>}
        {event.media?.length > 0 && (
          <button
            type='button'
            className={styles.galleryButton}
            aria-haspopup='dialog'
            onClick={() => {
              setActiveMedia(0)
              dialogRef.current.showModal()
            }}
          >
            <FiImage aria-hidden='true' />
            {event.media.some(item => item.type === 'video') ? 'View photos and video' : 'View photos'}
          </button>
        )}
        {event.cta && (
          <a className={styles.cta} href={event.cta.href}>
            {event.cta.label} <FiArrowUpRight aria-hidden='true' />
          </a>
        )}
      </div>
      {event.media?.length > 0 && (
        <EventGallery
          title={event.title}
          media={event.media}
          dialogRef={dialogRef}
          activeIndex={activeMedia}
          setActiveIndex={setActiveMedia}
        />
      )}
    </li>
  )
}

export default function SuccessfulEvents ({ events }) {
  const headingId = useId()
  const [activeId, setActiveId] = useState(events[0]?.id)

  if (!events.length) return null

  return (
    <section id='successful-events' aria-labelledby={headingId} className={`content-section ${styles.section}`}>
      <header className={styles.heading}>
        <h2 id={headingId}>Our Successful <span>Events</span></h2>
      </header>
      <ul className={styles.rail} tabIndex={0} aria-label='Past events'>
        {events.map((event, index) => (
          <EventCard
            key={event.id}
            event={event}
            number={index + 1}
            expanded={event.id === activeId}
            onSelect={() => setActiveId(event.id)}
          />
        ))}
      </ul>
    </section>
  )
}
