"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import initScripts from "../scripts";
import { FaFlask, FaBrain, FaHeart, FaSeedling } from "react-icons/fa";

const coreValues = [
  "Compassionate Empathy",
  "Unwavering Confidentiality",
  "Professionalism and Ethical Integrity",
  "Cultural Sensitivity and Inclusivity",
  "Holistic Well-being",
  "Accessibility and Community Engagement",
  "Client Empowerment",
];

const pillars = [
  {
    title: "Evidence-Based",
    desc: "Grounded in professional training, ethics, and practical therapeutic tools.",
  },
  {
    title: "Culturally Sensitive",
    desc: "Respectful of Zimbabwean family systems, faith contexts, and lived realities.",
  },
  {
    title: "Accessible Care",
    desc: "Available face-to-face, online, and on-site for schools and organisations.",
  },
  {
    title: "Whole-Person Focus",
    desc: "Attentive to psychological, relational, physical, social, and spiritual well-being.",
  },
];

export default function AboutPage() {
  useEffect(() => {
    return initScripts();
  }, []);

  return (
    <>
      {/* ======== PAGE HERO ======== */}
      <div className="page-hero">
        <span
          className="eyebrow"
          style={{ color: "var(--sage-light)", marginBottom: "12px" }}
        >
          About Us
        </span>
        <h1>Rooted in science,<br />service, and human dignity.</h1>
        <p>
          A mental health practice built from over a decade of counselling,
          teaching, and community work in Zimbabwe.
        </p>
      </div>

      {/* ======== STORY TILE ======== */}
      <div className="tile tile-white">
        <div className="tile-inner">
          <div className="grid-2 reveal">
            <div>
              <div className="section-header">
                <span className="eyebrow section-eyebrow">Our Story</span>
                <h2
                  className="display-large"
                  style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "20px" }}
                >
                  How we began
                </h2>
                <p className="body-text" style={{ color: "var(--ink-secondary)", marginBottom: "16px" }}>
                  The Nestling Space was founded from a rare blend of clinical
                  science, public health, teaching, and hands-on counselling
                  experience. Over a decade of serving as a teacher and guidance
                  and counselling practitioner revealed how closely emotional,
                  relational, physical, and social well-being are connected.
                </p>
                <p className="body-text" style={{ color: "var(--ink-secondary)" }}>
                  The practice was formalised after the COVID-19 pandemic made
                  the psychological cost of fear, grief, isolation, and economic
                  pressure impossible to ignore. That experience, together with
                  years of working with students, parents, colleagues, and church
                  communities, shaped a clear calling: provide culturally
                  sensitive mental health support that helps break cycles of pain
                  and restore resilience in individuals, couples, and families.
                </p>
              </div>
            </div>
            <div>
              <div className="statement-card">
                <h4>Mission</h4>
                <p>
                  To nurture mental well-being through comprehensive, culturally
                  sensitive counselling for individuals, youth, the aged,
                  couples, families, schools, and companies through face-to-face
                  and online support.
                </p>
              </div>
              <div className="statement-card">
                <h4>Vision</h4>
                <p>
                  To help build a Zimbabwe where mental health is a foundational
                  pillar of well-being, with accessible and empowering support
                  reaching families, institutions, and communities locally and
                  globally.
                </p>
              </div>
              <div className="statement-card">
                <h4>Purpose</h4>
                <p>
                  To strengthen individuals, families, and organisations with
                  expert, compassionate, and practical therapeutic care that
                  improves relationships, resilience, and long-term emotional
                  wellness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======== VALUES TILE ======== */}
      <div className="tile tile-parchment">
        <div className="tile-inner">
          <div className="section-header centered reveal">
            <span className="eyebrow section-eyebrow">Core Values</span>
            <h2
              className="display-large"
              style={{ color: "var(--ink)", marginTop: "8px" }}
            >
              What we stand for
            </h2>
          </div>
          <div className="value-pills reveal" style={{ justifyContent: "center" }}>
            {coreValues.map((v) => (
              <span className="value-pill" key={v}>
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ======== PILLARS TILE ======== */}
      <div className="tile tile-dark-2">
        <div className="tile-inner">
          <div className="section-header centered reveal">
            <span className="eyebrow section-eyebrow" style={{ color: "var(--sage-light)" }}>
              Practice Pillars
            </span>
            <h2
              style={{
                fontSize: "40px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.9)",
                marginTop: "8px",
                letterSpacing: "-0.4px",
              }}
            >
              Built on four pillars
            </h2>
          </div>
          <div className="pillars-grid">
            {pillars.map((p, i) => (
              <div className={`pillar-item reveal reveal-delay-${i + 1}`} key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======== FOUNDER TILE ======== */}
      <div className="tile tile-white">
        <div className="tile-inner">
          <div className="grid-2 reveal" style={{ gap: "72px", alignItems: "center" }}>
            <div className="founder-photo-wrap photo-shadow">
              <Image
                src="/Images/new/old-pics (1).webp"
                alt="Dr M. Mugabe — Founder of The Nestling Space"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </div>
            <div>
              <div className="section-header">
                <span className="eyebrow section-eyebrow">Our Founder</span>
                <h2
                  className="display-large"
                  style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "20px" }}
                >
                  Led by Dr. M. Mugabe
                </h2>
                <p className="body-text" style={{ color: "var(--ink-secondary)", marginBottom: "16px" }}>
                  Dr. M. Mugabe is a Clinical Scientist, Public Health
                  Practitioner, teacher, and counsellor whose work has
                  consistently centred on people under pressure. Her experience
                  in schools, churches, and public health settings shaped a
                  practical understanding of how emotional pain travels through
                  families and communities when it is left unaddressed.
                </p>
                <p className="body-text" style={{ color: "var(--ink-secondary)", marginBottom: "28px" }}>
                  The Nestling Space reflects that long view. It brings together
                  therapeutic care, prevention, education, and community
                  understanding to help clients move from survival toward
                  healing, stronger relationships, and a more resilient future.
                </p>
              </div>

              <div className="credential-item">
                <FaFlask />
                Clinical Scientist
              </div>
              <div className="credential-item">
                <FaBrain />
                Public Health Practitioner
              </div>
              <div className="credential-item">
                <FaHeart />
                Guidance &amp; Counselling Educator
              </div>
              <div className="credential-item">
                <FaSeedling />
                Family Mental Health Advocate
              </div>

              <div className="founder-quote">
                &ldquo;Healing becomes possible when people are met with skill,
                compassion, and a space where their story is taken seriously.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======== GALLERY TILE ======== */}
      <div className="tile tile-parchment">
        <div className="tile-inner">
          <div className="section-header reveal">
            <span className="eyebrow section-eyebrow">Our Space</span>
            <h2
              className="display-large"
              style={{ color: "var(--ink)", marginTop: "8px" }}
            >
              A glimpse of healing
            </h2>
          </div>
          <div className="gallery-grid reveal">
            <Image
              src="/Images/new/nestling (2).webp"
              alt="Dr Mugabe in her therapy room"
              width={700}
              height={560}
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ width: "100%", height: "260px", objectFit: "cover", objectPosition: "top", borderRadius: "14px" }}
            />
            <Image
              src="/Images/new/nestling (21).webp"
              alt="Individual counselling session at Nestling Space"
              width={700}
              height={560}
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "14px" }}
            />
            <Image
              src="/Images/new/nestling (15).webp"
              alt="Outdoor group workshop session"
              width={700}
              height={560}
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "14px" }}
            />
          </div>
          <div className="gallery-grid reveal" style={{ marginTop: "12px" }}>
            <Image
              src="/Images/new/nestling (5).webp"
              alt="Counsellor with notebook in a bright therapy room"
              width={700}
              height={560}
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ width: "100%", height: "260px", objectFit: "cover", objectPosition: "top", borderRadius: "14px" }}
            />
            <Image
              src="/Images/new/old-pics (3).webp"
              alt="Dr Mugabe in a counselling session"
              width={700}
              height={560}
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "14px" }}
            />
            <Image
              src="/Images/new/nestling (20).webp"
              alt="Group counselling session at Nestling Space"
              width={700}
              height={560}
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "14px" }}
            />
          </div>
        </div>
      </div>

      {/* ======== CTA ======== */}
      <div className="tile tile-dark">
        <div className="tile-inner" style={{ textAlign: "center" }}>
          <div className="reveal">
            <span
              className="eyebrow"
              style={{ color: "var(--sage-light)", marginBottom: "12px" }}
            >
              Ready to begin?
            </span>
            <h2
              style={{
                fontSize: "40px",
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "-0.4px",
                marginBottom: "16px",
                marginTop: "8px",
              }}
            >
              Your healing starts with one step.
            </h2>
            <p
              className="body-text"
              style={{ color: "rgba(255,255,255,0.55)", marginBottom: "32px" }}
            >
              Reaching out is an act of courage.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/book" className="btn-dark-primary">
                Book a Session
              </Link>
              <Link href="/services" className="btn-dark-secondary">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
