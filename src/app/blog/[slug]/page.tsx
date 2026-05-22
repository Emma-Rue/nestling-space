'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client, urlFor } from '@/lib/sanity'

interface Post {
  _id: string
  title: string
  body?: Array<{ _type: string }>
  publishedAt?: string
  author?: string
  tags?: string[]
  mainImage?: { asset: { _ref: string } }
  excerpt?: string
}

interface Comment {
  _id: string
  authorName: string
  body: string
  createdAt: string
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string; caption?: string } }) => (
      <div style={{ margin: '32px 0' }}>
        <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt ?? ''}
            width={800}
            height={500}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
        {value.caption && (
          <p style={{ fontSize: '0.82rem', color: 'var(--text-soft)', textAlign: 'center', marginTop: '8px', fontStyle: 'italic' }}>
            {value.caption}
          </p>
        )}
      </div>
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--text-dark)', margin: '40px 0 16px', lineHeight: '1.3' }}>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--text-dark)', margin: '32px 0 12px' }}>{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ color: 'var(--text-mid)', lineHeight: '1.85', marginBottom: '20px', fontSize: '1.02rem' }}>{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote style={{ borderLeft: '4px solid var(--sage)', paddingLeft: '24px', margin: '28px 0', fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--text-mid)', fontSize: '1.1rem', lineHeight: '1.7' }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <strong style={{ color: 'var(--text-dark)', fontWeight: '700' }}>{children}</strong>,
    em: ({ children }: { children?: React.ReactNode }) => <em style={{ color: 'var(--sage)', fontStyle: 'italic' }}>{children}</em>,
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => (
      <a href={value?.href} target="_blank" rel="noreferrer" style={{ color: 'var(--sage)', textDecoration: 'underline' }}>{children}</a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul style={{ paddingLeft: '24px', marginBottom: '20px', color: 'var(--text-mid)', lineHeight: '1.85' }}>{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol style={{ paddingLeft: '24px', marginBottom: '20px', color: 'var(--text-mid)', lineHeight: '1.85' }}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => <li style={{ marginBottom: '8px' }}>{children}</li>,
    number: ({ children }: { children?: React.ReactNode }) => <li style={{ marginBottom: '8px' }}>{children}</li>,
  },
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string

  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [cName, setCName] = useState('')
  const [cEmail, setCEmail] = useState('')
  const [cBody, setCBody] = useState('')
  const [commentStage, setCommentStage] = useState<'form' | 'loading' | 'success' | 'error'>('form')
  const [commentError, setCommentError] = useState('')

  useEffect(() => {
    if (!slug) return
    client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        _id, title, body, publishedAt, author, tags, mainImage, excerpt
      }`,
      { slug }
    ).then((data) => {
      if (!data) setNotFound(true)
      else setPost(data)
      setLoading(false)
    }).catch(() => { setNotFound(true); setLoading(false) })
  }, [slug])

  useEffect(() => {
    if (!post?._id) return
    fetch(`/api/comments?postId=${post._id}`)
      .then(r => r.json())
      .then(d => setComments(d.comments ?? []))
      .catch(() => {})
  }, [post?._id])

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cName.trim() || !cBody.trim()) {
      setCommentError('Please provide your name and comment.')
      return
    }
    setCommentError('')
    setCommentStage('loading')
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: post!._id, authorName: cName, authorEmail: cEmail, body: cBody }),
      })
      if (res.ok) {
        setCommentStage('success')
      } else {
        setCommentStage('error')
        setCommentError('Failed to submit comment. Please try again.')
      }
    } catch {
      setCommentStage('error')
      setCommentError('Something went wrong. Please try again.')
    }
  }

  if (loading) return (
    <main style={{ paddingTop: '72px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="loader-bloom"><span></span><span></span><span></span></div>
    </main>
  )

  if (notFound || !post) return (
    <main style={{ paddingTop: '72px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '24px' }}>
      <h1 className="section-title">Post Not Found</h1>
      <Link href="/blog" className="btn-secondary">Back to Blog</Link>
    </main>
  )

  return (
    <main style={{ paddingTop: '72px', background: 'var(--white)' }}>
      {/* Hero */}
      <div style={{ background: 'var(--cream)', padding: '60px 5% 0' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <Link href="/blog" style={{ color: 'var(--text-soft)', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
            ← Back to Blog
          </Link>
          {post.tags && post.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {post.tags.map(tag => (
                <span key={tag} style={{ background: 'var(--sage-pale)', color: 'var(--sage)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: 'var(--text-dark)', lineHeight: '1.2', marginBottom: '20px' }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', color: 'var(--text-soft)', fontSize: '0.88rem', paddingBottom: '40px' }}>
            {post.author && <span style={{ color: 'var(--sage)', fontWeight: '700' }}>By {post.author}</span>}
            {post.publishedAt && (
              <time>{new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
            )}
          </div>
        </div>
      </div>

      {post.mainImage && (
        <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '0 5%' }}>
          <div style={{ borderRadius: '16px', overflow: 'hidden', maxHeight: '480px' }}>
            <Image
              src={urlFor(post.mainImage).width(1200).height(630).url()}
              alt={post.title}
              width={1200}
              height={630}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority
            />
          </div>
        </div>
      )}

      {/* Body */}
      <article style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 5%' }}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {post.body && <PortableText value={post.body} components={portableTextComponents as any} />}
      </article>

      {/* Comments */}
      <section style={{ maxWidth: '760px', margin: '0 auto', padding: '0 5% 80px' }}>
        <hr style={{ border: 'none', borderTop: '1px solid var(--cream-dark)', marginBottom: '48px' }} />

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text-dark)', marginBottom: '36px' }}>
          {comments.length > 0 ? `${comments.length} Comment${comments.length === 1 ? '' : 's'}` : 'Comments'}
        </h2>

        {comments.length > 0 && (
          <div style={{ display: 'grid', gap: '20px', marginBottom: '48px' }}>
            {comments.map(comment => (
              <div key={comment._id} style={{ background: 'var(--cream)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <strong style={{ color: 'var(--text-dark)', fontFamily: 'var(--font-display)' }}>{comment.authorName}</strong>
                  <time style={{ color: 'var(--text-soft)', fontSize: '0.8rem' }}>
                    {new Date(comment.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </time>
                </div>
                <p style={{ color: 'var(--text-mid)', lineHeight: '1.7', fontSize: '0.95rem' }}>{comment.body}</p>
              </div>
            ))}
          </div>
        )}

        {comments.length === 0 && (
          <p style={{ color: 'var(--text-soft)', marginBottom: '40px' }}>No comments yet. Be the first to share your thoughts.</p>
        )}

        {/* Comment Form */}
        <div className="form-page-card" style={{ background: 'var(--cream)', borderRadius: '16px', border: '1px solid var(--cream-dark)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--text-dark)', marginBottom: '24px' }}>Leave a Comment</h3>

          {commentStage === 'success' ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>✓</div>
              <p style={{ color: 'var(--sage)', fontWeight: '700', marginBottom: '8px' }}>Comment submitted!</p>
              <p style={{ color: 'var(--text-soft)', fontSize: '0.88rem' }}>Your comment is awaiting approval and will appear here once reviewed.</p>
            </div>
          ) : (
            <form onSubmit={handleComment}>
              {commentError && (
                <div style={{ background: '#FEF2F2', color: '#991B1B', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.88rem' }}>
                  {commentError}
                </div>
              )}
              <div className="form-row-2" style={{ marginBottom: '16px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Name *</label>
                  <input type="text" value={cName} onChange={e => setCName(e.target.value)} required placeholder="Your name" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Email (optional)</label>
                  <input type="email" value={cEmail} onChange={e => setCEmail(e.target.value)} placeholder="Not published" />
                </div>
              </div>
              <div className="form-group">
                <label>Comment *</label>
                <textarea value={cBody} onChange={e => setCBody(e.target.value)} rows={4} required placeholder="Share your thoughts..." />
              </div>
              <button type="submit" className="btn-submit" disabled={commentStage === 'loading'}>
                {commentStage === 'loading' ? 'Submitting...' : 'Submit Comment'}
              </button>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-soft)', marginTop: '10px' }}>
                Comments are moderated and will appear after approval.
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
