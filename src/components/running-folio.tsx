"use client";

import { CHAPTERS } from "@/data/chapters";
import { useActiveChapter } from "@/lib/use-active-chapter";

export function RunningFolio() {
  const activeId = useActiveChapter();
  const active = CHAPTERS.find((c) => c.id === activeId) ?? CHAPTERS[0];

  return (
    <aside className="folio" aria-hidden data-active={active.id}>
      <span className="folio-edge folio-edge-left">
        <span className="folio-mark">§</span>
        <span className="folio-slot" key={`L-${active.id}`}>
          <em className="folio-numeral">{active.numeral}</em>
          <span className="folio-sep" aria-hidden>
            ·
          </span>
          <span className="folio-label">{active.label}</span>
        </span>
      </span>
      <span className="folio-edge folio-edge-right">
        <span className="folio-slot" key={`R-${active.id}`}>
          <span className="folio-page">p.</span>
          <em className="folio-folio">{active.folio}</em>
        </span>
        <span className="folio-sep" aria-hidden>
          ·
        </span>
        <span className="folio-edition">MMXXVI</span>
      </span>
    </aside>
  );
}
