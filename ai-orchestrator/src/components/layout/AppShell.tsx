'use client';

import { GlobalHeader } from './GlobalHeader';
import { Sidebar } from './Sidebar';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <GlobalHeader />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
