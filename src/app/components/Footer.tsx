import Link from "next/link";
import { FaInstagram, FaWhatsapp, FaEnvelope, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-brand-name">Nestling Space</div>
          <p className="footer-brand-tagline">
            A safe sanctuary for your mind, heart, and healing journey.
            You are always welcome here.
          </p>
          <div className="footer-social">
            <a
              href="https://www.instagram.com/nestlingspace"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/263773214886"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="mailto:nestlingsafespace@gmail.com"
              className="social-btn"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61580743690158"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Navigate</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/contact">Feedback</Link></li>
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/book">Book a Session</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><Link href="/legal">Privacy Policy</Link></li>
            <li><Link href="/legal">Refund Policy</Link></li>
            <li><Link href="/legal">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 The Nestling Space. All rights reserved.</p>
        <p>Dr. M. Mugabe &amp; Team · Harare, Zimbabwe</p>
      </div>
    </footer>
  );
}
