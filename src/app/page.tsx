"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealSpan } from "./components/MotionReveal";
import { client, urlFor } from "@/lib/sanity";

const defaultServices = [
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

const defaultTestimonials = [
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

const defaultTickerItems = [
  'Evidence-Based Care',
  'Culturally Sensitive',
  'Online & In-Person',
  'Confidential',
  'Safe & Supportive',
  'Professional & Qualified',
];

export default function Home() {
  const [sanityData, setSanityData] = useState<any>(null);

  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId) return;

    client.fetch(`
      *[_type == "homePage" && _id == "homePage"][0] {
        ...,
        hero {
          ...,
          "videoFileUrl": videoFile.asset->url
        },
        aboutPreview {
          ...,
          "videoFileUrl": videoFile.asset->url
        },
        videoFeature {
          ...,
          videos[] {
            ...,
            "videoFileUrl": videoFile.asset->url,
            "posterUrl": posterImage.asset->url
          }
        },
        servicesPreview {
          ...,
          services[] {
            ...,
            "videoFileUrl": videoFile.asset->url
          }
        },
        gallery {
          ...,
          images[] {
            ...,
            "videoFileUrl": videoFile.asset->url
          }
        },
        quote {
          ...,
          "videoFileUrl": videoFile.asset->url
        },
        eventsPreview {
          ...,
          "videoFileUrl": videoFile.asset->url
        },
        blogPreview {
          ...,
          "videoFileUrl": videoFile.asset->url
        }
      }
    `).then((res) => {
      if (res) setSanityData(res);
    }).catch((err) => {
      console.error("Error fetching homepage content from Sanity:", err);
    });
  }, []);

  // Hero Fallbacks
  const heroEyebrow = sanityData?.hero?.eyebrow ?? "Mental Wellness";
  const heroLine1 = sanityData?.hero?.titleLine1 ?? "A Safe Place";
  const heroLine2 = sanityData?.hero?.titleLine2 ?? "To Heal.";
  const heroSubtext = sanityData?.hero?.subtext ?? "Welcome to The Nestling Space, a gentle home for your healing and growth. Here, you are seen, heard, and supported as you untangle life's worries, build emotional strength, and move toward clarity, peace, and purpose.";
  const heroPrimaryBtnText = sanityData?.hero?.primaryBtnText ?? "Book a Session";
  const heroPrimaryBtnLink = sanityData?.hero?.primaryBtnLink ?? "/book";
  const heroSecondaryBtnText = sanityData?.hero?.secondaryBtnText ?? "Our Services";
  const heroSecondaryBtnLink = sanityData?.hero?.secondaryBtnLink ?? "/services";
  const heroTrustItems = sanityData?.hero?.trustItems ?? ['Evidence-Based Care', 'Culturally Sensitive', 'Online & In-Person', 'Confidential'];

  // Ticker Fallbacks
  const tickerItems = sanityData?.ticker?.items ?? defaultTickerItems;

  // About Fallbacks
  const aboutEyebrow = sanityData?.aboutPreview?.eyebrow ?? "Who We Are";
  const aboutTitle = sanityData?.aboutPreview?.title ?? "Who we are";
  const aboutParagraph1 = sanityData?.aboutPreview?.paragraph1 ?? "The Nestling Space was founded from a rare blend of clinical science, public health, teaching, and hands-on counselling experience. Over a decade of working with students, families, and communities shaped a clear calling: provide culturally sensitive mental health support that helps break cycles of pain and restore resilience.";
  const aboutParagraph2 = sanityData?.aboutPreview?.paragraph2 ?? "The practice was formalised after the COVID-19 pandemic made the psychological cost of isolation, fear, and grief impossible to ignore. We bring therapeutic care, prevention, education, and community understanding together under one roof.";
  const aboutLinkText = sanityData?.aboutPreview?.linkText ?? "Meet Dr. Mugabe →";
  const aboutLinkUrl = sanityData?.aboutPreview?.linkUrl ?? "/about";
  const aboutPhoto = sanityData?.aboutPreview?.image ? urlFor(sanityData.aboutPreview.image).url() : "/Images/new/old-pics (1).webp";
  const aboutVideoUrl = sanityData?.aboutPreview?.videoFileUrl || sanityData?.aboutPreview?.videoUrl;

  // Video Feature Fallbacks
  const videoFeatureEyebrow = sanityData?.videoFeature?.eyebrow ?? "In Their Words";
  const videoFeatureTitle = sanityData?.videoFeature?.title ?? "Watch the practice in motion";
  const videoFeatureDesc = sanityData?.videoFeature?.description ?? "Short clips from Dr. Mugabe and the Nestling Space environment, now served from the public folder.";
  const featuredVideos = sanityData?.videoFeature?.videos?.length > 0 ? sanityData.videoFeature.videos : [
    {
      title: "Founder Clip",
      description: "A short introduction from Dr. Mugabe about the heart behind the practice.",
      posterUrl: "/Images/new/nestling (2).webp",
      videoFileUrl: "/videos/dr-m-mugabe.mp4"
    },
    {
      title: "Practice Walkthrough",
      description: "A visual look at the calm, private space clients step into.",
      posterUrl: "/Images/new/nestling (20).webp",
      videoFileUrl: "/videos/dr-mugabe.mp4"
    }
  ];

  // Services Preview Fallbacks
  const servicesEyebrow = sanityData?.servicesPreview?.eyebrow ?? "What We Offer";
  const servicesTitle = sanityData?.servicesPreview?.title ?? "What we offer";
  const servicesDesc = sanityData?.servicesPreview?.description ?? "Comprehensive counselling for individuals, couples, families, and organisations navigating real emotional and relational pressures.";
  const servicesList = sanityData?.servicesPreview?.services?.length > 0
    ? sanityData.servicesPreview.services.map((s: any) => ({
        image: s.image ? urlFor(s.image).url() : "/Images/new/nestling (22).webp",
        alt: s.title,
        title: s.title,
        description: s.description,
        videoUrl: s.videoFileUrl || s.videoUrl
      }))
    : defaultServices;

  // Gallery Fallbacks
  const galleryEyebrow = sanityData?.gallery?.eyebrow ?? "Our Practice";
  const galleryTitle = sanityData?.gallery?.title ?? "Healing in action";
  const galleryDesc = sanityData?.gallery?.description ?? "Real sessions, real spaces, real people — a glimpse into the warmth and care at The Nestling Space.";
  
  const galleryItems = sanityData?.gallery?.images?.length > 0
    ? sanityData.gallery.images.map((img: any) => ({
        src: img.image ? urlFor(img.image).url() : "/Images/new/nestling (10).webp",
        alt: img.alt || "Gallery image",
        videoUrl: img.videoFileUrl || img.videoUrl
      }))
    : [
        { src: "/Images/new/nestling (10).webp", alt: "Couples conversation at Nestling Space" },
        { src: "/Images/new/nestling (18).webp", alt: "Individual counselling with an adult client" },
        { src: "/Images/new/nestling (14).webp", alt: "Dr Mugabe in a counselling session" },
        { src: "/Images/new/nestling (1).webp", alt: "Dr Mugabe, founder of Nestling Space, in the garden" },
        { src: "/Images/new/nestling (17).webp", alt: "Outdoor counselling session at Nestling Space" },
        { src: "/Images/new/nestling (15).webp", alt: "Workshop session with multiple participants" }
      ];

  // Divide galleryItems into two rows (standard 3 per row)
  const galleryRow1 = galleryItems.slice(0, 3);
  const galleryRow2 = galleryItems.slice(3, 6);

  // Quote Fallbacks
  const quoteText = sanityData?.quote?.text ?? "“Your mind. Your health. Your worth.”";
  const quoteAuthor = sanityData?.quote?.author ?? "You are not alone. You are welcome here.";
  const quoteBtnText = sanityData?.quote?.btnText ?? "Take the first step";
  const quoteBtnLink = sanityData?.quote?.btnLink ?? "/book";

  // Events Fallbacks
  const eventsEyebrow = sanityData?.eventsPreview?.eyebrow ?? "Events & Webinars";
  const eventsTitle = sanityData?.eventsPreview?.title ?? "Upcoming Events & Webinars";
  const eventsDesc = sanityData?.eventsPreview?.description ?? "Workshops, training sessions, and group events open to the public.";

  // Testimonials Fallbacks
  const testimonialsEyebrow = sanityData?.testimonialsSection?.eyebrow ?? "Stories of Healing";
  const testimonialsTitle = sanityData?.testimonialsSection?.title ?? "What our clients say";
  const testimonialsDesc = sanityData?.testimonialsSection?.description ?? "Discover how The Nestling Space with Dr. M. Mugabe has positively impacted the lives of our clients.";
  const testimonialsList = sanityData?.testimonialsSection?.testimonials?.length > 0 ? sanityData.testimonialsSection.testimonials : defaultTestimonials;

  // Blog Fallbacks
  const blogEyebrow = sanityData?.blogPreview?.eyebrow ?? "Feedback";
  const blogTitle = sanityData?.blogPreview?.title ?? "Share your feedback";
  const blogDesc = sanityData?.blogPreview?.description ?? "Use the contact page to send us your thoughts, comments, or suggestions.";

  return (
    <>
      {/* ======== HERO ======== */}
      <section id="hero">
        <Reveal className="hero-content" variant="fade" amount={0.55} delay={1.25}>
          <RevealSpan className="hero-eyebrow" variant="fade" delay={1.33}>
            {heroEyebrow}
          </RevealSpan>
          <div className="hero-split">
            <div className="hero-line-wrap">
              <RevealSpan className="hero-line-inner" variant="blurUp" delay={1.42}>
                {heroLine1}
              </RevealSpan>
            </div>
            <div className="hero-line-wrap">
              <RevealSpan className="hero-line-inner line-2" variant="blurUp" delay={1.54}>
                {heroLine2}
              </RevealSpan>
            </div>
          </div>
          <Reveal className="hero-subtext" variant="fade" delay={1.62}>
            {heroSubtext}
          </Reveal>
          <Reveal className="hero-actions" variant="fade" delay={1.72}>
            <Link href={heroPrimaryBtnLink} className="btn-dark-primary">
              {heroPrimaryBtnText}
            </Link>
            <Link href={heroSecondaryBtnLink} className="btn-dark-secondary">
              {heroSecondaryBtnText}
            </Link>
          </Reveal>
          <Reveal className="hero-trust" variant="fade" delay={1.82}>
            {heroTrustItems.map((item: string, idx: number) => (
              <span key={item}>
                <span className="hero-trust-item">{item}</span>
                {idx < heroTrustItems.length - 1 && <span className="hero-trust-dot"></span>}
              </span>
            ))}
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
              {aboutVideoUrl ? (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                >
                  <source src={aboutVideoUrl} />
                </video>
              ) : (
                <Image
                  src={aboutPhoto}
                  alt={aboutTitle}
                  fill
                  quality={100}
                  sizes="(max-width: 900px) 100vw, 100vw"
                  style={{ objectFit: "cover" }}
                />
              )}
            </Reveal>
            <Reveal variant="slideRight" delay={0.12} amount={0.3}>
              <div className="section-header">
                <span className="eyebrow section-eyebrow">{aboutEyebrow}</span>
                <h2
                  className="display-large"
                  style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "20px" }}
                >
                  {aboutTitle}
                </h2>
                <p className="body-text" style={{ color: "var(--ink-secondary)" }}>
                  {aboutParagraph1}
                </p>
                <p
                  className="body-text"
                  style={{
                    color: "var(--ink-secondary)",
                    marginTop: "16px",
                    marginBottom: "28px",
                  }}
                >
                  {aboutParagraph2}
                </p>
                <Link href={aboutLinkUrl} className="link-sage">
                  {aboutLinkText}
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
              {videoFeatureEyebrow}
            </span>
            <h2
              className="display-large"
              style={{ color: "rgba(255,255,255,0.94)", marginTop: "8px", marginBottom: "12px" }}
            >
              {videoFeatureTitle}
            </h2>
            <p
              className="body-text"
              style={{ color: "rgba(255,255,255,0.62)", maxWidth: "620px", margin: "0 auto" }}
            >
              {videoFeatureDesc}
            </p>
          </Reveal>

          <div className="grid-2" style={{ marginTop: "40px" }}>
            {featuredVideos.map((video: any, index: number) => {
              const videoUrl = video.videoFileUrl || video.videoUrl;
              const poster = video.posterUrl || video.posterImage;
              return (
                <Reveal key={video.title || index} variant={index % 2 === 0 ? "slideLeft" : "slideRight"} delay={index % 2 !== 0 ? 0.08 : 0} amount={0.2}>
                  <div
                    style={{
                      borderRadius: "22px",
                      overflow: "hidden",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "var(--shadow-product)",
                    }}
                  >
                    {videoUrl && (
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        poster={typeof poster === 'string' ? poster : (poster ? urlFor(poster).url() : undefined)}
                        style={{ width: "100%", height: "320px", objectFit: "cover" }}
                      >
                        <source src={videoUrl} />
                      </video>
                    )}
                    <div style={{ padding: "18px 20px 22px" }}>
                      <div className="eyebrow section-eyebrow" style={{ color: "var(--sage-light)", marginBottom: "10px" }}>
                        {video.title}
                      </div>
                      <p className="body-text" style={{ color: "rgba(255,255,255,0.72)" }}>
                        {video.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* ======== SERVICES PREVIEW ======== */}
      <div className="tile tile-parchment">
        <div className="tile-inner-wide">
          <Reveal className="section-header centered" variant="fade" amount={0.25}>
            <span className="eyebrow section-eyebrow">{servicesEyebrow}</span>
            <h2
              className="display-large"
              style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "12px" }}
            >
              {servicesTitle}
            </h2>
            <p
              className="body-text"
              style={{ color: "var(--ink-secondary)", maxWidth: "560px", margin: "0 auto" }}
            >
              {servicesDesc}
            </p>
          </Reveal>

          <div className="grid-4">
            {servicesList.map((service: any, index: number) => (
              <Reveal
                className="service-card"
                variant="scaleUp"
                delay={index * 0.08}
                amount={0.2}
                key={service.title}
              >
                {service.videoUrl ? (
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    style={{ width: "100%", height: "180px", objectFit: "cover" }}
                  >
                    <source src={service.videoUrl} />
                  </video>
                ) : (
                  <Image
                    src={service.image}
                    alt={service.alt || service.title}
                    width={640}
                    height={320}
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ width: "100%", height: "180px", objectFit: "cover" }}
                  />
                )}
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
            <span className="eyebrow section-eyebrow">{galleryEyebrow}</span>
            <h2
              className="display-large"
              style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "12px" }}
            >
              {galleryTitle}
            </h2>
            <p
              className="body-text"
              style={{ color: "var(--ink-secondary)", maxWidth: "520px", margin: "0 auto" }}
            >
              {galleryDesc}
            </p>
          </Reveal>
          <Reveal className="gallery-grid" style={{ marginTop: "40px" }} variant="blurUp" amount={0.2}>
            {galleryRow1.map((item: any, idx: number) => (
              <div key={idx} style={{ position: "relative", width: "100%", height: "280px", borderRadius: "14px", overflow: "hidden" }}>
                {item.videoUrl ? (
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    style={{ width: "100%", height: "280px", objectFit: "cover" }}
                  >
                    <source src={item.videoUrl} />
                  </video>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
            ))}
          </Reveal>
          <Reveal className="gallery-grid" style={{ marginTop: "12px" }} variant="blurUp" amount={0.2} delay={0.08}>
            {galleryRow2.map((item: any, idx: number) => (
              <div key={idx} style={{ position: "relative", width: "100%", height: "280px", borderRadius: "14px", overflow: "hidden" }}>
                {item.videoUrl ? (
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    style={{ width: "100%", height: "280px", objectFit: "cover" }}
                  >
                    <source src={item.videoUrl} />
                  </video>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
            ))}
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
              {quoteText}
            </h2>
            <p
              className="body-text"
              style={{
                color: "rgba(255,255,255,0.5)",
                marginBottom: "36px",
                marginTop: "20px",
              }}
            >
              {quoteAuthor}
            </p>
            <Link href={quoteBtnLink} className="btn-dark-primary">
              {quoteBtnText}
            </Link>
          </Reveal>
        </div>
      </div>

      {/* ======== EVENTS PREVIEW ======== */}
      <div className="tile tile-white">
        <div className="tile-inner">
          <Reveal className="section-header" variant="fade" amount={0.25}>
            <span className="eyebrow section-eyebrow">{eventsEyebrow}</span>
            <h2
              className="display-large"
              style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "12px" }}
            >
              {eventsTitle}
            </h2>
            <p className="body-text" style={{ color: "var(--ink-secondary)" }}>
              {eventsDesc}
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
            <span className="eyebrow section-eyebrow">{testimonialsEyebrow}</span>
            <h2
              className="display-large"
              style={{ color: "var(--ink)", marginTop: "8px" }}
            >
              {testimonialsTitle}
            </h2>
            <p
              className="body-text"
              style={{ color: "var(--ink-secondary)", maxWidth: "560px", marginTop: "12px" }}
            >
              {testimonialsDesc}
            </p>
          </Reveal>

          <div className="testimonials-layout">
            <Reveal className="testimonial-featured" variant="scaleUp" amount={0.2}>
              <div className="testimonial-featured-top">
                <span className="testimonial-eyebrow">Featured Story</span>
                <span className="testimonial-badge">Client voice</span>
              </div>
              <p className="testimonial-quote testimonial-quote-large">
                &ldquo;{testimonialsList[0].quote}&rdquo;
              </p>
              <div className="testimonial-author">{testimonialsList[0].author}</div>
              <div className="testimonial-label">{testimonialsList[0].label}</div>
            </Reveal>

            <div className="testimonial-grid">
              {testimonialsList.slice(1).map((t: any, index: number) => (
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
            <span className="eyebrow section-eyebrow">{blogEyebrow}</span>
            <h2
              className="display-large"
              style={{ color: "var(--ink)", marginTop: "8px", marginBottom: "12px" }}
            >
              {blogTitle}
            </h2>
            <p className="body-text" style={{ color: "var(--ink-secondary)", maxWidth: "540px", margin: "0 auto" }}>
              {blogDesc}
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
