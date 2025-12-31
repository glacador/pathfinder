export type AptitudeId =
  | 'verbal'
  | 'numerical'
  | 'spatial'
  | 'pattern'
  | 'processing'
  | 'memory'
  | 'mechanical'
  | 'idea'
  | 'sequential'
  | 'interpersonal'
  | 'detail'
  | 'risk';

export interface Aptitude {
  id: AptitudeId;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  predicts: string[];
}

export const APTITUDES: Aptitude[] = [
  {
    id: 'verbal',
    name: 'Verbal Reasoning',
    shortName: 'Verbal',
    description: 'Language comprehension, vocabulary, analogical thinking',
    icon: 'MessageSquare',
    color: '#007AFF',
    predicts: ['Writing', 'Law', 'Teaching', 'Journalism', 'Marketing'],
  },
  {
    id: 'numerical',
    name: 'Numerical Reasoning',
    shortName: 'Numerical',
    description: 'Mathematical thinking, number relationships, word problems',
    icon: 'Calculator',
    color: '#5856D6',
    predicts: ['Finance', 'Engineering', 'Data Science', 'Accounting'],
  },
  {
    id: 'spatial',
    name: 'Spatial Visualization',
    shortName: 'Spatial',
    description: 'Mental rotation, 3D thinking, shape manipulation',
    icon: 'Box',
    color: '#AF52DE',
    predicts: ['Architecture', 'Surgery', 'Design', 'Engineering', 'Art'],
  },
  {
    id: 'pattern',
    name: 'Pattern Recognition',
    shortName: 'Pattern',
    description: 'Identifying relationships, sequences, abstract reasoning',
    icon: 'Grid3x3',
    color: '#FF2D55',
    predicts: ['Programming', 'Science', 'Music', 'Trading', 'Research'],
  },
  {
    id: 'processing',
    name: 'Processing Speed',
    shortName: 'Speed',
    description: 'Quick visual comparison, rapid decision making',
    icon: 'Zap',
    color: '#FF9500',
    predicts: ['Trading', 'Air Traffic Control', 'Customer Service', 'Gaming'],
  },
  {
    id: 'memory',
    name: 'Working Memory',
    shortName: 'Memory',
    description: 'Information retention, mental manipulation',
    icon: 'Brain',
    color: '#5AC8FA',
    predicts: ['Research', 'Law', 'Medicine', 'Complex Analysis'],
  },
  {
    id: 'mechanical',
    name: 'Mechanical Reasoning',
    shortName: 'Mechanical',
    description: 'Understanding physical principles, how things work',
    icon: 'Cog',
    color: '#8E8E93',
    predicts: ['Engineering', 'Trades', 'Manufacturing', 'Automotive'],
  },
  {
    id: 'idea',
    name: 'Idea Generation',
    shortName: 'Creative',
    description: 'Divergent thinking, creativity, ideation fluency',
    icon: 'Lightbulb',
    color: '#FFCC00',
    predicts: ['Entrepreneurship', 'Marketing', 'Creative Fields', 'Innovation'],
  },
  {
    id: 'sequential',
    name: 'Sequential Reasoning',
    shortName: 'Sequential',
    description: 'Step-by-step logic, process thinking',
    icon: 'ListOrdered',
    color: '#34C759',
    predicts: ['Project Management', 'Operations', 'Programming', 'Law'],
  },
  {
    id: 'interpersonal',
    name: 'Interpersonal Intelligence',
    shortName: 'Social',
    description: 'Reading emotions, social situations, empathy',
    icon: 'Users',
    color: '#FF3B30',
    predicts: ['Sales', 'HR', 'Therapy', 'Management', 'Teaching'],
  },
  {
    id: 'detail',
    name: 'Detail Orientation',
    shortName: 'Detail',
    description: 'Precision, error detection, careful observation',
    icon: 'Search',
    color: '#00C7BE',
    predicts: ['Accounting', 'Editing', 'Quality Control', 'Compliance'],
  },
  {
    id: 'risk',
    name: 'Risk Assessment',
    shortName: 'Risk',
    description: 'Decision making under uncertainty, calculated risks',
    icon: 'Scale',
    color: '#FF6B00',
    predicts: ['Entrepreneurship', 'Trading', 'Leadership', 'Investing'],
  },
];

export interface AptitudeScore {
  aptitudeId: AptitudeId;
  rawScore: number;
  percentile: number;
  level: 'developing' | 'moderate' | 'strong' | 'exceptional';
}

export function getAptitudeLevel(percentile: number): AptitudeScore['level'] {
  if (percentile >= 80) return 'exceptional';
  if (percentile >= 60) return 'strong';
  if (percentile >= 40) return 'moderate';
  return 'developing';
}

export function getAptitudeById(id: AptitudeId): Aptitude | undefined {
  return APTITUDES.find((a) => a.id === id);
}
