'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AptitudeId, APTITUDES, getAptitudeLevel } from '@/types/aptitudes';
import * as Icons from 'lucide-react';

interface ScoreRevealProps {
  scores: Record<AptitudeId, number>;
  onComplete?: () => void;
  autoPlay?: boolean;
}

export default function ScoreReveal({
  scores,
  onComplete,
  autoPlay = true,
}: ScoreRevealProps) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);

  const sortedAptitudes = [...APTITUDES].sort(
    (a, b) => (scores[b.id] || 0) - (scores[a.id] || 0)
  );

  useEffect(() => {
    if (!autoPlay) return;

    if (currentIndex < APTITUDES.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else if (currentIndex === APTITUDES.length - 1) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        onComplete?.();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, autoPlay, onComplete]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'exceptional':
        return 'var(--color-success)';
      case 'strong':
        return 'var(--color-primary)';
      case 'moderate':
        return 'var(--color-warning)';
      default:
        return 'var(--label-tertiary)';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-3">
        <AnimatePresence>
          {sortedAptitudes.map((aptitude, index) => {
            const score = scores[aptitude.id] || 0;
            const level = getAptitudeLevel(score);
            const IconComponent = (Icons as any)[aptitude.icon] || Icons.Circle;
            const isRevealed = index <= currentIndex;

            if (!isRevealed) return null;

            return (
              <motion.div
                key={aptitude.id}
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                }}
                className="glass p-4 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${aptitude.color}20` }}
                  >
                    <IconComponent
                      className="w-5 h-5"
                      style={{ color: aptitude.color }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm">
                        {aptitude.name}
                      </h3>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="text-lg font-bold"
                        style={{ color: aptitude.color }}
                      >
                        {score}
                      </motion.span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-[var(--fill-tertiary)] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ delay: 0.1, duration: 0.5 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: aptitude.color }}
                        />
                      </div>
                      <span
                        className="text-xs font-medium capitalize"
                        style={{ color: getLevelColor(level) }}
                      >
                        {level}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {!autoPlay && currentIndex < APTITUDES.length - 1 && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          className="mt-6 w-full py-3 bg-[var(--color-primary)] text-white rounded-xl font-semibold"
        >
          Reveal Next ({currentIndex + 2}/{APTITUDES.length})
        </motion.button>
      )}
    </div>
  );
}
