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
  ChevronRight
} from 'lucide-react';

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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Beranda', icon: BookOpen },
    { id: 'konsep', label: 'Gambar 1: Konsep AI', icon: Sparkles, badge: 'Gbr 1' },
    { id: 'ruang-lingkup', label: 'Gambar 2: Ruang Lingkup', icon: Layers, badge: 'Gbr 2' },
    { id: 'sejarah', label: 'Gambar 3: Sejarah AI', icon: History, badge: 'Gbr 3' },
    { id: 'taksonomi', label: 'AI vs ML (Taksonomi)', icon: GitFork },
    { id: 'kuis', label: 'Uji Pemahaman', icon: HelpCircle },
    { id: 'referensi', label: 'Sumber Valid', icon: FileText }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/90 backdrop-blur-md shadow-lg shadow-black/20 border-b border-slate-800'
            : 'bg-slate-950/80 backdrop-blur-sm border-b border-slate-800/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo & Brand */}
            <div 
              onClick={() => onNavigate('hero')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  Portal Edukasi AI
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    Akademik
                  </span>
                </span>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Konsep • Ruang Lingkup • Sejarah • Taksonomi
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                        isActive ? 'bg-blue-800 text-blue-100' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Actions: Search & Slide Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenSearch}
                aria-label="Cari Materi"
                className="p-2 sm:px-3 sm:py-2 rounded-lg text-slate-300 bg-slate-800/70 hover:bg-slate-800 hover:text-white border border-slate-700/60 transition-colors flex items-center gap-2 text-xs"
                title="Cari materi AI..."
              >
                <Search className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Cari...</span>
                <kbd className="hidden sm:inline-block text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded border border-slate-600">
                  /
                </kbd>
              </button>

              <button
                onClick={onToggleSlideMode}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  slideMode 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20' 
                    : 'bg-slate-800/70 text-slate-300 border-slate-700/60 hover:text-white hover:bg-slate-800'
                }`}
                title="Beralih antara Mode Slide Persis Foto atau Mode Detail Lengkap"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {slideMode ? 'Mode Slide: Aktif' : 'Mode Slide'}
                </span>
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-1 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="text-xs font-semibold text-slate-400 px-3 py-1 uppercase tracking-wider">
              Daftar Navigasi Modul
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}

            <div className="pt-3 border-t border-slate-800 mt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  onToggleSlideMode();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium bg-slate-800 text-amber-300 border border-slate-700"
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
