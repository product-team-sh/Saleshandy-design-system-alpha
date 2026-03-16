import { PageShell } from '@/components/layout/PageShell';

export default function ConversationsLayout({ children }: { children: React.ReactNode }) {
  return <PageShell>{children}</PageShell>;
}
