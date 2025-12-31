'use client';

import { motion } from 'framer-motion';
import { Sparkles, Users } from 'lucide-react';
import { CelebrityMatch as CelebrityMatchType } from '@/types';

interface CelebrityMatchProps {
  matches: CelebrityMatchType[];
  maxDisplay?: number;
}

export default function CelebrityMatch({
  matches,
  maxDisplay = 3,
}: CelebrityMatchProps) {
  const displayMatches = matches.slice(0, maxDisplay);

  return (
    <div className="glass p-6 rounded-[28px]">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-[var(--color-warning)]" />
        <h3 className="text-lg font-semibold">You Think Like...</h3>
      </div>

      <div className="space-y-4">
        {displayMatches.map((match, index) => (
          <motion.div
            key={match.celebrity.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 bg-[var(--fill-quaternary)] rounded-xl"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-purple)] flex items-center justify-center text-white font-bold text-lg">
              {match.celebrity.name.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-semibold">{match.celebrity.name}</h4>
              <p className="text-sm text-[var(--label-secondary)] truncate">
                {match.celebrity.title}
              </p>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-[var(--color-primary)]">
                {match.matchScore}%
              </p>
              <p className="text-xs text-[var(--label-tertiary)]">similar</p>
            </div>
          </motion.div>
        ))}
      </div>

      {matches.length > maxDisplay && (
        <div className="mt-4 text-center">
          <button className="text-sm text-[var(--color-primary)] font-medium flex items-center gap-1 mx-auto">
            <Users className="w-4 h-4" />
            See {matches.length - maxDisplay} more matches
          </button>
        </div>
      )}
    </div>
  );
}
