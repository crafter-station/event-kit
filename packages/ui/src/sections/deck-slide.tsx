import type { ReactNode } from "react";

export interface DeckSlideProps {
  variant: "cover" | "opportunity" | "audience" | "tiers" | "benefits" | "past-sponsors" | "contact";
  children: ReactNode;
  className?: string;
}

export function DeckSlide({ variant, children, className }: DeckSlideProps) {
  return (
    <div className={className} data-slide={variant} style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}>
      {children}
    </div>
  );
}
