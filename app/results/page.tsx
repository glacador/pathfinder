'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  Sparkles,
  Lock,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui';
import {
  AptitudeRadar,
  CareerCard,
  ScoreReveal,
  ShareCards,
  CelebrityMatch,
} from '@/components/results';
import { PaywallModal } from '@/components/pricing';
import { matchCareers } from '@/data/careers';
import { findCelebrityMatches } from '@/data/celebrities';
import { AptitudeId, APTITUDES } from '@/types/aptitudes';
import { PricingTier, hasAccess } from '@/types/pricing';
import { getTopStrengths, getWeaknesses } from '@/lib/scoring';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';

interface ResultData {
  id: string;
  scores: Record<AptitudeId, number>;
  completedAt: string;
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const resultId = searchParams.get('id');

  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [showReveal, setShowReveal] = useState(true);
  const [userTier, setUserTier] = useState<PricingTier>('free');

  const { canAccess, showPaywall, paywallState, closePaywall } =
    useFeatureAccess(userTier);

  useEffect(() => {
    if (resultId) {
      const stored = localStorage.getItem(`result_${resultId}`);
      if (stored) {
        setResultData(JSON.parse(stored));
      }
    }
  }, [resultId]);

  const careerMatches = useMemo(() => {
    if (!resultData) return [];
    return matchCareers(resultData.scores);
  }, [resultData]);

  const celebrityMatches = useMemo(() => {
    if (!resultData) return [];
    return findCelebrityMatches(resultData.scores);
  }, [resultData]);

  const topStrengths = useMemo(() => {
    if (!resultData) return [];
    return getTopStrengths(resultData.scores, 3);
  }, [resultData]);

  const weaknesses = useMemo(() => {
    if (!resultData) return [];
    return getWeaknesses(resultData.scores, 3);
  }, [resultData]);

  const handleUpgrade = (tier: PricingTier) => {
    closePaywall();
    // In production, this would redirect to checkout
    window.location.href = `/pricing?upgrade=${tier}`;
  };

  if (!resultData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-[var(--label-secondary)] mb-4">
            Loading your results...
          </p>
          <Link href="/assessment">
            <Button variant="secondary">Take Assessment</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] py-8 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--label-secondary)] hover:text-[var(--label-primary)] transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 rounded-[28px]"
        >
          <h1 className="text-3xl font-bold mb-2">Your Results</h1>
          <p className="text-[var(--label-secondary)]">
            Completed on{' '}
            {new Date(resultData.completedAt).toLocaleDateString()}
          </p>
        </motion.div>
      </div>

      {/* Score Reveal Animation */}
      {showReveal && (
        <div className="max-w-4xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass p-6 rounded-[28px]"
          >
            <h2 className="text-xl font-semibold mb-6 text-center">
              Your Aptitude Scores
            </h2>
            <ScoreReveal
              scores={resultData.scores}
              onComplete={() => setShowReveal(false)}
            />
          </motion.div>
        </div>
      )}

      {/* Main Results Grid */}
      {!showReveal && (
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 rounded-[28px]"
            >
              <h2 className="text-xl font-semibold mb-4">
                Your Cognitive Profile
              </h2>
              <AptitudeRadar scores={resultData.scores} />
            </motion.div>

            {/* Top Careers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass p-6 rounded-[28px]"
            >
              <h2 className="text-xl font-semibold mb-4">
                Top Career Matches
              </h2>
              <div className="space-y-3">
                {careerMatches.slice(0, userTier === 'free' ? 3 : 5).map((match, i) => (
                  <CareerCard
                    key={match.career.id}
                    career={match.career}
                    matchScore={match.matchScore}
                    rank={i + 1}
                    compact
                  />
                ))}
              </div>
              {userTier === 'free' && (
                <button
                  onClick={() => showPaywall('top_20_careers')}
                  className="mt-4 w-full py-3 bg-[var(--fill-tertiary)] hover:bg-[var(--fill-secondary)] rounded-xl font-medium transition flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Unlock 17 More Matches
                </button>
              )}
            </motion.div>

            {/* Celebrity Matches */}
            {canAccess('celebrity_comparison') ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <CelebrityMatch matches={celebrityMatches} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass p-6 rounded-[28px]"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-[var(--color-warning)]" />
                  <h3 className="text-lg font-semibold">You Think Like...</h3>
                </div>
                <div className="text-center py-8">
                  <Lock className="w-12 h-12 mx-auto mb-4 text-[var(--label-tertiary)]" />
                  <p className="text-[var(--label-secondary)] mb-4">
                    Discover which famous people share your thinking style
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => showPaywall('celebrity_comparison')}
                  >
                    Unlock Feature
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Share Cards */}
            {canAccess('social_cards') ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ShareCards
                  scores={resultData.scores}
                  userName="User"
                  topCareer={careerMatches[0]?.career.title || 'Career Explorer'}
                  profileId={resultData.id}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass p-6 rounded-[28px]"
              >
                <h3 className="text-lg font-semibold mb-4">Share Your Results</h3>
                <div className="text-center py-8">
                  <Lock className="w-12 h-12 mx-auto mb-4 text-[var(--label-tertiary)]" />
                  <p className="text-[var(--label-secondary)] mb-4">
                    Create shareable cards to show off your results
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => showPaywall('social_cards')}
                  >
                    Unlock Feature
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Premium Features CTAs */}
          <div className="mt-8 flex justify-center">
            {/* PDF Report */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass p-6 rounded-[28px]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-success)] to-[var(--color-teal)] rounded-xl flex items-center justify-center">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Career Roadmap PDF</h3>
                  <p className="text-sm text-[var(--label-secondary)]">
                    40-page detailed report
                  </p>
                </div>
              </div>
              {canAccess('full_report_pdf') ? (
                <Button
                  className="w-full"
                  rightIcon={<Download className="w-4 h-4" />}
                >
                  Download PDF
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => showPaywall('full_report_pdf')}
                  leftIcon={<Lock className="w-4 h-4" />}
                >
                  Unlock with Basic
                </Button>
              )}
            </motion.div>
          </div>

          {/* Upgrade CTA */}
          {userTier === 'free' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 glass p-8 rounded-[28px] text-center"
            >
              <h2 className="text-2xl font-bold mb-2">
                Unlock Your Full Potential
              </h2>
              <p className="text-[var(--label-secondary)] mb-6 max-w-md mx-auto">
                Get your complete 40-page Career Roadmap and premium features
              </p>
              <Link href="/pricing">
                <Button
                  size="lg"
                  rightIcon={<ChevronRight className="w-5 h-5" />}
                >
                  View Pricing Plans
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      )}

      {/* Paywall Modal */}
      <PaywallModal
        isOpen={paywallState.isOpen}
        onClose={closePaywall}
        feature={paywallState.feature}
        featureDescription={paywallState.featureDescription}
        minimumTier={paywallState.minimumTier}
        onUpgrade={handleUpgrade}
      />

    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
