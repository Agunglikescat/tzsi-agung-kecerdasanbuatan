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
  SlidersHorizontal
} from 'lucide-react';
import { AgungLogo } from './AgungLogo';

export interface NavMenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tooltip?: string;
}

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenSearch: () => void;
  onOpenSidebar: () => void;
  modularView: boolean;
  onToggleModularView: () => void;
}

export const navMenuItems: NavMenuItem[] = [
  { id: 'hero', label: 'Judul', icon: BookOpen, tooltip: 'Halaman Utama & Judul' },
  { id: 'konsep', label: 'Konsep AI', icon: Sparkles, tooltip: 'Gambar 1: Konsep Dasar AI & Definisi IBM' },
  { id: 'ruang-lingkup', label: 'Ruang Lingkup', icon: Layers, tooltip: 'Gambar 2: 7 Cabang Ruang Lingkup AI' },
  { id: 'sejarah', label: 'Sejarah AI', icon: History, tooltip: 'Gambar 3: Linimasa Sejarah AI 1956-2026' },
  { id: 'taksonomi', label: 'AI vs ML', icon: GitFork, tooltip: 'Taksonomi AI vs Machine Learning' },
  { id: 'kuis', label: 'Uji Pemahaman', icon: HelpCircle, tooltip: 'Evaluasi Kuis Interaktif 10 Soal' },
  { id: 'referensi', label: 'Sumber Valid', icon: FileText, tooltip: 'Daftar Pustaka & Literatur Valid' }
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenSearch,
  onOpenSidebar,
  modularView,
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md shadow-xl shadow-black/50 border-b border-slate-800'
          : 'bg-slate-950/90 backdrop-blur-sm border-b border-slate-800/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Logo & Brand Left */}
          <div 
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <AgungLogo size={36} variant="badge" glow={true} />
            <div>
              <span className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-1.5 group-hover:text-cyan-300 transition-colors">
                AGUNGPROJECT<span className="text-cyan-400">.ID</span>
                <span className="hidden xl:inline-block text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                  Edukasi AI
                </span>
              </span>
              <p className="text-[10px] text-slate-400 hidden xl:block leading-none">
                Konsep • Ruang Lingkup • Sejarah • Taksonomi
              </p>
            </div>
          </div>

          {/* PC Desktop Menu: 7 Bab Materi Lengkap */}
          <nav className="hidden lg:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-700/80 shadow-inner">
            {navMenuItems.map((item) => {
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

          {/* Right Controls: Mode Bab Toggle, Cari, Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Mode Bab / Modular Toggle */}
            <button
              onClick={onToggleModularView}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                modularView 
                  ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/10' 
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-800'
              }`}
              title="Beralih antara Mode Bab (tampil per bab) atau Mode Scroll (tampil semua)"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{modularView ? 'Mode Bab' : 'Mode Scroll'}</span>
            </button>

            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Cari Materi"
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5 text-xs"
              title="Cari materi AI (Tekan /)..."
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span className="hidden md:inline">Cari</span>
              <kbd className="hidden md:inline-block text-[9px] bg-slate-800 text-slate-400 px-1 rounded border border-slate-700">
                /
              </kbd>
            </button>

            {/* Mobile / Tablet Hamburger Button: List item menghilang, lalu muncul hamburger yang mentrigger sidebar */}
            <button
              onClick={onOpenSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors flex items-center justify-center"
              aria-label="Buka Menu Sidebar"
              title="Buka Menu Navigasi"
            >
              <Menu className="w-5 h-5 text-cyan-300" />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
