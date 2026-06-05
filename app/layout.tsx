import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import ScrollParallax from "./ScrollParallax";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Poo Patrol | Pet Waste Removal",
  description:
    "Professional pet waste removal with reliable yard cleanups, simple scheduling, and easy payment options.",
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Payment", href: "/payment" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ScrollParallax />
        <header className="siteHeader">
          <Link className="brand" href="/" aria-label="The Poo Patrol home">
            <img
              className="brandLogo"
              src="/poo-patrol-logo-cropped.png"
              alt=""
              aria-hidden="true"
            />
            <span>The Poo Patrol</span>
          </Link>
          <nav className="navLinks" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <a className="phonePill" href="tel:3308159903">
              330-815-9903
            </a>
          </nav>
        </header>
        {children}
        <footer className="footer">
          <p>The Poo Patrol</p>
          <p>The Poo Crew serving Canton, Jackson, Canal Fulton, Manchester, and Akron</p>
          <p>
            <a href="tel:3308159903">330-815-9903</a>
          </p>
          <p>
            <a href="mailto:micahabel723@gmail.com">
              micahabel723@gmail.com
            </a>
          </p>
          <p>
            <Link href="/contact-us">Book a cleanup</Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
