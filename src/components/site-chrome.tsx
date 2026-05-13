"use client";

import { usePathname } from "next/navigation";
import { ChapterRail } from "@/components/chapter-rail";
import { RunningFolio } from "@/components/running-folio";

export function SiteChrome() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return (
    <>
      <ChapterRail />
      <RunningFolio />
    </>
  );
}
