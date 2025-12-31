'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Aptitude } from '@/types/aptitudes';
import { Button } from '@/components/ui';
import * as Icons from 'lucide-react';

interface InterstitialScreenProps {
  type: 'intro' | 'section' | 'complete';
  aptitude?: Aptitude;
  sectionNumber?: number;
  totalSections?: number;
  onContinue: () => void;
}

export default function InterstitialScreen({
  type,
  aptitude,
  sectionNumber,
  totalSections,
  onContinue,
}: InterstitialScreenProps) {
  if (type === 'intro') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl mx-auto text-center"
      >
        <div className="glass p-8 md:p-12 rounded-[28px]">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-purple)] flex items-center justify-center"
          >
            <Icons.Brain className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Discover Your Cognitive Profile
          </h1>
          <p className="text-lg text-[var(--label-secondary)] mb-8 max-w-md mx-auto">
            This assessment measures 12 key cognitive aptitudes through 48
            research-backed questions. Takes about 20-30 minutes.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Icons.Clock, label: '20-30 min' },
              { icon: Icons.Target, label: '48 questions' },
              { icon: Icons.Sparkles, label: '12 aptitudes' },
              { icon: Icons.TrendingUp, label: '150+ careers' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="p-4 bg-[var(--fill-quaternary)] rounded-xl"
              >
                <item.icon className="w-6 h-6 mx-auto mb-2 text-[var(--color-primary)]" />
                <p className="text-sm font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>

          <Button
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            onClick={onContinue}
          >
            Start Assessment
          </Button>

          <p className="text-xs text-[var(--label-tertiary)] mt-4">
            Your responses are private and secure
          </p>
        </div>
      </motion.div>
    );
  }

  if (type === 'section' && aptitude) {
    const IconComponent = (Icons as any)[aptitude.icon] || Icons.HelpCircle;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl mx-auto text-center"
      >
        <div className="glass p-8 md:p-12 rounded-[28px]">
          <p className="text-sm text-[var(--label-secondary)] mb-4">
            Section {sectionNumber} of {totalSections}
          </p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${aptitude.color}20` }}
          >
            <IconComponent
              className="w-8 h-8"
              style={{ color: aptitude.color }}
            />
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {aptitude.name}
          </h2>
          <p className="text-[var(--label-secondary)] mb-6 max-w-md mx-auto">
            {aptitude.description}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {aptitude.predicts.slice(0, 4).map((career, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm bg-[var(--fill-quaternary)] rounded-full"
              >
                {career}
              </span>
            ))}
          </div>

          <Button
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            onClick={onContinue}
          >
            Begin Section
          </Button>

          <p className="text-xs text-[var(--label-tertiary)] mt-4">
            4 questions • ~2 minutes
          </p>
        </div>
      </motion.div>
    );
  }

  if (type === 'complete') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl mx-auto text-center"
      >
        <div className="glass p-8 md:p-12 rounded-[28px]">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--color-success)] to-[var(--color-teal)] flex items-center justify-center"
          >
            <Icons.CheckCircle className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Assessment Complete!
          </h2>
          <p className="text-lg text-[var(--label-secondary)] mb-8 max-w-md mx-auto">
            We've analyzed your responses across all 12 aptitudes. Let's reveal
            your unique cognitive profile.
          </p>

          <Button
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            onClick={onContinue}
          >
            See My Results
          </Button>
        </div>
      </motion.div>
    );
  }

  return null;
}
