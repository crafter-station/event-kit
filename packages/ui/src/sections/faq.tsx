"use client";

import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  items: FAQItem[];
  contactUrl?: string;
  contactLabel?: string;
  className?: string;
}

export function FAQSection({ items, contactUrl, contactLabel, className }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={className} data-section="faq">
      <div>
        {items.map((item, index) => (
          <div key={item.question}>
            <button type="button" onClick={() => setOpenIndex(openIndex === index ? null : index)} aria-expanded={openIndex === index}>
              {item.question}
            </button>
            {openIndex === index && <div>{item.answer}</div>}
          </div>
        ))}
      </div>
      {contactUrl && <a href={contactUrl}>{contactLabel ?? "Contact us"}</a>}
    </section>
  );
}
