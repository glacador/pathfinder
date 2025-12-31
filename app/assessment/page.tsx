'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionCard, InterstitialScreen } from '@/components/assessment';
import { QUESTIONS } from '@/data/questions';
import { APTITUDES, AptitudeId } from '@/types/aptitudes';
import { calculateAptitudeScores, generateResultId } from '@/lib/scoring';

type AssessmentPhase = 'intro' | 'section-intro' | 'question' | 'complete';

interface Answer {
  questionId: string;
  answerId: string;
  isCorrect: boolean;
  timeSpent?: number;
}

export default function AssessmentPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<AssessmentPhase>('intro');
  const [currentAptitudeIndex, setCurrentAptitudeIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  // Group questions by aptitude
  const questionsByAptitude = useMemo(() => {
    const grouped: Record<AptitudeId, typeof QUESTIONS> = {} as any;
    APTITUDES.forEach((apt) => {
      grouped[apt.id] = QUESTIONS.filter((q) => q.aptitude === apt.id);
    });
    return grouped;
  }, []);

  const currentAptitude = APTITUDES[currentAptitudeIndex];
  const currentAptitudeQuestions = questionsByAptitude[currentAptitude?.id] || [];
  const currentQuestion = currentAptitudeQuestions[currentQuestionIndex];

  // Calculate overall progress
  const totalQuestions = QUESTIONS.length;
  const answeredQuestions = answers.length;
  const overallProgress = (answeredQuestions / totalQuestions) * 100;

  const handleStartAssessment = () => {
    setPhase('section-intro');
  };

  const handleStartSection = () => {
    setPhase('question');
  };

  const handleAnswer = (questionId: string, answerId: string, isCorrect: boolean) => {
    setAnswers((prev) => [...prev, { questionId, answerId, isCorrect }]);

    // Move to next question or section
    setTimeout(() => {
      if (currentQuestionIndex < currentAptitudeQuestions.length - 1) {
        // More questions in current aptitude
        setCurrentQuestionIndex((prev) => prev + 1);
      } else if (currentAptitudeIndex < APTITUDES.length - 1) {
        // Move to next aptitude
        setCurrentAptitudeIndex((prev) => prev + 1);
        setCurrentQuestionIndex(0);
        setPhase('section-intro');
      } else {
        // Assessment complete
        setPhase('complete');
      }
    }, 100);
  };

  const handleComplete = () => {
    // Calculate scores
    const scores = calculateAptitudeScores(answers, QUESTIONS);

    // Store results in localStorage (in production, this would go to a database)
    const resultId = generateResultId();
    const resultData = {
      id: resultId,
      scores,
      answers,
      completedAt: new Date().toISOString(),
    };

    localStorage.setItem(`result_${resultId}`, JSON.stringify(resultData));

    // Navigate to results
    router.push(`/results?id=${resultId}`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] py-8 px-4">
      {/* Progress indicator */}
      {phase !== 'intro' && phase !== 'complete' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[var(--label-secondary)]">
              Overall Progress
            </span>
            <span className="text-sm font-medium">
              {answeredQuestions}/{totalQuestions}
            </span>
          </div>
          <div className="h-2 bg-[var(--fill-tertiary)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-purple)] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <InterstitialScreen
            key="intro"
            type="intro"
            onContinue={handleStartAssessment}
          />
        )}

        {phase === 'section-intro' && currentAptitude && (
          <InterstitialScreen
            key={`section-${currentAptitude.id}`}
            type="section"
            aptitude={currentAptitude}
            sectionNumber={currentAptitudeIndex + 1}
            totalSections={APTITUDES.length}
            onContinue={handleStartSection}
          />
        )}

        {phase === 'question' && currentQuestion && (
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            questionNumber={answeredQuestions + 1}
            totalQuestions={totalQuestions}
            onAnswer={handleAnswer}
          />
        )}

        {phase === 'complete' && (
          <InterstitialScreen
            key="complete"
            type="complete"
            onContinue={handleComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
