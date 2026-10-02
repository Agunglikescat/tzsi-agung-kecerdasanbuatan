import React, { useRef } from 'react';
import { 
  FolderOpen, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
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
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const currentIndex = MODULE_ITEMS.findIndex(m => m.id === activeSection);
  const activeIndex = currentIndex >= 0 ? currentIndex : 0;
  const activeItem = MODULE_ITEMS[activeIndex];

  const handlePrev = () => {
    if (activeIndex > 0) {
      const prevId = MODULE_ITEMS[activeIndex - 1].id;
      onSelectModule(prevId);
    }
  };

  const handleNext = () => {
    if (activeIndex < MODULE_ITEMS.length - 1) {
      const nextId = MODULE_ITEMS[activeIndex + 1].id;
      onSelectModule(nextId);
    }
  };

  return (
    <div className="sticky top-16 sm:top-20 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl shadow-black/40">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 py-2 flex flex-col gap-2">
        
        {/* Top Control Bar: Responsive Flex between Left and Right Controls */}
        <div className="flex items-center justify-between gap-2 w-full">
          
          {/* Main Action: Buka Menu & Bab */}
          <button
            onClick={onOpenDrawer}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-900/40 transition-all hover:scale-102 border border-blue-400/40 shrink-0"
            title="Buka Daftar Menu & Bab yang bisa dibuka"
          >
            <FolderOpen className="w-4 h-4 text-cyan-200 shrink-0" />
            <span className="tracking-tight">
              <span className="hidden xs:inline">Daftar </span>Menu & Bab
            </span>
            <span className="bg-blue-800/90 text-[10px] px-1.5 py-0.5 rounded-full font-bold border border-blue-400/30 shrink-0">
              7 Bab
            </span>
          </button>

          {/* Stepper & Mode Switch Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Prev / Next Stepper */}
            <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={handlePrev}
                disabled={activeIndex <= 0}
                className={`w-7 h-7 rounded flex items-center justify-center transition-colors ${
                  activeIndex <= 0
                    ? 'text-slate-600 cursor-not-allowed'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title="Bab Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-[11px] font-bold px-1.5 text-slate-300 select-none">
                {activeIndex + 1}/{MODULE_ITEMS.length}
              </span>

              <button
                onClick={handleNext}
                disabled={activeIndex >= MODULE_ITEMS.length - 1}
                className={`w-7 h-7 rounded flex items-center justify-center transition-colors ${
                  activeIndex >= MODULE_ITEMS.length - 1
                    ? 'text-slate-600 cursor-not-allowed'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title="Bab Berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mode Switch Toggle Pill */}
            <button
              onClick={onToggleModularView}
              className={`px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all border shrink-0 ${
                modularView
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                  : 'bg-slate-850 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title="Beralih antara Mode Modul (Per Menu) dan Mode Scroll"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden xs:inline">
                {modularView ? 'Modul' : 'Scroll'}
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Touch-scrollable Horizontal Chapter Tabs without Clipping */}
        <div className="relative w-full">
          <div 
            ref={scrollContainerRef}
            className="flex items-center gap-1.5 overflow-x-auto w-full pb-0.5 custom-scrollbar scroll-smooth touch-pan-x"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {MODULE_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectModule(item.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap border shrink-0 ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/25 scale-[1.02]'
                      : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
                  }`}
                  title={item.label}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                  {/* On smaller screens use shortLabel to avoid overflowing, on md+ use full label */}
                  <span className="md:hidden">
                    {item.shortLabel || item.label}
                  </span>
                  <span className="hidden md:inline">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
