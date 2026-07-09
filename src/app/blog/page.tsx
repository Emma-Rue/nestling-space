'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface Post {
  _id: string
  title: string
  excerpt?: string
  publishedAt?: string
  author?: string
  slug: { current: string }
  mainImage?: { asset: { _ref: string } }
  tags?: string[]
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(!!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  const [activeTag, setActiveTag] = useState<string>('all')

  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    if (!projectId) return

    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
    const base = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}`

    fetch(`${base}?query=${encodeURIComponent('*[_type == "post"] | order(publishedAt desc) { _id, title, excerpt, publishedAt, author, slug, mainImage, tags }')}`)
      .then(r => r.json())
      .then(d => { setPosts(d.result ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const allTags = Array.from(new Set(posts.flatMap(p => p.tags ?? [])))
  const filtered = activeTag === 'all' ? posts : posts.filter(p => p.tags?.includes(activeTag))

  return (
    <main style={{ paddingTop: '72px' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(160deg, var(--cream-dark), var(--cream))', padding: '80px 5% 60px', textAlign: 'center' }}>
        <span className="section-eyebrow">Insights &amp; Updates</span>
        <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>From the <em>Practice</em></h1>
        <p className="section-body" style={{ maxWidth: '560px', margin: '0 auto' }}>
          Reflections, mental health insights, and updates from Dr. Mugabe and The Nestling Space.
        </p>
      </section>

      {/* Posts */}
      <section style={{ background: 'var(--white)', padding: '80px 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '48px' }}>
              {['all', ...allTags].map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '50px',
                    border: '1.5px solid',
                    borderColor: activeTag === tag ? 'var(--sage)' : 'var(--beige)',
                    background: activeTag === tag ? 'var(--sage)' : 'transparent',
                    color: activeTag === tag ? 'var(--white)' : 'var(--text-mid)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {tag === 'all' ? 'All Posts' : tag}
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-soft)' }}>
              <div className="loader-bloom" style={{ margin: '0 auto 20px' }}><span></span><span></span><span></span></div>
              Loading posts...
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px', background: 'var(--cream)', borderRadius: '16px' }}>
              <p style={{ color: 'var(--text-soft)', fontSize: '1.1rem', marginBottom: '16px' }}>
                {posts.length === 0
                  ? 'No blog posts published yet. Check back soon!'
                  : 'No posts match the selected filter.'}
              </p>
              {activeTag !== 'all' && (
                <button onClick={() => setActiveTag('all')} className="btn-secondary" style={{ display: 'inline-flex', background: 'transparent' }}>
                  View All Posts
                </button>
              )}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {filtered.map((post, index) => (
              <article key={post._id} style={{ opacity: 0, animation: `fadeIn 0.5s ease ${index * 0.1}s forwards` }}>
                <Link href={`/blog/${post.slug.current}`} style={{ display: 'block', borderRadius: '16px', overflow: 'hidden', background: 'var(--cream)', boxShadow: 'var(--shadow-soft)', transition: 'transform 0.3s, box-shadow 0.3s', textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-strong)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-soft)' }}
                >
                  {post.mainImage ? (
                    <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                      <Image
                        src={urlFor(post.mainImage).width(640).height(440).url()}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 380px"
                      />
                    </div>
                  ) : (
                    <div style={{ height: '160px', background: 'linear-gradient(135deg, var(--sage-pale), var(--blush-light))' }}></div>
                  )}
                  <div style={{ padding: '28px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '8px' }}>
                      {post.publishedAt && (
                        <time style={{ fontSize: '0.75rem', color: 'var(--text-soft)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                          {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </time>
                      )}
                      {post.author && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--sage)', fontWeight: '700' }}>{post.author}</span>
                      )}
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '10px', lineHeight: '1.35' }}>
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-soft)', lineHeight: '1.7', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.excerpt}
                      </p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} style={{ background: 'var(--sage-pale)', color: 'var(--sage)', padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '700' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <span style={{ color: 'var(--sage)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.04em' }}>
                      Read More →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}
