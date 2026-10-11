import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

type LegacyPageShellProps = {
  children: ReactNode;
};

export function LegacyPageShell({ children }: LegacyPageShellProps) {
  return (
    <div className="legacy-shell">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
