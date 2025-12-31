'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Download, Sparkles, X } from 'lucide-react';
import { PricingTier } from '@/types/pricing';
import { AptitudeId } from '@/types/aptitudes';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface UserData {
  name: string;
  scores: Record<AptitudeId, number>;
  topCareers: Array<{ title: string; matchScore: number }>;
  strengths: string[];
  weaknesses: string[];
}

interface CoachingSessionProps {
  userData: UserData;
  tier: PricingTier;
  onClose: () => void;
}

export default function CoachingSession({
  userData,
  tier,
  onClose,
}: CoachingSessionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const maxSessions = tier === 'executive' ? 3 : 1;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startSession = async () => {
    setSessionStarted(true);
    setIsLoading(true);

    try {
      const response = await fetch('/api/coaching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userData, messages: [], tier }),
      });

      const data = await response.json();
      setMessages([
        {
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Failed to start session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: userMessage,
        timestamp: new Date(),
      },
    ]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/coaching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userData,
          messages: [...messages, { role: 'user', content: userMessage }],
          tier,
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportTranscript = () => {
    const transcript = messages
      .map((m) => `[${m.role.toUpperCase()}] ${m.content}`)
      .join('\n\n---\n\n');

    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coaching-session-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!sessionStarted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-8 rounded-[28px] text-center max-w-md w-full relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-[var(--fill-tertiary)] rounded-full"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-indigo)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">AI Career Coaching</h2>
          <p className="text-[var(--label-secondary)] mb-6">
            Your personal career coach has analyzed your complete aptitude
            profile and is ready to help you find your ideal path.
          </p>

          {tier === 'executive' && (
            <p className="text-sm text-[var(--color-success)] mb-4">
              ✓ Executive tier: {maxSessions} coaching sessions included
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={startSession}
            className="w-full py-4 bg-[var(--color-primary)] text-white rounded-xl font-semibold"
          >
            Start Coaching Session
          </motion.button>
          <p className="text-xs text-[var(--label-tertiary)] mt-4">
            Unlimited messages • Save transcript anytime
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col h-[80vh] max-h-[700px] w-full max-w-2xl bg-[var(--bg-primary)] rounded-[28px] overflow-hidden"
      >
        {/* Header */}
        <div className="glass p-4 flex items-center justify-between border-b border-[var(--fill-tertiary)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-indigo)] rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold">Career Coach</p>
              <p className="text-xs text-[var(--label-secondary)]">
                AI-Powered • Personalized to your profile
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportTranscript}
              className="p-2 hover:bg-[var(--fill-tertiary)] rounded-lg transition"
              title="Download transcript"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[var(--fill-tertiary)] rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--bg-secondary)]">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-[var(--color-primary)] text-white rounded-br-md'
                    : 'glass rounded-bl-md'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <p
                  className={`text-xs mt-2 ${
                    msg.role === 'user'
                      ? 'text-white/60'
                      : 'text-[var(--label-tertiary)]'
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="glass p-4 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-[var(--label-tertiary)] rounded-full animate-bounce" />
                  <span
                    className="w-2 h-2 bg-[var(--label-tertiary)] rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <span
                    className="w-2 h-2 bg-[var(--label-tertiary)] rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[var(--fill-tertiary)]">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === 'Enter' && !e.shiftKey && sendMessage()
              }
              placeholder="Ask your career coach anything..."
              className="flex-1 bg-[var(--fill-tertiary)] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="p-3 bg-[var(--color-primary)] text-white rounded-xl disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
