"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import initScripts from "./scripts";

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
  useEffect(() => {
    return initScripts();
  }, []);

  return (
    <>
      {/* ======== HERO ======== */}
      <section id="hero">
        <div className="hero-content">
          <span className="hero-eyebrow">Mental Wellness</span>
          <div className="hero-split">
            <div className="hero-line-wrap">
              <span className="hero-line-inner">A Safe Place</span>
            </div>
            <div className="hero-line-wrap">
              <span className="hero-line-inner line-2">To Heal.</span>
            </div>
          </div>
          <p className="hero-subtext">
            You are seen, heard, and supported as you move toward clarity,
            peace, and a more resilient life.
          </p>
          <div className="hero-actions">
            <Link href="/book" className="btn-dark-primary">
              Book a Session
            </Link>
            <Link href="/services" className="btn-dark-secondary">
              Our Services
            </Link>
          </div>
          <div className="hero-trust">
            <span className="hero-trust-item">Evidence-Based Care</span>
            <span className="hero-trust-dot"></span>
            <span className="hero-trust-item">Culturally Sensitive</span>
            <span className="hero-trust-dot"></span>
            <span className="hero-trust-item">Online &amp; In-Person</span>
            <span className="hero-trust-dot"></span>
            <span className="hero-trust-item">Confidential</span>
          </div>
        </div>
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
            <div className="about-preview-photo photo-shadow aos aos-slide-left">
              <Image
                src="/Images/new/old-pics (1).webp"
                alt="Dr Mugabe, founder of The Nestling Space"
                fill
                quality={100}
                sizes="(max-width: 900px) 100vw, 100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="aos aos-slide-right aos-d2">
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
            </div>
          </div>
        </div>
      </div>

      {/* ======== SERVICES PREVIEW ======== */}
      <div className="tile tile-parchment">
        <div className="tile-inner-wide">
          <div className="section-header centered">
            <span className="eyebrow section-eyebrow aos aos-fade">What We Offer</span>
            <h2
              className="display-large aos aos-blur-up aos-d1"
              style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "12px" }}
            >
              What we offer
            </h2>
            <p
              className="body-text aos aos-blur-up aos-d2"
              style={{ color: "var(--ink-secondary)", maxWidth: "560px", margin: "0 auto" }}
            >
              Comprehensive counselling for individuals, couples, families, and
              organisations navigating real emotional and relational pressures.
            </p>
          </div>

          <div className="grid-4">
            {featuredServices.map((service, index) => (
              <div
                className={`service-card reveal reveal-delay-${index + 1}`}
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
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }} className="reveal">
            <Link href="/services" className="btn-secondary">
              View all services
            </Link>
          </div>
        </div>
      </div>

      {/* ======== PRACTICE GALLERY ======== */}
      <div className="tile tile-white">
        <div className="tile-inner-wide">
          <div className="section-header centered">
            <span className="eyebrow section-eyebrow aos aos-fade">Our Practice</span>
            <h2
              className="display-large aos aos-blur-up aos-d1"
              style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "12px" }}
            >
              Healing in action
            </h2>
            <p
              className="body-text aos aos-blur-up aos-d2"
              style={{ color: "var(--ink-secondary)", maxWidth: "520px", margin: "0 auto" }}
            >
              Real sessions, real spaces, real people — a glimpse into the warmth and care at The Nestling Space.
            </p>
          </div>
          <div className="gallery-grid reveal" style={{ marginTop: "40px" }}>
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
          </div>
          <div className="gallery-grid reveal" style={{ marginTop: "12px" }}>
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
          </div>
        </div>
      </div>

      {/* ======== QUOTE TILE ======== */}
      <div className="tile tile-dark-2">
        <div className="tile-inner" style={{ textAlign: "center" }}>
          <div className="aos aos-scale-up">
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
          </div>
        </div>
      </div>

      {/* ======== EVENTS PREVIEW ======== */}
      <div className="tile tile-white">
        <div className="tile-inner">
          <div className="section-header">
            <span className="eyebrow section-eyebrow aos aos-fade">Events &amp; Webinars</span>
            <h2
              className="display-large aos aos-blur-up aos-d1"
              style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "12px" }}
            >
              Upcoming Events &amp; Webinars
            </h2>
            <p className="body-text aos aos-blur-up aos-d2" style={{ color: "var(--ink-secondary)" }}>
              Workshops, training sessions, and group events open to the public.
            </p>
          </div>

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
              <div
                className={`event-card reveal reveal-delay-${i + 1}`}
                key={event.title}
              >
                <span className="event-date">{event.date}</span>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-price">{event.price}</p>
                <Link href="/events" className="link-sage" style={{ fontSize: "14px" }}>
                  Learn more →
                </Link>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "40px" }} className="reveal">
            <Link href="/events" className="link-sage">
              See all events →
            </Link>
          </div>
        </div>
      </div>

      {/* ======== TESTIMONIALS ======== */}
      <div className="tile tile-parchment">
        <div className="tile-inner-wide">
          <div className="section-header">
            <span className="eyebrow section-eyebrow aos aos-fade">Stories of Healing</span>
            <h2
              className="display-large aos aos-blur-up aos-d1"
              style={{ color: "var(--ink)", marginTop: "8px" }}
            >
              What our clients say
            </h2>
          </div>

          <div className="testimonials-track-wrap aos aos-blur-up aos-d2" id="testimonials-wrap">
            <div className="testimonials-track" id="testimonials-track">
              {testimonials.map((t) => (
                <div
                  className="testimonial-card"
                  key={`${t.author}-${t.label}`}
                >
                  <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                  <div className="testimonial-author">{t.author}</div>
                  <div className="testimonial-label">{t.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="scroll-dots" id="scroll-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`scroll-dot${i === 0 ? " active" : ""}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ======== BLOG PREVIEW ======== */}
      <div className="tile tile-white">
        <div className="tile-inner">
          <div className="section-header">
            <span className="eyebrow section-eyebrow aos aos-fade">Latest Updates</span>
            <h2
              className="display-large aos aos-blur-up aos-d1"
              style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "12px" }}
            >
              Latest Updates
            </h2>
          </div>

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
              <div
                className={`blog-card reveal reveal-delay-${i + 1}`}
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
              </div>
            ))}
          </div>

          <div style={{ marginTop: "40px" }} className="reveal">
            <Link href="/blog" className="link-sage">
              Read all updates →
            </Link>
          </div>
        </div>
      </div>

    </>
  );
}
