"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/events", label: "Events" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <>
      <nav id="navbar">
        <Link href="/" className="nav-logo">
          <Image
            src="/Images/new/logo.png"
            alt="Nestling Space"
            width={28}
            height={28}
            priority
            style={{ height: "28px", width: "auto", objectFit: "contain" }}
          />
          <span>Nestling Space</span>
        </Link>

        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? "active" : ""}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/book" className="nav-cta">
              Book a Session
            </Link>
          </li>
        </ul>

        <button
          className={`hamburger${open ? " open" : ""}`}
          id="hamburger"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`mobile-menu${open ? " open" : ""}`} id="mobile-menu">
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link
          href="/book"
          className="nav-cta-mobile"
          onClick={() => setOpen(false)}
        >
          Book a Session
        </Link>
      </div>
    </>
  );
}
