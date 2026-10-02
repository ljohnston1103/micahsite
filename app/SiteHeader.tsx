"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Payment", href: "/payment" },
  { label: "Poo Pickup Game", href: "/poo-pickup-game" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 861px)");
    const closeOnResize = () => { if (desktop.matches) setOpen(false); };
    const closeOutside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    desktop.addEventListener("change", closeOnResize);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      desktop.removeEventListener("change", closeOnResize);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, []);

  return (
    <header
      className={`siteHeader${open ? " menuOpen" : ""}`}
      ref={header}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link className="brand" href="/" aria-label="The Poo Crew home" onClick={() => setOpen(false)}>
        <img className="brandLogo" src="/poo-crew-logo-cropped.png" alt="" aria-hidden="true" width="76" height="40" />
        <span>The Poo Crew</span>
      </Link>
      <button className="menuToggle" type="button" ref={toggle} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>
      <nav className="navLinks" id="main-navigation" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <a className="phonePill" href="tel:3308159903" onClick={() => setOpen(false)}>330-815-9903</a>
      </nav>
    </header>
  );
}
