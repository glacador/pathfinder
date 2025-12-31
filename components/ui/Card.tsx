'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'glass-thin' | 'glass-thick';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
  delay?: number;
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  animate = true,
  delay = 0,
}: CardProps) {
  const variants = {
    default: 'bg-[var(--bg-primary)] shadow-sm',
    glass: 'glass',
    'glass-thin': 'glass-thin',
    'glass-thick': 'glass-thick',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const content = (
    <div
      className={`rounded-[var(--radius-glass)] ${variants[variant]} ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
    >
      {content}
    </motion.div>
  );
}
