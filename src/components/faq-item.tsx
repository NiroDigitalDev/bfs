"use client";

import { useState } from "react";

type Props = {
  index: string;
  question: string;
  children: React.ReactNode;
};

export function FaqItem({ index, question, children }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button
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
          <span />
          <span />
        </span>
      </button>
      <div id={panelId} className="faq-panel" role="region" aria-hidden={!open}>
        <div className="faq-inner">{children}</div>
      </div>
    </div>
  );
}
