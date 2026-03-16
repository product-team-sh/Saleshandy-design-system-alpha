import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/layout/Providers';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-serif',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Outbound Octopus',
  description: 'AI-powered multi-channel outbound orchestration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmSerifDisplay.variable} ${jetbrainsMono.variable} font-sans text-base text-sand-700 bg-sand-50 antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
