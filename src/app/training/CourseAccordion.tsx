"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type AccordionItem = {
  number?: string;
  title?: string;
  question?: string;
  topics?: readonly string[];
  answer?: string;
};

export function CourseAccordion({ items, kind = "modules" }: { items: readonly AccordionItem[]; kind?: "modules" | "faq" }) {
  const [open, setOpen] = useState<number | null>(kind === "modules" ? 0 : null);

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const expanded = open === index;
        const label = item.title ?? item.question ?? `Item ${index + 1}`;
        const buttonId = `${kind}-button-${index}`;
        const panelId = `${kind}-panel-${index}`;
        return (
          <div className="accordion-item" key={label}>
            <button
              className="accordion-button"
              id={buttonId}
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpen(expanded ? null : index)}
            >
              <span className="module-title">
                {item.number && <span aria-hidden="true">{item.number}</span>}
                {label}
              </span>
              <ChevronDown size={20} aria-hidden="true" style={{ transform: expanded ? "rotate(180deg)" : undefined, transition: "transform .2s" }} />
            </button>
            {expanded && (
              <div className="accordion-content" id={panelId} role="region" aria-labelledby={buttonId}>
                {item.topics ? <ul>{item.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul> : <p>{item.answer}</p>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
