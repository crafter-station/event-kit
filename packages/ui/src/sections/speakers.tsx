export interface SpeakerDisplay {
  name: string;
  slug: string;
  title?: string;
  company?: string;
  photoUrl?: string;
  talkTitle?: string;
}

export interface SpeakersSectionProps {
  speakers: SpeakerDisplay[];
  viewAllUrl?: string;
  viewAllLabel?: string;
  className?: string;
}

export function SpeakersSection({ speakers, viewAllUrl, viewAllLabel, className }: SpeakersSectionProps) {
  return (
    <section className={className} data-section="speakers">
      <div>
        {speakers.map((speaker) => (
          <div key={speaker.slug}>
            {speaker.photoUrl && <img src={speaker.photoUrl} alt={speaker.name} />}
            <h3>{speaker.name}</h3>
            {speaker.title && <p>{speaker.title}{speaker.company ? ` @ ${speaker.company}` : ""}</p>}
            {speaker.talkTitle && <p>{speaker.talkTitle}</p>}
          </div>
        ))}
      </div>
      {viewAllUrl && <a href={viewAllUrl}>{viewAllLabel ?? "View All Speakers"}</a>}
    </section>
  );
}
