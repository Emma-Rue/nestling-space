"use client";
import { useState } from "react";

type Tab = "privacy" | "refund" | "terms";

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState<Tab>("privacy");

  return (
    <>
      <div className="page-hero">
        <span
          className="eyebrow"
          style={{ color: "var(--sage-light)", marginBottom: "12px" }}
        >
          Legal
        </span>
        <h1>Policies, Terms &amp; Privacy</h1>
        <p>
          Clear information about how we protect your data, handle payments, and manage your sessions.
        </p>
      </div>

      <div className="tile tile-white">
        <div className="tile-inner">
          <div className="legal-tabs">
            <button
              className={`legal-tab${activeTab === "privacy" ? " active" : ""}`}
              onClick={() => setActiveTab("privacy")}
            >
              Privacy Policy
            </button>
            <button
              className={`legal-tab${activeTab === "refund" ? " active" : ""}`}
              onClick={() => setActiveTab("refund")}
            >
              Refund Policy
            </button>
            <button
              className={`legal-tab${activeTab === "terms" ? " active" : ""}`}
              onClick={() => setActiveTab("terms")}
            >
              Terms &amp; Conditions
            </button>
          </div>

          <div className="legal-content">
            {/* Privacy Policy */}
            {activeTab === "privacy" && (
              <div className="legal-panel active">
                <h2>Privacy Policy</h2>
                <p>
                  <strong>Welcome to The Nestling Space.</strong> Your privacy matters
                  deeply to us. This Privacy Policy explains how we collect, use, and
                  protect your personal information when you use our website and mental
                  health services.
                </p>

                <h3>Who We Are</h3>
                <p>
                  The Nestling Space is a mental health and wellness practice providing counselling,
                  emotional support, and personal growth services in a safe, confidential environment.
                </p>

                <h3>Information We Collect</h3>
                <p>We may collect and process the following information:</p>
                <ul>
                  <li>
                    <strong>Personal Information:</strong> Full name, email address,
                    phone number, appointment details.
                  </li>
                  <li>
                    <strong>Sensitive Information:</strong> Emotional and psychological
                    information, personal experiences shared during sessions, counselling
                    session notes (kept strictly confidential).
                  </li>
                  <li>
                    <strong>Website Data:</strong> IP address, browser type, pages
                    visited, time spent on our website.
                  </li>
                </ul>

                <h3>How We Use Your Information</h3>
                <ul>
                  <li>Provide counselling and wellness services</li>
                  <li>Schedule and manage appointments</li>
                  <li>Communicate with you (responses, reminders, updates)</li>
                  <li>Improve our website and services</li>
                  <li>Maintain secure internal records</li>
                </ul>

                <h3>Confidentiality and Data Protection</h3>
                <p>
                  At The Nestling Space, your information is handled with the highest
                  level of care. We ensure secure storage of all data, restricted access
                  to authorised personnel only, and protection against unauthorised
                  access. We do not sell, rent, or share your personal data with third
                  parties.
                </p>

                <h3>When We May Share Information</h3>
                <p>
                  Your information may only be disclosed with your explicit consent, when required by law,
                  if there is a risk of harm to yourself or others, or in cases involving abuse or safeguarding concerns.
                </p>

                <h3>Cookies and Website Tracking</h3>
                <p>
                  Our website may use cookies to enhance your browsing experience, understand how visitors
                  use our site, and improve performance and content. You can disable cookies through your
                  browser settings.
                </p>

                <h3>Your Rights</h3>
                <ul>
                  <li>Access your personal information</li>
                  <li>Request corrections</li>
                  <li>Request deletion of your data where applicable</li>
                  <li>Withdraw consent at any time</li>
                </ul>

                <h3>Data Retention</h3>
                <p>
                  We keep your information only as long as necessary to provide our services and meet legal
                  and professional obligations.
                </p>

                <h3>Children&apos;s Privacy</h3>
                <p>
                  Our services are not provided to individuals under 18 without consent from a parent or guardian.
                </p>

                <h3>Contact Us</h3>
                <p>
                  If you have questions about this Privacy Policy, please contact us at{" "}
                  <a
                    href="mailto:nestlingsafespace@gmail.com"
                    style={{ color: "var(--sage)" }}
                  >

                  <h3>Contact Us</h3>
                  <p>
                    If you have questions about these terms, please contact us at{" "}
                    <a href="mailto:nestlingsafespace@gmail.com" style={{ color: "var(--sage)" }}>
                      nestlingsafespace@gmail.com
                    </a>
                  </p>
                    nestlingsafespace@gmail.com
                  </a>
                </p>
              </div>
            )}

            {/* Refund Policy */}
            {activeTab === "refund" && (
              <div className="legal-panel active">
                <h2>Refund Policy</h2>
                <p>
                  At Nestling Space, we are committed to providing a safe, supportive,
                  and professional experience for all clients. This Refund Policy outlines
                  how payments, cancellations, and refunds are handled.
                </p>

                <h3>1. Session Payments</h3>
                <p>
                  All counselling sessions must be paid for in advance to secure your
                  booking. Payments confirm your appointment time and therapist
                  availability.
                </p>

                <h3>2. Cancellation &amp; Rescheduling</h3>
                <p>
                  Cancellations or rescheduling requests must be made at least 24 hours
                  before your scheduled session. If you cancel within this timeframe, you
                  may reschedule your session at no additional cost, or request a full
                  refund.
                </p>

                <h3>3. Late Cancellations &amp; No-Shows</h3>
                <p>
                  Cancellations made less than 24 hours before the session are
                  non-refundable. If you do not attend your session without prior notice,
                  the session is considered a no-show and is non-refundable and cannot be
                  rescheduled.
                </p>

                <h3>4. Refund Processing</h3>
                <p>
                  Approved refunds will be processed within 5-10 business days. Refunds
                  will be issued using the original payment method where possible. Please
                  note that any applicable transaction or processing fees may be deducted.
                </p>

                <p style={{ fontStyle: "italic", marginTop: "24px" }}>
                  Our goal is to create a safe and respectful space for both clients and
                  practitioners. This policy helps us honour your time while also
                  respecting the commitment required to provide quality care.
                </p>
              </div>
            )}

            {/* Terms */}
            {activeTab === "terms" && (
              <div className="legal-panel active">
                <h2>Terms &amp; Conditions</h2>
                <p>
                  Welcome to Nestling Space. By accessing our website or booking our
                  services, you agree to the following Terms and Conditions.
                </p>

                <h3>1. Services Provided</h3>
                <p>
                  Nestling Space offers counselling, emotional wellness support, and
                  personal development services. These services are intended to support
                  mental and emotional well-being but do not replace medical or
                  psychiatric care.
                </p>

                <h3>2. Eligibility &amp; Bookings</h3>
                <p>
                  Clients must be 18 years or older to book sessions independently.
                  Individuals under 18 must have parental or guardian consent. All
                  sessions must be booked in advance.
                </p>

                <h3>3. Payments &amp; Cancellations</h3>
                <p>
                  All services must be paid for in advance unless otherwise agreed.
                  Cancellations must be made at least 24 hours in advance. Late
                  cancellations and missed appointments may not be refunded (refer to
                  Refund Policy).
                </p>

                <h3>4. Not a Crisis Service</h3>
                <p>
                  Nestling Space does not provide emergency or crisis services. If you
                  are in immediate danger or experiencing a crisis, please contact local
                  emergency services or a hospital.
                </p>

                <p style={{ fontStyle: "italic", marginTop: "24px" }}>
                  At Nestling Space, we are committed to creating a safe, respectful,
                  and supportive environment where healing and growth can take place.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

    </>
  );
}
