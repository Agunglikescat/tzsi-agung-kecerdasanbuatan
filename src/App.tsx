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
import { ModuleMenuDrawer } from './components/ModuleMenuDrawer';
import { ModuleTabBar } from './components/ModuleTabBar';
import { ModuleFooterNavigator } from './components/ModuleFooterNavigator';
import { 
  ArrowUp, 
  Sparkles, 
  Layers, 
  History, 
  GitFork, 
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [slideMode, setSlideMode] = useState<boolean>(false);
  const [modularView, setModularView] = useState<boolean>(true); // Default true: Buka per menu tanpa scroll panjang
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Scroll spy to detect active section when in continuous scroll mode
  useEffect(() => {
    if (modularView) return;

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
  }, [modularView]);

  // Handle module selection: activate the specific section and reset scroll to top
  const handleSelectModule = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    if (modularView) {
      handleSelectModule(sectionId);
    } else {
      setActiveSection(sectionId);
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut '/' for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchOpen) {
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
        onOpenMenuDrawer={() => setIsDrawerOpen(true)}
        modularView={modularView}
        onToggleModularView={() => setModularView(!modularView)}
      />

      {/* Sticky Module Tab Bar: Menu yang bisa di buka-buka, langsung buka materi tanpa scroll */}
      <ModuleTabBar
        activeSection={activeSection}
        onSelectModule={handleSelectModule}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        modularView={modularView}
        onToggleModularView={() => setModularView(!modularView)}
      />

      {/* Global Slide Mode Notice Banner if activated */}
      {slideMode && (
        <div className="bg-amber-500/90 text-slate-950 text-xs py-2 px-4 text-center font-bold shadow-md flex items-center justify-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          <span>
            Mode Slide Aktif: Menampilkan replika tata letak asli Gambar 1, 2, dan 3 dengan format presentasi. Klik tombol 'Slide' di navbar untuk kembali.
          </span>
        </div>
      )}

      {/* Main Content Sections: Modular Mode (Buka per menu tanpa scroll panjang) or Scroll All */}
      <main className="flex-1 pb-16 md:pb-8 relative z-10">
        {modularView ? (
          // MODULAR VIEW: Hanya membuka bab yang dipilih pengguna, bebas scroll panjang
          <div className="animate-in fade-in duration-300">
            {activeSection === 'hero' && (
              <Hero onNavigate={handleSelectModule} />
            )}

            {activeSection === 'konsep' && (
              <ConceptSection
                slideMode={slideMode}
                onNavigateToNext={() => handleSelectModule('ruang-lingkup')}
              />
            )}

            {activeSection === 'ruang-lingkup' && (
              <ScopeSection
                onNavigateToNext={() => handleSelectModule('sejarah')}
              />
            )}

            {activeSection === 'sejarah' && (
              <HistorySection
                onNavigateToNext={() => handleSelectModule('taksonomi')}
              />
            )}

            {activeSection === 'taksonomi' && (
              <TaxonomySection
                onNavigateToNext={() => handleSelectModule('kuis')}
              />
            )}

            {activeSection === 'kuis' && (
              <QuizSection
                onNavigateToNext={() => handleSelectModule('referensi')}
              />
            )}

            {activeSection === 'referensi' && (
              <ReferencesSection />
            )}

            {/* Bottom Navigator for Active Module */}
            <ModuleFooterNavigator
              activeSection={activeSection}
              onSelectModule={handleSelectModule}
              onOpenDrawer={() => setIsDrawerOpen(true)}
            />
          </div>
        ) : (
          // CONTINUOUS SCROLL MODE: Menampilkan seluruh materi dalam satu scroll
          <>
            <Hero onNavigate={scrollToSection} />
            <ConceptSection
              slideMode={slideMode}
              onNavigateToNext={() => scrollToSection('ruang-lingkup')}
            />
            <ScopeSection
              onNavigateToNext={() => scrollToSection('sejarah')}
            />
            <HistorySection
              onNavigateToNext={() => scrollToSection('taksonomi')}
            />
            <TaxonomySection
              onNavigateToNext={() => scrollToSection('kuis')}
            />
            <QuizSection
              onNavigateToNext={() => scrollToSection('referensi')}
            />
            <ReferencesSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleSelectModule} />

      {/* Interactive Accordion / Module Menu Drawer (Bisa Dibuka-Buka) */}
      <ModuleMenuDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeSection={activeSection}
        onSelectModule={handleSelectModule}
        modularView={modularView}
        onToggleModularView={() => setModularView(!modularView)}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTopic={scrollToSection}
      />

      {/* Floating Action Button: Quick Open Menu & Back to Top */}
      <div className="fixed bottom-16 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col gap-2">
        <button
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Buka Menu & Bab"
          className="px-3.5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-900/50 flex items-center gap-2 transition-all hover:scale-105 border border-blue-400/40 text-xs font-bold"
          title="Buka Menu & Bab Pembelajaran"
        >
          <FolderOpen className="w-4 h-4 text-cyan-200" />
          <span>Buka Menu</span>
        </button>

        {showBackToTop && !modularView && (
          <button
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-white shadow-lg flex items-center justify-center transition-all hover:scale-110 border border-slate-700 ml-auto"
            title="Kembali ke atas"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Mobile Sticky Bottom Module Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => handleSelectModule('hero')}
          className={`flex flex-col items-center gap-0.5 text-[9px] ${
            activeSection === 'hero' ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Judul</span>
        </button>

        <button
          onClick={() => handleSelectModule('konsep')}
          className={`flex flex-col items-center gap-0.5 text-[9px] ${
            activeSection === 'konsep' ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Konsep</span>
        </button>

        <button
          onClick={() => handleSelectModule('ruang-lingkup')}
          className={`flex flex-col items-center gap-0.5 text-[9px] ${
            activeSection === 'ruang-lingkup' ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Ruang Lingkup</span>
        </button>

        <button
          onClick={() => handleSelectModule('sejarah')}
          className={`flex flex-col items-center gap-0.5 text-[9px] ${
            activeSection === 'sejarah' ? 'text-amber-400 font-bold' : 'text-slate-400'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Sejarah</span>
        </button>

        <button
          onClick={() => handleSelectModule('taksonomi')}
          className={`flex flex-col items-center gap-0.5 text-[9px] ${
            activeSection === 'taksonomi' ? 'text-indigo-400 font-bold' : 'text-slate-400'
          }`}
        >
          <GitFork className="w-3.5 h-3.5" />
          <span>Taksonomi</span>
        </button>

        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[9px] text-blue-300 font-bold"
        >
          <FolderOpen className="w-3.5 h-3.5 text-cyan-300" />
          <span>Menu Lain</span>
        </button>
      </div>
    </div>
  );
}
