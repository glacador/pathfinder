'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock } from 'lucide-react';
import { PRICING_TIERS, PricingTier } from '@/types/pricing';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
  featureDescription: string;
  minimumTier: PricingTier;
  onUpgrade: (tier: PricingTier) => void;
}

export default function PaywallModal({
  isOpen,
  onClose,
  feature,
  featureDescription,
  minimumTier,
  onUpgrade,
}: PaywallModalProps) {
  const tierOrder: PricingTier[] = [
    'free',
    'basic',
    'premium',
    'professional',
    'executive',
  ];

  const eligibleTiers = PRICING_TIERS.filter(
    (t) => tierOrder.indexOf(t.tier) >= tierOrder.indexOf(minimumTier)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="glass p-6 rounded-[28px] max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-[var(--fill-tertiary)] rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-indigo)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Unlock {feature}</h2>
              <p className="text-[var(--label-secondary)]">
                {featureDescription}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {eligibleTiers.slice(0, 3).map((tier) => (
                <motion.button
                  key={tier.tier}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onUpgrade(tier.tier)}
                  className={`w-full p-4 rounded-xl text-left flex items-center justify-between ${
                    tier.highlighted
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--fill-tertiary)] hover:bg-[var(--fill-secondary)]'
                  }`}
                >
                  <div>
                    <p className="font-semibold">{tier.name}</p>
                    <p
                      className={`text-sm ${
                        tier.highlighted
                          ? 'text-white/80'
                          : 'text-[var(--label-secondary)]'
                      }`}
                    >
                      {tier.tagline}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${tier.price}</p>
                    {tier.highlighted && (
                      <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                        Best Value
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <p className="text-center text-xs text-[var(--label-tertiary)]">
              30-day money-back guarantee
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
