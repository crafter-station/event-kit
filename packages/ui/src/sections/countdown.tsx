"use client";

import { useState, useEffect } from "react";

export interface CountdownSectionProps {
  targetDate: Date | string;
  labels?: { days?: string; hours?: string; minutes?: string; seconds?: string };
  className?: string;
}

export function CountdownSection({ targetDate, labels, className }: CountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate;
    const update = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className={className} data-section="countdown">
      <div>
        <div><span>{timeLeft.days}</span><span>{labels?.days ?? "Days"}</span></div>
        <div><span>{timeLeft.hours}</span><span>{labels?.hours ?? "Hours"}</span></div>
        <div><span>{timeLeft.minutes}</span><span>{labels?.minutes ?? "Minutes"}</span></div>
        <div><span>{timeLeft.seconds}</span><span>{labels?.seconds ?? "Seconds"}</span></div>
      </div>
    </section>
  );
}
