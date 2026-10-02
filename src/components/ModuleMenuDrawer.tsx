import React from 'react';
import { 
  X, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  Layers, 
  History, 
  GitFork, 
  HelpCircle, 
  FileText, 
  CheckCircle2, 
  SlidersHorizontal
} from 'lucide-react';
import { AgungLogo } from './AgungLogo';

export interface ModuleItem {
  id: string;
  number: number;
  label: string;
  shortLabel?: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export const MODULE_ITEMS: ModuleItem[] = [
  {
    id: 'hero',
    number: 1,
    label: 'Halaman Judul & Ringkasan',
    shortLabel: 'Judul',
    badge: 'Overview',
    icon: BookOpen,
    description: 'Judul kurikulum, pengenalan portal edukasi, dan ringkasan materi.'
  },
  {
    id: 'konsep',
    number: 2,
    label: 'Gambar 1: Konsep AI & Definisi IBM',
    shortLabel: '1. Konsep',
    badge: 'Gambar 1',
    icon: Sparkles,
    description: 'Konsep dasar kecerdasan buatan, pandangan IBM, dan 4 kuadran AI.'
  },
  {
    id: 'ruang-lingkup',
    number: 3,
    label: 'Gambar 2: Ruang Lingkup AI & 7 Cabang',
    shortLabel: '2. Lingkup',
    badge: 'Gambar 2',
    icon: Layers,
    description: 'Klasifikasi 7 cabang utama AI (ML, NLP, Computer Vision, Robotika, dll).'
  },
  {
    id: 'sejarah',
    number: 4,
    label: 'Gambar 3: Sejarah Perkembangan AI',
    shortLabel: '3. Sejarah',
    badge: 'Gambar 3',
    icon: History,
    description: 'Linimasa sejarah dari Dartmouth 1956, AI Winter, hingga Hadiah Nobel 2024.'
  },
  {
    id: 'taksonomi',
    number: 5,
    label: 'Taksonomi: AI vs Machine Learning',
    shortLabel: '4. AI vs ML',
    badge: 'Taksonomi',
    icon: GitFork,
    description: 'Diagram Venn relasional himpunan bagian dan matriks perbandingan teknis.'
  },
  {
    id: 'kuis',
    number: 6,
    label: 'Kuis Interaktif AI: Uji Pemahaman',
    shortLabel: '5. Kuis',
    badge: '10 Soal',
    icon: HelpCircle,
    description: 'Evaluasi pemahaman konsep dengan 10 soal skenario dan pembahasan ilmiah.'
  },
  {
    id: 'referensi',
    number: 7,
    label: 'Daftar Pustaka & Literatur Valid',
    shortLabel: '6. Pustaka',
    badge: 'Sumber',
    icon: FileText,
    description: 'Sumber rujukan primer standar universitas (Russell & Norvig, Turing, Nature).'
  }
];

interface ModuleMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSelectModule: (moduleId: string) => void;
  modularView: boolean;
  onToggleModularView: () => void;
}

export const ModuleMenuDrawer: React.FC<ModuleMenuDrawerProps> = ({
  isOpen,
  onClose,
  activeSection,
  onSelectModule,
  modularView,
  onToggleModularView
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="flex-1" onClick={onClose} />

      {/* Single Clean Sidebar Panel */}
      <div 
        className="w-full max-w-sm sm:max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-250 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <AgungLogo size={32} glow={false} />
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                <span>Daftar Menu & Bab</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                  7 Bab
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Pilih bab untuk langsung membuka materinya
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            title="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 7 Chapter Items: Simple, Fast & Direct */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 custom-scrollbar">
          {MODULE_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectModule(item.id);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 group ${
                  isActive
                    ? 'bg-blue-600/20 border-cyan-400/60 shadow-md shadow-cyan-950/30 text-white'
                    : 'bg-slate-850/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 text-slate-300 hover:text-white'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isActive 
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-400/30' 
                    : 'bg-slate-800 text-cyan-400 group-hover:bg-slate-750'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                      Bab {item.number}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-0.5 ml-auto">
                        <CheckCircle2 className="w-3 h-3" />
                        Aktif
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold truncate leading-tight mt-0.5">
                    {item.label}
                  </h3>
                </div>

                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                  isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:translate-x-0.5 group-hover:text-slate-300'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Footer: Mode Bab Toggle */}
        <div className="p-3.5 sm:p-4 bg-slate-950 border-t border-slate-800 shrink-0">
          <button
            onClick={() => {
              onToggleModularView();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <span>Tampilan: {modularView ? 'Mode Bab (Per Bab)' : 'Mode Scroll Semua'}</span>
            </div>
            <span className="text-[10px] text-cyan-300 font-bold px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700">
              Ganti
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
