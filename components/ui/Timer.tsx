'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimerProps {
  duration: number; // in seconds
  onComplete?: () => void;
  autoStart?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export default function Timer({
  duration,
  onComplete,
  autoStart = true,
  size = 'md',
  showIcon = true,
  className = '',
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);

  const percentage = (timeLeft / duration) * 100;
  const isLow = percentage <= 25;
  const isCritical = percentage <= 10;

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <motion.div
      className={`inline-flex items-center gap-2 font-mono font-semibold ${sizes[size]} ${className}`}
      animate={
        isCritical
          ? { scale: [1, 1.05, 1] }
          : undefined
      }
      transition={
        isCritical
          ? { repeat: Infinity, duration: 0.5 }
          : undefined
      }
    >
      {showIcon && (
        <Clock
          className={`${iconSizes[size]} ${
            isCritical
              ? 'text-[var(--color-error)]'
              : isLow
              ? 'text-[var(--color-warning)]'
              : 'text-[var(--label-secondary)]'
          }`}
        />
      )}
      <AnimatePresence mode="wait">
        <motion.span
          key={timeLeft}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.15 }}
          className={
            isCritical
              ? 'text-[var(--color-error)]'
              : isLow
              ? 'text-[var(--color-warning)]'
              : ''
          }
        >
          {formatTime(timeLeft)}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}
