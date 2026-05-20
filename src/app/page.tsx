"use client";
import Image from "next/image";
import { useEffect } from 'react';
import initScripts from './scripts';

const coreValues = [
  "Compassionate Empathy",
  "Unwavering Confidentiality",
  "Professionalism and Ethical Integrity",
  "Cultural Sensitivity and Inclusivity",
  "Holistic Well-being",
  "Accessibility and Community Engagement",
  "Client Empowerment",
];

const featuredServices = [
  {
    image: "/Images/service_individual_1775480745394.png",
    alt: "Individual counselling",
    title: "Individual Counselling",
    description:
      "Support for youth, adults, and the aged facing stress, grief, depression, anxiety, life transitions, and emotional overwhelm.",
  },
  {
    image: "/Images/service_couples_1775480819650.png",
    alt: "Marriage and relationship counselling",
    title: "Marriage & Relationship Counselling",
    description:
      "Premarital guidance and marriage counselling focused on communication, conflict resolution, trust, intimacy, and emotional reconnection.",
  },
  {
    image: "/Images/service_child_1775480856604.png",
    alt: "Family counselling",
    title: "Family Counselling",
    description:
      "Practical support for healthier family communication, parenting challenges, boundary setting, behavioural concerns, and generational healing.",
  },
  {
    image: "/Images/service_group_1775480873131.png",
    alt: "Workshops and group sessions",
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
      "Interactive training for schools, companies, parents, youth groups, and community organizations.",
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
      "A clear specialization in marriage, family systems, parenting, and intergenerational distress.",
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
    label: "Happy",
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

export default function Home() {
  const web3FormsAccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ?? "";
  const hasWeb3FormsAccessKey = web3FormsAccessKey.length > 0;

  useEffect(() => {
    return initScripts();
  }, []);

  return (
    <>


  {/*  ====== CURSOR ======  */}
  <div className="cursor-dot"  id="cursor-dot"></div>
  <div className="cursor-ring" id="cursor-ring"></div>

  {/*  ====== SCROLL PROGRESS ======  */}
  <div id="scroll-progress"></div>

  {/*  ====== LOADER ======  */}
  <div id="loader">
    <div className="loader-bloom">
      <span></span><span></span><span></span>
    </div>
    <p className="loader-text">Nestling Space...</p>
  </div>

  {/*  ====== NAVIGATION ======  */}
  <nav id="navbar">
    <a href="#hero" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Image src="/Images/logo.png" alt="Nestling Space Emblem" width={48} height={48} priority style={{ height: '48px', width: 'auto', objectFit: 'contain' }}/>
      <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-dark)' }}>Nestling <span style={{ color: 'var(--sage)' }}>Space</span></span>
    </a>
    <ul className="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#testimonials">Testimonials</a></li>
      <li><a href="#founder">Founder</a></li>
      <li><a href="#contact" className="nav-cta">Reach Out</a></li>
    </ul>
    <button className="hamburger" id="hamburger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  {/*  ====== MOBILE MENU ======  */}
  <div className="mobile-menu" id="mobile-menu">
    <a href="#about">About</a>
    <a href="#services">Services</a>
    <a href="#founder">Founder</a>
    <a href="#affirmation">Affirmations</a>
    <a href="#contact">Contact</a>
  </div>

  {/*  ==========================================
       HERO SECTION
  ==========================================  */}
  <section id="hero">
    <div className="hero-bg"></div>
    <div style={{ position: 'absolute', inset: '0', backgroundImage: 'url(\'/Images/hero_family_bright_1775480710232.png\')', backgroundSize: 'cover', backgroundPosition: 'center', opacity: '0.35', mixBlendMode: 'multiply', pointerEvents: 'none' }}></div>
    <div className="hero-blob hero-blob-1" style={{ zIndex: '2' }}></div>
    <div className="hero-blob hero-blob-2" style={{ zIndex: '2' }}></div>
    <div className="hero-blob hero-blob-3" style={{ zIndex: '2' }}></div>

    {/*  botanical petals  */}
    <span className="petal" style={{ top: '12%', left: '8%', animationDelay: '0s' }}>*</span>
    <span className="petal" style={{ top: '75%', left: '6%', animationDelay: '1.5s' }}>*</span>
    <span className="petal" style={{ top: '20%', right: '9%', animationDelay: '0.8s' }}>*</span>
    <span className="petal" style={{ top: '65%', right: '7%', animationDelay: '2.2s' }}>*</span>
    <span className="petal" style={{ top: '40%', left: '3%', animationDelay: '3s' }}>*</span>

    <div className="hero-content">
      <span className="hero-eyebrow">Welcome to Nestling Space</span>
      <h1 className="hero-headline">
        A safe space to <em>heal</em>...<br/>
        A soft place to <em>grow</em>.
      </h1>
      <p className="hero-tagline">Your mind deserves care, compassion,<br/>and understanding.</p>
      <p className="hero-subtext">
        Welcome to The Nestling Space, a gentle home for your healing and growth. Here, you are seen, heard, and supported as you untangle life&apos;s worries, build emotional strength, and move toward a life of clarity, peace, and purpose.
      </p>
      <div className="hero-actions">
        <a href="#services" className="btn-primary">
          Get Started
        </a>
        <a href="#about" className="btn-secondary">
          Learn More
        </a>
      </div>
    </div>

    <div className="scroll-hint">
      <span>Scroll</span>
      <div className="scroll-mouse">
        <div className="scroll-mouse-dot"></div>
      </div>
    </div>
  </section>

  {/*  ==========================================
       ABOUT SECTION
  ==========================================  */}
  <section id="about">
    <div className="about-grid">
      {/*  Image  */}
      <div className="about-image-wrap reveal slide-left">
        <div className="about-image-frame">
          <Image src="/Images/A haven for healing.jpg.jpeg" alt="A haven for healing" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
        </div>
        <div className="about-badge">
          <div className="about-badge-icon">*</div>
          <div className="about-badge-text">
            <strong>Safe Space</strong>
            <span>Established with love</span>
          </div>
        </div>
      </div>

      {/*  Text  */}
      <div className="about-content reveal slide-right">
        <div className="ornament">
          <h2 className="section-title" style={{ marginBottom: '0', fontSize: '2.5rem', color: 'var(--sage)' }}>Who We Are</h2>
          <div className="ornament-line"></div>
          <span className="ornament-icon">âœ¦</span>
        </div>
        <h3 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '20px' }}>
          Rooted in science, service,<br/><em>and human dignity</em>.
        </h3>
        <p className="section-body">
          The Nestling Space was founded from a rare blend of clinical science, public health, teaching, and hands-on counselling experience. Over a decade of serving as a teacher and guidance and counselling practitioner revealed how closely emotional, relational, physical, and social well-being are connected.
        </p>
        <p className="section-body" style={{ marginTop: '18px' }}>
          The practice was formalised after the COVID-19 pandemic made the psychological cost of fear, grief, isolation, and economic pressure impossible to ignore. That experience, together with years of working with students, parents, colleagues, and church communities, shaped a clear calling: provide culturally sensitive mental health support that helps break cycles of pain and restore resilience in individuals, couples, and families.
        </p>

        <div className="about-statements">
          <div className="statement-card">
            <h4>Mission</h4>
            <p>
              To nurture mental well-being through comprehensive, culturally sensitive counselling for individuals, youth, the aged, couples, families, schools, and companies through face-to-face and online support.
            </p>
          </div>
          <div className="statement-card">
            <h4>Vision</h4>
            <p>
              To help build a Zimbabwe where mental health is a foundational pillar of well-being, with accessible and empowering support reaching families, institutions, and communities locally and globally.
            </p>
          </div>
          <div className="statement-card">
            <h4>Purpose</h4>
            <p>
              To strengthen individuals, families, and organisations with expert, compassionate, and practical therapeutic care that improves relationships, resilience, and long-term emotional wellness.
            </p>
          </div>
        </div>

        <div className="about-values reveal" style={{ transitionDelay: '0.2s' }}>
          {coreValues.map((value) => (
            <div className="value-pill" key={value}><span className="dot"></span> {value}</div>
          ))}
        </div>
      </div>
    </div>
  </section>

  {/*  ==========================================
       PRACTICE PILLARS
  ==========================================  */}
  <div className="stats-bar reveal practice-pillars">
    <div className="stats-inner">
      <div className="stat-item">
        <h3>Evidence-Based</h3>
        <p>Grounded in professional training, ethics, and practical therapeutic tools.</p>
      </div>
      <div className="stat-item">
        <h3>Culturally Sensitive</h3>
        <p>Respectful of Zimbabwean family systems, faith contexts, and lived realities.</p>
      </div>
      <div className="stat-item">
        <h3>Accessible Care</h3>
        <p>Available face-to-face, online, and on-site for schools and organisations.</p>
      </div>
      <div className="stat-item">
        <h3>Whole-Person Focus</h3>
        <p>Attentive to psychological, relational, physical, social, and spiritual well-being.</p>
      </div>
    </div>
  </div>

  {/*  ==========================================
       SERVICES SECTION
  ==========================================  */}
  <section id="services">
    <div className="services-header reveal">
      <span className="section-eyebrow">What We Offer</span>
      <h2 className="section-title">What You&apos;ll <em>Find Here</em></h2>
      <p className="section-body">
        Comprehensive counselling and training services designed for people, families,
        schools, churches, and workplaces navigating real emotional and relational pressures.
      </p>
    </div>

    <div className="services-grid">
      {featuredServices.map((service, index) => (
        <div className={`service-card reveal reveal-delay-${index + 1}`} key={service.title}>
          <Image src={service.image} width={640} height={320} sizes="(max-width: 768px) 100vw, 25vw" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }} alt={service.alt}/>
          <h3 className="card-title">{service.title}</h3>
          <p className="card-desc">{service.description}</p>
        </div>
      ))}
    </div>
  </section>

  {/*  === ALL SERVICES ===  */}
  <section id="all-services" style={{ background: 'var(--cream)' }}>
    <div className="reveal">
      <h2 className="section-title">Our Full Range of <em>Services</em></h2>
      <p className="section-body" style={{ maxWidth: '780px', margin: '0 auto' }}>
        The practice serves clients across the life span and also partners with organisations that want structured mental health support.
      </p>
      <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '40px' }}>
        {fullServices.map((service, index) => (
          <div className="service-card" key={service.title} style={{ padding: '30px', background: 'var(--white)', borderRadius: '16px', boxShadow: 'var(--shadow-soft)' }}>
            <h3 className="card-title">{index + 1}. {service.title}</h3>
            <p className="card-desc">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section id="delivery" style={{ background: 'var(--white)' }}>
    <div className="reveal">
      <div className="ornament">
        <span className="section-eyebrow" style={{ marginBottom: '0' }}>How We Work</span>
        <div className="ornament-line"></div>
        <span className="ornament-icon">+</span>
      </div>
      <h2 className="section-title">Flexible <em>Delivery Methods</em></h2>
      <div className="info-grid">
        <div className="info-card">
          <h3>Service Delivery</h3>
          <ul className="info-list">
            {deliveryMethods.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="info-card">
          <h3>What Makes The Nestling Space Distinct</h3>
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
  </section>

  {/*  ==========================================
       FOUNDER SECTION
  ==========================================  */}
  <section id="founder">
    <div className="founder-grid">
      {/*  Image  */}
      <div className="founder-image-wrap reveal slide-left">
        <span className="founder-tag">Led with Purpose</span>
        <div className="founder-image-frame" style={{ background: 'var(--cream)' }}>
          <Image src="/Images/WhatsApp Image 2026-03-26 at 09.56.16.jpeg" alt="Dr M. Mugabe" fill sizes="(max-width: 900px) 100vw, 40vw" style={{ objectFit: 'contain', objectPosition: 'top' }} />
        </div>
      </div>

      {/*  Text  */}
      <div className="reveal slide-right">
        <div className="ornament">
          <span className="section-eyebrow" style={{ marginBottom: '0' }}>Our Founder</span>
          <div className="ornament-line"></div>
          <span className="ornament-icon">âœ¦</span>
        </div>
        <h2 className="section-title">Led by <em>Dr. M. Mugabe</em></h2>
        <p className="section-body">
          Dr. M. Mugabe is a Clinical Scientist, Public Health Practitioner, teacher, and counsellor whose work has consistently centred on people under pressure. Her experience in schools, churches, and public health settings shaped a practical understanding of how emotional pain travels through families and communities when it is left unaddressed.
        </p>
        <p className="section-body" style={{ marginTop: '16px' }}>
          The Nestling Space reflects that long view. It brings together therapeutic care, prevention, education, and community understanding to help clients move from survival toward healing, stronger relationships, and a more resilient future.
        </p>

        <div className="founder-credentials reveal reveal-delay-1">
          <div className="credential-item">
            <i className="fa-solid fa-flask"></i>
            Clinical Scientist
          </div>
          <div className="credential-item">
            <i className="fa-solid fa-brain"></i>
            Public Health Practitioner
          </div>
          <div className="credential-item">
            <i className="fa-solid fa-heart"></i>
            Guidance & Counselling Educator
          </div>
          <div className="credential-item">
            <i className="fa-solid fa-seedling"></i>
            Family Mental Health Advocate
          </div>
        </div>

        <div className="founder-quote reveal reveal-delay-2">
          Healing becomes possible when people are met with skill, compassion, and a space
          where their story is taken seriously.
        </div>
      </div>
    </div>
  </section>

  {/*  ==========================================
       AFFIRMATION SECTION
  ==========================================  */}
  <section id="affirmation">
    <div className="particles-container" id="particles-container"></div>

    <div className="affirmation-content reveal scale-up">
      <span className="affirmation-overline">*</span>
      <h2 className="affirmation-headline">Your mind.<br/><em>Your health.</em><br/>Your worth.</h2>

      <div className="affirmation-divider">
        <div className="affirmation-divider-line"></div>
        <span className="affirmation-divider-icon">*</span>
        <div className="affirmation-divider-line"></div>
      </div>

      <p className="affirmation-subtext">
        You are not alone.<br/>
        You are welcome here.
      </p>

      <a href="#contact" className="btn-primary" style={{ display: 'inline-flex' }}>
        Take the First Step
      </a>
    </div>
  </section>

  
  {/*  === INQUIRIES ===  */}
  <section id="inquiries" style={{ background: 'var(--white)' }}>
    <div className="reveal">
      <h2 className="section-title">Service <em>Inquiries</em></h2>
      <p className="section-body" style={{ marginBottom: '40px' }}>Have a question about our services? Feel free to reach out to us directly via WhatsApp or Email.</p>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <a href="https://wa.me/263773214886" target="_blank" rel="noreferrer" className="btn-primary" style={{ background: '#25D366', textDecoration: 'none' }}>
             Message on WhatsApp (+263 77 321 4886)
          </a>
          <a href="mailto:nestlingsafespace@gmail.com" className="btn-secondary" style={{ textDecoration: 'none' }}>
             Email Us (nestlingsafespace@gmail.com)
          </a>
      </div>

      <div className="contact-form" style={{ maxWidth: '600px', marginTop: '60px' }}>
        <h3 style={{ fontFamily: 'var(--font-display), serif', marginBottom: '20px' }}>Or send an inquiry form:</h3>
        <form action={hasWeb3FormsAccessKey ? "https://api.web3forms.com/submit" : undefined} method={hasWeb3FormsAccessKey ? "POST" : undefined}>
          {hasWeb3FormsAccessKey ? <input type="hidden" name="access_key" value={web3FormsAccessKey}/> : null}
          <input type="hidden" name="subject" value="New Service Inquiry from Nestling Space"/>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" rows={5} required></textarea>
          </div>
          {!hasWeb3FormsAccessKey ? (
            <p style={{ fontSize: '0.9rem', color: 'var(--text-soft)', marginBottom: '20px' }}>
              Online form setup is in progress. Please use WhatsApp or email for now.
            </p>
          ) : null}
          <button type="submit" className="btn-submit" disabled={!hasWeb3FormsAccessKey}>Send Inquiry</button>
        </form>
      </div>
    </div>
  </section>

  {/*  === BOOKINGS ===  */}
  <section id="bookings" style={{ background: 'var(--white)' }}>
    <div className="reveal">
      <h2 className="section-title">Book a <em>Session</em></h2>
      <p className="section-body">Take the first step towards your healing journey. Fill out the form below to request a session.</p>
      
      <div className="contact-form" style={{ maxWidth: '600px', marginTop: '40px' }}>
        <form action={hasWeb3FormsAccessKey ? "https://api.web3forms.com/submit" : undefined} method={hasWeb3FormsAccessKey ? "POST" : undefined}>
          {hasWeb3FormsAccessKey ? <input type="hidden" name="access_key" value={web3FormsAccessKey}/> : null}
          <input type="hidden" name="subject" value="New Booking Request from Nestling Space"/>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-group">
            <label>Service Area / Inquiry</label>
            <input type="text" name="service" placeholder="e.g. Individual Counseling" required />
          </div>
          <div className="form-group">
            <label>Preferred Date/Time</label>
            <input type="text" name="preferred_time" placeholder="e.g. Next Tuesday morning" required />
          </div>
          <div className="form-group">
            <label>Any notes for Dr. Mugabe?</label>
            <textarea name="notes" rows={4}></textarea>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-soft)', marginBottom: '20px' }}>By booking, you consent to our Privacy Policy and Terms & Conditions.</p>
          <button type="submit" className="btn-submit" disabled={!hasWeb3FormsAccessKey}>Request Booking</button>
        </form>
      </div>
    </div>
  </section>

  {/*  === FEEDBACK ===  */}
  <section id="feedback" style={{ background: 'var(--white)' }}>
    <div className="reveal">
      <h2 className="section-title">Give <em>Feedback</em></h2>
      <p className="section-body">We value your experience and continually seek to improve. Please let us know how we did.</p>
      
      <div className="contact-form" style={{ maxWidth: '600px', marginTop: '40px' }}>
        <form action={hasWeb3FormsAccessKey ? "https://api.web3forms.com/submit" : undefined} method={hasWeb3FormsAccessKey ? "POST" : undefined}>
          {hasWeb3FormsAccessKey ? <input type="hidden" name="access_key" value={web3FormsAccessKey}/> : null}
          <input type="hidden" name="subject" value="New Feedback Submission from Nestling Space"/>
          <div className="form-group">
            <label>Name (Optional)</label>
            <input type="text" name="name" />
          </div>
          <div className="form-group">
            <label>Service Received</label>
            <input type="text" name="service" />
          </div>
          <div className="form-group">
            <label>Feedback</label>
            <textarea name="feedback" rows={6} placeholder="Tell us about your experience..." required></textarea>
          </div>
          <div className="form-group">
            <label>Can we use your positive feedback anonymously in our testimonials?</label>
            <select name="can_use" style={{ width: '100%', padding: '14px 18px', border: '1.5px solid var(--cream-dark)', borderRadius: '8px' }}>
                <option value="Yes">Yes, anonymously</option>
                <option value="No">No, keep private</option>
            </select>
          </div>
          {!hasWeb3FormsAccessKey ? (
            <p style={{ fontSize: '0.9rem', color: 'var(--text-soft)', marginTop: '20px', marginBottom: '0' }}>
              Online feedback submission is in progress. Please send feedback directly by email for now.
            </p>
          ) : null}
          <button type="submit" className="btn-submit" style={{ marginTop: '20px' }} disabled={!hasWeb3FormsAccessKey}>Submit Feedback</button>
        </form>
      </div>
    </div>
  </section>

  {/*  ==========================================
       GALLERY SECTION
  ==========================================  */}
  <section id="gallery" style={{ background: 'var(--cream)' }}>
    <div className="reveal">
      <div className="ornament"><span className="section-eyebrow" style={{ marginBottom: '0' }}>Our Space</span><div className="ornament-line"></div><span className="ornament-icon">*</span></div>
      <h2 className="section-title">A glimpse of <em>Healing</em></h2>
      <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '40px' }}>
        <Image src="/Images/hero_family_bright_1775480710232.png" alt="Nestling Space" width={700} height={560} sizes="(max-width: 768px) 100vw, 33vw" style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '12px' }} />
        <Image src="/Images/service_group_1775480873131.png" alt="Nestling Space" width={700} height={560} sizes="(max-width: 768px) 100vw, 33vw" style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '12px' }} />
        <Image src="/Images/service_individual_1775480745394.png" alt="Nestling Space" width={700} height={560} sizes="(max-width: 768px) 100vw, 33vw" style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '12px' }} />
      </div>
    </div>
  </section>

  {/*  ==========================================
       TESTIMONIALS SECTION
  ==========================================  */}
  <section id="testimonials" style={{ background: 'var(--white)' }}>
    <div className="reveal">
      <div className="ornament"><span className="section-eyebrow" style={{ marginBottom: '0' }}>Stories of Healing</span><div className="ornament-line"></div><span className="ornament-icon">*</span></div>
      <h2 className="section-title">What Our Clients <em>Say</em></h2>
      <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '40px' }}>
        {testimonials.map((testimonial) => (
          <div className="testimonial-card" key={`${testimonial.author}-${testimonial.label}`} style={{ padding: '30px', background: 'var(--cream)', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <p style={{ fontStyle: 'italic', color: 'var(--text-mid)', lineHeight: '1.6' }}>&ldquo;{testimonial.quote}&rdquo;</p>
            <h4 style={{ marginTop: '20px', color: 'var(--text-dark)' }}>{testimonial.author}</h4><span style={{ fontSize: '0.8rem', color: 'var(--text-soft)' }}>{testimonial.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/*  ==========================================
       CONTACT SECTION
  ==========================================  */}
  <section id="contact">
    <div className="contact-grid">
      {/*  Info  */}
      <div className="reveal slide-left">
        <span className="section-eyebrow">Get in Touch</span>
        <h2 className="section-title">Ready to <em>begin</em>?</h2>
        <p className="section-body" style={{ marginBottom: '48px' }}>
          Reaching out is an act of courage. Whether you have a question, want to learn more,
          or are ready to take the first step, we&apos;re here for you.
        </p>

        <div className="contact-info-item">
          <div className="contact-icon"><i className="fa-brands fa-instagram"></i></div>
          <div>
            <h4>Instagram</h4>
            <p><a href="https://www.instagram.com/nestlingspace" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>@nestlingspace</a><br/>Follow our journey</p>
          </div>
        </div>
        <div className="contact-info-item">
          <div className="contact-icon"><i className="fa-brands fa-whatsapp"></i></div>
          <div>
            <h4>WhatsApp</h4>
            <p><a href="https://wa.me/263773214886" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>Message us directly</a><br/>(Private & Secure)</p>
          </div>
        </div>
        <div className="contact-info-item">
          <div className="contact-icon"><i className="fa-solid fa-facebook"></i></div>
          <div>
            <h4>Facebook</h4>
            <p><a href="https://www.facebook.com/profile.php?id=61580743690158" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>The Nestling Space</a><br/>Connect with us</p>
          </div>
        </div>
        <div className="contact-info-item">
          <div className="contact-icon"><i className="fa-solid fa-envelope"></i></div>
          <div>
            <h4>Email</h4>
            <p><a href="mailto:nestlingsafespace@gmail.com" style={{ textDecoration: 'underline' }}>nestlingsafespace@gmail.com</a><br/>Open to all enquiries</p>
          </div>
        </div>
      </div>

      {/*  Form  */}
      <div className="reveal slide-right">
        <div className="contact-form">
          <form id="contact-form" noValidate data-access-key={web3FormsAccessKey}>
            <div className="form-group" id="group-name">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" placeholder="e.g. Sarah M." autoComplete="off"/>
              <span className="error-msg">Please enter your name.</span>
            </div>
            <div className="form-group" id="group-email">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="you@example.com" autoComplete="off"/>
              <span className="error-msg">Please enter a valid email address.</span>
            </div>
            <div className="form-group" id="group-message">
              <label htmlFor="message">Your Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Share what&apos;s on your mind..."></textarea>
              <span className="error-msg">Please write a message.</span>
            </div>
            <button type="submit" className="btn-submit" id="submit-btn">
              Reach Out
            </button>
          </form>
          <div className="form-success" id="form-success">
            <div className="success-icon">✿</div>
            <h3>Message Received</h3>
            <p>Thank you for reaching out. Dr. Mugabe will be in touch with warmth and care.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  === PRIVACY POLICY ===  */}
  <section id="privacy" style={{ background: 'var(--white)' }}>
    <div className="reveal">
      <h2 className="section-title">Privacy <em>Policy</em></h2>
      <div className="section-body" style={{ maxWidth: '800px', lineHeight: '1.8' }}>
        <p><strong>Welcome to The Nestling Space.</strong> Your privacy matters deeply to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and mental health services.</p>
        
        <h3 style={{ marginTop: '30px', fontFamily: '\'Playfair Display\', serif', color: 'var(--text-dark)' }}>Information We Collect</h3>
        <p>We may collect and process the following information:</p>
        <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
            <li><strong>Personal Information:</strong> Full name, Email address, Phone number, Appointment details.</li>
            <li><strong>Sensitive Information:</strong> Emotional and psychological information, personal experiences shared during sessions, counselling session notes (kept strictly confidential).</li>
            <li><strong>Website Data:</strong> IP address, browser type, pages visited, time spent on our website.</li>
        </ul>

        <h3 style={{ marginTop: '30px', fontFamily: '\'Playfair Display\', serif', color: 'var(--text-dark)' }}>How We Use Your Information</h3>
        <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
            <li>Provide counselling and wellness services</li>
            <li>Schedule and manage appointments</li>
            <li>Communicate with you (responses, reminders, updates)</li>
            <li>Improve our website and services</li>
            <li>Maintain secure internal records</li>
        </ul>

        <h3 style={{ marginTop: '30px', fontFamily: '\'Playfair Display\', serif', color: 'var(--text-dark)' }}>Confidentiality and Data Protection</h3>
        <p>At The Nestling Space, your information is handled with the highest level of care. We ensure secure storage of all data, restricted access to authorized personnel only, and protection against unauthorized access. We do not sell, rent, or share your personal data with third parties.</p>

        <h3 style={{ marginTop: '30px', fontFamily: '\'Playfair Display\', serif', color: 'var(--text-dark)' }}>When We May Share Information</h3>
        <p>Your information may only be disclosed: with your explicit consent, when required by law, if there is a risk of harm to yourself or others, or in cases involving abuse or safeguarding concerns.</p>

        <h3 style={{ marginTop: '30px', fontFamily: '\'Playfair Display\', serif', color: 'var(--text-dark)' }}>Contact Us</h3>
        <p>If you have questions about this Privacy Policy, please contact us at nestlingsafespace@gmail.com</p>
      </div>
    </div>
  </section>

  {/*  === REFUND POLICY ===  */}
  <section id="refund" style={{ background: 'var(--white)' }}>
    <div className="reveal">
      <h2 className="section-title">Refund <em>Policy</em></h2>
      <div className="section-body" style={{ maxWidth: '800px', lineHeight: '1.8' }}>
        <p>At Nestling Space, we are committed to providing a safe, supportive, and professional experience for all clients. This Refund Policy outlines how payments, cancellations, and refunds are handled.</p>

        <h3 style={{ marginTop: '30px', fontFamily: '\'Playfair Display\', serif', color: 'var(--text-dark)' }}>1. Session Payments</h3>
        <p>All counseling sessions must be paid for in advance to secure your booking. Payments confirm your appointment time and therapist availability.</p>
        <h3 style={{ marginTop: '30px', fontFamily: '\'Playfair Display\', serif', color: 'var(--text-dark)' }}>2. Cancellation & Rescheduling</h3>
        <p>Cancellations or rescheduling requests must be made at least 24 hours before your scheduled session. If you cancel within this timeframe, you may reschedule your session at no additional cost, or request a full refund.</p>

        <h3 style={{ marginTop: '30px', fontFamily: '\'Playfair Display\', serif', color: 'var(--text-dark)' }}>3. Late Cancellations & No-Shows</h3>
        <p>Cancellations made less than 24 hours before the session are non-refundable. If you do not attend your session without prior notice, the session is considered a no-show and is non-refundable and cannot be rescheduled.</p>

        <h3 style={{ marginTop: '30px', fontFamily: '\'Playfair Display\', serif', color: 'var(--text-dark)' }}>4. Refund Processing</h3>
        <p>Approved refunds will be processed within 5-10 business days. Refunds will be issued using the original payment method where possible. Please note that any applicable transaction or processing fees may be deducted.</p>

        <p style={{ marginTop: '30px', fontStyle: 'italic' }}>Our goal is to create a safe and respectful space for both clients and practitioners. This policy helps us honor your time while also respecting the commitment required to provide quality care.</p>
      </div>
    </div>
  </section>

  {/*  === TERMS ===  */}
  <section id="terms" style={{ background: 'var(--white)' }}>
    <div className="reveal">
      <h2 className="section-title">Terms & <em>Conditions</em></h2>
      <div className="section-body" style={{ maxWidth: '800px', lineHeight: '1.8' }}>
        <p>Welcome to Nestling Space. By accessing our website or booking our services, you agree to the following Terms and Conditions.</p>

        <h3 style={{ marginTop: '30px', fontFamily: '\'Playfair Display\', serif', color: 'var(--text-dark)' }}>1. Services Provided</h3>
        <p>Nestling Space offers counseling, emotional wellness support, and personal development services. These services are intended to support mental and emotional well-being but do not replace medical or psychiatric care.</p>

        <h3 style={{ marginTop: '30px', fontFamily: '\'Playfair Display\', serif', color: 'var(--text-dark)' }}>2. Eligibility & Bookings</h3>
        <p>Clients must be 18 years or older to book sessions independently. Individuals under 18 must have parental or guardian consent. All sessions must be booked in advance.</p>

        <h3 style={{ marginTop: '30px', fontFamily: '\'Playfair Display\', serif', color: 'var(--text-dark)' }}>3. Payments & Cancellations</h3>
        <p>All services must be paid for in advance unless otherwise agreed. Cancellations must be made at least 24 hours in advance. Late cancellations and missed appointments may not be refunded (refer to Refund Policy).</p>

        <h3 style={{ marginTop: '30px', fontFamily: '\'Playfair Display\', serif', color: 'var(--text-dark)' }}>4. Not a Crisis Service</h3>
        <p>Nestling Space does not provide emergency or crisis services. If you are in immediate danger or experiencing a crisis, please contact local emergency services or a hospital.</p>

        <p style={{ marginTop: '30px', fontStyle: 'italic' }}>At Nestling Space, we are committed to creating a safe, respectful, and supportive environment where healing and growth can take place.</p>
      </div>
    </div>
  </section>

  {/*  ==========================================
       FOOTER
  ==========================================  */}
  <footer className="reveal">
    <div className="footer-top">
      <div className="footer-brand">
        <div className="brand-name">Nestling <span>Space</span></div>
        <p>A safe sanctuary for your mind, heart, and healing journey. You are always welcome here.</p>
        <div className="footer-social">
          <a href="https://www.instagram.com/nestlingspace" target="_blank" rel="noreferrer" className="social-btn" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
          <a href="https://wa.me/263773214886" target="_blank" rel="noreferrer" className="social-btn" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
          <a href="mailto:nestlingsafespace@gmail.com" className="social-btn" aria-label="Email"><i className="fa-solid fa-envelope"></i></a>
          <a href="https://www.facebook.com/profile.php?id=61580743690158" target="_blank" rel="noreferrer" className="social-btn" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
        </div>
      </div>

      <div className="footer-col" style={{ marginRight: '20px' }}>
        <h4>Navigate</h4>
        <ul>
          <li><a href="#about">About Us</a></li>
          <li><a href="#all-services">All 12 Services</a></li>
          <li><a href="#founder">Our Founder</a></li>
          <li><a href="#inquiries">Service Inquiry</a></li>
          <li><a href="#bookings">Book a Session</a></li>
          <li><a href="#feedback">Give Feedback</a></li>
        </ul>
      </div>

      <div className="footer-col">
        <h4>Legal & Resources</h4>
        <ul>
          <li><a href="#privacy">Privacy Policy</a></li>
          <li><a href="#refund">Refund Policy</a></li>
          <li><a href="#terms">Terms & Conditions</a></li>
        </ul>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© 2026 Nestling Space. Crafted with <span>♥</span> for your wellbeing.</p>
      <p>Made by Dr. M. Mugabe &amp; Team</p>
    </div>
  </footer>

  
    </>
  );
}

