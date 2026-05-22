'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client, urlFor } from '@/lib/sanity'
import { FaRegCalendar, FaVideo, FaTag } from 'react-icons/fa'

interface SanityEvent {
  _id: string
  title: string
  date: string
  price: number
  status: string
  slug: { current: string }
  mainImage?: { asset: { _ref: string } }
  description?: Array<{ _type: string; children?: Array<{ text: string }> }>
  maxTickets?: number
  soldCount?: number
  eventType?: string
  isVirtual?: boolean
  platform?: string
  currency?: string
}

type FormStage = 'form' | 'loading' | 'redirecting' | 'polling' | 'success' | 'error'

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params.id as string

  const [event, setEvent] = useState<SanityEvent | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [stage, setStage] = useState<FormStage>('form')
  const [errorMsg, setErrorMsg] = useState('')
  const [reference, setReference] = useState('')
  const [pollCount, setPollCount] = useState(0)

  useEffect(() => {
    if (!eventId) return
    client.fetch(
      `*[_type == "event" && _id == $id][0]{
        _id, title, date, price, status, slug, mainImage, description, maxTickets, eventType, isVirtual, platform, currency,
        "soldCount": count(*[_type == "ticket" && event._ref == ^._id && paid == true])
      }`,
      { id: eventId }
    ).then((data) => {
      if (!data) setNotFound(true)
      else setEvent(data)
      setLoading(false)
    }).catch(() => { setNotFound(true); setLoading(false) })
  }, [eventId])

  const pollStatus = useCallback(async (ref: string, count: number) => {
    if (count > 40) {
      setStage('error')
      setErrorMsg('Payment verification timed out. If you paid, please check your email or contact us.')
      return
    }
    try {
      const res = await fetch(`/api/payment/check/${encodeURIComponent(ref)}`)
      const data = await res.json()
      if (data.status === 'paid') {
        setStage('success')
      } else {
        setPollCount(c => c + 1)
        setTimeout(() => pollStatus(ref, count + 1), 3000)
      }
    } catch {
      setTimeout(() => pollStatus(ref, count + 1), 3000)
    }
  }, [])

  useEffect(() => {
    if (stage === 'polling' && reference) {
      pollStatus(reference, pollCount)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, reference])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please fill in your name and email.')
      return
    }
    setErrorMsg('')
    setStage('loading')

    try {
      const res = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, buyerName: name, buyerEmail: email, buyerPhone: phone }),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        setErrorMsg(data.error ?? 'Payment initiation failed. Please try again.')
        setStage('form')
        return
      }

      setReference(data.reference)
      setStage('redirecting')

      // Redirect to PayNow
      setTimeout(() => {
        window.location.href = data.redirectUrl
      }, 1500)
    } catch {
      setErrorMsg('Something went wrong. Please try again or use WhatsApp.')
      setStage('form')
    }
  }

  if (loading) return (
    <main style={{ paddingTop: '72px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="loader-bloom" style={{ margin: '0 auto 20px' }}><span></span><span></span><span></span></div>
        <p style={{ color: 'var(--text-soft)' }}>Loading event...</p>
      </div>
    </main>
  )

  if (notFound || !event) return (
    <main style={{ paddingTop: '72px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '24px' }}>
      <h1 className="section-title">Event Not Found</h1>
      <Link href="/events" className="btn-primary">Back to Events</Link>
    </main>
  )

  const remaining = event.maxTickets ? event.maxTickets - (event.soldCount ?? 0) : null
  const isFull = remaining !== null && remaining <= 0
  const isPast = event.status === 'past'

  return (
    <main style={{ paddingTop: '72px' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '380px', background: 'var(--cream)' }}>
        {event.mainImage ? (
          <Image
            src={urlFor(event.mainImage).width(1400).height(760).url()}
            alt={event.title}
            fill
            style={{ objectFit: 'cover', opacity: 0.6 }}
            sizes="100vw"
            priority
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, var(--sage-pale), var(--blush))' }}></div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(58,48,40,0.3), rgba(58,48,40,0.7))' }}></div>
        <div style={{ position: 'absolute', bottom: '40px', left: '5%', right: '5%' }}>
          <Link href="/events" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', marginBottom: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            ← Back to Events
          </Link>
          {event.status === 'live' && (
            <span style={{ display: 'inline-block', background: '#e53e3e', color: '#fff', padding: '4px 16px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '700', marginBottom: '12px' }}>
              LIVE NOW
            </span>
          )}
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', marginBottom: '12px' }}>{event.title}</h1>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem' }}>
            <span><FaRegCalendar style={{ marginRight: '6px' }} />{new Date(event.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            {event.isVirtual && <span><FaVideo style={{ marginRight: '6px' }} />{event.platform ?? 'Online'}</span>}
            <span><FaTag style={{ marginRight: '6px' }} />${event.price} {event.currency ?? 'USD'}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <section style={{ padding: '80px 5%', background: 'var(--white)' }}>
        <div className="page-form-layout">

          {/* Description */}
          <div>
            <h2 className="section-title" style={{ marginBottom: '24px' }}>About This <em>Event</em></h2>
            {event.description && event.description.length > 0 ? (
              <div className="section-body" style={{ lineHeight: '1.85' }}>
                <PortableText value={event.description} />
              </div>
            ) : (
              <p className="section-body">Details for this event will be shared upon registration.</p>
            )}

            <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'var(--cream)', borderRadius: '12px', padding: '20px' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-soft)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Date &amp; Time</p>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: '700', color: 'var(--text-dark)' }}>
                  {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                <p style={{ color: 'var(--text-mid)', fontSize: '0.9rem' }}>
                  {new Date(event.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div style={{ background: 'var(--cream)', borderRadius: '12px', padding: '20px' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-soft)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Format</p>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: '700', color: 'var(--text-dark)' }}>
                  {event.isVirtual ? 'Virtual' : 'In Person'}
                </p>
                {event.platform && <p style={{ color: 'var(--text-mid)', fontSize: '0.9rem' }}>{event.platform}</p>}
              </div>
              <div style={{ background: 'var(--cream)', borderRadius: '12px', padding: '20px' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-soft)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Tickets</p>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: '700', color: 'var(--text-dark)' }}>${event.price} USD</p>
                {remaining !== null && (
                  <p style={{ color: remaining <= 5 ? '#d97706' : 'var(--text-mid)', fontSize: '0.9rem', fontWeight: remaining <= 5 ? '700' : '400' }}>
                    {isFull ? 'Sold out' : `${remaining} spots left`}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Purchase Form */}
          <div>
            {isPast ? (
              <div style={{ background: 'var(--cream)', borderRadius: '16px', padding: '36px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--text-mid)', marginBottom: '16px' }}>This event has passed.</p>
                <Link href="/events" className="btn-secondary">Browse Upcoming Events</Link>
              </div>
            ) : isFull ? (
              <div style={{ background: 'var(--cream)', borderRadius: '16px', padding: '36px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--text-mid)', marginBottom: '16px' }}>This event is sold out.</p>
                <a href="https://wa.me/263773214886" target="_blank" rel="noreferrer" className="btn-primary" style={{ background: '#25D366', display: 'inline-flex' }}>
                  Join Waitlist via WhatsApp
                </a>
              </div>
            ) : stage === 'success' ? (
              <div style={{ background: 'var(--cream)', borderRadius: '16px', padding: '36px', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✿</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text-dark)', marginBottom: '12px' }}>Payment Confirmed!</h3>
                <p style={{ color: 'var(--text-mid)', lineHeight: '1.7' }}>
                  Your ticket is confirmed. Check your email (<strong>{email}</strong>) for your personal watch link.
                </p>
              </div>
            ) : (
              <div style={{ background: 'var(--cream)', borderRadius: '16px', padding: '36px', border: '1px solid var(--cream-dark)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--text-dark)', marginBottom: '4px' }}>
                  Secure Your Spot
                </h3>
                <p style={{ color: 'var(--text-soft)', fontSize: '0.88rem', marginBottom: '28px' }}>
                  Powered by PayNow — secure local payments
                </p>

                {stage === 'redirecting' && (
                  <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-mid)' }}>
                    <div className="loader-bloom" style={{ margin: '0 auto 16px' }}><span></span><span></span><span></span></div>
                    <p>Redirecting to PayNow...</p>
                  </div>
                )}

                {stage === 'polling' && (
                  <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-mid)' }}>
                    <div className="loader-bloom" style={{ margin: '0 auto 16px' }}><span></span><span></span><span></span></div>
                    <p>Verifying your payment...</p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-soft)', marginTop: '8px' }}>This may take a moment</p>
                  </div>
                )}

                {(stage === 'form' || stage === 'loading') && (
                  <form onSubmit={handleSubmit}>
                    {errorMsg && (
                      <div style={{ background: '#FEF2F2', color: '#991B1B', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.88rem' }}>
                        {errorMsg}
                      </div>
                    )}
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Your full name" />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+263 77 ..." />
                    </div>
                    <div style={{ background: 'var(--white)', borderRadius: '12px', padding: '16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-mid)', fontSize: '0.9rem' }}>Total</span>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '1.3rem', color: 'var(--text-dark)' }}>
                        ${event.price} USD
                      </span>
                    </div>
                    <button
                      type="submit"
                      disabled={stage === 'loading'}
                      style={{
                        width: '100%',
                        padding: '16px',
                        background: stage === 'loading' ? 'var(--beige)' : '#00A651',
                        color: stage === 'loading' ? 'var(--text-soft)' : '#fff',
                        border: 'none',
                        borderRadius: '50px',
                        fontFamily: 'var(--font-body)',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        cursor: stage === 'loading' ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {stage === 'loading' ? 'Processing...' : 'Pay with PayNow'}
                    </button>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-soft)', textAlign: 'center', marginTop: '12px' }}>
                      Your watch link will be emailed after payment confirmation.
                    </p>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
