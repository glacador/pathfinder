'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '@/types';
import { APTITUDES } from '@/types/aptitudes';
import { Timer, Progress } from '@/components/ui';
import AnswerOption from './AnswerOption';
import * as Icons from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (questionId: string, answerId: string, isCorrect: boolean) => void;
  onTimeUp?: () => void;
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onTimeUp,
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const aptitude = APTITUDES.find((a) => a.id === question.aptitude);
  const IconComponent = aptitude?.icon
    ? (Icons as any)[aptitude.icon]
    : Icons.HelpCircle;

  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
  }, [question.id]);

  const handleSelectAnswer = (answerId: string) => {
    if (showResult || selectedAnswer) return;

    setSelectedAnswer(answerId);
    setShowResult(true);

    const isCorrect =
      question.options?.find((o) => o.id === answerId)?.correct || false;

    setTimeout(() => {
      onAnswer(question.id, answerId, isCorrect);
    }, 1500);
  };

  const handleTimeUp = () => {
    if (!selectedAnswer) {
      setShowResult(true);
      setTimeout(() => {
        onAnswer(question.id, '', false);
        onTimeUp?.();
      }, 1000);
    }
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-[var(--label-secondary)]">
            Question {questionNumber} of {totalQuestions}
          </span>
          {question.timeLimit && (
            <Timer
              duration={question.timeLimit}
              onComplete={handleTimeUp}
              size="sm"
            />
          )}
        </div>
        <Progress
          value={questionNumber}
          max={totalQuestions}
          size="sm"
        />
      </div>

      {/* Question Card */}
      <div className="glass p-6 md:p-8 rounded-[28px]">
        {/* Aptitude Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${aptitude?.color}20` }}
          >
            <IconComponent
              className="w-4 h-4"
              style={{ color: aptitude?.color }}
            />
          </div>
          <span
            className="text-sm font-medium"
            style={{ color: aptitude?.color }}
          >
            {aptitude?.name}
          </span>
          <span className="ml-auto text-xs text-[var(--label-tertiary)] px-2 py-1 bg-[var(--fill-quaternary)] rounded-full">
            {question.difficulty}
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-balance">
          {question.question}
        </h2>

        {/* Answer Options */}
        {question.options && (
          <div className="space-y-3">
            <AnimatePresence>
              {question.options.map((option, index) => (
                <AnswerOption
                  key={option.id}
                  id={option.id}
                  text={option.text}
                  isSelected={selectedAnswer === option.id}
                  isCorrect={option.correct}
                  showResult={showResult}
                  onSelect={handleSelectAnswer}
                  disabled={!!selectedAnswer}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Explanation (shown after answer) */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-4 bg-[var(--fill-quaternary)] rounded-xl"
            >
              <p className="text-sm text-[var(--label-secondary)]">
                <span className="font-semibold text-[var(--label-primary)]">
                  Explanation:{' '}
                </span>
                {question.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
