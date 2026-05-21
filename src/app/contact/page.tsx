'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaWhatsapp, FaEnvelope, FaInstagram, FaFacebook } from 'react-icons/fa'

const SERVICES = [
  'Website Feedback',
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
  'General Enquiry',
]

type Stage = 'form' | 'loading' | 'success' | 'error'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')
  const [stage, setStage] = useState<Stage>('form')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please fill in your name, email, and message.')
      return
    }
    setErrorMsg('')
    setStage('loading')

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, service, message }),
      })
      if (res.ok) {
        setStage('success')
      } else {
        const data = await res.json()
        setErrorMsg(data.error ?? 'Something went wrong. Please try WhatsApp.')
        setStage('error')
      }
    } catch {
      setErrorMsg('Could not send your message. Please use WhatsApp or email directly.')
      setStage('error')
    }
  }

  return (
    <main style={{ paddingTop: '72px', background: 'var(--white)', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(160deg, var(--cream-dark), var(--cream))', padding: '80px 5% 60px' }}>
        <div style={{ maxWidth: '700px' }}>
          <Link href="/" style={{ color: 'var(--text-soft)', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
            ← Back to Home
          </Link>
          <span className="section-eyebrow">We&apos;re Here</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Get in <em>Touch</em>
          </h1>
          <p className="section-body" style={{ maxWidth: '540px' }}>
            Every message is read with care. Whether you have a question, need more information, or are ready to begin — reach out and we will respond warmly.
          </p>
        </div>
      </section>

      <section style={{ padding: '60px 5% 80px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '60px', alignItems: 'start' }}>

          {/* Form */}
          <div>
            {stage === 'success' ? (
              <div style={{ background: 'var(--cream)', borderRadius: '20px', padding: '60px 40px', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>✿</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text-dark)', marginBottom: '16px' }}>Message Received</h2>
                <p style={{ color: 'var(--text-mid)', lineHeight: '1.75', marginBottom: '32px' }}>
                  Thank you, <strong>{name}</strong>. Dr. Mugabe will be in touch with warmth and care. We typically respond within 24 hours.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={() => { setStage('form'); setName(''); setEmail(''); setPhone(''); setService(''); setMessage('') }} className="btn-secondary" style={{ display: 'inline-flex', background: 'transparent' }}>
                    Send Another Message
                  </button>
                  <Link href="/book" className="btn-primary">Book a Session</Link>
                </div>
              </div>
            ) : (
              <div style={{ background: 'var(--cream)', borderRadius: '20px', padding: '44px 40px', border: '1px solid var(--cream-dark)' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text-dark)', marginBottom: '28px' }}>Send an Enquiry</h2>
                <form onSubmit={handleSubmit}>
                  {errorMsg && (
                    <div style={{ background: '#FEF2F2', color: '#991B1B', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.88rem' }}>
                      {errorMsg}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Your name" />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Phone Number (optional)</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+263 77 ..." />
                  </div>

                  <div className="form-group">
                    <label>Service of Interest (optional)</label>
                    <select value={service} onChange={e => setService(e.target.value)} style={{ width: '100%', padding: '14px 18px', border: '1.5px solid var(--cream-dark)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-dark)', background: 'var(--white)', outline: 'none' }}>
                      <option value="">Not sure yet</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <p style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--text-soft)' }}>
                      Choose Website Feedback if you want to share comments or suggestions about the site.
                    </p>
                  </div>

                  <div className="form-group">
                    <label>Your Message *</label>
                    <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5} required placeholder="Share what's on your mind..." />
                  </div>

                  <button type="submit" className="btn-submit" disabled={stage === 'loading'}>
                    {stage === 'loading' ? 'Sending...' : 'Send Enquiry'}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Contact Info Sidebar */}
          <div style={{ display: 'grid', gap: '20px' }}>
            {/* Direct contact */}
            <div style={{ background: 'var(--cream)', borderRadius: '20px', padding: '32px', border: '1px solid var(--cream-dark)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--text-dark)', marginBottom: '20px' }}>Direct Contact</h3>
              <a href="https://wa.me/263773214886" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', background: '#25D366', color: '#fff', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem', marginBottom: '10px' }}>
                <FaWhatsapp style={{ fontSize: '1.2rem' }} />
                +263 77 321 4886
              </a>
              <a href="mailto:nestlingsafespace@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', background: 'var(--white)', color: 'var(--text-mid)', borderRadius: '12px', textDecoration: 'none', fontSize: '0.88rem', border: '1px solid var(--cream-dark)' }}>
                <FaEnvelope style={{ color: 'var(--sage)' }} />
                nestlingsafespace@gmail.com
              </a>
            </div>

            {/* Social */}
            <div style={{ background: 'var(--cream)', borderRadius: '20px', padding: '32px', border: '1px solid var(--cream-dark)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--text-dark)', marginBottom: '20px' }}>Follow Us</h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                <a href="https://www.instagram.com/nestlingspace" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'var(--white)', borderRadius: '10px', textDecoration: 'none', color: 'var(--text-mid)', fontSize: '0.88rem', border: '1px solid var(--cream-dark)' }}>
                  <FaInstagram style={{ color: '#E1306C', fontSize: '1.1rem' }} />
                  @nestlingspace
                </a>
                <a href="https://www.facebook.com/profile.php?id=61580743690158" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'var(--white)', borderRadius: '10px', textDecoration: 'none', color: 'var(--text-mid)', fontSize: '0.88rem', border: '1px solid var(--cream-dark)' }}>
                  <FaFacebook style={{ color: '#1877F2', fontSize: '1.1rem' }} />
                  The Nestling Space
                </a>
              </div>
            </div>

            {/* Office Hours */}
            <div style={{ background: 'var(--sage)', borderRadius: '20px', padding: '32px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--white)', marginBottom: '16px' }}>Office Hours</h3>
              {[
                { day: 'Mon – Fri', time: '8:00am – 6:00pm' },
                { day: 'Saturday', time: '9:00am – 2:00pm' },
                { day: 'Sunday', time: 'By arrangement' },
              ].map(item => (
                <div key={item.day} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.85rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.75)' }}>{item.day}</span>
                  <span style={{ color: 'var(--white)', fontWeight: '700' }}>{item.time}</span>
                </div>
              ))}
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', marginTop: '16px' }}>
                Online sessions available outside office hours by arrangement.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
