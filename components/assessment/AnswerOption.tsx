'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface AnswerOptionProps {
  id: string;
  text: string;
  isSelected: boolean;
  isCorrect?: boolean;
  showResult?: boolean;
  onSelect: (id: string) => void;
  disabled?: boolean;
  index: number;
}

export default function AnswerOption({
  id,
  text,
  isSelected,
  isCorrect,
  showResult = false,
  onSelect,
  disabled = false,
  index,
}: AnswerOptionProps) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  const getStyles = () => {
    if (showResult) {
      if (isCorrect) {
        return 'bg-[var(--color-success)]/10 border-[var(--color-success)] text-[var(--color-success)]';
      }
      if (isSelected && !isCorrect) {
        return 'bg-[var(--color-error)]/10 border-[var(--color-error)] text-[var(--color-error)]';
      }
    }
    if (isSelected) {
      return 'bg-[var(--color-primary)]/10 border-[var(--color-primary)] text-[var(--color-primary)]';
    }
    return 'bg-[var(--bg-primary)] border-[var(--fill-tertiary)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--fill-quaternary)]';
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => onSelect(id)}
      disabled={disabled || showResult}
      className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${getStyles()} ${
        disabled || showResult ? 'cursor-default' : 'cursor-pointer'
      }`}
    >
      <span
        className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm ${
          isSelected
            ? 'bg-[var(--color-primary)] text-white'
            : 'bg-[var(--fill-tertiary)]'
        }`}
      >
        {showResult && isSelected ? (
          isCorrect ? (
            <Check className="w-4 h-4" />
          ) : (
            '✕'
          )
        ) : (
          letters[index]
        )}
      </span>
      <span className="flex-1 font-medium">{text}</span>
      {showResult && isCorrect && !isSelected && (
        <span className="text-sm text-[var(--color-success)]">Correct</span>
      )}
    </motion.button>
  );
}
