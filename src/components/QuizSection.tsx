import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/aiData';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  ArrowRight,
  BookOpen,
  Sparkles
} from 'lucide-react';

interface QuizSectionProps {
  onNavigateToNext: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ onNavigateToNext }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  // Calculate score
  const calculateScore = () => {
    let correct = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const allAnswered = QUIZ_QUESTIONS.every(q => selectedAnswers[q.id] !== undefined);

  return (
    <section id="kuis" className="py-16 md:py-24 bg-slate-950/60 backdrop-blur-[2px] border-b border-slate-800/60 relative scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Evaluasi & Uji Pemahaman</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Kuis Interaktif AI: Uji Pemahaman Anda
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl mx-auto">
            Uji pemahaman Anda seputar Konsep AI (Gambar 1), Ruang Lingkup (Gambar 2), Sejarah (Gambar 3), dan Taksonomi AI vs ML.
          </p>
        </div>

        {/* Score banner when submitted */}
        {isSubmitted && (
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 border border-blue-500/40 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-14 h-14 mx-auto rounded-full bg-blue-600/30 border border-blue-400/50 flex items-center justify-center text-blue-300 mb-3">
              <Award className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Hasil Kuis: Skor Anda {score} / {QUIZ_QUESTIONS.length} ({Math.round((score / QUIZ_QUESTIONS.length) * 100)}%)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
              {score === QUIZ_QUESTIONS.length 
                ? 'Luar biasa sempurna! Anda telah menguasai seluruh konsep, cabang, dan sejarah AI dengan sangat baik.' 
                : score >= 3 
                ? 'Kerja bagus! Pemahaman Anda sudah sangat solid. Simak pembahasan pada setiap soal untuk mendalami detail ilmiah.' 
                : 'Bagus untuk latihan pertama. Silakan telusuri kembali ulasan sumber valid di atas untuk memperkuat pemahaman.'}
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Kuis</span>
              </button>
            </div>
          </div>
        )}

        {/* Questions list */}
        <div className="space-y-6">
          {QUIZ_QUESTIONS.map((q, qIndex) => {
            const userAnswer = selectedAnswers[q.id];
            const isCorrect = userAnswer === q.correctIndex;

            return (
              <div 
                key={q.id}
                className={`p-6 rounded-2xl border transition-all ${
                  isSubmitted
                    ? isCorrect
                      ? 'bg-slate-900/90 border-emerald-500/60 shadow-sm shadow-emerald-950/40'
                      : 'bg-slate-900/90 border-rose-500/60 shadow-sm shadow-rose-950/40'
                    : 'bg-slate-850 border-slate-800'
                }`}
              >
                {/* Question title */}
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/30">
                    {qIndex + 1}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                    {q.question}
                  </h4>
                </div>

                {/* Options list */}
                <div className="space-y-2.5">
                  {q.options.map((opt, optIndex) => {
                    const isOptionSelected = userAnswer === optIndex;
                    const isActualCorrect = optIndex === q.correctIndex;

                    let optionStyle = 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white';
                    
                    if (isSubmitted) {
                      if (isActualCorrect) {
                        optionStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold';
                      } else if (isOptionSelected && !isActualCorrect) {
                        optionStyle = 'bg-rose-950/70 border-rose-500 text-rose-200 font-medium';
                      } else {
                        optionStyle = 'bg-slate-900/30 border-slate-800 text-slate-500 opacity-60';
                      }
                    } else if (isOptionSelected) {
                      optionStyle = 'bg-blue-600/20 border-blue-500 text-blue-200 font-semibold shadow-xs';
                    }

                    return (
                      <button
                        key={optIndex}
                        onClick={() => handleSelectOption(q.id, optIndex)}
                        disabled={isSubmitted}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${optionStyle}`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="font-mono text-xs opacity-60 mt-0.5">
                            {String.fromCharCode(65 + optIndex)}.
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </div>
                        {isSubmitted && isActualCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        {isSubmitted && isOptionSelected && !isActualCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation block when submitted */}
                {isSubmitted && (
                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 animate-in fade-in duration-200">
                    <div className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Pembahasan Ilmiah:</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                      {q.explanation}
                    </p>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Sumber: <span className="text-slate-300 italic">{q.source}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        {!isSubmitted ? (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsSubmitted(true)}
              disabled={!allAnswered}
              className={`px-8 py-3 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center gap-2 ${
                allAnswered
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {allAnswered ? 'Periksa Jawaban Kuis' : `Jawab Semua Soal (${Object.keys(selectedAnswers).length}/${QUIZ_QUESTIONS.length})`}
              </span>
            </button>
          </div>
        ) : (
          <div className="mt-8 flex justify-end">
            <button
              onClick={onNavigateToNext}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold text-xs transition-all group"
            >
              <span>Lihat Daftar Sumber & Validasi Ilmiah</span>
              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
