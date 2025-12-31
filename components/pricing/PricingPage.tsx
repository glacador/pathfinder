'use client';

import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Building } from 'lucide-react';
import { PRICING_TIERS, TierFeatures, PricingTier } from '@/types/pricing';

interface PricingPageProps {
  currentTier?: PricingTier;
  onSelectTier: (tier: PricingTier) => void;
}

const tierIcons: Record<PricingTier, React.ComponentType<{ className?: string }>> = {
  free: Star,
  basic: Zap,
  premium: Crown,
  professional: Crown,
  executive: Building,
};

export default function PricingPage({ currentTier, onSelectTier }: PricingPageProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          Choose Your Path
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-[var(--label-secondary)]"
        >
          Unlock your full potential with personalized career insights
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRICING_TIERS.filter((t) => t.tier !== 'free').map((tier, index) => {
          const Icon = tierIcons[tier.tier];
          const isPopular = tier.highlighted;
          const isCurrentTier = currentTier === tier.tier;

          return (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative glass p-6 rounded-[28px] ${
                isPopular ? 'ring-2 ring-[var(--color-primary)]' : ''
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-primary)] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isPopular
                      ? 'bg-[var(--color-primary)]'
                      : 'bg-[var(--fill-secondary)]'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${isPopular ? 'text-white' : ''}`}
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{tier.name}</h3>
                  <p className="text-xs text-[var(--label-secondary)]">
                    {tier.tagline}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">${tier.price}</span>
                <span className="text-[var(--label-secondary)]"> one-time</span>
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectTier(tier.tier)}
                disabled={isCurrentTier}
                className={`w-full py-3 rounded-xl font-semibold transition ${
                  isPopular
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--fill-tertiary)] hover:bg-[var(--fill-secondary)]'
                } ${isCurrentTier ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isCurrentTier ? 'Current Plan' : 'Get Started'}
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center mt-8 text-[var(--label-secondary)]">
        <p className="text-sm">
          30-day money-back guarantee • Secure payment via Stripe
        </p>
      </div>
    </div>
  );
}
