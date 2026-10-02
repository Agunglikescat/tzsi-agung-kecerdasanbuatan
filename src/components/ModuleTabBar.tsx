import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Layers, 
  History, 
  GitFork, 
  HelpCircle, 
  FileText, 
  FolderOpen,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { MODULE_ITEMS } from './ModuleMenuDrawer';

interface ModuleTabBarProps {
  activeSection: string;
  onSelectModule: (moduleId: string) => void;
  onOpenDrawer: () => void;
  modularView: boolean;
  onToggleModularView: () => void;
}

export const ModuleTabBar: React.FC<ModuleTabBarProps> = ({
  activeSection,
  onSelectModule,
  onOpenDrawer,
  modularView,
  onToggleModularView
}) => {
  const currentIndex = MODULE_ITEMS.findIndex(m => m.id === activeSection);
  const activeItem = MODULE_ITEMS[currentIndex] || MODULE_ITEMS[0];

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectModule(MODULE_ITEMS[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < MODULE_ITEMS.length - 1) {
      onSelectModule(MODULE_ITEMS[currentIndex + 1].id);
    }
  };

  return (
    <div className="sticky top-16 sm:top-20 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-lg shadow-black/30">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        
        {/* Left Side: Drawer Button & Active Module Indicator */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={onOpenDrawer}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-md shadow-blue-900/40 transition-all hover:scale-105 border border-blue-400/40 shrink-0"
            title="Buka Menu Lengkap & Rincian Bab"
          >
            <FolderOpen className="w-4 h-4 text-cyan-200" />
            <span>Daftar Menu & Bab</span>
            <span className="bg-blue-800/80 text-[10px] px-1.5 py-0.5 rounded-full font-bold border border-blue-400/30">
              7 Bab
            </span>
          </button>

          {/* Quick Prev / Next Module Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              disabled={currentIndex <= 0}
              className={`w-7 h-7 rounded-md flex items-center justify-center border transition-colors ${
                currentIndex <= 0
                  ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'border-slate-700 bg-slate-850 hover:bg-slate-750 text-slate-300 hover:text-white'
              }`}
              title="Bab Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
              {currentIndex + 1} / {MODULE_ITEMS.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentIndex >= MODULE_ITEMS.length - 1}
              className={`w-7 h-7 rounded-md flex items-center justify-center border transition-colors ${
                currentIndex >= MODULE_ITEMS.length - 1
                  ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'border-slate-700 bg-slate-850 hover:bg-slate-750 text-slate-300 hover:text-white'
              }`}
              title="Bab Berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* View Mode Toggle Pill (Mobile) */}
          <button
            onClick={onToggleModularView}
            className="sm:hidden text-[11px] px-2 py-1 rounded bg-slate-850 border border-slate-700 text-slate-300 hover:text-white"
            title="Ubah Mode Tampilan"
          >
            {modularView ? '📌 Modul' : '📜 Scroll'}
          </button>
        </div>

        {/* Center / Right Side: Horizontal Tab Pills (Bisa di klik untuk buka bab) */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 custom-scrollbar justify-start">
          {MODULE_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectModule(item.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap border shrink-0 ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20 scale-105'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
                }`}
                title={item.label}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Mode Toggle Button (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleModularView}
            className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition-all ${
              modularView
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                : 'bg-slate-850 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title="Klik untuk beralih mode tampilan"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
            <span>{modularView ? 'Mode Modul (Aktif)' : 'Mode Scroll'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
