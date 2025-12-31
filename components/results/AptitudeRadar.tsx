'use client';

import { useMemo } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { motion } from 'framer-motion';
import { AptitudeId, APTITUDES } from '@/types/aptitudes';

interface AptitudeRadarProps {
  scores: Record<AptitudeId, number>;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  animated?: boolean;
}

export default function AptitudeRadar({
  scores,
  size = 'md',
  showLabels = true,
  animated = true,
}: AptitudeRadarProps) {
  const data = useMemo(() => {
    return APTITUDES.map((apt) => ({
      subject: apt.shortName,
      score: scores[apt.id] || 0,
      fullMark: 100,
      color: apt.color,
    }));
  }, [scores]);

  const sizes = {
    sm: 250,
    md: 350,
    lg: 450,
  };

  const chartSize = sizes[size];

  return (
    <motion.div
      initial={animated ? { opacity: 0, scale: 0.9 } : undefined}
      animate={animated ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full flex justify-center"
    >
      <ResponsiveContainer width="100%" height={chartSize}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="80%">
          <PolarGrid
            stroke="var(--fill-secondary)"
            strokeDasharray="3 3"
          />
          {showLabels && (
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: 'var(--label-secondary)',
                fontSize: size === 'sm' ? 10 : 12,
              }}
            />
          )}
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: 'var(--label-tertiary)', fontSize: 10 }}
            tickCount={5}
          />
          <Radar
            name="Your Score"
            dataKey="score"
            stroke="var(--color-primary)"
            fill="var(--color-primary)"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="glass p-3 rounded-lg text-sm">
                    <p className="font-semibold">{data.subject}</p>
                    <p className="text-[var(--color-primary)]">
                      {data.score}th percentile
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
