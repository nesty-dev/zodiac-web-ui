import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zodiac Back Office',
  description: 'Admin panel for configuring zodiac themes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
