import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/providers/QueryClientProvider';
import { ThemeProvider } from 'next-themes';
import { Header } from '@/components/Header';
import AuthInitializer from './(auth)/_components/AuthInitializer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Link Shot .ᐟ',
  description: '__Link Shot Project__.ᐟ',
  icons: {
    icon: '/assets/svg/globe.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-balck dark:bg-black dark:text-white`}
      >
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthInitializer />
            <Header />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
