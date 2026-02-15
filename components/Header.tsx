import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold font-serif tracking-tight text-[var(--foreground)]">
              行動経済学ガイド
            </span>
            <span className="hidden sm:inline-block text-xs text-[var(--primary)] font-semibold uppercase tracking-widest border-l border-[var(--border)] pl-2 ml-2">
              Behavioral Economics
            </span>
          </Link>
        </div>
        
        <nav className="flex items-center gap-6">
          <Link 
            href="/" 
            className="text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--primary)]"
          >
            カタログ
          </Link>
          <Link 
            href="/chat" 
            className="hidden sm:flex items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent)]"
          >
            <span>行動経済AI相談</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
