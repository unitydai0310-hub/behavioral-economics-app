'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function FeedbackPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    setStatus('loading');
    setErrorMessage('');
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || '送信に失敗しました');
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Feedback error:', error);
      setErrorMessage(error.message);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] mb-2">
          <MessageSquare size={32} />
        </div>
        <h1 className="text-3xl font-bold font-serif tracking-tight text-[var(--foreground)] sm:text-4xl">
          フィードバック
        </h1>
        <p className="text-[var(--muted-foreground)]">
          アプリへのご意見・ご感想をお聞かせください。製作者に直接届きます。
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/50 backdrop-blur-md p-6 sm:p-8 shadow-xl"
      >
        {status === 'success' ? (
          <div className="text-center py-12 space-y-6">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-green-500/10 text-green-500">
              <CheckCircle2 size={48} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">送信完了</h2>
              <p className="text-[var(--muted-foreground)]">貴重なご意見をありがとうございます。</p>
            </div>
            <Link 
              href="/"
              className="inline-block rounded-full bg-[var(--primary)] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--accent)]"
            >
              トップへ戻る
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--muted-foreground)]">お名前 (任意)</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="例：銀座 太郎"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--secondary)]/30 px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--muted-foreground)]">メールアドレス (任意)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@mail.com"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--secondary)]/30 px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--muted-foreground)]">メッセージ</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="アプリの感想や改善案などをご記入ください"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--secondary)]/30 px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all resize-none"
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-4 rounded-xl text-sm leading-relaxed">
                <AlertCircle size={18} className="shrink-0" />
                <span>{errorMessage || '送信中にエラーが発生しました。時間をおいて再度お試しください。'}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] py-4 text-sm font-bold text-white transition-all hover:bg-[var(--accent)] disabled:opacity-50"
            >
              {status === 'loading' ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>メッセージを送信する</span>
                  <Send size={18} />
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
