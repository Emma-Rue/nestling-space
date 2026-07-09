"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../components/MotionReveal";
import { client } from "@/lib/sanity";

const defaultFeaturedServices = [
  {
    image: "/Images/new/nestling (22).webp",
    alt: "Individual counselling session at Nestling Space",
    title: "Individual Counselling",
    description:
      "Personal therapy for stress, grief, depression, anxiety, life transitions, and emotional overwhelm.",
  },
  {
    image: "/Images/new/nestling (8).webp",
    alt: "Marriage and relationship counselling session",
    title: "Marriage & Relationship Counselling",
    description:
      "Support for couples to improve communication, resolve conflict, rebuild trust, and reconnect with one another.",
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

const defaultFullServices = [
  {
    title: "Youth Counselling",
    description:
      "A safe and confidential space where young people can explore stress, anxiety, depression, trauma, grief, and personal struggles while building healthier coping strategies.",
    videoUrl: "/videos/WhatsApp Video 2026-07-07 at 07.31.09.mp4"
  },
  {
    title: "Inner Child Healing Therapy",
    description:
      "Guided support that helps identify unresolved childhood wounds, process past pain, and build healthier emotional patterns for the future.",
    videoUrl: "/videos/WhatsApp Video 2026-07-07 at 07.31.19.mp4"
  },
  {
    title: "Couples & Marriage Counselling",
    description:
      "Gentle, neutral support for partners to reconnect, improve communication, resolve conflict, rebuild trust, and create a safer, stronger relationship.",
    videoUrl: "/videos/WhatsApp Video 2026-07-07 at 07.31.31.mp4"
  },
  {
    title: "Family Counseling",
    description:
      "Support for families to listen, heal, and grow together while improving communication, parenting challenges, generational conflict, and family trauma.",
    videoUrl: "/videos/WhatsApp Video 2026-07-07 at 07.31.36.mp4"
  },
  {
    title: "Trauma & Emotional Healing",
    description:
      "Therapy for people who have experienced traumatic events, abuse, loss, or deep emotional wounds. Sessions focus on safe processing, emotional stability, and peace.",
    videoUrl: "/videos/WhatsApp Video 2026-07-07 at 07.31.42.mp4"
  },
  {
    title: "Stress, Anxiety & Burnout Support",
    description:
      "Practical techniques and therapeutic support for overwhelming stress, anxiety, and emotional exhaustion so clients can restore balance and resilience.",
    videoUrl: "/videos/WhatsApp Video 2026-07-07 at 07.34.54.mp4"
  },
  {
    title: "Women's Emotional Wellness",
    description:
      "A supportive space for women navigating life transitions, relationship challenges, motherhood, identity struggles, emotional wounds, and personal growth.",
    videoUrl: "/videos/WhatsApp Video 2026-07-07 at 07.35.07.mp4"
  },
  {
    title: "Group Healing Sessions",
    description:
      "Facilitated small-group sessions where participants share experiences, gain support, and learn together around emotional healing, self-awareness, and relational health.",
    videoUrl: "/videos/WhatsApp Video 2026-07-07 at 07.35.15.mp4"
  },
  {
    title: "Temperament & Personality Understanding",
    description:
      "This service helps clients understand their temperament, personality patterns, and emotional responses so they can communicate and relate more healthily.",
  },
  {
    title: "Faith-Based Counseling",
    description:
      "Optional spiritual guidance alongside psychological counseling for people who desire biblical support in their healing journey.",
  },
  {
    title: "Workshops & Personal Development Programs",
    description:
      "Educational and therapeutic workshops on the inner child, emotional intelligence, healthy relationships, boundaries, assertiveness, and stress management.",
  },
  {
    title: "Online Counseling",
    description:
      "Secure virtual counseling for clients who prefer remote support or live outside the local area, with the same confidentiality and care as in-person sessions.",
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
  const [sanityData, setSanityData] = useState<any>(null);

  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId) return;

    client.fetch(`
      *[_type == "servicesPage" && _id == "servicesPage"][0] {
        ...,
        servicesList[] {
          ...,
          "videoFileUrl": videoFile.asset->url
        }
      }
    `, {}, { useCdn: false }).then((res) => {
      if (res) setSanityData(res);
    }).catch((err) => {
      console.error("Error fetching services page content from Sanity:", err);
    });
  }, []);

  // Header content overrides
  const pageEyebrow = sanityData?.eyebrow ?? "Our Services";
  const pageTitle = sanityData?.titleText ?? "What we offer";
  const pageDescription = sanityData?.description ?? "Comprehensive counselling and training services designed for people, families, schools, churches, and workplaces.";

  // Mapping dynamic services list
  const fullServices = sanityData?.servicesList?.length > 0
    ? sanityData.servicesList.map((s: any) => ({
        title: s.title,
        description: s.description,
        videoUrl: s.videoFileUrl || s.videoUrl
      }))
    : defaultFullServices;

  return (
    <>
      {/* ======== PAGE HERO ======== */}
      <div className="page-hero">
        <span
          className="eyebrow"
          style={{ color: "var(--sage-light)", marginBottom: "12px" }}
        >
          {pageEyebrow}
        </span>
        <h1>{pageTitle}</h1>
        <p>{pageDescription}</p>
      </div>

      {/* ======== FEATURED SERVICES ======== */}
      <div className="tile tile-white">
        <div className="tile-inner-wide">
          <Reveal className="section-header centered" variant="fade" amount={0.25}>
            <span className="eyebrow section-eyebrow">Core Services</span>
            <h2
              className="display-large"
              style={{ color: "var(--ink)", marginTop: "8px" }}
            >
              Our core offerings
            </h2>
          </Reveal>
          <div className="grid-4">
            {defaultFeaturedServices.map((service, index) => (
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
                  style={{ width: "100%", height: "180px", objectFit: "cover", objectPosition: "top" }}
                />
                <div className="service-card-body">
                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-desc">{service.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ======== ALL SERVICES WITH VIDEOS ======== */}
      <div className="tile tile-parchment">
        <div className="tile-inner-wide">
          <Reveal className="section-header" variant="fade" amount={0.25}>
            <span className="eyebrow section-eyebrow">Full Range</span>
            <h2
              className="display-large"
              style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "12px" }}
            >
              Services in detail
            </h2>
            <p
              className="body-text"
              style={{ color: "var(--ink-secondary)", maxWidth: "600px" }}
            >
              Explore the full range of care we offer across personal healing, relationships,
              family systems, and group growth. Play the clip next to each service to learn more.
            </p>
          </Reveal>

          <div className="grid-3">
            {fullServices.map((service: any, index: number) => (
              <Reveal
                className="utility-card"
                variant="scaleUp"
                delay={(index % 3) * 0.08}
                amount={0.2}
                key={service.title}
                style={{ display: "flex", flexDirection: "column", justifyContent: "between" }}
              >
                <div>
                  <h3>
                    {index + 1}. {service.title}
                  </h3>
                  <p>{service.description}</p>
                </div>
                {service.videoUrl && (
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    style={{ width: "100%", height: "auto", aspectRatio: "16/9", objectFit: "contain", background: "#000", borderRadius: "10px", marginTop: "16px" }}
                  >
                    <source src={service.videoUrl} type="video/mp4" />
                  </video>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ======== DELIVERY METHODS TILE ======== */}
      <div className="tile tile-dark-2">
        <div className="tile-inner">
          <Reveal className="section-header" variant="fade" amount={0.25}>
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
          </Reveal>
          <Reveal className="grid-2" variant="slideLeft" amount={0.25}>
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
          </Reveal>
        </div>
      </div>

      {/* ======== CTA TILE ======== */}
      <div className="tile tile-white">
        <div className="tile-inner" style={{ textAlign: "center" }}>
          <Reveal variant="scaleUp" amount={0.25}>
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
          </Reveal>
        </div>
      </div>

    </>
  );
}
