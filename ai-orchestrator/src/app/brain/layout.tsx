import { PageShell } from '@/components/layout/PageShell';

export default function BrainLayout({ children }: { children: React.ReactNode }) {
  return <PageShell>{children}</PageShell>;
}
