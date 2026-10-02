import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import ScrollParallax from "./ScrollParallax";
import SiteHeader from "./SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Poo Crew | Pet Waste Removal",
  description:
    "Professional pet waste removal with reliable yard cleanups, simple scheduling, and easy payment options.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ScrollParallax />
        <a className="skipLink" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <footer className="footer">
          <p>The Poo Crew</p>
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
