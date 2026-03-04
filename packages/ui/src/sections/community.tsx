export interface CommunitySectionProps {
  whatsappUrl?: string;
  discordUrl?: string;
  headline?: string;
  description?: string;
  className?: string;
}

export function CommunitySection({ whatsappUrl, discordUrl, headline, description, className }: CommunitySectionProps) {
  return (
    <section className={className} data-section="community">
      {headline && <h2>{headline}</h2>}
      {description && <p>{description}</p>}
      <div>
        {whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Join WhatsApp</a>}
        {discordUrl && <a href={discordUrl} target="_blank" rel="noopener noreferrer">Join Discord</a>}
      </div>
    </section>
  );
}
