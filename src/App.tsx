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
import { ModuleFooterNavigator } from './components/ModuleFooterNavigator';
import { 
  ArrowUp 
} from 'lucide-react';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('hero');
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
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#060814] text-slate-100' : 'bg-slate-50 text-slate-800'} flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden transition-colors duration-300`}>
      {/* Dynamic Animated Cosmic Particles & Glowing Bokeh Background */}
      <CosmicParticlesBackground />

      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSidebar={() => setIsDrawerOpen(true)}
        modularView={modularView}
        onToggleModularView={() => setModularView(!modularView)}
      />

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

      {/* Floating Back to Top Button (Unobtrusive) */}
      {showBackToTop && !modularView && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
            className="w-10 h-10 rounded-full bg-slate-800/90 hover:bg-slate-700 text-white shadow-xl flex items-center justify-center transition-all hover:scale-110 border border-slate-700"
            title="Kembali ke atas"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
