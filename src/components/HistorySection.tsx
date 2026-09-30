import React, { useState, useEffect } from 'react';
import { TIMELINE_DATA, TimelineMilestone } from '../data/aiData';
import { 
  History, 
  Calendar, 
  Award, 
  ExternalLink, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2, 
  Flame, 
  Snowflake, 
  Bot, 
  Brain, 
  ArrowRight,
  Clock,
  Play,
  Pause,
  Quote,
  TrendingUp,
  SlidersHorizontal,
  BookmarkCheck
} from 'lucide-react';

interface HistorySectionProps {
  onNavigateToNext: () => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({ onNavigateToNext }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'interactive' | 'slide'>('interactive');

  const selectedMilestone = TIMELINE_DATA[currentIndex];

  // Auto-play timer for interactive timeline
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % TIMELINE_DATA.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TIMELINE_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TIMELINE_DATA.length) % TIMELINE_DATA.length);
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'foundational':
        return <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">Kelahiran Resmi AI</span>;
      case 'downturn':
        return <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1"><Snowflake className="w-3 h-3" /> Era AI Winter</span>;
      case 'breakthrough':
        return <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1"><Flame className="w-3 h-3" /> Terobosan Komputasi</span>;
      case 'modern':
        return <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1"><Award className="w-3 h-3" /> Nobel & AI Agents</span>;
      default:
        return null;
    }
  };

  return (
    <section id="sejarah" className="py-16 md:py-24 bg-slate-900 border-b border-slate-800 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
              <History className="w-3.5 h-3.5 text-amber-400" />
              <span>Gambar 3 (Slide Presentasi 3)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Sejarah Perkembangan AI (Visualisasi Garis Waktu)
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Visualisasi interaktif tonggak-tonggak penting, inovasi revolusioner, dan titik balik peradaban AI sejak 1956 hingga era Hadiah Nobel & AI Agents masa kini.
            </p>
          </div>

          {/* View Mode Toggle: Interactive Timeline vs Slide Replica */}
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveView('interactive')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeView === 'interactive' 
                  ? 'bg-amber-500 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Garis Waktu Interaktif</span>
            </button>
            <button
              onClick={() => setActiveView('slide')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeView === 'slide' 
                  ? 'bg-amber-500 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Slide Asli (2 Kolom)</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE TIMELINE VISUALIZATION (Utama) */}
        {/* ============================================================== */}
        {activeView === 'interactive' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Timeline Horizontal Track Controller (PC & Tablet) */}
            <div className="bg-slate-950/80 p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-xl">
              
              {/* Stepper Header controls: Prev, Play/Pause, Next */}
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Jalur Linimasa ({currentIndex + 1} dari {TIMELINE_DATA.length})
                  </span>
                  <span className="text-[10px] text-slate-400 hidden sm:inline">
                    • Klik titik tahun untuk melompat
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                      isPlaying 
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    <span>{isPlaying ? 'Jeda' : 'Putar Otomatis'}</span>
                  </button>

                  <button
                    onClick={handlePrev}
                    aria-label="Tonggak Sebelumnya"
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Tonggak Selanjutnya"
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Visual Track Line & Milestone Nodes */}
              <div className="relative py-4 px-2">
                {/* Background Line */}
                <div className="absolute top-1/2 left-4 right-4 h-1 -translate-y-1/2 bg-slate-800 rounded-full" />
                
                {/* Active Progress Line */}
                <div 
                  className="absolute top-1/2 left-4 h-1 -translate-y-1/2 bg-gradient-to-r from-blue-500 via-amber-400 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${(currentIndex / (TIMELINE_DATA.length - 1)) * 92}%` }}
                />

                {/* Nodes Container */}
                <div className="relative flex justify-between items-center z-10">
                  {TIMELINE_DATA.map((item, idx) => {
                    const isSelected = idx === currentIndex;
                    const isPassed = idx < currentIndex;

                    return (
                      <button
                        key={item.year}
                        onClick={() => {
                          setCurrentIndex(idx);
                          setIsPlaying(false);
                        }}
                        className="flex flex-col items-center group focus:outline-none"
                      >
                        {/* Circle node */}
                        <div 
                          className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-mono font-bold text-[11px] sm:text-xs transition-all duration-300 border-2 ${
                            isSelected
                              ? 'bg-amber-400 text-slate-950 border-white shadow-lg shadow-amber-500/50 scale-125 ring-4 ring-amber-400/20'
                              : isPassed
                              ? 'bg-blue-600 text-white border-blue-400'
                              : 'bg-slate-900 text-slate-400 border-slate-700 group-hover:border-slate-500 group-hover:text-slate-200'
                          }`}
                        >
                          {idx + 1}
                        </div>

                        {/* Year Label */}
                        <span className={`mt-2 text-[10px] sm:text-xs font-mono font-semibold transition-colors ${
                          isSelected ? 'text-amber-300 font-bold scale-105' : 'text-slate-400 group-hover:text-slate-200'
                        }`}>
                          {item.year}
                        </span>

                        {/* Tiny short title (desktop only) */}
                        <span className="hidden md:block text-[9px] text-slate-500 text-center max-w-[85px] truncate mt-0.5">
                          {item.title.split(',')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Main Interactive Stage Display for Selected Milestone */}
            <div className="bg-slate-850 rounded-2xl border border-slate-700/80 shadow-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
              
              {/* Background ambient badge */}
              <div className="absolute -top-10 -right-10 text-[180px] font-mono font-extrabold text-white/[0.02] pointer-events-none select-none">
                {selectedMilestone.yearNumber}
              </div>

              {/* Milestone Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-700">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-mono font-extrabold text-sm sm:text-base shadow-sm">
                      {selectedMilestone.year}
                    </span>
                    {getCategoryBadge(selectedMilestone.category)}
                    <span className="text-xs text-slate-400 font-medium">
                      {selectedMilestone.period}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                    {selectedMilestone.title}
                  </h3>
                </div>

                {/* Key Metric Highlight Card */}
                {selectedMilestone.metricHighlight && (
                  <div className="shrink-0 bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-900 p-4 rounded-xl border border-amber-500/30 flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-lg sm:text-xl font-mono font-black text-amber-300 block">
                        {selectedMilestone.metricHighlight.value}
                      </span>
                      <span className="text-[11px] text-slate-400 block font-medium">
                        {selectedMilestone.metricHighlight.label}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* 2-Columns Grid: Original Slide Points vs In-Depth Validated Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Column Left (5 cols): Poin Rangkuman Slide & Quote */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Slide Points Box */}
                  <div className="bg-slate-900 p-5 rounded-xl border border-slate-700/80 space-y-3">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <BookmarkCheck className="w-4 h-4" />
                      Poin Inti Slide (Gambar 3):
                    </span>
                    <ul className="space-y-2.5">
                      {selectedMilestone.bulletPoints.map((bp, i) => (
                        <li key={i} className="text-xs sm:text-sm text-slate-200 flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{bp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Famous Quote from Paper/Source */}
                  {selectedMilestone.quote && (
                    <div className="bg-gradient-to-r from-blue-950/40 to-slate-900 p-4 rounded-xl border border-blue-800/40 space-y-1.5">
                      <Quote className="w-4 h-4 text-blue-400" />
                      <p className="text-xs text-slate-300 italic leading-relaxed">
                        "{selectedMilestone.quote}"
                      </p>
                      <span className="text-[10px] text-slate-400 block text-right font-mono">
                        — Dokumen Resmi {selectedMilestone.year}
                      </span>
                    </div>
                  )}

                  {/* Figures or Org */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Tokoh Kunci & Lembaga Terlibat:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMilestone.figuresOrOrg.map((f, i) => (
                        <span key={i} className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Column Right (7 cols): Deep Validated Explanation */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>Penjelasan Ilmiah & Konteks Historis Valid:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                      {selectedMilestone.deepExplanation}
                    </p>
                  </div>

                  {/* Historical Significance */}
                  <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider block">
                      Dampak Terhadap Perkembangan Dunia:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedMilestone.significance}
                    </p>
                  </div>

                  {/* Primary Academic Source Citation */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Sumber Primer Terverifikasi:
                      </span>
                      <span className="text-slate-500 font-mono text-[10px]">Dokumen Akademik</span>
                    </div>
                    <p className="text-xs text-slate-300 font-mono italic leading-relaxed">
                      {selectedMilestone.validSource}
                    </p>
                  </div>

                  {/* Prev/Next buttons below card */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={handlePrev}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Sebelumnya</span>
                    </button>

                    <button
                      onClick={handleNext}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>Selanjutnya</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* SLIDE PRESENTATION REPLICA VIEW (2 Kolom persis Gambar 3) */}
        {/* ============================================================== */}
        {activeView === 'slide' && (
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-white text-slate-800 transition-all mb-8 animate-in fade-in duration-300">
            
            {/* Header Banner - Exact replica of user's dark navy header */}
            <div className="bg-[#0b162c] text-white py-6 px-6 text-center relative border-b-2 border-amber-500/40">
              <div className="absolute top-2 left-4 text-[10px] text-amber-300/80 font-mono tracking-wider uppercase">
                Slide 3 • Gambar 3
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm font-sans">
                Sejarah Perkembangan AI
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/80 mt-1 font-medium">
                Tonggak Sejarah Utama & Titik Balik Peradaban Komputasi
              </p>
            </div>

            {/* Slide Content Body: 2 Columns matching exactly user's screenshot */}
            <div className="p-6 sm:p-10 md:p-12 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                
                {/* Left Column: 1956, 1974-1993, 1997 */}
                <div className="space-y-8">
                  {/* 1956 */}
                  <div className="p-4 rounded-xl border border-transparent hover:border-blue-300 hover:bg-blue-50/50 transition-all">
                    <h4 className="text-lg sm:text-xl font-extrabold text-[#004b87] leading-snug">
                      1956 Konferensi Dartmouth, Kelahiran Istilah "AI"
                    </h4>
                    <ul className="mt-2.5 space-y-1.5 text-sm sm:text-base text-slate-700 list-disc list-inside">
                      <li>Digagas oleh John McCarthy, Marvin Minsky, Nathaniel Rochester, dan Claude Shannon</li>
                      <li>Berlangsung 8 minggu di Dartmouth College, AS</li>
                      <li>Titik awal AI sebagai bidang ilmu resmi</li>
                    </ul>
                  </div>

                  {/* 1974-1993 */}
                  <div className="p-4 rounded-xl border border-transparent hover:border-sky-300 hover:bg-sky-50/50 transition-all">
                    <h4 className="text-lg sm:text-xl font-extrabold text-[#004b87] leading-snug">
                      1974-1993 Era AI Winter
                    </h4>
                    <ul className="mt-2.5 space-y-1.5 text-sm sm:text-base text-slate-700 list-disc list-inside">
                      <li>Dua periode penurunan minat & dana riset AI</li>
                      <li>Penyebab: ekspektasi terlalu tinggi, teknologi belum siap</li>
                      <li>Riset AI sempat hampir terhenti selama ±20 tahun</li>
                    </ul>
                  </div>

                  {/* 1997 */}
                  <div className="p-4 rounded-xl border border-transparent hover:border-amber-300 hover:bg-amber-50/50 transition-all">
                    <h4 className="text-lg sm:text-xl font-extrabold text-[#004b87] leading-snug">
                      1997 Deep Blue Mengalahkan Kasparov
                    </h4>
                    <ul className="mt-2.5 space-y-1.5 text-sm sm:text-base text-slate-700 list-disc list-inside">
                      <li>Superkomputer catur buatan IBM</li>
                      <li>Mengalahkan Garry Kasparov, juara catur dunia</li>
                      <li>Pertama kalinya mesin menang atas manusia terbaik dalam permainan strategi kompleks</li>
                    </ul>
                  </div>
                </div>

                {/* Right Column: 2012, 2022, 2024-2026 */}
                <div className="space-y-8">
                  {/* 2012 */}
                  <div className="p-4 rounded-xl border border-transparent hover:border-indigo-300 hover:bg-indigo-50/50 transition-all">
                    <h4 className="text-lg sm:text-xl font-extrabold text-[#004b87] leading-snug">
                      2012 AlexNet, Ledakan Deep Learning
                    </h4>
                    <ul className="mt-2.5 space-y-1.5 text-sm sm:text-base text-slate-700 list-disc list-inside">
                      <li>Menang telak di kompetisi pengenalan gambar ImageNet</li>
                      <li>Membuktikan kekuatan deep learning</li>
                      <li>Memicu ledakan riset & investasi AI modern</li>
                    </ul>
                  </div>

                  {/* 2022 */}
                  <div className="p-4 rounded-xl border border-transparent hover:border-emerald-300 hover:bg-emerald-50/50 transition-all">
                    <h4 className="text-lg sm:text-xl font-extrabold text-[#004b87] leading-snug">
                      2022 ChatGPT Diluncurkan
                    </h4>
                    <ul className="mt-2.5 space-y-1.5 text-sm sm:text-base text-slate-700 list-disc list-inside">
                      <li>Dirilis OpenAI, 30 November 2022</li>
                      <li>100 juta pengguna hanya dalam 2 bulan</li>
                      <li>Aplikasi dengan pertumbuhan tercepat dalam sejarah</li>
                    </ul>
                  </div>

                  {/* 2024-2026 */}
                  <div className="p-4 rounded-xl border border-transparent hover:border-purple-300 hover:bg-purple-50/50 transition-all">
                    <h4 className="text-lg sm:text-xl font-extrabold text-[#004b87] leading-snug">
                      2024–2026 Nobel Prize & Era AI Agents
                    </h4>
                    <ul className="mt-2.5 space-y-1.5 text-sm sm:text-base text-slate-700 list-disc list-inside">
                      <li>AlphaFold (Google DeepMind) raih Nobel Kimia 2024</li>
                      <li>AI mulai bertransisi dari "menjawab" → "bertindak"</li>
                      <li>Kemunculan AI agents yang bekerja otomatis</li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer inside replica */}
            <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
              <span>Disertai penjelasan valid dari Arsip Dartmouth, Lighthill Report, IBM Research, NeurIPS, & Yayasan Nobel</span>
              <span className="font-semibold text-amber-700">Slide 3 dari 3 Seri Modul AI</span>
            </div>
          </div>
        )}

        {/* Next Section CTA */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={onNavigateToNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 font-semibold text-xs transition-all group"
          >
            <span>Lanjut ke Bagian: AI vs Machine Learning (Taksonomi AI)</span>
            <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
