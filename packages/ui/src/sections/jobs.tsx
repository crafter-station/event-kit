export interface JobDisplay {
  id: string;
  title: string;
  company: string;
  description?: string;
  applyUrl?: string;
  location?: string;
  type?: "full-time" | "part-time" | "contract" | "internship";
  isFeatured?: boolean;
  sponsorLogoUrl?: string;
}

export interface JobsSectionProps {
  jobs: JobDisplay[];
  className?: string;
}

export function JobsSection({ jobs, className }: JobsSectionProps) {
  return (
    <section className={className} data-section="jobs">
      <div>
        {jobs.map((job) => (
          <div key={job.id} data-featured={job.isFeatured || undefined}>
            <div>
              {job.sponsorLogoUrl && <img src={job.sponsorLogoUrl} alt={job.company} />}
              <div>
                <h3>{job.title}</h3>
                <p>{job.company}</p>
              </div>
            </div>
            {job.description && <p>{job.description}</p>}
            <div>
              {job.type && <span>{job.type}</span>}
              {job.location && <span>{job.location}</span>}
            </div>
            {job.applyUrl && <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">Apply</a>}
          </div>
        ))}
      </div>
    </section>
  );
}
