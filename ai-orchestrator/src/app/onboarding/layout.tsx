import Link from 'next/link';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="h-14 sticky top-0 z-sticky bg-ocean-900 border-b border-ocean-800 shadow-header flex items-center justify-between px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary-700 flex items-center justify-center">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <span className="text-base font-semibold text-white">Outbound Octopus</span>
        </Link>
        <span className="text-base font-medium text-ocean-300">Setup</span>
        <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-medium text-sm flex items-center justify-center">
          MK
        </div>
      </header>
      <main className="flex-1 overflow-y-auto bg-sand-50">{children}</main>
    </div>
  );
}
