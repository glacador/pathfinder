export type PricingTier = 'free' | 'basic' | 'premium' | 'professional' | 'executive';

export interface TierFeatures {
  tier: PricingTier;
  price: number;
  variantId: string;
  name: string;
  tagline: string;
  features: string[];
  highlighted?: boolean;
}

export const PRICING_TIERS: TierFeatures[] = [
  {
    tier: 'free',
    price: 0,
    variantId: '',
    name: 'Free',
    tagline: 'See your potential',
    features: [
      'Complete 12-aptitude assessment',
      'Basic aptitude scores',
      'Top 3 career matches',
      'Percentile rankings',
    ],
  },
  {
    tier: 'basic',
    price: 19.99,
    variantId: process.env.LEMONSQUEEZY_VARIANT_BASIC || '',
    name: 'Basic Report',
    tagline: 'Understand yourself',
    features: [
      'Everything in Free, plus:',
      '40-page Career Roadmap PDF',
      'Top 20 career matches with explanations',
      'Shareable social cards',
      'Famous person comparison',
      'Detailed aptitude breakdown',
      'Lifetime access to results',
    ],
  },
  {
    tier: 'premium',
    price: 39.99,
    variantId: process.env.LEMONSQUEEZY_VARIANT_PREMIUM || '',
    name: 'Premium',
    tagline: 'Most Popular',
    highlighted: true,
    features: [
      'Everything in Basic, plus:',
      '1-on-1 AI Career Coaching Session',
      'Resume bullet generator',
      'Interview prep guide',
      'Skill gap analysis',
      'Course & certification recommendations',
      'Salary data for top careers',
    ],
  },
  {
    tier: 'professional',
    price: 79.99,
    variantId: process.env.LEMONSQUEEZY_VARIANT_PROFESSIONAL || '',
    name: 'Professional',
    tagline: 'Accelerate your career',
    features: [
      'Everything in Premium, plus:',
      'Compare with 3 friends',
      'Salary negotiation scripts',
      'Networking script generator',
      'Side hustle recommendations',
      'Work environment preference report',
      'Weakness mitigation playbook',
      'Mentor matching guide',
      'Free retest in 6 months',
    ],
  },
  {
    tier: 'executive',
    price: 149.99,
    variantId: process.env.LEMONSQUEEZY_VARIANT_EXECUTIVE || '',
    name: 'Executive',
    tagline: 'For leaders & teams',
    features: [
      'Everything in Professional, plus:',
      'Team compatibility reports (up to 5 people)',
      '3 AI coaching sessions included',
      'Industry insider reports',
      'Geographic opportunity analysis',
      'White-label PDF option',
      'Priority coaching responses',
      'Direct email support',
    ],
  },
];

export const FEATURE_ACCESS: Record<string, PricingTier[]> = {
  basic_scores: ['free', 'basic', 'premium', 'professional', 'executive'],
  top_3_careers: ['free', 'basic', 'premium', 'professional', 'executive'],
  full_report_pdf: ['basic', 'premium', 'professional', 'executive'],
  top_20_careers: ['basic', 'premium', 'professional', 'executive'],
  social_cards: ['basic', 'premium', 'professional', 'executive'],
  celebrity_comparison: ['basic', 'premium', 'professional', 'executive'],
  ai_coaching: ['premium', 'professional', 'executive'],
  resume_bullets: ['premium', 'professional', 'executive'],
  interview_prep: ['premium', 'professional', 'executive'],
  skill_gap: ['premium', 'professional', 'executive'],
  course_recommendations: ['premium', 'professional', 'executive'],
  salary_data: ['premium', 'professional', 'executive'],
  friend_compare: ['professional', 'executive'],
  salary_negotiation: ['professional', 'executive'],
  networking_scripts: ['professional', 'executive'],
  side_hustles: ['professional', 'executive'],
  work_environment: ['professional', 'executive'],
  weakness_playbook: ['professional', 'executive'],
  mentor_matching: ['professional', 'executive'],
  retest_free: ['professional', 'executive'],
  team_reports: ['executive'],
  multi_coaching: ['executive'],
  industry_reports: ['executive'],
  geographic_analysis: ['executive'],
  white_label: ['executive'],
  priority_support: ['executive'],
};

export function hasAccess(userTier: PricingTier, feature: string): boolean {
  const allowedTiers = FEATURE_ACCESS[feature] || [];
  return allowedTiers.includes(userTier);
}

export function getTierByName(tier: PricingTier): TierFeatures | undefined {
  return PRICING_TIERS.find((t) => t.tier === tier);
}

export function getMinimumTierForFeature(feature: string): PricingTier {
  const tierOrder: PricingTier[] = ['free', 'basic', 'premium', 'professional', 'executive'];
  const allowedTiers = FEATURE_ACCESS[feature] || [];
  return tierOrder.find((t) => allowedTiers.includes(t)) || 'basic';
}
