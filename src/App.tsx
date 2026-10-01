import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ConceptSection } from './components/ConceptSection';
import { ScopeSection } from './components/ScopeSection';
import { HistorySection } from './components/HistorySection';
import { TaxonomySection } from './components/TaxonomySection';
import { QuizSection } from './components/QuizSection';
import { ReferencesSection } from './components/ReferencesSection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { CosmicParticlesBackground } from './components/CosmicParticlesBackground';
import { 
  ArrowUp, 
  Sparkles, 
  Layers, 
  History, 
  GitFork, 
  SlidersHorizontal 
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [slideMode, setSlideMode] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Scroll spy to detect active section
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sections = ['hero', 'konsep', 'ruang-lingkup', 'sejarah', 'taksonomi', 'kuis', 'referensi'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut '/' for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchOpen) {
        // Only trigger if not already typing in an input
        if (
          document.activeElement?.tagName !== 'INPUT' &&
          document.activeElement?.tagName !== 'TEXTAREA'
        ) {
          e.preventDefault();
          setIsSearchOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#060814] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden">
      {/* Dynamic Animated Cosmic Particles & Glowing Bokeh Background */}
      <CosmicParticlesBackground />

      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        slideMode={slideMode}
        onToggleSlideMode={() => setSlideMode(!slideMode)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Global Slide Mode Notice Banner if activated */}
      {slideMode && (
        <div className="fixed top-16 sm:top-20 left-0 right-0 z-40 bg-amber-500/90 text-slate-950 text-xs py-2 px-4 text-center font-bold shadow-md backdrop-blur-sm flex items-center justify-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          <span>
            Mode Slide Aktif: Menampilkan replika tata letak asli Gambar 1, 2, dan 3 dengan format presentasi. Klik tombol 'Mode Slide' di navbar untuk kembali ke mode lengkap.
          </span>
        </div>
      )}

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onNavigate={scrollToSection} />

        {/* Gambar 1: Konsep AI */}
        <ConceptSection
          slideMode={slideMode}
          onNavigateToNext={() => scrollToSection('ruang-lingkup')}
        />

        {/* Gambar 2: Ruang Lingkup AI */}
        <ScopeSection
          onNavigateToNext={() => scrollToSection('sejarah')}
        />

        {/* Gambar 3: Sejarah Perkembangan AI */}
        <HistorySection
          onNavigateToNext={() => scrollToSection('taksonomi')}
        />

        {/* Taksonomi: AI vs Machine Learning */}
        <TaxonomySection
          onNavigateToNext={() => scrollToSection('kuis')}
        />

        {/* Kuis Interaktif Uji Pemahaman */}
        <QuizSection
          onNavigateToNext={() => scrollToSection('referensi')}
        />

        {/* Daftar Pustaka & Verifikasi Sumber Valid */}
        <ReferencesSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTopic={scrollToSection}
      />

      {/* Floating Action Button: Back to Top & Quick Slide Jump */}
      {showBackToTop && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2 animate-in fade-in duration-300">
          <button
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
            className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/50 flex items-center justify-center transition-all hover:scale-110 border border-blue-400/40"
            title="Kembali ke atas"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Sticky Bottom Mini Navigator on Mobile / Small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => scrollToSection('konsep')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            activeSection === 'konsep' ? 'text-blue-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Konsep AI</span>
        </button>

        <button
          onClick={() => scrollToSection('ruang-lingkup')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            activeSection === 'ruang-lingkup' ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Ruang Lingkup</span>
        </button>

        <button
          onClick={() => scrollToSection('sejarah')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            activeSection === 'sejarah' ? 'text-amber-400 font-bold' : 'text-slate-400'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Sejarah AI</span>
        </button>

        <button
          onClick={() => scrollToSection('taksonomi')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            activeSection === 'taksonomi' ? 'text-indigo-400 font-bold' : 'text-slate-400'
          }`}
        >
          <GitFork className="w-4 h-4" />
          <span>Taksonomi</span>
        </button>
      </div>
    </div>
  );
}
