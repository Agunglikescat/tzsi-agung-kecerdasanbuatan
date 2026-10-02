import React, { useState } from 'react';
import { CONCEPT_DATA } from '../data/aiData';
import { 
  Sparkles, 
  HelpCircle, 
  Bot, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check,
  Compass,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { QuickFactBadge } from './QuickFactModal';
import { AnimatedLetterText } from './AnimatedLetterText';

interface ConceptSectionProps {
  onNavigateToNext: () => void;
}

export const ConceptSection: React.FC<ConceptSectionProps> = ({ 
  onNavigateToNext 
}) => {
  const [copiedQuote, setCopiedQuote] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'slide' | 'academic' | 'quadrants'>('slide');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuote(id);
    setTimeout(() => setCopiedQuote(null), 2000);
  };

  return (
    <section id="konsep" className="py-16 md:py-24 bg-slate-950/60 backdrop-blur-[2px] border-b border-slate-800/60 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Navigation Header Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Konsep Dasar AI</span>
              </div>
              <QuickFactBadge sectionId="konsep" variant="inline" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              <AnimatedLetterText text="Konsep Dasar Kecerdasan Buatan (AI)" />
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Definisi fundamental, pandangan IBM, pencetus istilah John McCarthy, dan kuadran agen rasional.
            </p>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="inline-flex p-1 bg-slate-800/90 rounded-xl border border-slate-700/70 text-xs font-medium">
            <button
              onClick={() => setActiveTab('slide')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'slide' 
                  ? 'bg-blue-600 text-white shadow-sm font-semibold' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Inti Konsep AI
            </button>
            <button
              onClick={() => setActiveTab('quadrants')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'quadrants' 
                  ? 'bg-blue-600 text-white shadow-sm font-semibold' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              4 Kuadran AI (Russell & Norvig)
            </button>
            <button
              onClick={() => setActiveTab('academic')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'academic' 
                  ? 'bg-blue-600 text-white shadow-sm font-semibold' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Validasi Ilmiah & Sumber
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MODUL KONSEP DASAR AI */}
        {/* ============================================================== */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-white text-slate-800 transition-all">
          
          {/* Header Banner - Exact replica of user's dark navy header */}
          <div className="bg-[#0b162c] text-white py-6 px-6 text-center relative border-b-2 border-cyan-500/40">
            <div className="absolute top-2 left-4 text-[10px] text-cyan-300/80 font-mono tracking-wider uppercase">
              Modul Pembelajaran AI
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm font-sans">
              Konsep AI
            </h3>
            <p className="text-xs sm:text-sm text-cyan-200/80 mt-1 font-medium">
              Kecerdasan Buatan (Artificial Intelligence)
            </p>
          </div>

          {/* Slide Content Body */}
          <div className="p-6 sm:p-10 md:p-12 space-y-12 bg-white">
            
            {/* Row 1: Apa itu AI? */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-10 border-b border-dashed border-slate-200">
              
              {/* Illustration Left: Thinking Person with Question Marks */}
              <div className="md:col-span-5 flex justify-center order-2 md:order-1">
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center bg-gradient-to-b from-blue-50/70 to-slate-100 rounded-3xl p-6 border border-slate-200 shadow-inner group">
                  {/* Question marks decorative */}
                  <span className="absolute top-4 left-6 text-2xl font-bold text-slate-400 animate-bounce duration-1000">?</span>
                  <span className="absolute top-2 right-8 text-3xl font-extrabold text-blue-500 animate-pulse">?</span>
                  <span className="absolute bottom-8 right-4 text-xl font-bold text-slate-500">?</span>
                  <span className="absolute bottom-10 left-4 text-2xl font-bold text-indigo-400">?</span>
                  
                  {/* SVG Illustration of Thinking Person */}
                  <div className="relative text-center">
                    <svg className="w-36 h-36 mx-auto text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {/* Head and body outline */}
                      <circle cx="12" cy="7" r="4" className="stroke-slate-800" strokeWidth="1.8" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" className="stroke-slate-800" strokeWidth="1.8" />
                      {/* Hand thinking gesture to chin */}
                      <path d="M12 11v2a2 2 0 0 0 2 2h1" className="stroke-blue-600" strokeWidth="2" />
                      {/* Brain wave sparkles */}
                      <path d="M9 3a2 2 0 0 1 2 -1" className="stroke-cyan-500" />
                      <path d="M15 2a2 2 0 0 1 2 2" className="stroke-cyan-500" />
                    </svg>
                    <div className="mt-2 text-xs font-semibold text-slate-500 bg-white/80 px-2 py-0.5 rounded-full inline-block border border-slate-200">
                      Penalaran & Logika Manusia
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Right: Apa itu AI? */}
              <div className="md:col-span-7 order-1 md:order-2 space-y-4">
                <div className="flex items-center gap-2">
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-[#004b87] tracking-tight">
                    Apa itu AI?
                  </h4>
                  <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2.5 py-0.5 rounded-full">
                    Definisi Dasar
                  </span>
                </div>

                <div className="text-base sm:text-lg text-slate-700 leading-relaxed space-y-3 font-normal">
                  <p>
                    <strong className="font-bold text-slate-900">Artificial Intelligence (AI) atau kecerdasan buatan</strong> adalah 
                    bidang dalam ilmu komputer yang berfokus pada pengembangan sistem yang dapat meniru kecerdasan manusia.
                  </p>
                  <p className="text-slate-600">
                    Sistem ini dirancang agar mampu <span className="font-semibold text-slate-900">belajar</span>,{' '}
                    <span className="font-semibold text-slate-900">bernalar</span>,{' '}
                    <span className="font-semibold text-slate-900">mengambil keputusan</span>, serta{' '}
                    <span className="font-semibold text-slate-900">menyelesaikan masalah</span> dengan cara yang menyerupai pemikiran manusia.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-medium border border-slate-200">
                    🧠 Meniru Kognisi
                  </span>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-medium border border-slate-200">
                    📊 Belajar dari Pengalaman
                  </span>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-medium border border-slate-200">
                    🎯 Pemecahan Masalah
                  </span>
                </div>
              </div>
            </div>

            {/* Row 2: Definisi AI menurut IBM */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
              
              {/* Text Left: Definisi IBM & John McCarthy */}
              <div className="md:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-[#004b87] tracking-tight">
                    Definisi AI menurut IBM
                  </h4>
                  <span className="text-xs bg-indigo-100 text-indigo-800 font-semibold px-2.5 py-0.5 rounded-full">
                    Otoritas Industri
                  </span>
                </div>

                <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-3">
                  <p className="bg-blue-50/60 p-4 rounded-xl border-l-4 border-blue-600 text-slate-800 italic">
                    "IBM mendefinisikan AI sebagai teknologi yang memungkinkan komputer dan mesin meniru 
                    kemampuan belajar, memahami, memecahkan masalah, mengambil keputusan, kreativitas, dan otonomi manusia."
                  </p>
                  
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-medium text-slate-900">
                      Sementara <strong>John McCarthy</strong> orang yang pertama kali mencetuskan istilah 
                      <em> Artificial Intelligence</em> mendefinisikannya sebagai:
                    </p>
                    <p className="mt-2 text-indigo-900 font-semibold italic">
                      "Ilmu dan rekayasa untuk membuat mesin cerdas, khususnya program komputer yang cerdas."
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      (John McCarthy, Stanford University & Dartmouth Conference 1956)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleCopy(
                      "IBM mendefinisikan AI sebagai teknologi yang memungkinkan komputer dan mesin meniru kemampuan belajar, memahami, memecahkan masalah, mengambil keputusan, kreativitas, dan otonomi manusia.",
                      "ibm"
                    )}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                  >
                    {copiedQuote === 'ibm' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedQuote === 'ibm' ? 'Disalin!' : 'Salin Definisi IBM'}</span>
                  </button>

                  <button
                    onClick={() => handleCopy(
                      "The science and engineering of making intelligent machines, especially intelligent computer programs. - John McCarthy",
                      "mccarthy"
                    )}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                  >
                    {copiedQuote === 'mccarthy' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedQuote === 'mccarthy' ? 'Disalin!' : 'Salin Kutipan John McCarthy'}</span>
                  </button>
                </div>
              </div>

              {/* Illustration Right: Friendly Robot/Humanoid */}
              <div className="md:col-span-4 flex justify-center">
                <div className="w-48 h-56 sm:w-56 sm:h-64 rounded-3xl bg-gradient-to-tr from-slate-100 via-blue-50 to-indigo-50 border border-slate-200 shadow-md p-6 flex flex-col items-center justify-center relative overflow-hidden group">
                  {/* Robot Head Graphic */}
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-400 border-2 border-slate-300 shadow-inner flex flex-col items-center justify-center relative">
                      {/* Robot antenna */}
                      <div className="w-1.5 h-4 bg-slate-500 absolute -top-4 rounded-full" />
                      <div className="w-3 h-3 bg-cyan-400 rounded-full absolute -top-6 shadow-sm shadow-cyan-400" />
                      
                      {/* Robot eyes */}
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-5 h-5 rounded-full bg-cyan-500 border border-cyan-300 shadow-inner flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                        <div className="w-5 h-5 rounded-full bg-cyan-500 border border-cyan-300 shadow-inner flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                      </div>

                      {/* Blushing cheeks matching user's image */}
                      <div className="flex items-center justify-between w-16 px-1">
                        <span className="text-[10px] text-rose-500 font-bold">\\\\</span>
                        <span className="text-[10px] text-rose-500 font-bold">////</span>
                      </div>

                      {/* Cheerful mouth */}
                      <div className="w-8 h-3 border-b-2 border-slate-700 rounded-full mt-1" />
                    </div>

                    {/* Robot neck and shoulder plate */}
                    <div className="w-16 h-4 bg-slate-400 mx-auto rounded-b-md" />
                    <div className="w-32 h-6 bg-slate-600 rounded-t-xl mx-auto shadow-md" />
                  </div>

                  <div className="mt-3 text-center">
                    <span className="text-xs font-bold text-slate-700 bg-white/90 px-2.5 py-0.5 rounded-full border border-slate-300 shadow-xs">
                      Mesin Cerdas (Intelligent Agent)
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Footer note inside slide */}
          <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
            <span>Rujukan: IBM Technology Whitepaper & Stanford Computer Science Archives (John McCarthy)</span>
            <span className="font-semibold text-blue-700">Materi Pokok 1 dari 7 Bab AI</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* EXPANSION: 4 KUADRAN DEFINISI AI MENURUT RUSSELL & NORVIG */}
        {/* (Sumber Valid Standar Dunia: AI: A Modern Approach) */}
        {/* ============================================================== */}
        {(activeTab === 'quadrants' || activeTab === 'academic') && (
          <div className="mt-10 p-6 sm:p-8 bg-slate-850 rounded-2xl border border-slate-700 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-semibold mb-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Literatur Standar: Stuart Russell & Peter Norvig</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Taksonomi 4 Kuadran Definisi AI
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Dalam buku rujukan AI paling banyak digunakan di dunia (<em>Artificial Intelligence: A Modern Approach</em>), 
                  definisi AI dibagi ke dalam dua sumbu utama: <strong>Fokus Manusia vs Rasionalitas Murni</strong> dan <strong>Proses Berpikir vs Tindakan Nyata</strong>.
                </p>
              </div>
            </div>

            {/* 4 Quadrants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CONCEPT_DATA.section2.quadrants.map((q, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-blue-500/60 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                      Kuadran {idx + 1}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      Russell & Norvig
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{q.title}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {q.desc}
                  </p>
                  <div className="pt-2 text-xs text-blue-300 font-mono bg-slate-950/60 p-2 rounded border border-slate-800">
                    Contoh: {q.example}
                  </div>
                </div>
              ))}
            </div>

            {/* Turing Test Mention */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" />
                  Uji Turing (The Turing Test, 1950)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Alan Turing merumuskan uji operasional kecerdasan mesin dalam makalah legendarisnya 
                  <em> "Computing Machinery and Intelligence"</em>: sebuah komputer dianggap cerdas jika penguji manusia 
                  tidak dapat membedakan respons mesin dari respons manusia melalui percakapan teks.
                </p>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-[11px] text-slate-400 font-mono block">Mind (Oxford Journal, 1950)</span>
              </div>
            </div>
          </div>
        )}

        {/* Next Section CTA */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onNavigateToNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold text-xs transition-all group"
          >
            <span>Lanjut ke Bagian: Ruang Lingkup AI</span>
            <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
