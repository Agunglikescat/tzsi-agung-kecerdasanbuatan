import React, { useState } from 'react';
import { 
  X, 
  ChevronDown, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  Layers, 
  History, 
  GitFork, 
  HelpCircle, 
  FileText, 
  CheckCircle2, 
  Compass,
  ArrowRight,
  SlidersHorizontal,
  Bookmark
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
  subtopics: string[];
}

export const MODULE_ITEMS: ModuleItem[] = [
  {
    id: 'hero',
    number: 1,
    label: 'Halaman Judul & Ringkasan',
    shortLabel: 'Judul',
    badge: 'Overview',
    icon: BookOpen,
    description: 'Judul kurikulum, pengenalan portal edukasi, dan akses cepat ke seluruh materi.',
    subtopics: [
      'Identitas Portal AGUNGPROJECT.ID',
      'Kurikulum Terintegrasi AI',
      'Ringkasan Materi 4 Bagian Utama',
      'Akses Cepat Slide Presentasi'
    ]
  },
  {
    id: 'konsep',
    number: 2,
    label: 'Gambar 1: Konsep AI',
    shortLabel: '1. Konsep AI',
    badge: 'Slide 1',
    icon: Sparkles,
    description: 'Konsep dasar kecerdasan buatan, definisi IBM, pernyataan John McCarthy, dan 4 kuadran AI.',
    subtopics: [
      'Definisi Dasar AI (Belajar, Bernalar, Memecahkan Masalah)',
      'Kutipan John McCarthy (Dartmouth 1955/1956)',
      'Definisi Resmi IBM (Pemikiran, Pembelajaran, Otonomi)',
      'Alan Turing & The Imitation Game (1950)',
      '4 Kuadran Russell & Norvig (Thinking & Acting Humanly vs Rationally)'
    ]
  },
  {
    id: 'ruang-lingkup',
    number: 3,
    label: 'Gambar 2: Ruang Lingkup AI',
    shortLabel: '2. Ruang Lingkup',
    badge: 'Slide 2',
    icon: Layers,
    description: 'Klasifikasi 7 cabang utama kecerdasan buatan berdasarkan literatur ilmiah terverifikasi.',
    subtopics: [
      '1. Machine Learning (Arthur Samuel 1959, Tom Mitchell 1997)',
      '2. Deep Learning (Representation Learning, LeCun et al. 2015)',
      '3. Natural Language Processing (Stanford NLP, Jurafsky & Martin)',
      '4. Computer Vision (Richard Szeliski, Fei-Fei Li ImageNet)',
      '5. Robotics (Fusi Sensor, SLAM, Sebastian Thrun)',
      '6. Sistem Pakar (Rule-Based IF-THEN, Edward Feigenbaum)',
      '7. AI Ethics & Safety (UNESCO 2021, EU AI Act 2024)'
    ]
  },
  {
    id: 'sejarah',
    number: 4,
    label: 'Gambar 3: Sejarah AI',
    shortLabel: '3. Sejarah AI',
    badge: 'Slide 3',
    icon: History,
    description: 'Linimasa kronologis perkembangan AI dari Konferensi Dartmouth 1956 hingga era Hadiah Nobel & AI Agents.',
    subtopics: [
      '1956: Konferensi Dartmouth (Lahirnya Istilah AI)',
      '1974–1993: Era AI Winter (Lighthill Report & Pemotongan Dana)',
      '1997: IBM Deep Blue Kalahkan Garry Kasparov',
      '2012: AlexNet Meledakkan Deep Learning di ImageNet',
      '2022: Peluncuran ChatGPT & Revolusi Generative AI',
      '2024–2026: Hadiah Nobel Fisika & Kimia, Era AI Agents Mandiri'
    ]
  },
  {
    id: 'taksonomi',
    number: 5,
    label: 'AI vs Machine Learning',
    shortLabel: '4. AI vs ML',
    badge: 'Taksonomi',
    icon: GitFork,
    description: 'Hubungan hierarki himpunan bagian, diagram relasional, dan perbandingan matriks komprehensif.',
    subtopics: [
      'Hierarki Himpunan: AI ⊃ Machine Learning ⊃ Deep Learning ⊃ GenAI',
      'Paradigma Pemrograman: Tradisional vs Machine Learning',
      'Tabel Matriks Perbedaan Komparatif',
      'Tingkat Kecerdasan: ANI (Narrow) → AGI (General) → ASI (Super)'
    ]
  },
  {
    id: 'kuis',
    number: 6,
    label: 'Kuis Interaktif Uji Pemahaman',
    shortLabel: '5. Kuis AI',
    badge: '10 Soal',
    icon: HelpCircle,
    description: 'Evaluasi pemahaman konsep dengan 10 soal skenario berbobot ilmiah beserta pembahasannya.',
    subtopics: [
      '10 Soal Pilihan Ganda Berdasarkan Gambar 1, 2, 3, & Taksonomi',
      'Penilaian Skor Otomatis Real-time',
      'Umpan Balik Jawaban & Pembahasan Sumber Ilmiah'
    ]
  },
  {
    id: 'referensi',
    number: 7,
    label: 'Daftar Pustaka & Literatur Valid',
    shortLabel: '6. Pustaka',
    badge: 'Sumber',
    icon: FileText,
    description: 'Dokumentasi kutipan lengkap buku teks standar universitas dan makalah penemu orisinal.',
    subtopics: [
      'Buku Russell & Norvig: A Modern Approach (Edisi 4)',
      'Makalah Turing 1950 & Proposal Dartmouth 1955',
      'Makalah Deep Learning Nature 2015 (LeCun, Bengio, Hinton)',
      'Standar UNESCO 2021 & Regulasi EU AI Act 2024'
    ]
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
  // Store expanded accordion state for each module
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [activeSection]: true
  });

  const toggleAccordion = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedModules(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside backdrop to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Slide-in Menu Drawer Panel */}
      <div 
        className="w-full max-w-md sm:max-w-lg bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <AgungLogo size={32} glow={false} />
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Daftar Menu & Bab</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Bisa Dibuka
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Pilih bab untuk langsung membuka materinya tanpa perlu scroll
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

        {/* View Mode Mode Toggle Bar */}
        <div className="px-4 py-3 bg-slate-850/80 border-b border-slate-800 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-2 text-slate-300">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="font-medium">Mode Tampilan:</span>
          </div>
          <button
            onClick={onToggleModularView}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all text-xs border ${
              modularView
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{modularView ? '📌 Mode Modul (Tanpa Scroll)' : '📜 Mode Scroll Semua'}</span>
          </button>
        </div>

        {/* Module List Accordions (Bisa Dibuka-Buka) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
            <span>Daftar 7 Bab Utama</span>
            <span className="text-cyan-400 font-normal">Klik untuk Buka Materi</span>
          </div>

          {MODULE_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const isExpanded = !!expandedModules[item.id];

            return (
              <div
                key={item.id}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isActive
                    ? 'bg-blue-950/40 border-cyan-500/60 shadow-lg shadow-cyan-950/30'
                    : 'bg-slate-900/90 border-slate-800/80 hover:border-slate-700 hover:bg-slate-850/50'
                }`}
              >
                {/* Module Header Bar */}
                <div 
                  className="p-3.5 flex items-start gap-3 cursor-pointer group select-none"
                  onClick={() => {
                    onSelectModule(item.id);
                    onClose();
                  }}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-105 ${
                    isActive 
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30' 
                      : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700 group-hover:text-cyan-300'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/30' : 'bg-slate-800 text-slate-400'
                      }`}>
                        Bab {item.number}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] font-semibold text-slate-400">
                          • {item.badge}
                        </span>
                      )}
                      {isActive && (
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 ml-auto">
                          <CheckCircle2 className="w-3 h-3" />
                          Sedang Aktif
                        </span>
                      )}
                    </div>

                    <h3 className={`text-sm font-bold truncate ${
                      isActive ? 'text-cyan-300' : 'text-white group-hover:text-cyan-300'
                    }`}>
                      {item.label}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                      {item.description}
                    </p>
                  </div>

                  {/* Toggle accordion dropdown button */}
                  <button
                    onClick={(e) => toggleAccordion(item.id, e)}
                    className="w-7 h-7 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-cyan-300 flex items-center justify-center shrink-0 transition-colors"
                    title={isExpanded ? 'Tutup Rincian' : 'Buka Rincian'}
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Subtopic Accordion Content (Bisa dibuka-buka) */}
                {isExpanded && (
                  <div className="px-4 pb-3.5 pt-1 border-t border-slate-800/80 bg-slate-950/40 animate-in fade-in duration-200">
                    <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                      <Bookmark className="w-3 h-3 text-cyan-400" />
                      <span>Rincian Sub-Topik Bab:</span>
                    </div>
                    <ul className="space-y-1.5 pl-2 border-l border-slate-800">
                      {item.subtopics.map((sub, idx) => (
                        <li 
                          key={idx}
                          onClick={() => {
                            onSelectModule(item.id);
                            onClose();
                          }}
                          className="text-xs text-slate-300 hover:text-cyan-300 cursor-pointer flex items-center gap-2 py-1 px-1.5 rounded hover:bg-slate-800/50 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                          <span className="leading-snug">{sub}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-3 pt-2 border-t border-slate-800/60 flex justify-end">
                      <button
                        onClick={() => {
                          onSelectModule(item.id);
                          onClose();
                        }}
                        className="text-xs font-semibold px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <span>Buka Materi Bab Ini</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Drawer Footer info */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90 text-xs text-slate-400 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>7 Bab Materi Lengkap</span>
          </div>
          <span className="text-[11px] text-slate-400">AGUNGPROJECT.ID</span>
        </div>
      </div>
    </div>
  );
};
