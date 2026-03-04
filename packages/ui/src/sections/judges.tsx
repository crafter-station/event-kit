export interface JudgeDisplay {
  name: string;
  slug: string;
  title?: string;
  company?: string;
  photoUrl?: string;
  expertise?: string[];
}

export interface JudgesSectionProps {
  judges: JudgeDisplay[];
  className?: string;
}

export function JudgesSection({ judges, className }: JudgesSectionProps) {
  return (
    <section className={className} data-section="judges">
      <div>
        {judges.map((judge) => (
          <div key={judge.slug}>
            {judge.photoUrl && <img src={judge.photoUrl} alt={judge.name} />}
            <h3>{judge.name}</h3>
            {judge.title && <p>{judge.title}{judge.company ? ` @ ${judge.company}` : ""}</p>}
            {judge.expertise && judge.expertise.length > 0 && (
              <div>
                {judge.expertise.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
