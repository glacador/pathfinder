import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PathFinder - Discover Your Career Path',
  description:
    'Discover your unique cognitive profile and find your ideal career path through our research-backed aptitude assessment.',
  keywords: [
    'career assessment',
    'aptitude test',
    'career guidance',
    'cognitive profile',
    'career matching',
  ],
  openGraph: {
    title: 'PathFinder - Discover Your Career Path',
    description:
      'Take our 12-aptitude assessment and discover 150+ career matches personalized to your cognitive strengths.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--bg-secondary)] text-[var(--label-primary)] antialiased">
        {children}
      </body>
    </html>
  );
}
