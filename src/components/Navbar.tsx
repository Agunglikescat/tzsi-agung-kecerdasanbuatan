import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Layers, 
  History, 
  GitFork, 
  HelpCircle, 
  FileText, 
  Menu, 
  X, 
  Sparkles,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Compass
} from 'lucide-react';
import { AgungLogo } from './AgungLogo';

interface MenuItem {
  id: string;
  label: string;
  shortLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  tooltip?: string;
}

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  slideMode: boolean;
  onToggleSlideMode: () => void;
  onOpenSearch: () => void;
  onOpenMenuDrawer?: () => void;
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Primary top-right quick navigation
  const primaryMenuItems: MenuItem[] = [
    { id: 'hero', label: 'Judul', shortLabel: 'Judul', icon: BookOpen, tooltip: 'Halaman Utama & Judul' },
    { id: 'konsep', label: 'Konsep AI', shortLabel: 'Konsep AI', icon: Sparkles, tooltip: 'Konsep Dasar AI & Definisi IBM' },
    { id: 'ruang-lingkup', label: 'Ruang Lingkup', shortLabel: 'Ruang Lingkup', icon: Layers, tooltip: '7 Cabang Ruang Lingkup AI' },
    { id: 'sejarah', label: 'Sejarah AI', shortLabel: 'Sejarah AI', icon: History, tooltip: 'Linimasa Sejarah AI 1956-2026' },
    { id: 'taksonomi', label: 'AI vs ML', shortLabel: 'AI vs ML', icon: GitFork, tooltip: 'Perbandingan AI vs Machine Learning' }
  ];

  const secondaryNavItems: MenuItem[] = [
    { id: 'kuis', label: 'Uji Pemahaman', icon: HelpCircle },
    { id: 'referensi', label: 'Sumber Valid', icon: FileText }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/95 backdrop-blur-md shadow-xl shadow-black/40 border-b border-slate-800'
            : 'bg-slate-950/90 backdrop-blur-sm border-b border-slate-800/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
            
            {/* Logo & Brand Left with custom AGUNGPROJECT.ID logo adapted to theme */}
            <div 
              onClick={() => onNavigate('hero')}
              className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            >
              <AgungLogo size={40} variant="badge" glow={true} />
              <div>
                <span className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-1.5 group-hover:text-cyan-300 transition-colors">
                  AGUNGPROJECT<span className="text-cyan-400">.ID</span>
                  <span className="hidden md:inline-block text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                    Edukasi AI
                  </span>
                </span>
                <p className="text-[11px] text-slate-400 hidden xl:block leading-tight">
                  Konsep • Ruang Lingkup • Sejarah • Taksonomi
                </p>
              </div>
            </div>

            {/* ============================================================== */}
            {/* TOP-RIGHT MENU (Sesuai Permintaan User: untuk judul, gambar 1, 2, 3) */}
            {/* ============================================================== */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              
              {/* PC Desktop Menu: Dedicated Top-Right Bar for Judul, Gambar 1, 2, 3, AI vs ML */}
              <nav className="hidden lg:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-700/80 shadow-inner">
                {primaryMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      title={item.tooltip}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40 ring-1 ring-blue-400/50'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className={`text-[9px] px-1 rounded font-normal ${
                          isActive ? 'bg-blue-700 text-blue-100' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Extra Links for Desktop (Kuis & Referensi) */}
              <div className="hidden xl:flex items-center gap-1 border-l border-slate-800 pl-2">
                {secondaryNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isActive ? 'text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Buka Menu & Bab Drawer Button */}
              {onOpenMenuDrawer && (
                <button
                  onClick={onOpenMenuDrawer}
                  className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm shadow-blue-900/30 border border-blue-400/40"
                  title="Buka Daftar Menu & Bab yang bisa dibuka"
                >
                  <Compass className="w-3.5 h-3.5 text-cyan-200" />
                  <span className="hidden sm:inline">Menu Bab</span>
                </button>
              )}

              {/* Search Button */}
              <button
                onClick={onOpenSearch}
                aria-label="Cari Materi"
                className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5 text-xs"
                title="Cari materi AI (Tekan /)..."
              >
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Cari</span>
                <kbd className="hidden sm:inline-block text-[9px] bg-slate-800 text-slate-400 px-1 rounded border border-slate-700">
                  /
                </kbd>
              </button>

              {/* Slide Mode Toggle */}
              <button
                onClick={onToggleSlideMode}
                className={`flex items-center gap-1 p-2 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  slideMode 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20' 
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-800'
                }`}
                title="Tampilkan replika slide presentasi persis foto"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">
                  {slideMode ? 'Slide On' : 'Slide'}
                </span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MOBILE DEDICATED QUICK-JUMP BAR UNDER HEADER */}
        {/* (Memastikan versi mobile langsung punya menu judul, gambar 1, 2, 3 di atas) */}
        {/* ============================================================== */}
        <div className="lg:hidden border-t border-slate-800/80 bg-slate-950/95 px-2 py-1.5 overflow-x-auto scrollbar-none flex items-center gap-1.5">
          {primaryMenuItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-400 shadow-sm shadow-blue-500/30'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3 h-3 text-cyan-400" />
                <span>{item.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Full Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="text-xs font-semibold text-cyan-400 px-2 uppercase tracking-wider flex items-center justify-between">
              <span>Menu Materi Lengkap</span>
              <span className="text-[10px] text-slate-400 normal-case">PC & Mobile Optimized</span>
            </div>

            <div className="space-y-1">
              {[...primaryMenuItems, ...secondaryNavItems].map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-900/50'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <span>{item.label}</span>
                      {item.badge ? (
                        <span className="text-[9px] bg-slate-800/80 px-1.5 py-0.5 rounded text-slate-300 border border-slate-700">
                          {item.badge}
                        </span>
                      ) : null}
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  onToggleSlideMode();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-amber-300 border border-slate-700"
              >
                <span>Tampilan: {slideMode ? 'Mode Slide Sederhana' : 'Mode Pembahasan Lengkap'}</span>
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
