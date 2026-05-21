'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface TicketData {
  status: 'valid' | 'used' | 'invalid' | 'unpaid'
  videoUrl?: string
  eventTitle?: string
  eventDate?: string
  buyerName?: string
  message?: string
  usedAt?: string
}

export default function WatchPage() {
  const params = useParams()
  const token = params.token as string

  const [data, setData] = useState<TicketData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return
    fetch(`/api/tickets/${encodeURIComponent(token)}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => { setData({ status: 'invalid' }); setLoading(false) })
  }, [token])

  if (loading) return (
    <main style={{ paddingTop: '72px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="loader-bloom" style={{ margin: '0 auto 20px' }}><span></span><span></span><span></span></div>
        <p style={{ color: 'var(--text-soft)' }}>Verifying your access...</p>
      </div>
    </main>
  )

  if (!data || data.status === 'invalid') return (
    <main style={{ paddingTop: '72px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px', padding: '0 24px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⚠</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '16px', color: 'var(--text-dark)' }}>Invalid Link</h1>
        <p style={{ color: 'var(--text-mid)', lineHeight: '1.7', marginBottom: '32px' }}>
          This watch link is not valid. It may have been entered incorrectly, or it may not exist.
        </p>
        <p style={{ color: 'var(--text-soft)', fontSize: '0.88rem', marginBottom: '32px' }}>
          Need help? Email us at <a href="mailto:nestlingsafespace@gmail.com" style={{ color: 'var(--sage)' }}>nestlingsafespace@gmail.com</a>
        </p>
        <Link href="/events" className="btn-secondary">Back to Events</Link>
      </div>
    </main>
  )

  if (data.status === 'used') return (
    <main style={{ paddingTop: '72px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px', padding: '0 24px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔒</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '16px', color: 'var(--text-dark)' }}>Link Already Used</h1>
        <p style={{ color: 'var(--text-mid)', lineHeight: '1.7', marginBottom: '16px' }}>
          This personal watch link has already been accessed. Each link can only be used once for your security.
        </p>
        {data.usedAt && (
          <p style={{ color: 'var(--text-soft)', fontSize: '0.85rem', marginBottom: '32px' }}>
            Accessed on: {new Date(data.usedAt).toLocaleString('en-GB')}
          </p>
        )}
        <p style={{ color: 'var(--text-soft)', fontSize: '0.88rem', marginBottom: '32px' }}>
          If you believe this is an error, contact us: <a href="mailto:nestlingsafespace@gmail.com" style={{ color: 'var(--sage)' }}>nestlingsafespace@gmail.com</a>
        </p>
        <Link href="/events" className="btn-secondary">Browse Events</Link>
      </div>
    </main>
  )

  if (data.status === 'unpaid') return (
    <main style={{ paddingTop: '72px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px', padding: '0 24px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⏳</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '16px', color: 'var(--text-dark)' }}>Payment Pending</h1>
        <p style={{ color: 'var(--text-mid)', lineHeight: '1.7', marginBottom: '32px' }}>
          Your payment has not been confirmed yet. Please wait for your confirmation email, or contact us for assistance.
        </p>
        <a href="mailto:nestlingsafespace@gmail.com" className="btn-primary" style={{ display: 'inline-flex' }}>Contact Support</a>
      </div>
    </main>
  )

  // Valid ticket — show video
  return (
    <main style={{ paddingTop: '72px', background: 'var(--cream)', minHeight: '100vh' }}>
      <section style={{ padding: '60px 5%', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ background: 'var(--blush)', borderLeft: '4px solid #d97706', borderRadius: '8px', padding: '16px 20px', marginBottom: '32px', fontSize: '0.88rem', color: 'var(--text-dark)' }}>
          <strong>Personal access only.</strong> This link was created exclusively for you. Do not share it — each link can only be used once.
        </div>

        <div style={{ marginBottom: '8px' }}>
          <span className="section-eyebrow">Your Event</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--text-dark)', marginBottom: '8px' }}>
          {data.eventTitle}
        </h1>
        {data.eventDate && (
          <p style={{ color: 'var(--text-soft)', marginBottom: '8px' }}>
            {new Date(data.eventDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        )}
        {data.buyerName && (
          <p style={{ color: 'var(--text-mid)', fontSize: '0.9rem', marginBottom: '40px' }}>
            Ticket registered to: <strong>{data.buyerName}</strong>
          </p>
        )}

        {data.videoUrl ? (
          <div>
            <div style={{ background: 'var(--text-dark)', borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9', position: 'relative', marginBottom: '24px' }}>
              {data.videoUrl.includes('youtube') || data.videoUrl.includes('youtu.be') ? (
                <iframe
                  src={data.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title={data.eventTitle}
                />
              ) : data.videoUrl.includes('zoom') || data.videoUrl.includes('meet.google') || data.videoUrl.includes('teams') ? (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                  <p style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>Click to join the live session</p>
                  <a
                    href={data.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                    style={{ display: 'inline-flex', fontSize: '1rem', padding: '16px 40px' }}
                  >
                    Join Now
                  </a>
                </div>
              ) : (
                <video
                  src={data.videoUrl}
                  controls
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                  playsInline
                />
              )}
            </div>

            <div style={{ background: 'var(--white)', borderRadius: '12px', padding: '20px', border: '1px solid var(--cream-dark)', fontSize: '0.85rem', color: 'var(--text-soft)' }}>
              Having trouble? Contact us at <a href="mailto:nestlingsafespace@gmail.com" style={{ color: 'var(--sage)' }}>nestlingsafespace@gmail.com</a> or{' '}
              <a href="https://wa.me/263773214886" target="_blank" rel="noreferrer" style={{ color: '#25D366' }}>WhatsApp</a>.
            </div>
          </div>
        ) : (
          <div style={{ background: 'var(--white)', borderRadius: '16px', padding: '48px', textAlign: 'center', border: '1px solid var(--cream-dark)' }}>
            <p style={{ color: 'var(--text-mid)', marginBottom: '16px', fontSize: '1rem' }}>
              The video link for this event has not been added yet. You will receive an email when it is available.
            </p>
            <a href="mailto:nestlingsafespace@gmail.com" className="btn-secondary" style={{ display: 'inline-flex' }}>Contact Support</a>
          </div>
        )}
      </section>
    </main>
  )
}
