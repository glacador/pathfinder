import { AptitudeId, APTITUDES } from '@/types/aptitudes';
import { Question } from '@/types';

interface Answer {
  questionId: string;
  answerId: string;
  isCorrect: boolean;
  timeSpent?: number;
}

export function calculateAptitudeScores(
  answers: Answer[],
  questions: Question[]
): Record<AptitudeId, number> {
  const scores: Record<AptitudeId, { correct: number; total: number }> = {} as any;

  // Initialize scores for all aptitudes
  APTITUDES.forEach((apt) => {
    scores[apt.id] = { correct: 0, total: 0 };
  });

  // Calculate raw scores
  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    scores[question.aptitude].total += 1;
    if (answer.isCorrect) {
      // Weight by difficulty
      const difficultyWeight =
        question.difficulty === 'hard'
          ? 1.5
          : question.difficulty === 'medium'
          ? 1.0
          : 0.75;
      scores[question.aptitude].correct += difficultyWeight;
    }
  });

  // Convert to percentiles (0-100)
  const percentiles: Record<AptitudeId, number> = {} as any;

  Object.entries(scores).forEach(([aptId, { correct, total }]) => {
    if (total === 0) {
      percentiles[aptId as AptitudeId] = 50; // Default to 50th percentile
    } else {
      // Calculate percentage and apply curve
      const rawPercentage = (correct / (total * 1.25)) * 100; // Adjust for difficulty weights
      // Apply normal distribution curve to simulate percentiles
      const percentile = Math.min(99, Math.max(1, Math.round(rawPercentage * 1.1)));
      percentiles[aptId as AptitudeId] = percentile;
    }
  });

  return percentiles;
}

export function getTopStrengths(
  scores: Record<AptitudeId, number>,
  count: number = 3
): string[] {
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([aptId]) => {
      const apt = APTITUDES.find((a) => a.id === aptId);
      return apt?.name || aptId;
    });
}

export function getWeaknesses(
  scores: Record<AptitudeId, number>,
  count: number = 3
): string[] {
  return Object.entries(scores)
    .sort(([, a], [, b]) => a - b)
    .slice(0, count)
    .map(([aptId]) => {
      const apt = APTITUDES.find((a) => a.id === aptId);
      return apt?.name || aptId;
    });
}

export function generateResultId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
