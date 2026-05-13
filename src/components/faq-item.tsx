"use client";

import { useState } from "react";

type Props = {
  index: string;
  question: string;
  children: React.ReactNode;
};

export function FaqItem({ index, question, children }: Props) {
  const [open, setOpen] = useState(false);
  const itemId = `faq-${index}`;
  const panelId = `faq-panel-${index}`;
  const triggerId = `faq-trigger-${index}`;
  return (
    <div id={itemId} className={`faq-item ${open ? "open" : ""}`}>
      <button
        id={triggerId}
        type="button"
        className="faq-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        data-cursor="link"
      >
        <span className="faq-index">{index}</span>
        <span className="faq-q">{question}</span>
        <span className="faq-toggle" aria-hidden>
          <span className="faq-toggle-glyph">§</span>
        </span>
      </button>
      <div
        id={panelId}
        className="faq-panel"
        role="region"
        aria-labelledby={triggerId}
      >
        <div className="faq-inner">
          <span className="faq-marginalia" aria-hidden>
            Reply.
          </span>
          <p className="faq-answer">{children}</p>
          <a
            href={`#${itemId}`}
            className="faq-permalink"
            aria-label={`Link to question ${index}`}
            data-cursor="link"
          >
            § {index}
          </a>
        </div>
      </div>
    </div>
  );
}
