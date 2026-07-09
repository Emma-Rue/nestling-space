'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaRegCalendar, FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { urlFor } from '@/lib/sanity'

interface SanityEvent {
  _id: string
  title: string
  date: string
  price: number
  status: string
  slug: { current: string }
  mainImage?: { asset: { _ref: string } }
  maxTickets?: number
  soldCount?: number
  eventType?: string
  isVirtual?: boolean
  platform?: string
}

interface PreviousEvent {
  _id: string
  title: string
  description?: string
  category?: string
  date?: string
  images?: Array<{ asset: { _ref: string } }>
  highlights?: string[]
}

const CATEGORY_LABELS: Record<string, string> = {
  brideShower: 'Bride Showers',
  childrenAtRisk: 'Children at Risk',
  workshop: 'Workshops',
  community: 'Community Events',
  counsellingEvent: 'Counselling Events',
}

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<SanityEvent[]>([])
  const [previousEvents, setPreviousEvents] = useState<PreviousEvent[]>([])
  const [loading, setLoading] = useState(!!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    if (!projectId) return

    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
    const base = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}`

    Promise.allSettled([
      fetch(`${base}?query=${encodeURIComponent('*[_type == "event" && status in ["upcoming","live"]] | order(date asc) { _id, title, date, price, status, slug, mainImage, maxTickets, eventType, isVirtual, platform }')}`)
        .then(r => r.json()),
      fetch(`${base}?query=${encodeURIComponent('*[_type == "previousEvent"] | order(date desc) { _id, title, description, category, date, images, highlights }')}`)
        .then(r => r.json()),
    ]).then(([eventsRes, prevRes]) => {
      if (eventsRes.status === 'fulfilled') {
        const events = eventsRes.value.result ?? []
        setUpcomingEvents(events)
      }
      if (prevRes.status === 'fulfilled') setPreviousEvents(prevRes.value.result ?? [])
      setLoading(false)
    })
  }, [])

  const categories = ['all', ...Array.from(new Set(previousEvents.map(e => e.category).filter(Boolean)))] as string[]
  const filteredPrev = activeCategory === 'all'
    ? previousEvents
    : previousEvents.filter(e => e.category === activeCategory)

  return (
    <main style={{ paddingTop: '72px' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(160deg, var(--cream-dark) 0%, var(--cream) 100%)', padding: '80px 5% 60px', textAlign: 'center' }}>
        <span className="section-eyebrow">Community &amp; Learning</span>
        <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>Events &amp; <em>Webinars</em></h1>
        <p className="section-body" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Join live webinars, community gatherings, and workshops hosted by The Nestling Space. Learn, connect, and grow alongside others on the path to well-being.
        </p>
      </section>

      {/* Upcoming Events */}
      <section style={{ background: 'var(--white)', padding: '80px 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 className="section-title" style={{ marginBottom: '12px' }}>Upcoming <em>Events</em></h2>
          <p className="section-body" style={{ marginBottom: '48px' }}>Secure your spot before tickets run out.</p>

          {loading && (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-soft)' }}>
              <div className="loader-bloom" style={{ margin: '0 auto 20px' }}><span></span><span></span><span></span></div>
              Loading events...
            </div>
          )}

          {!loading && upcomingEvents.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', background: 'var(--cream)', borderRadius: '16px', color: 'var(--text-soft)' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '16px' }}>No upcoming events at the moment.</p>
              <p>Follow us on Instagram or WhatsApp to be the first to know when new events are announced.</p>
              <a href="https://wa.me/263773214886" target="_blank" rel="noreferrer" className="btn-primary" style={{ display: 'inline-flex', marginTop: '24px', background: '#25D366' }}>
                Follow on WhatsApp
              </a>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
            {upcomingEvents.map((event) => {
              const remaining = event.maxTickets
                ? event.maxTickets - (event.soldCount ?? 0)
                : null
              const isFull = remaining !== null && remaining <= 0
              return (
                <div key={event._id} className="service-card" style={{ padding: '0', overflow: 'hidden' }}>
                  {event.mainImage && (
                    <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                      <Image
                        src={urlFor(event.mainImage).width(640).height(400).url()}
                        alt={event.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      {event.status === 'live' && (
                        <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#e53e3e', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.08em' }}>
                          LIVE NOW
                        </span>
                      )}
                    </div>
                  )}
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <span style={{ background: 'var(--sage-pale)', color: 'var(--sage)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700' }}>
                        {event.isVirtual ? (event.platform ?? 'Online') : 'In Person'}
                      </span>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: '700', color: 'var(--sage)', fontSize: '1.2rem' }}>
                        ${event.price} USD
                      </span>
                    </div>
                    <h3 className="card-title" style={{ marginBottom: '8px' }}>{event.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-soft)', marginBottom: '6px' }}>
                      <FaRegCalendar style={{ marginRight: '6px' }} />
                      {new Date(event.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    {remaining !== null && (
                      <p style={{ fontSize: '0.82rem', color: isFull ? '#e53e3e' : remaining <= 5 ? '#d97706' : 'var(--text-soft)', marginBottom: '20px', fontWeight: isFull || remaining <= 5 ? '700' : '400' }}>
                        {isFull ? 'Sold Out' : `${remaining} spot${remaining === 1 ? '' : 's'} remaining`}
                      </p>
                    )}
                    {!isFull ? (
                      <Link href={`/events/${event._id}`} className="btn-primary" style={{ display: 'inline-flex', width: '100%', justifyContent: 'center', padding: '14px 20px' }}>
                        Buy Ticket
                      </Link>
                    ) : (
                      <button disabled style={{ width: '100%', padding: '14px', background: 'var(--beige)', color: 'var(--text-soft)', border: 'none', borderRadius: '50px', fontWeight: '700', cursor: 'not-allowed' }}>
                        Sold Out
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Previous Events */}
      <section style={{ background: 'var(--cream)', padding: '80px 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 className="section-title" style={{ marginBottom: '12px' }}>Previous <em>Events</em></h2>
          <p className="section-body" style={{ marginBottom: '40px' }}>A gallery of the gatherings, workshops, and community events we have hosted.</p>

          {/* Category Filter */}
          {categories.length > 1 && (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '50px',
                    border: '1.5px solid',
                    borderColor: activeCategory === cat ? 'var(--sage)' : 'var(--beige)',
                    background: activeCategory === cat ? 'var(--sage)' : 'transparent',
                    color: activeCategory === cat ? 'var(--white)' : 'var(--text-mid)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat === 'all' ? 'All Events' : CATEGORY_LABELS[cat] ?? cat}
                </button>
              ))}
            </div>
          )}

          {!loading && filteredPrev.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-soft)' }}>
              No previous events in this category yet.
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {filteredPrev.map((ev) => (
              <div key={ev._id} style={{ background: 'var(--white)', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}>
                {ev.images && ev.images.length > 0 && (
                  <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                    <Image
                      src={urlFor(ev.images[0]).width(600).height(360).url()}
                      alt={ev.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 350px"
                    />
                  </div>
                )}
                <div style={{ padding: '24px' }}>
                  {ev.category && (
                    <span style={{ display: 'inline-block', background: 'var(--blush)', color: 'var(--text-mid)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', marginBottom: '10px' }}>
                      {CATEGORY_LABELS[ev.category] ?? ev.category}
                    </span>
                  )}
                  <h3 className="card-title">{ev.title}</h3>
                  {ev.description && <p className="card-desc" style={{ marginTop: '8px' }}>{ev.description}</p>}
                  {ev.date && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-soft)', marginTop: '12px' }}>
                      {new Date(ev.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                    </p>
                  )}
                  {ev.highlights && ev.highlights.length > 0 && (
                    <ul style={{ marginTop: '12px', paddingLeft: '0', listStyle: 'none' }}>
                      {ev.highlights.slice(0, 3).map((h, i) => (
                        <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-soft)', padding: '3px 0', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                          <span style={{ color: 'var(--sage)', flexShrink: 0 }}>✓</span>{h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--sage)', padding: '80px 5%', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--white)', marginBottom: '16px' }}>
          Stay Connected
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
          Be the first to hear about new events, workshops, and webinars from The Nestling Space.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://wa.me/263773214886" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', background: '#25D366', color: '#fff', padding: '14px 28px', borderRadius: '50px', fontWeight: '700', textDecoration: 'none', fontSize: '0.9rem', gap: '8px', alignItems: 'center' }}>
            <FaWhatsapp /> Follow on WhatsApp
          </a>
          <a href="https://www.instagram.com/nestling_safe_space" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: '50px', fontWeight: '700', textDecoration: 'none', fontSize: '0.9rem', border: '1.5px solid rgba(255,255,255,0.4)' }}>
            <FaInstagram style={{ marginRight: '8px' }} /> Instagram
          </a>
        </div>
      </section>
    </main>
  )
}
