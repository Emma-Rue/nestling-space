'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa'

const SERVICES = [
  'Youth Counselling',
  'Adult & Aged Therapy',
  'Family Counselling',
  'Parenting Support',
  'Premarital Counselling',
  'Marriage Counselling',
  'School-Based Counselling',
  'Corporate Well-being Programs',
  'Mental Health Workshops',
  'Boot Camps & Training Packages',
  'Online Counselling',
  'Group Counselling Sessions',
]

type Stage = 'form' | 'loading' | 'success' | 'error'

export default function BookPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [preferredTime, setPreferredTime] = useState('')
  const [notes, setNotes] = useState('')
  const [stage, setStage] = useState<Stage>('form')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !service || !preferredDate || !preferredTime) {
      setErrorMsg('Please fill in all required fields.')
      return
    }
    setErrorMsg('')
    setStage('loading')

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, service, preferredDate, preferredTime, notes }),
      })
      if (res.ok) {
        setStage('success')
      } else {
        const data = await res.json()
        setErrorMsg(data.error ?? 'Something went wrong. Please try WhatsApp.')
        setStage('error')
      }
    } catch {
      setErrorMsg('Could not send your booking. Please use WhatsApp or email directly.')
      setStage('error')
    }
  }

  return (
    <main style={{ paddingTop: '72px', background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(160deg, var(--white), var(--cream))', padding: '80px 5% 60px' }}>
        <div style={{ maxWidth: '700px' }}>
          <Link href="/" style={{ color: 'var(--text-soft)', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
            ← Back to Home
          </Link>
          <span className="section-eyebrow">Take the First Step</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Book a <em>Session</em>
          </h1>
          <p className="section-body" style={{ maxWidth: '560px' }}>
            Reaching out takes courage. Fill in the form below and Dr. Mugabe will confirm your appointment with care and warmth. Prefer instant contact? Use WhatsApp.
          </p>
        </div>
      </section>

      <section style={{ padding: '20px 5% 80px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'start' }}>

          {/* Form */}
          <div>
            {stage === 'success' ? (
              <div style={{ background: 'var(--white)', borderRadius: '20px', padding: '60px 40px', textAlign: 'center', boxShadow: 'var(--shadow-soft)' }}>
                <div style={{ width: '72px', height: '72px', background: 'var(--sage-pale)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2rem' }}>✓</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text-dark)', marginBottom: '16px' }}>Booking Request Sent!</h2>
                <p style={{ color: 'var(--text-mid)', lineHeight: '1.75', marginBottom: '32px' }}>
                  Thank you, <strong>{name}</strong>. Dr. Mugabe will review your request and confirm your <strong>{service}</strong> appointment shortly. Check your email for a confirmation.
                </p>
                <button onClick={() => setStage('form')} className="btn-secondary" style={{ display: 'inline-flex', background: 'transparent' }}>
                  Submit Another Request
                </button>
              </div>
            ) : (
              <div style={{ background: 'var(--white)', borderRadius: '20px', padding: '44px 40px', boxShadow: 'var(--shadow-soft)' }}>
                <form onSubmit={handleSubmit}>
                  {errorMsg && (
                    <div style={{ background: '#FEF2F2', color: '#991B1B', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.88rem' }}>
                      {errorMsg}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Your full name" />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+263 77 ..." />
                  </div>

                  <div className="form-group">
                    <label>Service *</label>
                    <select value={service} onChange={e => setService(e.target.value)} required style={{ width: '100%', padding: '14px 18px', border: '1.5px solid var(--cream-dark)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: service ? 'var(--text-dark)' : 'var(--text-soft)', background: 'var(--white)', outline: 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
                      <option value="">Select a service...</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label>Preferred Date *</label>
                      <input type="date" value={preferredDate} onChange={e => setPreferredDate(e.target.value)} required min={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="form-group">
                      <label>Preferred Time *</label>
                      <select value={preferredTime} onChange={e => setPreferredTime(e.target.value)} required style={{ width: '100%', padding: '14px 18px', border: '1.5px solid var(--cream-dark)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: preferredTime ? 'var(--text-dark)' : 'var(--text-soft)', background: 'var(--white)', outline: 'none' }}>
                        <option value="">Select time...</option>
                        <option value="Morning (8am–12pm)">Morning (8am–12pm)</option>
                        <option value="Afternoon (12pm–4pm)">Afternoon (12pm–4pm)</option>
                        <option value="Evening (4pm–7pm)">Evening (4pm–7pm)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Notes for Dr. Mugabe</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4} placeholder="Any context that would help Dr. Mugabe prepare for your session..." />
                  </div>

                  <p style={{ fontSize: '0.78rem', color: 'var(--text-soft)', marginBottom: '20px' }}>
                    By submitting this form, you consent to our{' '}
                    <Link href="/#privacy" style={{ color: 'var(--sage)' }}>Privacy Policy</Link> and{' '}
                    <Link href="/#terms" style={{ color: 'var(--sage)' }}>Terms &amp; Conditions</Link>.
                  </p>

                  <button type="submit" className="btn-submit" disabled={stage === 'loading'}>
                    {stage === 'loading' ? 'Sending...' : 'Request Booking'}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: '92px' }}>
            <div style={{ background: 'var(--white)', borderRadius: '20px', padding: '36px', boxShadow: 'var(--shadow-soft)', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '20px' }}>
                Prefer instant contact?
              </h3>
              <a
                href="https://wa.me/263773214886?text=Hello%2C%20I%20would%20like%20to%20book%20a%20session%20with%20The%20Nestling%20Space."
                target="_blank"
                rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#25D366', color: '#fff', padding: '14px 20px', borderRadius: '12px', fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none', marginBottom: '12px', transition: 'opacity 0.2s' }}
              >
                <FaWhatsapp style={{ fontSize: '1.2rem' }} />
                Book on WhatsApp
              </a>
              <a
                href="mailto:nestlingsafespace@gmail.com?subject=Booking%20Request"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--cream)', color: 'var(--text-mid)', padding: '14px 20px', borderRadius: '12px', fontWeight: '400', fontSize: '0.88rem', textDecoration: 'none', transition: 'opacity 0.2s' }}
              >
                <FaEnvelope />
                nestlingsafespace@gmail.com
              </a>
            </div>

            <div style={{ background: 'var(--sage-pale)', borderRadius: '20px', padding: '28px' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text-dark)', marginBottom: '16px' }}>Office Hours</h4>
              <div style={{ display: 'grid', gap: '10px' }}>
                {[
                  { day: 'Monday – Friday', time: '8:00am – 6:00pm' },
                  { day: 'Saturday', time: '9:00am – 2:00pm' },
                  { day: 'Sunday', time: 'By arrangement' },
                ].map(item => (
                  <div key={item.day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-mid)' }}>{item.day}</span>
                    <span style={{ color: 'var(--sage)', fontWeight: '700' }}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'var(--white)', borderRadius: '20px', padding: '28px', marginTop: '20px', boxShadow: 'var(--shadow-soft)', borderLeft: '4px solid var(--blush)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--text-mid)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                &ldquo;Healing becomes possible when people are met with skill, compassion, and a space where their story is taken seriously.&rdquo;
              </p>
              <p style={{ marginTop: '12px', color: 'var(--sage)', fontWeight: '700', fontSize: '0.85rem' }}>— Dr. M. Mugabe</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
