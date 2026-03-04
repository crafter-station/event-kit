export interface SponsorTierDisplay {
  name: string;
  slug: string;
  color?: string;
  sponsors: {
    name: string;
    slug: string;
    logoUrl?: string;
    websiteUrl?: string;
  }[];
}

export interface SponsorsSectionProps {
  tiers: SponsorTierDisplay[];
  becomeSponsorUrl?: string;
  becomeSponsorLabel?: string;
  className?: string;
}

export function SponsorsSection({ tiers, becomeSponsorUrl, becomeSponsorLabel, className }: SponsorsSectionProps) {
  return (
    <section className={className} data-section="sponsors">
      {tiers.map((tier) => (
        <div key={tier.slug} data-tier={tier.slug}>
          <h3>{tier.name}</h3>
          <div>
            {tier.sponsors.map((sponsor) => (
              <a key={sponsor.slug} href={sponsor.websiteUrl} target="_blank" rel="noopener noreferrer">
                {sponsor.logoUrl ? <img src={sponsor.logoUrl} alt={sponsor.name} /> : <span>{sponsor.name}</span>}
              </a>
            ))}
          </div>
        </div>
      ))}
      {becomeSponsorUrl && (
        <a href={becomeSponsorUrl}>{becomeSponsorLabel ?? "Become a Sponsor"}</a>
      )}
    </section>
  );
}
