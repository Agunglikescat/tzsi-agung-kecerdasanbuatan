import React, { useState, useEffect } from 'react';
import { Search, X, ChevronRight, Sparkles, Layers, History, GitFork } from 'lucide-react';
import { AI_BRANCHES, TIMELINE_DATA, REFERENCES_LIST } from '../data/aiData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic: (sectionId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTopic
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '/' && !isOpen) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter searchable items
  const matchedBranches = AI_BRANCHES.filter(b => 
    b.name.toLowerCase().includes(query.toLowerCase()) ||
    b.shortDesc.toLowerCase().includes(query.toLowerCase()) ||
    b.fullExplanation.toLowerCase().includes(query.toLowerCase())
  );

  const matchedTimeline = TIMELINE_DATA.filter(t => 
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.year.includes(query) ||
    t.deepExplanation.toLowerCase().includes(query.toLowerCase()) ||
    t.figuresOrOrg.some(f => f.toLowerCase().includes(query.toLowerCase()))
  );

  const matchedReferences = REFERENCES_LIST.filter(r => 
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.authors.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Cari topik (misal: Dartmouth, AlexNet, NLP, IBM, Nobel 2024, Taksonomi)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-4 space-y-4 divide-y divide-slate-800">
          {/* Quick Suggestions if query is empty */}
          {query.trim() === '' ? (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Topik Populer:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { text: 'Konsep Dasar AI', section: 'konsep' },
                  { text: 'Definisi IBM', section: 'konsep' },
                  { text: 'Ruang Lingkup (7 Cabang)', section: 'ruang-lingkup' },
                  { text: 'Deep Learning', section: 'ruang-lingkup' },
                  { text: 'Sejarah Perkembangan AI', section: 'sejarah' },
                  { text: 'Konferensi Dartmouth 1956', section: 'sejarah' },
                  { text: 'Nobel Prize 2024', section: 'sejarah' },
                  { text: 'AI vs ML (Taksonomi)', section: 'taksonomi' },
                  { text: 'Kuis Interaktif', section: 'kuis' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectTopic(item.section);
                      onClose();
                    }}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-cyan-300 border border-slate-700/80 transition-colors"
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Branch matches */}
              {matchedBranches.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <Layers className="w-3.5 h-3.5" />
                    Cabang Ruang Lingkup AI ({matchedBranches.length})
                  </span>
                  <div className="space-y-1">
                    {matchedBranches.map(b => (
                      <div
                        key={b.id}
                        onClick={() => {
                          onSelectTopic('ruang-lingkup');
                          onClose();
                        }}
                        className="p-2.5 rounded-xl hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs text-slate-300 transition-colors"
                      >
                        <div>
                          <strong className="text-white font-semibold">{b.name}</strong>
                          <span className="text-slate-400"> - {b.shortDesc}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline matches */}
              {matchedTimeline.length > 0 && (
                <div className="space-y-2 pt-3">
                  <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <History className="w-3.5 h-3.5" />
                    Linimasa Sejarah AI ({matchedTimeline.length})
                  </span>
                  <div className="space-y-1">
                    {matchedTimeline.map(t => (
                      <div
                        key={t.year}
                        onClick={() => {
                          onSelectTopic('sejarah');
                          onClose();
                        }}
                        className="p-2.5 rounded-xl hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs text-slate-300 transition-colors"
                      >
                        <div>
                          <span className="font-mono text-amber-400 font-bold mr-2">{t.year}</span>
                          <strong className="text-white font-semibold">{t.title}</strong>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reference matches */}
              {matchedReferences.length > 0 && (
                <div className="space-y-2 pt-3">
                  <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    Sumber Pustaka Valid ({matchedReferences.length})
                  </span>
                  <div className="space-y-1">
                    {matchedReferences.map(r => (
                      <div
                        key={r.id}
                        onClick={() => {
                          onSelectTopic('referensi');
                          onClose();
                        }}
                        className="p-2.5 rounded-xl hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs text-slate-300 transition-colors"
                      >
                        <div>
                          <strong className="text-white font-semibold">{r.title}</strong>
                          <span className="text-slate-400"> ({r.authors}, {r.year})</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedBranches.length === 0 && matchedTimeline.length === 0 && matchedReferences.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-xs">
                  Tidak ditemukan hasil untuk "{query}". Coba kata kunci lain seperti "Dartmouth", "NLP", "Machine Learning", atau "IBM".
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Gunakan panah atau klik untuk membuka materi</span>
          <span className="font-mono">Esc untuk menutup</span>
        </div>
      </div>
    </div>
  );
};
