import React from 'react';
import { 
  Sparkles, 
  Layers, 
  History, 
  GitFork, 
  ArrowRight, 
  ShieldCheck, 
  Award,
  BookOpen
} from 'lucide-react';
import { AgungLogo } from './AgungLogo';
import { AnimatedLetterText } from './AnimatedLetterText';
import { useTheme } from '../context/ThemeContext';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="hero" className={`relative pt-24 pb-16 md:pt-32 md:pb-24 bg-transparent ${isDark ? 'text-white' : 'text-slate-900'} overflow-hidden`}>
      {/* Background ambient decorative glows */}
      {isDark ? (
        <>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Tag */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 animate-emerge">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm transition-colors ${
            isDark 
              ? 'bg-blue-900/60 border border-blue-500/40 text-blue-200 shadow-sm' 
              : 'bg-white border-2 border-blue-300 text-blue-950 shadow-sm'
          }`}>
            <AgungLogo size={20} glow={isDark} />
            <span className={`font-bold ${isDark ? 'text-cyan-300' : 'text-blue-700'}`}>AGUNGPROJECT.ID</span>
            <span className="text-slate-400">•</span>
            <span>Kurikulum & Ensiklopedia AI Terpadu</span>
          </div>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            isDark
              ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
              : 'bg-emerald-50 border-2 border-emerald-300 text-emerald-900 shadow-sm'
          }`}>
            <ShieldCheck className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
            <span>Berdasarkan Sumber Valid & Nobel 2024</span>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center max-w-4xl mx-auto animate-emerge-delay-1">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            <AnimatedLetterText 
              text="Ruang Lingkup, Konsep AI," 
              className={isDark ? 'text-white drop-shadow-md' : 'text-slate-950 font-black'}
            />
            <br />
            <AnimatedLetterText 
              text="Sejarah Perkembangan AI"
              delayOffset={24}
              className={isDark ? 'drop-shadow-lg' : 'text-slate-950 font-black'}
            />
            <br />
            <span className={`text-2xl sm:text-3xl md:text-4xl font-extrabold mt-2 block ${
              isDark ? 'text-slate-200' : 'text-slate-900'
            }`}>
              & AI vs Machine Learning (Taksonomi AI)
            </span>
          </h1>

          <p className={`mt-6 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-medium ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Media pembelajaran komprehensif yang membedah esensi definisi kecerdasan buatan, 
            klasifikasi 7 cabang utama dari sumber ilmiah terverifikasi, linimasa sejarah dari 
            Konferensi Dartmouth 1956 hingga era Hadiah Nobel & AI Agents masa kini, serta taksonomi relasional AI vs Machine Learning.
          </p>

          {/* Quick Action CTA buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-emerge-delay-2">
            <button
              onClick={() => onNavigate('konsep')}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 group ring-2 ring-blue-500/20"
            >
              <span>Mulai Belajar: Konsep AI</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('ruang-lingkup')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-sm ${
                isDark 
                  ? 'bg-slate-850 hover:bg-slate-800 text-slate-100 border border-slate-700' 
                  : 'bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-300 hover:border-cyan-500 hover:shadow-md'
              }`}
            >
              <Layers className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <span>Ruang Lingkup AI</span>
            </button>
            <button
              onClick={() => onNavigate('sejarah')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-sm ${
                isDark 
                  ? 'bg-slate-850 hover:bg-slate-800 text-slate-100 border border-slate-700' 
                  : 'bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-300 hover:border-amber-500 hover:shadow-md'
              }`}
            >
              <History className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
              <span>Sejarah AI</span>
            </button>
            <button
              onClick={() => onNavigate('taksonomi')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-sm group ${
                isDark 
                  ? 'bg-slate-850 hover:bg-slate-800 text-slate-100 border border-slate-700 hover:border-indigo-500/50' 
                  : 'bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-300 hover:border-indigo-500 hover:shadow-md'
              }`}
            >
              <GitFork className={`w-4 h-4 group-hover:rotate-12 transition-transform ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <span>AI vs ML (Taksonomi AI)</span>
            </button>
          </div>
        </div>

        {/* 4 Feature Highlights Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-emerge-delay-3">
          <div 
            onClick={() => onNavigate('konsep')}
            className={`p-5 rounded-2xl transition-all cursor-pointer group shadow-sm ${
              isDark 
                ? 'bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-850' 
                : 'bg-white border-2 border-slate-200 hover:border-blue-500 hover:shadow-lg'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
              isDark 
                ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' 
                : 'bg-blue-50 border border-blue-200 text-blue-600'
            }`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${
              isDark ? 'text-blue-400' : 'text-blue-700'
            }`}>
              Materi Bab 1
            </div>
            <h2 className={`text-base font-extrabold transition-colors ${
              isDark ? 'text-white group-hover:text-blue-300' : 'text-slate-950 group-hover:text-blue-600'
            }`}>
              Konsep AI & Definisi IBM
            </h2>
            <p className={`mt-2 text-xs leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600 font-medium'
            }`}>
              Memahami esensi kecerdasan buatan, definisi IBM, pernyataan John McCarthy, dan 4 kuadran agen rasional Russell & Norvig.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('ruang-lingkup')}
            className={`p-5 rounded-2xl transition-all cursor-pointer group shadow-sm ${
              isDark 
                ? 'bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850' 
                : 'bg-white border-2 border-slate-200 hover:border-cyan-500 hover:shadow-lg'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
              isDark 
                ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400' 
                : 'bg-cyan-50 border border-cyan-200 text-cyan-700'
            }`}>
              <Layers className="w-5 h-5" />
            </div>
            <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${
              isDark ? 'text-cyan-400' : 'text-cyan-700'
            }`}>
              Materi Bab 2
            </div>
            <h2 className={`text-base font-extrabold transition-colors ${
              isDark ? 'text-white group-hover:text-cyan-300' : 'text-slate-950 group-hover:text-cyan-700'
            }`}>
              Ruang Lingkup & 7 Cabang AI
            </h2>
            <p className={`mt-2 text-xs leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600 font-medium'
            }`}>
              Penjelasan valid untuk Machine Learning, Deep Learning, NLP, Computer Vision, Robotics, Sistem Pakar, dan AI Ethics.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('sejarah')}
            className={`p-5 rounded-2xl transition-all cursor-pointer group shadow-sm ${
              isDark 
                ? 'bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850' 
                : 'bg-white border-2 border-slate-200 hover:border-amber-500 hover:shadow-lg'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
              isDark 
                ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400' 
                : 'bg-amber-50 border border-amber-200 text-amber-700'
            }`}>
              <History className="w-5 h-5" />
            </div>
            <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${
              isDark ? 'text-amber-400' : 'text-amber-700'
            }`}>
              Materi Bab 3
            </div>
            <h2 className={`text-base font-extrabold transition-colors ${
              isDark ? 'text-white group-hover:text-amber-300' : 'text-slate-950 group-hover:text-amber-700'
            }`}>
              Sejarah Perkembangan AI
            </h2>
            <p className={`mt-2 text-xs leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600 font-medium'
            }`}>
              Linimasa 1956 Dartmouth, Era AI Winter, Deep Blue 1997, AlexNet 2012, ChatGPT 2022, hingga Nobel Prize 2024 & AI Agents.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('taksonomi')}
            className={`p-5 rounded-2xl transition-all cursor-pointer group shadow-sm ${
              isDark 
                ? 'bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-850' 
                : 'bg-white border-2 border-slate-200 hover:border-indigo-500 hover:shadow-lg'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
              isDark 
                ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400' 
                : 'bg-indigo-50 border border-indigo-200 text-indigo-700'
            }`}>
              <GitFork className="w-5 h-5" />
            </div>
            <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${
              isDark ? 'text-indigo-400' : 'text-indigo-700'
            }`}>
              Materi Inti (Taksonomi)
            </div>
            <h2 className={`text-base font-extrabold transition-colors ${
              isDark ? 'text-white group-hover:text-indigo-300' : 'text-slate-950 group-hover:text-indigo-700'
            }`}>
              AI vs Machine Learning
            </h2>
            <p className={`mt-2 text-xs leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600 font-medium'
            }`}>
              Diagram Venn bertingkat AI vs ML vs DL vs GenAI, alur kerja komparatif, dan tabel taksonomi perbedaan esensial.
            </p>
          </div>
        </div>

        {/* 3 Academic Principles Highlights */}
        <div className={`mt-10 p-5 rounded-2xl border transition-colors ${
          isDark 
            ? 'bg-slate-950/60 border-slate-800 text-slate-300' 
            : 'bg-white border-2 border-slate-200 text-slate-800 shadow-md'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-start gap-3">
              <div className={`p-2.5 rounded-xl shrink-0 ${
                isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                  Rujukan Akademis Standar
                </h4>
                <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>
                  Materi merujuk buku teks pegangan dunia <em>Russell & Norvig (2020)</em> dan literatur jurnal <em>Nature</em>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className={`p-2.5 rounded-xl shrink-0 ${
                isDark ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                  Linimasa Mutakhir 2026
                </h4>
                <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>
                  Mencakup Hadiah Nobel Fisika & Kimia 2024 (Hopfield, Hinton, Hassabis) hingga era Autonomous AI Agents.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className={`p-2.5 rounded-xl shrink-0 ${
                isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                  Bebas Mitos & Ilmiah
                </h4>
                <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>
                  Klarifikasi taksonomi presisi: Machine Learning adalah bagian dari AI, dan Deep Learning adalah bagian dari ML.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
