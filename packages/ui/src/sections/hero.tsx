import type { ReactNode } from "react";

export interface HeroSectionProps {
  eventName: string;
  tagline?: string;
  date?: string;
  location?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  logo?: string;
  children?: ReactNode;
  className?: string;
}

export function HeroSection({ eventName, tagline, date, location, ctaPrimary, ctaSecondary, logo, children, className }: HeroSectionProps) {
  return (
    <section className={className} data-section="hero">
      {logo && <img src={logo} alt={eventName} />}
      <h1>{eventName}</h1>
      {tagline && <p>{tagline}</p>}
      {date && <p>{date}</p>}
      {location && <p>{location}</p>}
      <div>
        {ctaPrimary && <a href={ctaPrimary.href}>{ctaPrimary.label}</a>}
        {ctaSecondary && <a href={ctaSecondary.href}>{ctaSecondary.label}</a>}
      </div>
      {children}
    </section>
  );
}
