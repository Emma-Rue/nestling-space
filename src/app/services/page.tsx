"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import initScripts from "../scripts";

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

const fullServices = [
  {
    title: "Youth Counselling",
    description:
      "Guidance for adolescents and young adults navigating identity, academic pressure, relationships, and emotional development.",
  },
  {
    title: "Adult & Aged Therapy",
    description:
      "Therapy for anxiety, depression, grief, burnout, life transitions, and age-related psychological challenges.",
  },
  {
    title: "Family Counselling",
    description:
      "Support for conflict resolution, family transitions, communication repair, and stronger home dynamics.",
  },
  {
    title: "Parenting Support",
    description:
      "Positive, practical child-rearing guidance for parents facing behavioural, emotional, or relational challenges in the home.",
  },
  {
    title: "Premarital Counselling",
    description:
      "Structured conversations and skill-building to help couples build a healthy foundation before marriage.",
  },
  {
    title: "Marriage Counselling",
    description:
      "Help for couples dealing with communication breakdown, conflict, infidelity, intimacy concerns, and disconnection.",
  },
  {
    title: "School-Based Counselling",
    description:
      "Direct emotional support for school children facing bullying, pressure, social difficulties, and mental health concerns.",
  },
  {
    title: "Corporate Well-being Programs",
    description:
      "Tailored employee support focused on stress, burnout prevention, workplace conflict, and mentally healthy cultures.",
  },
  {
    title: "Mental Health Workshops",
    description:
      "Interactive training for schools, companies, parents, youth groups, and community organisations.",
  },
  {
    title: "Boot Camps & Training Packages",
    description:
      "Custom sessions on awareness, resilience, communication, conflict resolution, and positive parenting skills.",
  },
  {
    title: "Online Counselling",
    description:
      "Confidential telehealth sessions for clients across Zimbabwe and in the diaspora who need remote access.",
  },
  {
    title: "Group Counselling Sessions",
    description:
      "Facilitated spaces for shared learning, mutual support, and healing around common emotional or relational themes.",
  },
];

const deliveryMethods = [
  "Face-to-face counselling in a private and confidential setting",
  "Online telehealth sessions for remote accessibility",
  "Individual one-on-one therapy",
  "Group counselling for shared support and learning",
  "On-site company and school visits for workshops and counselling",
];

const differentiators = [
  {
    title: "Integrated Expertise",
    description:
      "Clinical science, public health, education, and counselling experience combined in one practice.",
  },
  {
    title: "Family & Relationship Focus",
    description:
      "A clear specialisation in marriage, family systems, parenting, and intergenerational distress.",
  },
  {
    title: "Flexible Delivery",
    description:
      "In-person, online, school-based, and corporate options that reduce barriers to care.",
  },
  {
    title: "Deep Community Roots",
    description:
      "Grounded in more than a decade of work with students, families, churches, and local communities.",
  },
];

export default function ServicesPage() {
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
          Our Services
        </span>
        <h1>What we offer</h1>
        <p>
          Comprehensive counselling and training services designed for people,
          families, schools, churches, and workplaces.
        </p>
      </div>

      {/* ======== FEATURED SERVICES ======== */}
      <div className="tile tile-white">
        <div className="tile-inner-wide">
          <div className="section-header centered reveal">
            <span className="eyebrow section-eyebrow">Core Services</span>
            <h2
              className="display-large"
              style={{ color: "var(--ink)", marginTop: "8px" }}
            >
              Our core offerings
            </h2>
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
        </div>
      </div>

      {/* ======== ALL SERVICES ======== */}
      <div className="tile tile-parchment">
        <div className="tile-inner-wide">
          <div className="section-header reveal">
            <span className="eyebrow section-eyebrow">Full Range</span>
            <h2
              className="display-large"
              style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "12px" }}
            >
              All 12 services
            </h2>
            <p
              className="body-text"
              style={{ color: "var(--ink-secondary)", maxWidth: "600px" }}
            >
              The practice serves clients across the life span and also partners
              with organisations that want structured mental health support.
            </p>
          </div>

          <div className="grid-3">
            {fullServices.map((service, index) => (
              <div
                className={`utility-card reveal reveal-delay-${(index % 3) + 1}`}
                key={service.title}
              >
                <h3>
                  {index + 1}. {service.title}
                </h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======== DELIVERY METHODS TILE ======== */}
      <div className="tile tile-dark-2">
        <div className="tile-inner">
          <div className="section-header reveal">
            <span className="eyebrow section-eyebrow" style={{ color: "var(--sage-light)" }}>
              How We Work
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
              Flexible delivery methods
            </h2>
          </div>
          <div className="grid-2 reveal">
            <div>
              <h3
                className="body-strong"
                style={{ color: "rgba(255,255,255,0.7)", marginBottom: "20px" }}
              >
                Service Delivery
              </h3>
              <ul className="info-list">
                {deliveryMethods.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3
                className="body-strong"
                style={{ color: "rgba(255,255,255,0.7)", marginBottom: "20px" }}
              >
                What Makes Us Distinct
              </h3>
              <div className="usp-list">
                {differentiators.map((item) => (
                  <div className="usp-item" key={item.title}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======== CTA TILE ======== */}
      <div className="tile tile-white">
        <div className="tile-inner" style={{ textAlign: "center" }}>
          <div className="reveal">
            <span
              className="eyebrow section-eyebrow"
              style={{ justifyContent: "center", display: "block" }}
            >
              Get Started
            </span>
            <h2
              className="display-large"
              style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "16px" }}
            >
              Ready to begin?
            </h2>
            <p
              className="body-text"
              style={{ color: "var(--ink-secondary)", marginBottom: "32px" }}
            >
              Book a session online or reach out to discuss which service
              is right for you.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/book" className="btn-primary">
                Book a Session
              </Link>
              <Link href="/contact" className="btn-secondary">
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
