import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Layers, 
  History, 
  GitFork, 
  HelpCircle, 
  FileText, 
  Menu, 
  Sparkles,
  Search,
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';
import { AgungLogo } from './AgungLogo';

interface MenuItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  tooltip?: string;
}

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  slideMode: boolean;
  onToggleSlideMode: () => void;
  onOpenSearch: () => void;
  onOpenMenuDrawer: () => void;
  modularView?: boolean;
  onToggleModularView?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  slideMode,
  onToggleSlideMode,
  onOpenSearch,
  onOpenMenuDrawer,
  modularView = true,
  onToggleModularView
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 7 Bab Materi AI dalam 1 Navbar Tunggal yang Ringkas & Rapi
  const navItems: MenuItem[] = [
    { id: 'hero', label: 'Judul', shortLabel: 'Judul', icon: BookOpen, tooltip: 'Halaman Utama & Judul' },
    { id: 'konsep', label: 'Konsep AI', shortLabel: 'Konsep', icon: Sparkles, tooltip: 'Gambar 1: Konsep Dasar AI & Definisi IBM' },
    { id: 'ruang-lingkup', label: 'Ruang Lingkup', shortLabel: 'Lingkup', icon: Layers, tooltip: 'Gambar 2: 7 Cabang Ruang Lingkup AI' },
    { id: 'sejarah', label: 'Sejarah AI', shortLabel: 'Sejarah', icon: History, tooltip: 'Gambar 3: Linimasa Sejarah AI 1956-2026' },
    { id: 'taksonomi', label: 'AI vs ML', shortLabel: 'AI vs ML', icon: GitFork, tooltip: 'Taksonomi AI vs Machine Learning' },
    { id: 'kuis', label: 'Kuis AI', shortLabel: 'Kuis', icon: HelpCircle, tooltip: 'Evaluasi Pemahaman 10 Soal' },
    { id: 'referensi', label: 'Pustaka', shortLabel: 'Pustaka', icon: FileText, tooltip: 'Sumber Literatur & Rujukan Valid' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md shadow-xl shadow-black/50 border-b border-slate-800'
          : 'bg-slate-950/90 backdrop-blur-sm border-b border-slate-800/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Logo & Brand Left */}
          <div 
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <AgungLogo size={36} variant="badge" glow={true} />
            <div>
              <span className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-1.5 group-hover:text-cyan-300 transition-colors">
                AGUNGPROJECT<span className="text-cyan-400">.ID</span>
                <span className="hidden xl:inline-block text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                  Edukasi AI
                </span>
              </span>
            </div>
          </div>

          {/* Desktop Center: Satu-satunya Bilah Bab Materi (Tidak Dobel) */}
          <nav className="hidden lg:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-700/80 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  title={item.tooltip}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40 ring-1 ring-blue-400/50'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Tombol Buka 1 Sidebar Tunggal */}
            <button
              onClick={onOpenMenuDrawer}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-900/40 border border-blue-400/40 shrink-0"
              title="Buka Daftar Menu & Bab"
            >
              <FolderOpen className="w-3.5 h-3.5 text-cyan-200 shrink-0" />
              <span>Daftar Bab</span>
              <span className="bg-blue-800/90 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                7
              </span>
            </button>

            {/* Mode Modul / Scroll Toggle (Desktop) */}
            {onToggleModularView && (
              <button
                onClick={onToggleModularView}
                className={`hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  modularView 
                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40' 
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                }`}
                title="Beralih Mode Modul atau Scroll"
              >
                <SlidersHorizontal className="w-3 h-3 text-cyan-400" />
                <span>{modularView ? 'Modul' : 'Scroll'}</span>
              </button>
            )}

            {/* Slide Mode Toggle */}
            <button
              onClick={onToggleSlideMode}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                slideMode 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20' 
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-800'
              }`}
              title="Tampilkan format slide asli"
            >
              <span className="text-amber-400 font-bold">S</span>
              <span className="hidden sm:inline">
                {slideMode ? 'Slide On' : 'Slide'}
              </span>
            </button>

            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Cari Materi"
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-700 transition-colors flex items-center gap-1 text-xs"
              title="Cari materi AI (Tekan /)..."
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Cari</span>
            </button>

            {/* Mobile Hamburger Button: Juga Membuka 1 Sidebar Tunggal Yang Sama */}
            <button
              onClick={onOpenMenuDrawer}
              className="lg:hidden p-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors"
              aria-label="Buka Menu Sidebar"
              title="Buka Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
