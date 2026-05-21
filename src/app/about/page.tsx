"use client";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../components/MotionReveal";
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
  return (
    <>
      <div className="page-hero">
        <span className="eyebrow" style={{ color: "var(--sage-light)", marginBottom: "12px" }}>
          About Us
        </span>
        <h1>
          Rooted in compassion,<br />faith-informed care, and human dignity.
        </h1>
        <p>
          The Nestling Space is a mental wellness home created for anyone ready to heal,
          grow, and break free from heavy patterns.
        </p>
      </div>

      <div className="tile tile-white">
        <div className="tile-inner">
          <div className="grid-2">
            <div>
              <Reveal className="section-header" variant="fade" amount={0.25}>
                <span className="eyebrow section-eyebrow">Our Story</span>
                <h2 className="display-large" style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "20px" }}>
                  Mission and vision
                </h2>
                <p className="body-text" style={{ color: "var(--ink-secondary)", marginBottom: "16px" }}>
                  We offer gentle, professional support through individual and family counselling,
                  couples and marriage work, group programs, and corporate wellness services.
                </p>
                <p className="body-text" style={{ color: "var(--ink-secondary)" }}>
                  Rooted in compassion and faith-informed care, we walk with you as you build emotional
                  resilience, heal from trauma, and learn practical tools for everyday life. Here, your
                  story matters, your feelings are valid, and your healing journey is honored.
                </p>
              </Reveal>
            </div>
            <div>
              <Reveal className="statement-card" variant="scaleUp" amount={0.25}>
                <h4>Mission</h4>
                <p>
                  To provide a gentle, supportive home for healing and growth through individual,
                  family, couples, group, and corporate wellness care.
                </p>
              </Reveal>
              <Reveal className="statement-card" variant="scaleUp" delay={0.08} amount={0.25}>
                <h4>Vision</h4>
                <p>
                  To help people build emotional strength, live with clarity and purpose, and break free
                  from heavy patterns that keep them stuck.
                </p>
              </Reveal>
              <Reveal className="statement-card" variant="scaleUp" delay={0.16} amount={0.25}>
                <h4>Purpose</h4>
                <p>
                  To walk alongside clients with compassion, practical tools, and faith-informed care
                  as they heal from trauma and grow into healthier lives.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <div className="tile tile-parchment">
        <div className="tile-inner">
          <Reveal className="section-header centered" variant="fade" amount={0.25}>
            <span className="eyebrow section-eyebrow">Core Values</span>
            <h2 className="display-large" style={{ color: "var(--ink)", marginTop: "8px" }}>
              What we stand for
            </h2>
          </Reveal>
          <Reveal className="value-pills" style={{ justifyContent: "center" }} variant="fade" amount={0.2}>
            {coreValues.map((v) => (
              <span className="value-pill" key={v}>
                {v}
              </span>
            ))}
          </Reveal>
        </div>
      </div>

      <div className="tile tile-dark-2">
        <div className="tile-inner">
          <Reveal className="section-header centered" variant="fade" amount={0.25}>
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
          </Reveal>
          <div className="pillars-grid">
            {pillars.map((p, i) => (
              <Reveal className="pillar-item" variant="scaleUp" delay={i * 0.08} amount={0.2} key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="tile tile-white">
        <div className="tile-inner">
          <div className="grid-2" style={{ gap: "72px", alignItems: "center" }}>
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
                <h2 className="display-large" style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "20px" }}>
                  Our Practice
                </h2>
                <p className="body-text" style={{ color: "var(--ink-secondary)", marginBottom: "16px" }}>
                  The Nestling Space is a mental health and emotional wellness practice based in Harare,
                  dedicated to creating a safe, compassionate place for healing and growth.
                </p>
                <p className="body-text" style={{ color: "var(--ink-secondary)", marginBottom: "28px" }}>
                  We walk alongside children, teens, adults, couples, and families as they navigate
                  life&apos;s challenges and transitions. Our work is grounded in evidence-based counselling
                  approaches, a deep respect for each person&apos;s story, and an understanding of the unique
                  pressures faced in our local context.
                </p>
                <p className="body-text" style={{ color: "var(--ink-secondary)", marginBottom: "28px" }}>
                  Whether you are dealing with anxiety, depression, trauma, grief, relationship strain,
                  or burnout, we hold space for your pain while helping you build new patterns of hope.
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
                Community-Focused Care
              </div>

              <Link href="/services" className="link-sage" style={{ marginTop: "24px", display: "inline-flex" }}>
                Explore services →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
