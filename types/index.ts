export * from './aptitudes';
export * from './pricing';

export interface Question {
  id: string;
  aptitude: import('./aptitudes').AptitudeId;
  type: 'multiple_choice' | 'timed_task' | 'sequence' | 'matching';
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number;
  question: string;
  options?: { id: string; text: string; correct: boolean }[];
  explanation: string;
}

export interface Career {
  id: string;
  title: string;
  category: string;
  description: string;
  avgSalary: string;
  growth: string;
  education: string;
  aptitudeProfile: Record<import('./aptitudes').AptitudeId, number>;
}

export interface UserResult {
  id: string;
  name: string;
  email?: string;
  completedAt: Date;
  scores: Record<import('./aptitudes').AptitudeId, number>;
  tier: import('./pricing').PricingTier;
}

export interface CareerMatch {
  career: Career;
  matchScore: number;
}

export interface CelebrityProfile {
  name: string;
  title: string;
  image: string;
  aptitudes: Record<import('./aptitudes').AptitudeId, number>;
}

export interface CelebrityMatch {
  celebrity: CelebrityProfile;
  matchScore: number;
}

export interface AssessmentState {
  currentQuestion: number;
  answers: Record<string, string | number>;
  startTime: Date;
  aptitudeScores: Record<import('./aptitudes').AptitudeId, number>;
}
