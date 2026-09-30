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

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="hero" className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-[#0a1120] via-[#0f1d36] to-[#0a1120] text-white overflow-hidden">
      {/* Background ambient decorative glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Tag */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-500/40 text-blue-200 text-xs font-semibold backdrop-blur-sm shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Kurikulum & Ensiklopedia Kecerdasan Buatan Terpadu</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Berdasarkan Sumber Valid & Nobel 2024</span>
          </div>
        </div>

        {/* Main Title according to user prompt */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Ruang Lingkup, Konsep AI, <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Sejarah Perkembangan AI
            </span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl text-slate-200 font-semibold mt-2 block">
              & AI vs Machine Learning (Taksonomi AI)
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Media pembelajaran komprehensif yang membedah esensi definisi kecerdasan buatan, 
            klasifikasi 7 cabang utama dari sumber ilmiah terverifikasi, linimasa sejarah dari 
            Konferensi Dartmouth 1956 hingga era Hadiah Nobel & AI Agents masa kini, serta taksonomi relasional AI vs Machine Learning.
          </p>

          {/* Quick Action CTA buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('konsep')}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 group"
            >
              <span>Mulai dari Gambar 1: Konsep AI</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('ruang-lingkup')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Gambar 2: Ruang Lingkup AI</span>
            </button>
            <button
              onClick={() => onNavigate('sejarah')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <History className="w-4 h-4 text-amber-400" />
              <span>Gambar 3: Sejarah AI</span>
            </button>
          </div>
        </div>

        {/* 4 Feature Highlights Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => onNavigate('konsep')}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-850 transition-all cursor-pointer group shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
              Gambar 1 (Slide 1)
            </div>
            <h2 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
              Konsep AI & Definisi IBM
            </h2>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Memahami esensi kecerdasan buatan, definisi IBM, pernyataan John McCarthy, dan 4 kuadran agen rasional Russell & Norvig.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('ruang-lingkup')}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 transition-all cursor-pointer group shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
              Gambar 2 (Slide 2)
            </div>
            <h2 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              Ruang Lingkup & 7 Cabang AI
            </h2>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Penjelasan valid untuk Machine Learning, Deep Learning, NLP, Computer Vision, Robotics, Sistem Pakar, dan AI Ethics.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('sejarah')}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 transition-all cursor-pointer group shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
              <History className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              Gambar 3 (Slide 3)
            </div>
            <h2 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
              Sejarah Perkembangan AI
            </h2>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Linimasa 1956 Dartmouth, Era AI Winter, Deep Blue 1997, AlexNet 2012, ChatGPT 2022, hingga Nobel Prize 2024 & AI Agents.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('taksonomi')}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-850 transition-all cursor-pointer group shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
              <GitFork className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
              Materi Inti (Taksonomi)
            </div>
            <h2 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
              AI vs Machine Learning
            </h2>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Diagram Venn relasi hierarkis, tabel komparasi parameter detail, serta klasifikasi tingkat kecerdasan ANI, AGI, dan ASI.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
