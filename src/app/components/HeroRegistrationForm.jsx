'use client'

import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { getLeadErrorMessage } from '../lib/lead-errors'
import { trackConfirmedRegistration, trackGtmEvent } from '../lib/gtm-events.mjs'
import { FiArrowRight, FiCalendar, FiPhone, FiUser } from 'react-icons/fi'

export default function HeroRegistrationForm () {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [hasError, setHasError] = useState(false)
  const submittingRef = useRef(false)

  async function handleSubmit (event) {
    event.preventDefault()
    if (submittingRef.current) return

    const form = event.currentTarget
    const data = new FormData(form)
    const fullName = String(data.get('fullName') || '').trim()
    const mobileNumber = String(data.get('mobileNumber') || '').trim()
    setMessage('')
    setHasError(false)

    if (!fullName || !/^\d{10}$/.test(mobileNumber)) {
      setHasError(true)
      setMessage('Please enter your name and a valid 10-digit mobile number.')
      toast.error('Please enter your name and a valid 10-digit mobile number.')
      return
    }

    submittingRef.current = true
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, mobileNumber, source: 'Dholera NoN' }),
        signal: AbortSignal.timeout(25000)
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || result.success !== true) {
        throw new Error(
          result.error || 'Unable to submit the form. Please try again.'
        )
      }

      trackConfirmedRegistration()
      form.reset()
      setMessage('Thank you! Our team will contact you shortly.')
      toast.success(
        'Thank you! Your details have been submitted. Our team will contact you shortly.'
      )
      trackGtmEvent('hero_form_submit', {
        form_location: 'hero',
        submission_status: 'api_reported_success'
      })
    } catch (error) {
      const errorMessage = getLeadErrorMessage(error)
      setHasError(true)
      setMessage(errorMessage)
      toast.error(errorMessage)
    } finally {
      submittingRef.current = false
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id='hero-registration'
      aria-labelledby='hero-registration-title'
      className='hero-registration'
    >
      <div className='hero-registration-heading'>
        <span className='hero-registration-icon' aria-hidden='true'>
          <FiCalendar />
        </span>
        <div>
          <h2 id='hero-registration-title'>Book Your Consultation</h2>
        </div>
      </div>

      <div className='hero-registration-rule' aria-hidden='true' />

      <form
        onSubmit={handleSubmit}
        onChange={() => setMessage('')}
        aria-busy={isSubmitting}
      >
        <div className='hero-registration-field'>
          <div className='hero-registration-input'>
            <FiUser aria-hidden='true' />
            <input
              id='hero-full-name'
              name='fullName'
              type='text'
              autoComplete='name'
              placeholder='Full name'
              pattern='.*\S.*'
              title='Please enter your full name.'
              maxLength={100}
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        <div className='hero-registration-field'>
          <div className='hero-registration-input'>
            <FiPhone aria-hidden='true' />

            <input
              id='hero-mobile-number'
              name='mobileNumber'
              type='tel'
              inputMode='numeric'
              autoComplete='tel'
              placeholder='Mobile number'
              pattern='[0-9]{10}'
              title='Please enter a 10-digit mobile number without the country code.'
              maxLength={10}
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        <button
          type='submit'
          className='hero-registration-submit'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting…' : 'Book Your Session'}{' '}
          <FiArrowRight aria-hidden='true' />
        </button>
        {message && (
          <p
            className='hero-registration-note'
            role={hasError ? 'alert' : 'status'}
          >
            {message}
          </p>
        )}
      </form>
    </section>
  )
}
