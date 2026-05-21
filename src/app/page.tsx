"use client";
import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealSpan } from "./components/MotionReveal";

const featuredServices = [
  {
    image: "/Images/new/nestling (22).webp",
    alt: "Individual counselling session at Nestling Space",
    title: "Individual Counselling",
    description:
      "Support for youth, adults, and the aged facing stress, grief, depression, anxiety, life transitions, and emotional overwhelm.",
  },
  {
    image: "/Images/new/nestling (8).webp",
    alt: "Marriage and relationship counselling session",
    title: "Marriage & Relationship Counselling",
    description:
      "Premarital guidance and marriage counselling focused on communication, conflict resolution, trust, intimacy, and emotional reconnection.",
  },
  {
    image: "/Images/new/nestling (13).webp",
    alt: "Family counselling session",
    title: "Family Counselling",
    description:
      "Practical support for healthier family communication, parenting challenges, boundary setting, behavioural concerns, and generational healing.",
  },
  {
    image: "/Images/new/nestling (20).webp",
    alt: "Group workshop and support session",
    title: "Workshops & Group Support",
    description:
      "School, community, and workplace sessions that build resilience, emotional literacy, stress management skills, and healthier relationships.",
  },
];

const testimonials = [
  {
    quote:
      "Ndainzwa kurasika uye kushungurudzika... Nestling Space yakandibatsira kupora uye kudzoka kuziva kukosha kwangu nekukwanisa kuyanana nevabereki vangu.",
    author: "Peter",
    label: "A happy student",
  },
  {
    quote:
      "Before coming to Nestling Space, I felt completely overwhelmed and alone. I was struggling with anxiety... For the first time in a long time, I feel heard, supported, and hopeful.",
    author: "Tariro",
    label: "Satisfied Client",
  },
  {
    quote:
      "Tisati tawanana, Takauya kuNestling Space tichifunga kuti takagadzirira kuroorana, asi takadzidza zvakawanda pamusoro pekutaurirana, kugadzirisa kusawirirana... Zvakatipa hwaro hwakasimba hwehupenyu.",
    author: "T & K",
    label: "Happy Couple",
  },
  {
    quote:
      "We were at a point where communication had completely broken down... Nestling Space helped us understand each other again, rebuild trust, and learn healthy ways to communicate.",
    author: "Bruno & Yusi",
    label: "Happy Couple",
  },
  {
    quote:
      "After my breakup, I felt lost, rejected, and emotionally drained... Nestling Space gave me a safe place to heal and rebuild. Today, I am stronger, more self-aware, and at peace.",
    author: "Munenyasha",
    label: "Healed Client",
  },
];

const tickerItems = [
  'Evidence-Based Care',
  'Culturally Sensitive',
  'Online & In-Person',
  'Confidential',
  'Safe & Supportive',
  'Professional & Qualified',
];

export default function Home() {
  return (
    <>
      {/* ======== HERO ======== */}
      <section id="hero">
        <Reveal className="hero-content" variant="fade" amount={0.55} delay={1.25}>
          <RevealSpan className="hero-eyebrow" variant="fade" delay={1.33}>
            Mental Wellness
          </RevealSpan>
          <div className="hero-split">
            <div className="hero-line-wrap">
              <RevealSpan className="hero-line-inner" variant="blurUp" delay={1.42}>
                A Safe Place
              </RevealSpan>
            </div>
            <div className="hero-line-wrap">
              <RevealSpan className="hero-line-inner line-2" variant="blurUp" delay={1.54}>
                To Heal.
              </RevealSpan>
            </div>
          </div>
          <Reveal className="hero-subtext" variant="fade" delay={1.62}>
            Welcome to The Nestling Space, a gentle home for your healing and growth.
            Here, you are seen, heard, and supported as you untangle life&apos;s worries,
            build emotional strength, and move toward clarity, peace, and purpose.
          </Reveal>
          <Reveal className="hero-actions" variant="fade" delay={1.72}>
            <Link href="/book" className="btn-dark-primary">
              Book a Session
            </Link>
            <Link href="/services" className="btn-dark-secondary">
              Our Services
            </Link>
          </Reveal>
          <Reveal className="hero-trust" variant="fade" delay={1.82}>
            <span className="hero-trust-item">Evidence-Based Care</span>
            <span className="hero-trust-dot"></span>
            <span className="hero-trust-item">Culturally Sensitive</span>
            <span className="hero-trust-dot"></span>
            <span className="hero-trust-item">Online &amp; In-Person</span>
            <span className="hero-trust-dot"></span>
            <span className="hero-trust-item">Confidential</span>
          </Reveal>
        </Reveal>
      </section>

      {/* ======== TICKER ======== */}
      <div className="ticker-wrap" aria-hidden="true">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].flatMap((item, i) => [
            <span key={`t${i}`} className="ticker-item">{item}</span>,
            <span key={`s${i}`} className="ticker-sep">✦</span>,
          ])}
        </div>
      </div>

      {/* ======== ABOUT PREVIEW ======== */}
      <div className="tile tile-white">
        <div className="tile-inner">
          <div className="about-preview-grid">
            <Reveal className="about-preview-photo photo-shadow" variant="slideLeft" amount={0.3}>
              <Image
                src="/Images/new/old-pics (1).webp"
                alt="Dr Mugabe, founder of The Nestling Space"
                fill
                quality={100}
                sizes="(max-width: 900px) 100vw, 100vw"
                style={{ objectFit: "cover" }}
              />
            </Reveal>
            <Reveal variant="slideRight" delay={0.12} amount={0.3}>
              <div className="section-header">
                <span className="eyebrow section-eyebrow">Who We Are</span>
                <h2
                  className="display-large"
                  style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "20px" }}
                >
                  Who we are
                </h2>
                <p className="body-text" style={{ color: "var(--ink-secondary)" }}>
                  The Nestling Space was founded from a rare blend of clinical
                  science, public health, teaching, and hands-on counselling
                  experience. Over a decade of working with students, families,
                  and communities shaped a clear calling: provide culturally
                  sensitive mental health support that helps break cycles of
                  pain and restore resilience.
                </p>
                <p
                  className="body-text"
                  style={{
                    color: "var(--ink-secondary)",
                    marginTop: "16px",
                    marginBottom: "28px",
                  }}
                >
                  The practice was formalised after the COVID-19 pandemic made
                  the psychological cost of isolation, fear, and grief impossible
                  to ignore. We bring therapeutic care, prevention, education,
                  and community understanding together under one roof.
                </p>
                <Link href="/about" className="link-sage">
                  Meet Dr. Mugabe →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ======== VIDEO FEATURE ======== */}
      <div className="tile tile-dark">
        <div className="tile-inner-wide">
          <Reveal className="section-header centered" variant="fade" amount={0.25}>
            <span className="eyebrow section-eyebrow" style={{ color: "var(--sage-light)" }}>
              In Their Words
            </span>
            <h2
              className="display-large"
              style={{ color: "rgba(255,255,255,0.94)", marginTop: "8px", marginBottom: "12px" }}
            >
              Watch the practice in motion
            </h2>
            <p
              className="body-text"
              style={{ color: "rgba(255,255,255,0.62)", maxWidth: "620px", margin: "0 auto" }}
            >
              Short clips from Dr. Mugabe and the Nestling Space environment, now served from the public folder.
            </p>
          </Reveal>

          <div className="grid-2" style={{ marginTop: "40px" }}>
            <Reveal variant="slideLeft" amount={0.2}>
              <div
                style={{
                  borderRadius: "22px",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "var(--shadow-product)",
                }}
              >
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="/Images/new/nestling (2).webp"
                  style={{ width: "100%", height: "320px", objectFit: "cover" }}
                >
                  <source src="/videos/dr-m-mugabe.mp4" type="video/mp4" />
                </video>
                <div style={{ padding: "18px 20px 22px" }}>
                  <div className="eyebrow section-eyebrow" style={{ color: "var(--sage-light)", marginBottom: "10px" }}>
                    Founder Clip
                  </div>
                  <p className="body-text" style={{ color: "rgba(255,255,255,0.72)" }}>
                    A short introduction from Dr. Mugabe about the heart behind the practice.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal variant="slideRight" delay={0.08} amount={0.2}>
              <div
                style={{
                  borderRadius: "22px",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "var(--shadow-product)",
                }}
              >
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="/Images/new/nestling (20).webp"
                  style={{ width: "100%", height: "320px", objectFit: "cover" }}
                >
                  <source src="/videos/dr-mugabe.mp4" type="video/mp4" />
                </video>
                <div style={{ padding: "18px 20px 22px" }}>
                  <div className="eyebrow section-eyebrow" style={{ color: "var(--sage-light)", marginBottom: "10px" }}>
                    Practice Walkthrough
                  </div>
                  <p className="body-text" style={{ color: "rgba(255,255,255,0.72)" }}>
                    A visual look at the calm, private space clients step into.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ======== SERVICES PREVIEW ======== */}
      <div className="tile tile-parchment">
        <div className="tile-inner-wide">
          <Reveal className="section-header centered" variant="fade" amount={0.25}>
            <span className="eyebrow section-eyebrow">What We Offer</span>
            <h2
              className="display-large"
              style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "12px" }}
            >
              What we offer
            </h2>
            <p
              className="body-text"
              style={{ color: "var(--ink-secondary)", maxWidth: "560px", margin: "0 auto" }}
            >
              Comprehensive counselling for individuals, couples, families, and
              organisations navigating real emotional and relational pressures.
            </p>
          </Reveal>

          <div className="grid-4">
            {featuredServices.map((service, index) => (
              <Reveal
                className="service-card"
                variant="scaleUp"
                delay={index * 0.08}
                amount={0.2}
                key={service.title}
              >
                <Image
                  src={service.image}
                  alt={service.alt}
                  width={640}
                  height={320}
                  sizes="(max-width: 768px) 100vw, 25vw"
                  style={{ width: "100%", height: "180px", objectFit: "cover" }}
                />
                <div className="service-card-body">
                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-desc">{service.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal style={{ textAlign: "center", marginTop: "40px" }} variant="fade" amount={0.2}>
            <Link href="/services" className="btn-secondary">
              View all services
            </Link>
          </Reveal>
        </div>
      </div>

      {/* ======== PRACTICE GALLERY ======== */}
      <div className="tile tile-white">
        <div className="tile-inner-wide">
          <Reveal className="section-header centered" variant="fade" amount={0.25}>
            <span className="eyebrow section-eyebrow">Our Practice</span>
            <h2
              className="display-large"
              style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "12px" }}
            >
              Healing in action
            </h2>
            <p
              className="body-text"
              style={{ color: "var(--ink-secondary)", maxWidth: "520px", margin: "0 auto" }}
            >
              Real sessions, real spaces, real people — a glimpse into the warmth and care at The Nestling Space.
            </p>
          </Reveal>
          <Reveal className="gallery-grid" style={{ marginTop: "40px" }} variant="blurUp" amount={0.2}>
            <Image
              src="/Images/new/nestling (10).webp"
              alt="Couples conversation at Nestling Space"
              width={700}
              height={560}
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ width: "100%", height: "280px", objectFit: "cover", borderRadius: "14px" }}
            />
            <Image
              src="/Images/new/nestling (18).webp"
              alt="Individual counselling with an adult client"
              width={700}
              height={560}
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ width: "100%", height: "280px", objectFit: "cover", borderRadius: "14px" }}
            />
            <Image
              src="/Images/new/nestling (14).webp"
              alt="Dr Mugabe in a counselling session"
              width={700}
              height={560}
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ width: "100%", height: "280px", objectFit: "cover", borderRadius: "14px" }}
            />
          </Reveal>
          <Reveal className="gallery-grid" style={{ marginTop: "12px" }} variant="blurUp" amount={0.2} delay={0.08}>
            <Image
              src="/Images/new/nestling (1).webp"
              alt="Dr Mugabe, founder of Nestling Space, in the garden"
              width={700}
              height={560}
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ width: "100%", height: "280px", objectFit: "cover", objectPosition: "top", borderRadius: "14px" }}
            />
            <Image
              src="/Images/new/nestling (17).webp"
              alt="Outdoor counselling session at Nestling Space"
              width={700}
              height={560}
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ width: "100%", height: "280px", objectFit: "cover", borderRadius: "14px" }}
            />
            <Image
              src="/Images/new/nestling (15).webp"
              alt="Workshop session with multiple participants"
              width={700}
              height={560}
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ width: "100%", height: "280px", objectFit: "cover", borderRadius: "14px" }}
            />
          </Reveal>
        </div>
      </div>

      {/* ======== QUOTE TILE ======== */}
      <div className="tile tile-dark-2">
        <div className="tile-inner" style={{ textAlign: "center" }}>
          <Reveal variant="scaleUp" amount={0.3}>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 600,
                fontStyle: "italic",
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.18,
                letterSpacing: "-0.28px",
                marginBottom: "20px",
                maxWidth: "680px",
                margin: "0 auto 20px",
              }}
            >
              &ldquo;Your mind. Your health. Your worth.&rdquo;
            </h2>
            <p
              className="body-text"
              style={{
                color: "rgba(255,255,255,0.5)",
                marginBottom: "36px",
                marginTop: "20px",
              }}
            >
              You are not alone. You are welcome here.
            </p>
            <Link href="/book" className="btn-dark-primary">
              Take the first step
            </Link>
          </Reveal>
        </div>
      </div>

      {/* ======== EVENTS PREVIEW ======== */}
      <div className="tile tile-white">
        <div className="tile-inner">
          <Reveal className="section-header" variant="fade" amount={0.25}>
            <span className="eyebrow section-eyebrow">Events &amp; Webinars</span>
            <h2
              className="display-large"
              style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "12px" }}
            >
              Upcoming Events &amp; Webinars
            </h2>
            <p className="body-text" style={{ color: "var(--ink-secondary)" }}>
              Workshops, training sessions, and group events open to the public.
            </p>
          </Reveal>

          <div className="grid-3">
            {[
              {
                title: "Parenting in the Digital Age",
                date: "Coming soon",
                price: "Registration opens shortly",
              },
              {
                title: "Couples Communication Workshop",
                date: "Coming soon",
                price: "Registration opens shortly",
              },
              {
                title: "Mental Health Awareness Seminar",
                date: "Coming soon",
                price: "Registration opens shortly",
              },
            ].map((event, i) => (
              <Reveal
                className="event-card"
                variant="scaleUp"
                delay={i * 0.08}
                amount={0.2}
                key={event.title}
              >
                <span className="event-date">{event.date}</span>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-price">{event.price}</p>
                <Link href="/events" className="link-sage" style={{ fontSize: "14px" }}>
                  Learn more →
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal style={{ marginTop: "40px" }} variant="fade" amount={0.2}>
            <Link href="/events" className="link-sage">
              See all events →
            </Link>
          </Reveal>
        </div>
      </div>

      {/* ======== TESTIMONIALS ======== */}
      <div className="tile tile-parchment">
        <div className="tile-inner-wide">
          <Reveal className="section-header" variant="fade" amount={0.25}>
            <span className="eyebrow section-eyebrow">Stories of Healing</span>
            <h2
              className="display-large"
              style={{ color: "var(--ink)", marginTop: "8px" }}
            >
              What our clients say
            </h2>
            <p
              className="body-text"
              style={{ color: "var(--ink-secondary)", maxWidth: "560px", marginTop: "12px" }}
            >
              Discover how The Nestling Space with Dr. M. Mugabe has positively impacted the lives of our clients.
            </p>
          </Reveal>

          <div className="testimonials-layout">
            <Reveal className="testimonial-featured" variant="scaleUp" amount={0.2}>
              <div className="testimonial-featured-top">
                <span className="testimonial-eyebrow">Featured Story</span>
                <span className="testimonial-badge">Client voice</span>
              </div>
              <p className="testimonial-quote testimonial-quote-large">
                &ldquo;{testimonials[0].quote}&rdquo;
              </p>
              <div className="testimonial-author">{testimonials[0].author}</div>
              <div className="testimonial-label">{testimonials[0].label}</div>
            </Reveal>

            <div className="testimonial-grid">
              {testimonials.slice(1).map((t, index) => (
                <Reveal
                  className="testimonial-card"
                  variant="blurUp"
                  delay={index * 0.08}
                  amount={0.2}
                  key={`${t.author}-${t.label}`}
                >
                  <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                  <div className="testimonial-author">{t.author}</div>
                  <div className="testimonial-label">{t.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ======== BLOG PREVIEW ======== */}
      <div className="tile tile-white">
        <div className="tile-inner">
          <Reveal className="section-header" variant="fade" amount={0.25}>
            <span className="eyebrow section-eyebrow">Feedback</span>
            <h2
              className="display-large"
              style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "12px" }}
            >
              Share your feedback
            </h2>
            <p className="body-text" style={{ color: "var(--ink-secondary)", maxWidth: "540px", margin: "0 auto" }}>
              Use the contact page to send us your thoughts, comments, or suggestions.
            </p>
          </Reveal>

          <div className="grid-3">
            {[
              {
                image: "/Images/new/nestling (11).webp",
                title: "Understanding Anxiety in Young Adults",
                date: "Coming soon",
                excerpt:
                  "A closer look at how anxiety manifests in young people and practical steps families can take to help.",
              },
              {
                image: "/Images/new/nestling (19).webp",
                title: "Building Resilience as a Family",
                date: "Coming soon",
                excerpt:
                  "Resilience is not a fixed trait — it is a skill that families can practise and grow together over time.",
              },
              {
                image: "/Images/new/nestling (9).webp",
                title: "When to Seek Couples Counselling",
                date: "Coming soon",
                excerpt:
                  "Many couples wait too long before reaching out. Here is how to recognise the right moment to ask for support.",
              },
            ].map((post, i) => (
              <Reveal
                className="blog-card"
                variant="scaleUp"
                delay={i * 0.08}
                amount={0.2}
                key={post.title}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "200px",
                    borderRadius: "18px 18px 0 0",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="blog-card-body">
                  <span className="blog-date">{post.date}</span>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal style={{ marginTop: "40px" }} variant="fade" amount={0.2}>
            <Link href="/blog" className="link-sage">
              Read all updates →
            </Link>
          </Reveal>
        </div>
      </div>

    </>
  );
}
