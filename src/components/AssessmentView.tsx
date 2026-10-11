import React, { useState } from 'react';
import {
  FileCheck2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Clock,
  ArrowRight,
  ShieldCheck,
  Check,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRE_COURSE_QUIZ, POST_COURSE_QUIZ } from '../data/mockData';
import { Quiz, Question, QuizAttempt } from '../types';

export const AssessmentView: React.FC = () => {
  const { quizAttempts, saveQuizAttempt, setActiveScreen } = useApp();
  const [activeQuizId, setActiveQuizId] = useState<'quiz-pre' | 'quiz-post'>('quiz-post');
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const selectedQuiz: Quiz = activeQuizId === 'quiz-pre' ? PRE_COURSE_QUIZ : POST_COURSE_QUIZ;
  const existingAttempt = quizAttempts[activeQuizId];

  const handleStartQuiz = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setQuizSubmitted(false);
    setIsTakingQuiz(true);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    selectedQuiz.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });

    const percentage = Math.round((score / selectedQuiz.questions.length) * 100);
    const passed = percentage >= selectedQuiz.passingScorePct;

    const attempt: QuizAttempt = {
      quizId: selectedQuiz.id,
      score,
      total: selectedQuiz.questions.length,
      percentage,
      passed,
      completedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      answers: userAnswers,
      moodleGradeSyncStatus: 'synced',
    };

    saveQuizAttempt(attempt);
    setQuizSubmitted(true);
    setIsTakingQuiz(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase">
              MOODLE QUIZ SUB-ENGINE
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-military text-slate-100">
            Tactical Assessments & Certification Testing
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Standardised MCQs with automated grading, Moodle gradebook sync, and doctrinal remediation.
          </p>
        </div>

        {/* Tab switch between Pre-test and Post-test */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              setActiveQuizId('quiz-pre');
              setIsTakingQuiz(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
              activeQuizId === 'quiz-pre'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pre-Course Diagnostic
          </button>
          <button
            onClick={() => {
              setActiveQuizId('quiz-post');
              setIsTakingQuiz(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
              activeQuizId === 'quiz-post'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Post-Course Exam (Graded)
          </button>
        </div>
      </div>

      {/* Main Assessment Container */}
      {!isTakingQuiz ? (
        /* Overview / Previous Results View */
        <div className="space-y-6">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-amber-400 border border-slate-700">
                    CODE: {selectedQuiz.code}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Threshold: {selectedQuiz.passingScorePct}% to pass
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold font-military text-slate-100">
                  {selectedQuiz.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {selectedQuiz.description}
                </p>
              </div>

              {existingAttempt && (
                <div className="flex items-center gap-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800 shrink-0">
                  <div className="text-right">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Last Attempt Grade</div>
                    <div
                      className={`text-2xl font-bold font-military ${
                        existingAttempt.passed ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {existingAttempt.percentage}%
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      {existingAttempt.score} of {existingAttempt.total} correct
                    </div>
                  </div>

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      existingAttempt.passed
                        ? 'bg-emerald-950 border border-emerald-600 text-emerald-400'
                        : 'bg-red-950 border border-red-600 text-red-400'
                    }`}
                  >
                    {existingAttempt.passed ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  </div>
                </div>
              )}
            </div>

            {/* Test Metadata & Action */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-3">
                <Clock className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500">Duration Limit</div>
                  <div className="text-xs font-semibold text-slate-200">
                    {selectedQuiz.timeLimitMinutes} Minutes Timed
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-3">
                <FileCheck2 className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500">Total Scored Items</div>
                  <div className="text-xs font-semibold text-slate-200">
                    {selectedQuiz.questions.length} Doctrinal Questions
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500">Moodle 5.2 Grade Sync</div>
                  <div className="text-xs font-semibold text-emerald-400">
                    Auto-writes to m_grade_grades
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleStartQuiz}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <span>{existingAttempt ? 'Retake Examination' : 'Begin Assessment Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {existingAttempt?.passed && activeQuizId === 'quiz-post' && (
                <button
                  onClick={() => setActiveScreen('certificate')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Proceed to Digital Certificate</span>
                </button>
              )}
            </div>
          </div>

          {/* Answer Breakdown If Attempt Exists */}
          {existingAttempt && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold font-military text-slate-300 uppercase tracking-wide">
                Detailed Doctrinal Item Review:
              </h3>
              <div className="space-y-3">
                {selectedQuiz.questions.map((q, idx) => {
                  const userAnswer = existingAttempt.answers?.[q.id];
                  const isCorrect = userAnswer === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isCorrect
                          ? 'bg-slate-900/90 border-emerald-900/40'
                          : 'bg-slate-900/90 border-red-900/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-[11px] font-mono font-bold flex items-center justify-center text-slate-300">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-mono text-slate-400 uppercase">
                            {q.category}
                          </span>
                        </div>
                        <span
                          className={`text-xs font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                            isCorrect
                              ? 'text-emerald-400 bg-emerald-950/60'
                              : 'text-red-400 bg-red-950/60'
                          }`}
                        >
                          {isCorrect ? <Check className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>

                      <p className="text-sm font-semibold text-slate-100 mb-3">
                        {q.prompt}
                      </p>

                      <div className="space-y-1.5 pl-2 mb-3">
                        {q.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            className={`p-2 rounded text-xs flex items-center justify-between ${
                              oIdx === q.correctIndex
                                ? 'bg-emerald-950/50 text-emerald-200 border border-emerald-700/50 font-medium'
                                : oIdx === userAnswer && !isCorrect
                                ? 'bg-red-950/50 text-red-300 border border-red-700/50'
                                : 'text-slate-400'
                            }`}
                          >
                            <span>
                              {String.fromCharCode(65 + oIdx)}. {opt}
                            </span>
                            {oIdx === q.correctIndex && (
                              <span className="text-[10px] font-mono text-emerald-400">
                                [AUTHORITATIVE PROTOCOL]
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
                        <span className="text-amber-400 font-mono font-bold block mb-0.5">
                          DOCTRINAL RATIONALE:
                        </span>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Interactive Question-by-Question Taking View */
        <div className="max-w-2xl mx-auto rounded-2xl bg-slate-900 border border-slate-700 p-5 sm:p-7 shadow-2xl space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                {selectedQuiz.code} • TIMED EXAM
              </span>
              <h2 className="text-base font-bold text-slate-100">
                Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-600/50">
              <Clock className="w-3.5 h-3.5" />
              <span>Time Remaining: 09:42</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full transition-all"
              style={{
                width: `${((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100}%`,
              }}
            />
          </div>

          {/* Current Question */}
          {(() => {
            const currentQ = selectedQuiz.questions[currentQuestionIndex];
            const currentSelected = userAnswers[currentQ.id];

            return (
              <div className="space-y-4">
                <div className="text-xs font-mono text-slate-400 uppercase">
                  DOMAIN: {currentQ.category}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 leading-snug">
                  {currentQ.prompt}
                </h3>

                {/* Options List */}
                <div className="space-y-2.5 pt-2">
                  {currentQ.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(currentQ.id, oIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-3 ${
                        currentSelected === oIdx
                          ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                          currentSelected === oIdx
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}
                      </div>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono text-slate-300"
                  >
                    ← Previous
                  </button>

                  {currentQuestionIndex < selectedQuiz.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                      className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <span>Next Question</span>
                      <span>→</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitQuiz}
                      className="px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
                    >
                      <Check className="w-4 h-4" />
                      <span>Submit Examination</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
