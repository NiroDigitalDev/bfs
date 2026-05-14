"use client";

import { usePathname } from "next/navigation";

export function SiteFooterMount({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/checkout") return null;
  return <>{children}</>;
}
