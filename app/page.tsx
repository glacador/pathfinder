'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Brain,
  Target,
  Sparkles,
  ChevronRight,
  Check,
  Star,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui';
import { APTITUDES } from '@/types/aptitudes';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-radial opacity-50" />

        <div className="container-app py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-purple)] flex items-center justify-center"
            >
              <Brain className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Discover Your{' '}
              <span className="text-gradient">Cognitive Profile</span>
            </h1>

            <p className="text-xl text-[var(--label-secondary)] mb-8 max-w-2xl mx-auto">
              Our research-backed assessment measures 12 cognitive aptitudes to
              match you with 150+ careers that align with how you think.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/assessment">
                <Button size="lg" rightIcon={<ChevronRight className="w-5 h-5" />}>
                  Start Free Assessment
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="secondary" size="lg">
                  View Pricing
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Target, value: '12', label: 'Aptitudes' },
                { icon: Sparkles, value: '48', label: 'Questions' },
                { icon: TrendingUp, value: '150+', label: 'Careers' },
                { icon: Users, value: '50K+', label: 'Users' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass p-4 rounded-xl"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-[var(--color-primary)]" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-[var(--label-secondary)]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Aptitudes Section */}
      <section className="py-20 bg-[var(--bg-primary)]">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              12 Cognitive Aptitudes
            </h2>
            <p className="text-[var(--label-secondary)] max-w-2xl mx-auto">
              Each aptitude predicts success in different career paths. Our
              assessment measures your unique combination.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {APTITUDES.map((apt, i) => {
              const Icon = require('lucide-react')[apt.icon] || Zap;
              return (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass p-4 rounded-xl hover:scale-105 transition-transform cursor-default"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${apt.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: apt.color }} />
                  </div>
                  <h3 className="font-semibold mb-1">{apt.shortName}</h3>
                  <p className="text-xs text-[var(--label-secondary)] line-clamp-2">
                    {apt.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-[var(--label-secondary)] max-w-2xl mx-auto">
              Get personalized career insights in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'Take the Assessment',
                description:
                  '48 research-backed questions across 12 cognitive aptitudes. Takes 20-30 minutes.',
                icon: Brain,
              },
              {
                step: 2,
                title: 'Get Your Profile',
                description:
                  'Receive your personalized cognitive profile with percentile scores and insights.',
                icon: Target,
              },
              {
                step: 3,
                title: 'Discover Careers',
                description:
                  'Explore 150+ careers matched to your unique aptitude combination.',
                icon: Sparkles,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 rounded-[22px] text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-[var(--label-secondary)]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-[var(--bg-primary)]">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Path
            </h2>
            <p className="text-[var(--label-secondary)] max-w-2xl mx-auto">
              Start free and upgrade anytime to unlock more features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Free',
                price: '$0',
                features: ['12 aptitudes', 'Top 3 careers', 'Basic scores'],
              },
              {
                name: 'Basic',
                price: '$19.99',
                features: ['40-page PDF', 'Top 20 careers', 'Share cards'],
              },
              {
                name: 'Premium',
                price: '$39.99',
                popular: true,
                features: ['AI coaching', 'Resume bullets', 'Interview prep'],
              },
              {
                name: 'Professional',
                price: '$79.99',
                features: ['Friend compare', 'Salary scripts', 'Side hustles'],
              },
            ].map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass p-6 rounded-[22px] ${
                  tier.popular ? 'ring-2 ring-[var(--color-primary)]' : ''
                }`}
              >
                {tier.popular && (
                  <div className="flex items-center gap-1 text-[var(--color-primary)] text-sm font-medium mb-2">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <p className="text-3xl font-bold my-4">{tier.price}</p>
                <ul className="space-y-2">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-[var(--color-success)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/pricing">
              <Button variant="secondary">View All Features</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-12 rounded-[28px] text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Path?
            </h2>
            <p className="text-lg text-[var(--label-secondary)] mb-8">
              Join 50,000+ people who've discovered their ideal career through
              our assessment.
            </p>
            <Link href="/assessment">
              <Button size="lg" rightIcon={<ChevronRight className="w-5 h-5" />}>
                Start Free Assessment
              </Button>
            </Link>
            <p className="text-sm text-[var(--label-tertiary)] mt-4">
              No credit card required • Takes 20-30 minutes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[var(--fill-tertiary)]">
        <div className="container-app text-center text-sm text-[var(--label-secondary)]">
          <p>© 2024 PathFinder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
