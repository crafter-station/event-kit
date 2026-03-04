export interface SessionDisplay {
  id: string;
  title: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  type: "talk" | "workshop" | "panel" | "break" | "networking";
  speakerName?: string;
  isLive?: boolean;
}

export interface ScheduleSectionProps {
  sessions: SessionDisplay[];
  className?: string;
}

export function ScheduleSection({ sessions, className }: ScheduleSectionProps) {
  return (
    <section className={className} data-section="schedule">
      <div>
        {sessions.map((session) => (
          <div key={session.id} data-type={session.type}>
            <div>
              {session.startTime && <time>{session.startTime}</time>}
              {session.endTime && <span> - </span>}
              {session.endTime && <time>{session.endTime}</time>}
            </div>
            <div>
              <h3>{session.title}</h3>
              {session.speakerName && <p>{session.speakerName}</p>}
              {session.description && <p>{session.description}</p>}
              {session.location && <p>{session.location}</p>}
              {session.isLive && <span>LIVE</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
