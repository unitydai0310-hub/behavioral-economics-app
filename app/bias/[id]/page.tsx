'use client';

import React from 'react';
import { allBiases } from '../../../data/biases';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Lightbulb, Briefcase, CheckCircle2, Info, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParams, notFound } from 'next/navigation';

export default function BiasDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const bias = allBiases.find((b) => b.id === id);

  if (!bias) {
    return notFound();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-12 py-8 md:py-16">
      {/* Navigation Header */}
      <div className="flex justify-between items-center border-b border-[var(--border)] pb-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-all group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          カタログに戻る
        </Link>
        <Link 
          href="/chat" 
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--accent)] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
        >
          <MessageSquare size={16} />
          AIに相談する
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left Column: Title and Content */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-widest border border-[var(--primary)]/20">
                {bias.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[var(--foreground)] leading-tight">
              {bias.name_jp}
            </h1>
            <p className="text-xl md:text-2xl font-serif text-[var(--muted-foreground)] font-light tracking-wide italic">
              {bias.name_en}
            </p>
          </motion.div>

          {/* Main Description */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert max-w-none"
          >
            <div className="bg-[var(--secondary)]/30 border border-[var(--border)] rounded-2xl p-8 backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[var(--primary)]">
                    <Info size={24} />
                    概要
                </h2>
                <p className="text-lg leading-relaxed text-[var(--foreground)]/90">
                    {bias.description}
                </p>
            </div>
          </motion.section>

          {/* Business Cases */}
          {bias.business_cases && bias.business_cases.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-serif font-bold flex items-center gap-2 text-[var(--foreground)]">
                <Briefcase className="text-[var(--primary)]" />
                ビジネスでの事例
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {bias.business_cases.map((bc, i) => (
                  <div key={i} className="bg-[var(--background)] border border-[var(--border)] p-6 rounded-xl hover:border-[var(--primary)]/50 transition-colors">
                    <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">{bc.title}</h3>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{bc.description}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Usage Tips / Countermeasures */}
          {bias.usage_tips && bias.usage_tips.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-[var(--primary)]/10 to-transparent border border-[var(--primary)]/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-[var(--primary)]" />
                活用と対策のヒント
              </h2>
              <ul className="space-y-4">
                {bias.usage_tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)] flex-shrink-0" />
                    <p className="text-md text-[var(--foreground)]/90 leading-relaxed font-medium">
                      {tip}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}
        </div>

        {/* Right Column: Key Example Card */}
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-24 space-y-6"
            >
                {/* Symbolic Visual Area */}
                <div className="aspect-square rounded-3xl bg-[var(--secondary)] overflow-hidden border border-[var(--border)] flex items-center justify-center relative group shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-transparent opacity-50" />
                    <div className="relative z-10 text-[var(--primary)] opacity-20 transform scale-150 transition-transform duration-700 group-hover:scale-[1.7]">
                        <BookOpen size={200} />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                        <p className="text-[var(--primary)] font-serif text-2xl font-bold opacity-80 select-none uppercase tracking-tighter">
                            Behavioral<br />Science
                        </p>
                    </div>
                </div>

                {/* Specific Example Card */}
                <div className="bg-[var(--secondary)]/80 backdrop-blur-md border border-[var(--border)] p-8 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)]" />
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[var(--accent)]">
                        <Lightbulb size={20} />
                        具体例
                    </h2>
                    <p className="text-lg leading-relaxed text-[var(--foreground)] italic font-serif">
                        “{bias.example}”
                    </p>
                </div>

                {/* Quick Call to Action */}
                <div className="bg-[var(--primary)] text-white p-6 rounded-2xl shadow-xl space-y-4">
                    <h3 className="font-bold italic">この知見を現実に活かす。</h3>
                    <p className="text-sm opacity-90 leading-relaxed">
                        具体的な悩みやプロジェクトにこのバイアスをどう活用・回避すべきか、AIコンサルタントが提案します。
                    </p>
                    <Link href="/chat" className="block w-full py-3 bg-white text-[var(--primary)] rounded-full text-center font-bold hover:bg-opacity-90 transition-all">
                        AI相談を開始する
                    </Link>
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
