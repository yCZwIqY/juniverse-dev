import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import QueryProvider from '@/provider/QueryProvider';

const pretendard = localFont({
  src: '../public/fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Juniverse Dev',
  description: 'Blog & Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.className}`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
