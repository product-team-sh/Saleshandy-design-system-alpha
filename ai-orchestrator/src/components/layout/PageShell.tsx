'use client';

import { GlobalHeader } from './GlobalHeader';

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <GlobalHeader />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
