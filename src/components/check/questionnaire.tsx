"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { QUESTIONS } from "@/lib/data";
import { CATEGORIES } from "@/lib/data/categories";
import { QuestionCard } from "./question-card";

interface QuestionnaireProps {
  answers: Record<string, string>;
  onAnswer: (questionId: string, value: string) => void;
}

export function Questionnaire({ answers, onAnswer }: QuestionnaireProps) {
  const visibleQuestions = useMemo(() => {
    return QUESTIONS.filter((q) => {
      if (!q.conditionalOn) return true;
      const parentAnswer = answers[q.conditionalOn];
      return parentAnswer === "yes";
    });
  }, [answers]);

  const groupedQuestions = useMemo(() => {
    const groups: Record<string, typeof visibleQuestions> = {};
    for (const q of visibleQuestions) {
      if (!groups[q.categoryId]) {
        groups[q.categoryId] = [];
      }
      groups[q.categoryId].push(q);
    }
    return groups;
  }, [visibleQuestions]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h3 className="text-lg font-semibold text-zinc-100">
          Quick Review Checklist
        </h3>
        <p className="mt-1 text-sm text-zinc-400">
          Answer these questions about your app. We only ask what your files
          can&apos;t tell us.
        </p>
      </div>

      {CATEGORIES.map((category) => {
        const questions = groupedQuestions[category.id];
        if (!questions || questions.length === 0) return null;

        return (
          <motion.section
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-300">
              <span className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500">
                {category.guidelineSection}
              </span>
              {category.name}
            </h4>

            <div className="space-y-3">
              {questions.map((question, idx) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  answer={answers[question.id]}
                  onAnswer={(value) => onAnswer(question.id, value)}
                  index={idx}
                />
              ))}
            </div>
          </motion.section>
        );
      })}

      <p className="text-center text-xs text-zinc-600">
        {visibleQuestions.length} questions &middot; Unanswered questions are
        scored neutrally
      </p>
    </motion.div>
  );
}
