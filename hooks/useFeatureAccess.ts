import { useState } from 'react';
import { hasAccess, PricingTier, FEATURE_ACCESS } from '@/types/pricing';

interface PaywallState {
  isOpen: boolean;
  feature: string;
  featureDescription: string;
  minimumTier: PricingTier;
}

interface UseFeatureAccessReturn {
  canAccess: (feature: string) => boolean;
  showPaywall: (feature: string, description?: string) => void;
  paywallState: PaywallState;
  closePaywall: () => void;
}

const FEATURE_DESCRIPTIONS: Record<string, string> = {
  full_report_pdf: 'Download your complete 40-page Career Roadmap PDF',
  top_20_careers: 'See your top 20 career matches with detailed explanations',
  social_cards: 'Create shareable cards to show off your results',
  celebrity_comparison: 'Discover which famous people think like you',
  ai_coaching: 'Get personalized career guidance from our AI coach',
  resume_bullets: 'Generate professional resume bullets based on your strengths',
  interview_prep: 'Prepare for interviews with custom question guides',
  skill_gap: 'Identify and address gaps in your skillset',
  course_recommendations: 'Get personalized course and certification suggestions',
  salary_data: 'Access salary information for your top career matches',
  friend_compare: 'Compare your profile with friends and family',
  salary_negotiation: 'Get scripts and strategies for salary negotiations',
  networking_scripts: 'Generate personalized networking conversation starters',
  side_hustles: 'Discover side hustles that match your aptitudes',
  work_environment: 'Learn about your ideal work environment',
  weakness_playbook: 'Get strategies to mitigate your weaker areas',
  mentor_matching: 'Find mentors that align with your career goals',
  retest_free: 'Retake the assessment for free in 6 months',
  team_reports: 'Generate team compatibility reports',
  multi_coaching: 'Access multiple AI coaching sessions',
  industry_reports: 'Get insider reports for your target industries',
  geographic_analysis: 'See career opportunities by location',
  white_label: 'Download a white-label version of your report',
  priority_support: 'Get priority responses from our support team',
};

export function useFeatureAccess(userTier: PricingTier): UseFeatureAccessReturn {
  const [paywallState, setPaywallState] = useState<PaywallState>({
    isOpen: false,
    feature: '',
    featureDescription: '',
    minimumTier: 'basic',
  });

  const canAccess = (feature: string): boolean => {
    return hasAccess(userTier, feature);
  };

  const showPaywall = (feature: string, description?: string) => {
    const tierOrder: PricingTier[] = [
      'free',
      'basic',
      'premium',
      'professional',
      'executive',
    ];
    const allowedTiers = FEATURE_ACCESS[feature] || [];
    const minimumTier = tierOrder.find((t) => allowedTiers.includes(t)) || 'basic';

    setPaywallState({
      isOpen: true,
      feature: feature.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      featureDescription: description || FEATURE_DESCRIPTIONS[feature] || 'Unlock this premium feature',
      minimumTier,
    });
  };

  const closePaywall = () => {
    setPaywallState((prev) => ({ ...prev, isOpen: false }));
  };

  return {
    canAccess,
    showPaywall,
    paywallState,
    closePaywall,
  };
}
