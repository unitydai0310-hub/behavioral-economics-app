'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Loader2, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'こんにちは。行動経済AIコンサルタントです。ビジネスの課題や日常の疑問について、行動経済学の視点からアドバイスを差し上げます。どのようなことでもお気軽にご相談ください。' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })) }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.error || `HTTP error ${response.status}`);
        }

        if (!response.body) throw new Error('No response body');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantContent = '';
        const assistantId = (Date.now() + 1).toString();

        setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value, { stream: true });
            assistantContent += chunk;
            
            setMessages(prev => {
                const newMessages = [...prev];
                const lastIdx = newMessages.findLastIndex(m => m.id === assistantId);
                if (lastIdx !== -1) {
                    newMessages[lastIdx] = { ...newMessages[lastIdx], content: assistantContent };
                }
                return [...newMessages];
            });
        }
    } catch (err: any) {
        console.error('Chat error:', err);
        setError(err.name === 'AbortError' ? 'タイムアウトしました。' : (err.message || '通信エラー。'));
    } finally {
        setIsLoading(false);
        clearTimeout(timeoutId);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col rounded-2xl border border-[var(--border)] bg-[var(--background)]/50 backdrop-blur-sm overflow-hidden shadow-2xl">
      <div className="border-b border-[var(--border)] p-4 bg-[var(--background)]/80 backdrop-blur-md sticky top-0 z-10">
        <h2 className="text-lg font-semibold flex items-center gap-2">
            <Bot className="h-5 w-5 text-[var(--primary)]" />
            行動経済AIコンサルタント
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex max-w-[85%] items-start gap-3 rounded-2xl p-4 shadow-md ${
                  message.role === 'user'
                    ? 'bg-[var(--primary)] text-white rounded-br-none font-medium'
                    : 'bg-[var(--secondary)] text-white rounded-bl-none border border-[var(--border)]'
                }`}
              >
                <div className={`mt-1 flex-shrink-0 rounded-full p-1.5 ${message.role === 'user' ? 'bg-white/20' : 'bg-[var(--primary)]/10'}`}>
                    {message.role === 'user' ? <User size={16} /> : <Bot size={16} className="text-[var(--primary)]" />}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm leading-relaxed whitespace-pre-wrap break-words text-white">
                      {message.content}
                      {isLoading && message.role === 'assistant' && message.content === '' && (
                        <span className="inline-flex gap-1 ml-1">
                          <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
                        </span>
                      )}
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-[var(--border)] p-4 bg-[var(--background)]/80 backdrop-blur-md">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="お悩みを入力してください..."
            className="flex-1 rounded-xl border border-[var(--border)] bg-[#1e293b] px-4 py-3 text-sm text-white focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)] text-white transition-all hover:bg-[var(--accent)] disabled:opacity-30"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </form>
      </div>
    </div>
  );
}
