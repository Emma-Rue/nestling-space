'use client'

import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

type Stage = 'polling' | 'success' | 'timeout' | 'noref'

function PaymentSuccessInner() {
  const searchParams = useSearchParams()
  const reference = searchParams.get('reference')
  const [stage, setStage] = useState<Stage>(reference ? 'polling' : 'noref')
  const [pollCount, setPollCount] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!reference || stage !== 'polling') return

    const poll = async (attempt: number) => {
      if (attempt > 40) {
        setStage('timeout')
        return
      }
      try {
        const res = await fetch(`/api/payment/check/${encodeURIComponent(reference)}`)
        const data = await res.json()
        if (data.status === 'paid') {
          setStage('success')
          return
        }
      } catch { /* continue polling */ }

      setPollCount(attempt + 1)
      timerRef.current = setTimeout(() => poll(attempt + 1), 3000)
    }

    poll(0)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference])

  if (stage === 'noref') return (
    <main style={{ paddingTop: '72px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px', padding: '0 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '16px' }}>Payment Page</h1>
        <p style={{ color: 'var(--text-soft)', marginBottom: '32px' }}>No payment reference found.</p>
        <Link href="/events" className="btn-secondary">Back to Events</Link>
      </div>
    </main>
  )

  if (stage === 'success') return (
    <main style={{ paddingTop: '72px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
      <div style={{ textAlign: 'center', maxWidth: '520px', padding: '60px 24px', background: 'var(--white)', borderRadius: '24px', boxShadow: 'var(--shadow-strong)' }}>
        <div style={{ width: '80px', height: '80px', background: 'var(--sage-pale)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2rem' }}>
          ✓
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--text-dark)', marginBottom: '16px' }}>Payment Confirmed!</h1>
        <p style={{ color: 'var(--text-mid)', lineHeight: '1.75', marginBottom: '32px' }}>
          Your ticket is confirmed. We have sent your personal watch link to your email. Check your inbox (and spam folder) for an email from The Nestling Space.
        </p>
        <p style={{ color: 'var(--text-soft)', fontSize: '0.88rem', marginBottom: '32px' }}>
          Each watch link is personal and can only be used once — do not share it.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/events" className="btn-secondary">Browse More Events</Link>
          <a href="mailto:nestlingsafespace@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-soft)', fontSize: '0.88rem' }}>
            Need help? Email us
          </a>
        </div>
      </div>
    </main>
  )

  if (stage === 'timeout') return (
    <main style={{ paddingTop: '72px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
      <div style={{ textAlign: 'center', maxWidth: '520px', padding: '60px 24px', background: 'var(--white)', borderRadius: '24px', boxShadow: 'var(--shadow-strong)' }}>
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⏱</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--text-dark)', marginBottom: '16px' }}>Verification Taking Longer Than Expected</h1>
        <p style={{ color: 'var(--text-mid)', lineHeight: '1.75', marginBottom: '32px' }}>
          If you completed payment, your watch link will be sent to your email shortly. Please check your inbox.
        </p>
        <p style={{ color: 'var(--text-soft)', fontSize: '0.88rem', marginBottom: '32px' }}>
          Reference: <code style={{ background: 'var(--cream)', padding: '2px 8px', borderRadius: '4px' }}>{reference}</code>
        </p>
        <a href="mailto:nestlingsafespace@gmail.com" className="btn-primary" style={{ display: 'inline-flex' }}>Contact Support</a>
      </div>
    </main>
  )

  // Polling
  return (
    <main style={{ paddingTop: '72px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px', padding: '60px 24px' }}>
        <div className="loader-bloom" style={{ margin: '0 auto 28px' }}><span></span><span></span><span></span></div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text-dark)', marginBottom: '16px' }}>Processing Your Payment</h1>
        <p style={{ color: 'var(--text-mid)', lineHeight: '1.75', marginBottom: '12px' }}>
          We are verifying your payment with PayNow. This usually takes 10–30 seconds.
        </p>
        <p style={{ color: 'var(--text-soft)', fontSize: '0.82rem' }}>
          Check {pollCount * 3}s of {40 * 3}s maximum
        </p>
      </div>
    </main>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <main style={{ paddingTop: '72px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader-bloom"><span></span><span></span><span></span></div>
      </main>
    }>
      <PaymentSuccessInner />
    </Suspense>
  )
}
