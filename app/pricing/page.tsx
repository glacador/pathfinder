'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Star, Zap, Crown, Building } from 'lucide-react';
import { Button } from '@/components/ui';
import { PRICING_TIERS, PricingTier } from '@/types/pricing';

const tierIcons: Record<
  PricingTier,
  React.ComponentType<{ className?: string }>
> = {
  free: Star,
  basic: Zap,
  premium: Crown,
  professional: Crown,
  executive: Building,
};

function PricingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const upgradeTarget = searchParams.get('upgrade');
  const cancelled = searchParams.get('cancelled');

  const handleSelectTier = async (tier: PricingTier) => {
    if (tier === 'free') {
      router.push('/assessment');
      return;
    }

    // Create Lemon Squeezy checkout
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier,
          userId: 'guest',
          email: '',
          resultId: 'new',
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] py-8 px-4">
      {/* Back link */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--label-secondary)] hover:text-[var(--label-primary)] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Cancelled notice */}
      {cancelled && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="glass p-4 rounded-xl bg-[var(--color-warning)]/10 border border-[var(--color-warning)]/20">
            <p className="text-center text-[var(--color-warning)]">
              Checkout was cancelled. Feel free to try again when you're ready.
            </p>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Choose Your Path
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-[var(--label-secondary)] max-w-2xl mx-auto"
        >
          Unlock your full potential with personalized career insights
        </motion.p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_TIERS.filter((t) => t.tier !== 'free').map((tier, index) => {
            const Icon = tierIcons[tier.tier];
            const isPopular = tier.highlighted;
            const isHighlighted = upgradeTarget === tier.tier;

            return (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative glass p-6 rounded-[28px] ${
                  isPopular || isHighlighted
                    ? 'ring-2 ring-[var(--color-primary)]'
                    : ''
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
                  <span className="text-[var(--label-secondary)]">
                    {' '}
                    one-time
                  </span>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={isPopular ? 'primary' : 'secondary'}
                  onClick={() => handleSelectTier(tier.tier)}
                >
                  Get Started
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Free tier note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-[var(--label-secondary)] mb-4">
            Not ready to commit? Start with our free assessment.
          </p>
          <Link href="/assessment">
            <Button variant="ghost">Take Free Assessment</Button>
          </Link>
        </motion.div>

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 glass p-6 rounded-[28px]"
        >
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl mb-2">🛡️</div>
              <h4 className="font-semibold mb-1">30-Day Guarantee</h4>
              <p className="text-sm text-[var(--label-secondary)]">
                Not satisfied? Get a full refund within 30 days.
              </p>
            </div>
            <div>
              <div className="text-2xl mb-2">🔒</div>
              <h4 className="font-semibold mb-1">Secure Payment</h4>
              <p className="text-sm text-[var(--label-secondary)]">
                All payments processed securely via Lemon Squeezy.
              </p>
            </div>
            <div>
              <div className="text-2xl mb-2">♾️</div>
              <h4 className="font-semibold mb-1">Lifetime Access</h4>
              <p className="text-sm text-[var(--label-secondary)]">
                One-time payment. Access your results forever.
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'How long does the assessment take?',
                a: 'The assessment takes about 20-30 minutes to complete. We recommend taking it in one sitting for the most accurate results.',
              },
              {
                q: 'Can I retake the assessment?',
                a: 'Free users can retake after 3 months. Professional and Executive tiers include free retakes every 6 months.',
              },
              {
                q: 'What if I want to upgrade later?',
                a: "You can upgrade at any time! Your results are saved, and you'll immediately unlock the additional features.",
              },
              {
                q: 'Is my data private?',
                a: 'Absolutely. We never sell your data. Your results are only visible to you unless you choose to share them.',
              },
            ].map((faq, i) => (
              <div key={i} className="glass p-4 rounded-xl">
                <h4 className="font-semibold mb-2">{faq.q}</h4>
                <p className="text-sm text-[var(--label-secondary)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PricingContent />
    </Suspense>
  );
}
