import React, { useState } from 'react';
import { AI_BRANCHES, AIBranch } from '../data/aiData';
import { 
  Layers, 
  BrainCircuit, 
  Network, 
  MessageSquareCode, 
  Eye, 
  Bot, 
  Cpu, 
  ShieldCheck, 
  ExternalLink, 
  BookOpen, 
  CheckCircle2, 
  Search, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info
} from 'lucide-react';

interface ScopeSectionProps {
  onNavigateToNext: () => void;
}

export const ScopeSection: React.FC<ScopeSectionProps> = ({ onNavigateToNext }) => {
  const [selectedBranch, setSelectedBranch] = useState<AIBranch | null>(AI_BRANCHES[0]);
  const [filterQuery, setFilterQuery] = useState('');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const getBranchIcon = (iconName: string) => {
    switch (iconName) {
      case 'BrainCircuit': return <BrainCircuit className="w-5 h-5" />;
      case 'Network': return <Network className="w-5 h-5" />;
      case 'MessageSquareCode': return <MessageSquareCode className="w-5 h-5" />;
      case 'Eye': return <Eye className="w-5 h-5" />;
      case 'Bot': return <Bot className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const filteredBranches = AI_BRANCHES.filter(branch => 
    branch.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    branch.shortDesc.toLowerCase().includes(filterQuery.toLowerCase()) ||
    branch.academicSource.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <section id="ruang-lingkup" className="py-16 md:py-24 bg-slate-950/50 backdrop-blur-[2px] border-b border-slate-800/60 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Gambar 2 (Slide Presentasi 2)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ruang Lingkup AI & Cabang Utama
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Dilengkapi penjelasan mendalam bersumber dari literatur ilmiah valid (IEEE, Nature, Stanford University, MIT Press, & UNESCO).
            </p>
          </div>

          {/* Quick Filter */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari cabang AI atau sumber..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 w-full sm:w-64"
            />
          </div>
        </div>

        {/* ============================================================== */}
        {/* REPLICA OF USER'S SLIDE 2 (Ruang Lingkup AI) */}
        {/* ============================================================== */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-white text-slate-800 transition-all mb-12">
          
          {/* Header Banner - Exact replica of user's dark navy header */}
          <div className="bg-[#0b162c] text-white py-6 px-6 text-center relative border-b-2 border-cyan-500/40">
            <div className="absolute top-2 left-4 text-[10px] text-cyan-300/80 font-mono tracking-wider uppercase">
              Slide 2 • Gambar 2
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm font-sans">
              Ruang Lingkup AI
            </h3>
            <p className="text-xs sm:text-sm text-cyan-200/80 mt-1 font-medium">
              Taksonomi Domain & Disiplin Penerapan Kecerdasan Buatan
            </p>
          </div>

          {/* Slide Content Body: Exact text and bullets from image */}
          <div className="p-6 sm:p-10 md:p-12 bg-white">
            <div className="max-w-4xl mx-auto">
              
              <div className="mb-6">
                <h4 className="text-xl sm:text-2xl font-bold text-[#004b87] tracking-tight flex items-center gap-2">
                  <span>Ini Beberapa Cabang utama AI:</span>
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Format ringkasan kurikulum (klik salah satu cabang di bawah untuk membuka penjelasan ilmiah dari sumber valid):
                </p>
              </div>

              {/* Bullet list styled identically to the slide */}
              <ul className="space-y-3.5 text-base sm:text-lg text-slate-800">
                {AI_BRANCHES.map((branch) => {
                  const isSelected = selectedBranch?.id === branch.id;
                  return (
                    <li 
                      key={branch.id} 
                      onClick={() => {
                        setSelectedBranch(branch);
                        // Also auto-scroll slightly to detail section on mobile if needed
                      }}
                      className={`p-3 rounded-xl transition-all cursor-pointer flex items-start gap-3 border ${
                        isSelected 
                          ? 'bg-blue-50 border-blue-400 shadow-sm text-blue-950 font-semibold' 
                          : 'hover:bg-slate-50 border-transparent hover:border-slate-200'
                      }`}
                    >
                      <span className="text-blue-600 font-extrabold text-xl leading-none mt-0.5">•</span>
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <strong className="text-slate-900 font-bold">{branch.name}</strong>
                          <span className="text-slate-700"> : {branch.shortDesc}</span>
                        </div>
                        <span className="text-[11px] text-blue-600 bg-blue-100/70 px-2 py-0.5 rounded-full shrink-0 font-medium inline-flex items-center gap-1">
                          <Info className="w-3 h-3" />
                          <span>Buka Validasi</span>
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

            </div>
          </div>

          {/* Footer inside replica */}
          <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
            <span>Disertai penjelasan valid dari publikasi Nature, Stanford Univ, MIT Press, & UNESCO</span>
            <span className="font-semibold text-blue-700">Slide 2 dari 3 Seri Modul AI</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* EXPANSION: PENJELASAN DARI SUMBER VALID (Sesuai Permintaan User) */}
        {/* ============================================================== */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 bg-cyan-400 rounded-full" />
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Eksplorasi Detail 7 Cabang AI & Rujukan Sumber Valid
            </h3>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm">
            Setiap cabang di bawah ini diuraikan dengan definisi otoritatif, prinsip kerja teknis, konsep kunci, contoh kasus industri nyata, 
            serta atribusi sumber literatur akademik yang dapat dipertanggungjawabkan:
          </p>

          {/* Interactive Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBranches.map((branch) => {
              const isExpanded = expandedCardId === branch.id;
              const isSelected = selectedBranch?.id === branch.id;

              return (
                <div
                  key={branch.id}
                  className={`rounded-2xl p-6 transition-all flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400/80 shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400/30'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Card Header with Icon & Category */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                          {getBranchIcon(branch.iconName)}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white leading-tight">
                            {branch.name}
                          </h4>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {branch.yearOrReference}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Short summary */}
                    <p className="text-xs text-slate-300 font-medium bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                      "{branch.shortDesc}"
                    </p>

                    {/* Scientific Explanation */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-semibold text-cyan-300 flex items-center gap-1 uppercase tracking-wider">
                        <BookOpen className="w-3 h-3" />
                        <span>Penjelasan Ilmiah:</span>
                      </div>
                      <p className={`text-xs text-slate-300 leading-relaxed ${!isExpanded ? 'line-clamp-4' : ''}`}>
                        {branch.fullExplanation}
                      </p>
                    </div>

                    {/* Toggle expand if text is long */}
                    <button
                      onClick={() => setExpandedCardId(isExpanded ? null : branch.id)}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 transition-colors"
                    >
                      <span>{isExpanded ? 'Sembunyikan' : 'Baca Selengkapnya'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {/* Expanded Content: Key Concepts & Real World Examples */}
                    {isExpanded && (
                      <div className="space-y-3 pt-3 border-t border-slate-800 animate-in fade-in duration-200">
                        {/* Key Concepts */}
                        <div>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                            Konsep Kunci:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {branch.keyConcepts.map((kc, i) => (
                              <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                                {kc}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Real World Examples */}
                        <div>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                            Contoh Nyata:
                          </span>
                          <ul className="space-y-1">
                            {branch.realWorldExamples.map((ex, i) => (
                              <li key={i} className="text-xs text-slate-300 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                                <span>{ex}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Academic Source Badge at Bottom */}
                  <div className="mt-5 pt-3 border-t border-slate-800/80">
                    <div className="text-[10px] text-slate-400 font-semibold mb-1 flex items-center justify-between">
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Sumber Valid Terverifikasi
                      </span>
                      <span className="text-slate-500 font-mono text-[9px]">
                        {branch.sourceType}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300 italic font-mono bg-slate-950/80 p-2 rounded border border-slate-800">
                      {branch.academicSource}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Section CTA */}
        <div className="mt-12 flex justify-end">
          <button
            onClick={onNavigateToNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold text-xs transition-all group"
          >
            <span>Lanjut ke Gambar 3: Sejarah Perkembangan AI</span>
            <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
