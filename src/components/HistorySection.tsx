import React, { useState } from 'react';
import { TIMELINE_DATA, TimelineMilestone } from '../data/aiData';
import { 
  History, 
  Calendar, 
  Award, 
  ExternalLink, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  Flame, 
  Snowflake, 
  Bot, 
  Brain, 
  ArrowRight,
  Clock,
  Filter
} from 'lucide-react';

interface HistorySectionProps {
  onNavigateToNext: () => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({ onNavigateToNext }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone>(TIMELINE_DATA[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredTimeline = activeCategory === 'all' 
    ? TIMELINE_DATA 
    : TIMELINE_DATA.filter(item => item.category === activeCategory);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'foundational':
        return <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">Kelahiran Resmi</span>;
      case 'downturn':
        return <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1"><Snowflake className="w-3 h-3" /> AI Winter</span>;
      case 'breakthrough':
        return <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1"><Flame className="w-3 h-3" /> Terobosan</span>;
      case 'modern':
        return <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1"><Award className="w-3 h-3" /> Nobel & Agents</span>;
      default:
        return null;
    }
  };

  return (
    <section id="sejarah" className="py-16 md:py-24 bg-slate-900 border-b border-slate-800 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
              <History className="w-3.5 h-3.5 text-amber-400" />
              <span>Gambar 3 (Slide Presentasi 3)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Sejarah Perkembangan AI
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Perjalanan evolusi kecerdasan buatan dari Konferensi Dartmouth 1956 hingga era Hadiah Nobel Kimia & Fisika 2024 dan Autonomous AI Agents.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700 text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeCategory === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Semua Era (6)
            </button>
            <button
              onClick={() => setActiveCategory('foundational')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeCategory === 'foundational' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              1956 Fondasi
            </button>
            <button
              onClick={() => setActiveCategory('breakthrough')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeCategory === 'breakthrough' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Terobosan
            </button>
            <button
              onClick={() => setActiveCategory('modern')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeCategory === 'modern' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Era Modern (2022-2026)
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* REPLICA OF USER'S SLIDE 3 (Sejarah Perkembangan AI) */}
        {/* ============================================================== */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-white text-slate-800 transition-all mb-12">
          
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
                <div 
                  onClick={() => setSelectedMilestone(TIMELINE_DATA[0])}
                  className="p-4 rounded-xl border border-transparent hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer group"
                >
                  <h4 className="text-lg sm:text-xl font-extrabold text-[#004b87] leading-snug group-hover:text-blue-700">
                    1956 Konferensi Dartmouth, Kelahiran Istilah "AI"
                  </h4>
                  <ul className="mt-2.5 space-y-1.5 text-sm sm:text-base text-slate-700 list-disc list-inside">
                    <li>Digagas oleh John McCarthy, Marvin Minsky, Nathaniel Rochester, dan Claude Shannon</li>
                    <li>Berlangsung 8 minggu di Dartmouth College, AS</li>
                    <li>Titik awal AI sebagai bidang ilmu resmi</li>
                  </ul>
                </div>

                {/* 1974-1993 */}
                <div 
                  onClick={() => setSelectedMilestone(TIMELINE_DATA[1])}
                  className="p-4 rounded-xl border border-transparent hover:border-sky-300 hover:bg-sky-50/50 transition-all cursor-pointer group"
                >
                  <h4 className="text-lg sm:text-xl font-extrabold text-[#004b87] leading-snug group-hover:text-blue-700">
                    1974-1993 Era AI Winter
                  </h4>
                  <ul className="mt-2.5 space-y-1.5 text-sm sm:text-base text-slate-700 list-disc list-inside">
                    <li>Dua periode penurunan minat & dana riset AI</li>
                    <li>Penyebab: ekspektasi terlalu tinggi, teknologi belum siap</li>
                    <li>Riset AI sempat hampir terhenti selama ±20 tahun</li>
                  </ul>
                </div>

                {/* 1997 */}
                <div 
                  onClick={() => setSelectedMilestone(TIMELINE_DATA[2])}
                  className="p-4 rounded-xl border border-transparent hover:border-amber-300 hover:bg-amber-50/50 transition-all cursor-pointer group"
                >
                  <h4 className="text-lg sm:text-xl font-extrabold text-[#004b87] leading-snug group-hover:text-blue-700">
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
                <div 
                  onClick={() => setSelectedMilestone(TIMELINE_DATA[3])}
                  className="p-4 rounded-xl border border-transparent hover:border-indigo-300 hover:bg-indigo-50/50 transition-all cursor-pointer group"
                >
                  <h4 className="text-lg sm:text-xl font-extrabold text-[#004b87] leading-snug group-hover:text-blue-700">
                    2012 AlexNet, Ledakan Deep Learning
                  </h4>
                  <ul className="mt-2.5 space-y-1.5 text-sm sm:text-base text-slate-700 list-disc list-inside">
                    <li>Menang telak di kompetisi pengenalan gambar ImageNet</li>
                    <li>Membuktikan kekuatan deep learning</li>
                    <li>Memicu ledakan riset & investasi AI modern</li>
                  </ul>
                </div>

                {/* 2022 */}
                <div 
                  onClick={() => setSelectedMilestone(TIMELINE_DATA[4])}
                  className="p-4 rounded-xl border border-transparent hover:border-emerald-300 hover:bg-emerald-50/50 transition-all cursor-pointer group"
                >
                  <h4 className="text-lg sm:text-xl font-extrabold text-[#004b87] leading-snug group-hover:text-blue-700">
                    2022 ChatGPT Diluncurkan
                  </h4>
                  <ul className="mt-2.5 space-y-1.5 text-sm sm:text-base text-slate-700 list-disc list-inside">
                    <li>Dirilis OpenAI, 30 November 2022</li>
                    <li>100 juta pengguna hanya dalam 2 bulan</li>
                    <li>Aplikasi dengan pertumbuhan tercepat dalam sejarah</li>
                  </ul>
                </div>

                {/* 2024-2026 */}
                <div 
                  onClick={() => setSelectedMilestone(TIMELINE_DATA[5])}
                  className="p-4 rounded-xl border border-transparent hover:border-purple-300 hover:bg-purple-50/50 transition-all cursor-pointer group"
                >
                  <h4 className="text-lg sm:text-xl font-extrabold text-[#004b87] leading-snug group-hover:text-blue-700">
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

        {/* ============================================================== */}
        {/* EXPANSION: PENJELASAN ILMIAH MENDALAM DARI SUMBER VALID */}
        {/* (Sesuai Permintaan User: "tambahkan penjelasan, penjelasannya harus valid") */}
        {/* ============================================================== */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 bg-amber-400 rounded-full" />
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Eksplorasi Rinci & Validasi Sejarah dari Dokumen Resmi
            </h3>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm">
            Klik salah satu peristiwa di bawah ini untuk melihat analisis historis mendalam, konteks sosiologis-teknologi, 
            dan kutipan langsung dokumen aslinya:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left selector list */}
            <div className="lg:col-span-4 space-y-2">
              {filteredTimeline.map((item) => {
                const isSelected = selectedMilestone.year === item.year;
                return (
                  <button
                    key={item.year}
                    onClick={() => setSelectedMilestone(item)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/60 shadow-md text-white'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-400 text-sm">
                          {item.year}
                        </span>
                        {getCategoryBadge(item.category)}
                      </div>
                      <div className="text-xs font-semibold line-clamp-1">
                        {item.title}
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-amber-400 translate-x-1' : 'opacity-40'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right detailed display card */}
            <div className="lg:col-span-8 bg-slate-850 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/80">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                      Tahun {selectedMilestone.year}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {selectedMilestone.period}
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-white mt-2">
                    {selectedMilestone.title}
                  </h4>
                </div>
              </div>

              {/* Original points recap */}
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Poin Rangkuman Slide:
                </span>
                <ul className="space-y-1.5">
                  {selectedMilestone.bulletPoints.map((bp, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deep scientific explanation */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ulasan Validasi Historis & Konteks Ilmiah:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  {selectedMilestone.deepExplanation}
                </p>
              </div>

              {/* Significance & Key Figures */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Signifikansi Bagi Peradaban:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedMilestone.significance}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Tokoh & Institusi Terlibat:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedMilestone.figuresOrOrg.map((fig, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {fig}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Valid Source Citation Box */}
              <div className="pt-4 border-t border-slate-700/80">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Sumber Valid Dokumen Asli
                  </span>
                  <span className="font-mono text-[10px]">Rujukan Akademik</span>
                </div>
                <div className="text-xs text-slate-300 font-mono italic bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {selectedMilestone.validSource}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Next Section CTA */}
        <div className="mt-12 flex justify-end">
          <button
            onClick={onNavigateToNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold text-xs transition-all group"
          >
            <span>Lanjut ke Taksonomi: AI vs Machine Learning</span>
            <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
