import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '../components/Header';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: '銀座行動経済大学校 - Behavioral Economics',
  description: 'Behavioral Economics Biases and Consulting',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${playfair.variable} ${inter.variable} antialiased`}>
      <body suppressHydrationWarning className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-white">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="border-t border-[var(--border)] py-6 text-center text-sm text-[var(--muted-foreground)]">
          &copy; {new Date().getFullYear()} 銀座行動経済大学校
        </footer>
      </body>
    </html>
  );
}
