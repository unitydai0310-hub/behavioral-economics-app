import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '../components/Header';
import Link from 'next/link';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: '行動経済学ガイド - Behavioral Economics',
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
        <footer className="border-t border-[var(--border)] py-8 px-4">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--muted-foreground)]">
            <div className="flex items-center gap-6">
              <Link href="/" className="hover:text-[var(--primary)] transition-colors">ホーム</Link>
              <Link href="/feedback" className="hover:text-[var(--primary)] transition-colors">フィードバック</Link>
            </div>
            <div>
              &copy; {new Date().getFullYear()} 行動経済学ガイド
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
