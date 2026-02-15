import React from 'react';
import type { Bias } from '../data/biases';

interface BiasCardProps {
  bias: Bias;
  onClick?: () => void;
}

export const BiasCard: React.FC<BiasCardProps> = ({ bias, onClick }) => {
  return (
    <div 
      className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--secondary)]/50 p-6 backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:border-[var(--primary)] cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative z-10">
        <div className="mb-2 flex items-baseline justify-between">
          <h3 className="text-xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
            {bias.name_jp}
          </h3>
          <span className="text-xs font-serif uppercase tracking-wider text-[var(--muted)] opacity-60">
            {bias.name_en}
          </span>
        </div>
        
        <p className="mb-4 text-sm leading-relaxed text-[var(--foreground)]/80 line-clamp-3">
          {bias.description}
        </p>
        
        <div className="flex items-center text-xs font-medium text-[var(--primary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          詳細を見る
          <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
