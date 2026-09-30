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
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  slideMode,
  onToggleSlideMode,
  onOpenSearch
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

  // Primary top-right quick navigation requested by user
  const primaryMenuItems: MenuItem[] = [
    { id: 'hero', label: 'Judul', shortLabel: 'Judul', icon: BookOpen, tooltip: 'Halaman Utama & Judul' },
    { id: 'konsep', label: 'Konsep', shortLabel: 'Konsep', icon: Sparkles, badge: 'Konsep AI', tooltip: 'Konsep Dasar AI & Definisi IBM' },
    { id: 'ruang-lingkup', label: 'Ruang Lingkup', shortLabel: 'Ruang Lingkup', icon: Layers, badge: 'Ruang Lingkup', tooltip: '7 Cabang Ruang Lingkup AI' },
    { id: 'sejarah', label: 'Sejarah', shortLabel: 'Sejarah', icon: History, badge: 'Sejarah AI', tooltip: 'Linimasa Sejarah AI 1956-2026' },
    { id: 'taksonomi', label: 'AI vs ML', shortLabel: 'AI vs ML', icon: GitFork, badge: 'Taksonomi', tooltip: 'Perbandingan AI vs Machine Learning' }
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
            
            {/* Logo & Brand Left */}
            <div 
              onClick={() => onNavigate('hero')}
              className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                  Portal Edukasi AI
                  <span className="hidden md:inline-block text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                    Akademik
                  </span>
                </span>
                <p className="text-[11px] text-slate-400 hidden xl:block leading-tight">
                  Konsep • Ruang Lingkup • Sejarah • Taksonomi
                </p>
              </div>
            </div>

            {/* TOP-RIGHT MENU */}
            <div className="flex items-center gap-1.5 sm:gap-2">
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

              <button
                onClick={onOpenSearch}
                aria-label="Cari Materi"
                className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5 text-xs"
                title="Cari materi AI (Tekan /)..."
              >
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Cari</span>
                <kbd className="hidden sm:inline-block text-[9px] bg-slate-800 text-slate-400 px-1 rounded border border-slate-700">/</kbd>
              </button>

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
                <span className="hidden md:inline">{slideMode ? 'Slide On' : 'Slide'}</span>
              </button>

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
                        <span className="text-[9px] bg-slate-800/80 px-1.5 py-0.5 rounded text-slate-300 border border-slate-700">{item.badge}</span>
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
