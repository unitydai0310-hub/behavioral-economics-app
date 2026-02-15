'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { allBiases } from '../data/biases';
import { BiasCard } from '../components/BiasCard';
import { motion } from 'framer-motion';
import { Info, Search } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredBiases = allBiases.filter(bias => 
    bias.name_jp.toLowerCase().includes(searchQuery.toLowerCase()) || 
    bias.name_en.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <section className="text-center space-y-6 py-12 md:py-20 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 text-[var(--primary)] text-sm font-medium mb-4"
        >
          <Info size={16} />
          <span>行動経済学ガイド</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold tracking-tight sm:text-6xl font-serif bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)] bg-clip-text text-transparent leading-tight"
        >
          行動経済学の知見を<br />ビジネスと人生に
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg text-[var(--muted-foreground)]"
        >
          人間の非合理的な意思決定プロセスを理解し、より良い選択へと導くためのナレッジベース。
          最新の行動経済学の知見をここに集約。
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="relative max-w-md mx-auto mt-8"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={18} />
          <input 
            type="text"
            placeholder="バイアスを検索（例: アンカリング）"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-[var(--border)] bg-[var(--secondary)]/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
          />
        </motion.div>
      </section>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-24">
        {filteredBiases.map((bias, index) => (
          <motion.div
            key={bias.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: Math.min(index * 0.05, 1) }}
          >
            <BiasCard 
              bias={bias} 
              onClick={() => router.push(`/bias/${bias.id}`)}
            />
          </motion.div>
        ))}
      </div>
      
      {filteredBiases.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[var(--muted-foreground)]">該当するバイアスが見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
}
