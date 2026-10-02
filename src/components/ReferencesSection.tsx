import React, { useState } from 'react';
import { REFERENCES_LIST, ReferenceItem } from '../data/aiData';
import { 
  FileText, 
  BookOpen, 
  ExternalLink, 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  Search,
  Filter
} from 'lucide-react';
import { QuickFactBadge } from './QuickFactModal';

export const ReferencesSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredReferences = REFERENCES_LIST.filter(ref => {
    const matchesType = selectedType === 'all' || ref.type === selectedType;
    const matchesSearch = 
      ref.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.publisher.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <section id="referensi" className="py-16 md:py-24 bg-slate-950/50 backdrop-blur-[2px] border-b border-slate-800/60 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Daftar Pustaka & Verifikasi Akademik</span>
              </div>
              <QuickFactBadge sectionId="referensi" variant="inline" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Sumber Rujukan Valid & Otoritatif
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Seluruh konsep, definisi, linimasa sejarah, dan ruang lingkup AI pada website ini diverifikasi secara ketat berdasarkan literatur primer berikut:
            </p>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari judul atau nama penulis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 w-full sm:w-64"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8 text-xs">
          {['all', 'Book', 'Paper', 'Official Report', 'Award Announcement'].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3.5 py-1.5 rounded-lg border transition-all ${
                selectedType === t
                  ? 'bg-blue-600 border-blue-500 text-white font-semibold shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              {t === 'all' ? 'Semua Rujukan' : t}
            </button>
          ))}
        </div>

        {/* References Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReferences.map((ref) => (
            <div
              key={ref.id}
              className="rounded-2xl p-6 bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-4 group shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-900/50 text-blue-300 border border-blue-600/30 uppercase tracking-wider">
                    {ref.type}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-semibold">
                    {ref.year}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                  {ref.title}
                </h3>

                <p className="text-xs text-slate-300 font-medium">
                  {ref.authors}
                </p>

                <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  {ref.relevance}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px] truncate max-w-[200px]" title={ref.publisher}>
                  {ref.publisher}
                </span>
                <span className="text-cyan-400 font-mono text-[10px] bg-slate-800 px-2 py-0.5 rounded">
                  {ref.urlOrDoi}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Verification Notice */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Prinsip Integritas Akademik & Keilmuan
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Materi disusun selaras dengan silabus Asosiasi Ilmu Komputer Internasional (ACM / IEEE Computer Society) dan standar kurikulum perguruan tinggi.
              </p>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-mono px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 shrink-0">
            Terverifikasi 2026
          </span>
        </div>

      </div>
    </section>
  );
};
