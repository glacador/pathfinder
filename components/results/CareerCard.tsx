'use client';

import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, GraduationCap, ChevronRight } from 'lucide-react';
import { Career } from '@/types';

interface CareerCardProps {
  career: Career;
  matchScore: number;
  rank: number;
  onClick?: () => void;
  compact?: boolean;
}

export default function CareerCard({
  career,
  matchScore,
  rank,
  onClick,
  compact = false,
}: CareerCardProps) {
  const matchColor =
    matchScore >= 85
      ? 'var(--color-success)'
      : matchScore >= 70
      ? 'var(--color-primary)'
      : 'var(--color-warning)';

  if (compact) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="w-full p-4 glass rounded-xl text-left flex items-center gap-4"
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
          style={{ backgroundColor: matchColor }}
        >
          #{rank}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{career.title}</h3>
          <p className="text-sm text-[var(--label-secondary)]">
            {career.category}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold" style={{ color: matchColor }}>
            {matchScore}%
          </p>
          <p className="text-xs text-[var(--label-tertiary)]">match</p>
        </div>
        <ChevronRight className="w-5 h-5 text-[var(--label-tertiary)]" />
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 rounded-[22px]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white"
            style={{ backgroundColor: matchColor }}
          >
            #{rank}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{career.title}</h3>
            <p className="text-sm text-[var(--label-secondary)]">
              {career.category}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold" style={{ color: matchColor }}>
            {matchScore}%
          </p>
          <p className="text-xs text-[var(--label-tertiary)]">match score</p>
        </div>
      </div>

      <p className="text-[var(--label-secondary)] mb-4">{career.description}</p>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 bg-[var(--fill-quaternary)] rounded-xl">
          <DollarSign className="w-4 h-4 text-[var(--color-success)] mb-1" />
          <p className="text-xs text-[var(--label-tertiary)]">Avg Salary</p>
          <p className="font-semibold text-sm">{career.avgSalary}</p>
        </div>
        <div className="p-3 bg-[var(--fill-quaternary)] rounded-xl">
          <TrendingUp className="w-4 h-4 text-[var(--color-primary)] mb-1" />
          <p className="text-xs text-[var(--label-tertiary)]">Growth</p>
          <p className="font-semibold text-sm">{career.growth}</p>
        </div>
        <div className="p-3 bg-[var(--fill-quaternary)] rounded-xl">
          <GraduationCap className="w-4 h-4 text-[var(--color-purple)] mb-1" />
          <p className="text-xs text-[var(--label-tertiary)]">Education</p>
          <p className="font-semibold text-sm truncate">{career.education}</p>
        </div>
      </div>

      {onClick && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClick}
          className="mt-4 w-full py-3 bg-[var(--fill-tertiary)] hover:bg-[var(--fill-secondary)] rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
        >
          Learn More
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      )}
    </motion.div>
  );
}
