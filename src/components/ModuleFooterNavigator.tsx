import React from 'react';
import { ArrowLeft, ArrowRight, FolderOpen, CheckCircle2 } from 'lucide-react';
import { MODULE_ITEMS } from './ModuleMenuDrawer';

interface ModuleFooterNavigatorProps {
  activeSection: string;
  onSelectModule: (moduleId: string) => void;
  onOpenDrawer: () => void;
}

export const ModuleFooterNavigator: React.FC<ModuleFooterNavigatorProps> = ({
  activeSection,
  onSelectModule,
  onOpenDrawer
}) => {
  const currentIndex = MODULE_ITEMS.findIndex(m => m.id === activeSection);
  const currentItem = MODULE_ITEMS[currentIndex] || MODULE_ITEMS[0];
  const prevItem = currentIndex > 0 ? MODULE_ITEMS[currentIndex - 1] : null;
  const nextItem = currentIndex < MODULE_ITEMS.length - 1 ? MODULE_ITEMS[currentIndex + 1] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-8 border-t border-slate-850">
      <div className="bg-slate-900/90 rounded-2xl border border-slate-850 p-4 sm:p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Previous Module Button */}
        {prevItem ? (
          <button
            onClick={() => onSelectModule(prevItem.id)}
            className="w-full md:w-auto px-5 py-3 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 hover:text-white flex items-center gap-3 transition-all group"
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400 group-hover:-translate-x-1 transition-transform shrink-0" />
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Bab Sebelumnya (Bab {prevItem.number})
              </span>
              <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors truncate block max-w-[200px] sm:max-w-xs">
                {prevItem.label}
              </span>
            </div>
          </button>
        ) : (
          <div className="hidden md:block w-48" />
        )}

        {/* Center: Module Status & Open Menu Button */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Sedang Membuka:</span>
            <span className="font-bold text-cyan-300">
              Bab {currentItem.number} dari {MODULE_ITEMS.length}
            </span>
          </div>

          <button
            onClick={onOpenDrawer}
            className="px-4 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <FolderOpen className="w-4 h-4 text-cyan-300" />
            <span>Buka Menu & Daftar Bab Lainnya</span>
          </button>
        </div>

        {/* Next Module Button */}
        {nextItem ? (
          <button
            onClick={() => onSelectModule(nextItem.id)}
            className="w-full md:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-between md:justify-end gap-3 transition-all shadow-lg shadow-blue-900/30 group"
          >
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-blue-200 block">
                Bab Berikutnya (Bab {nextItem.number})
              </span>
              <span className="text-sm font-semibold text-white group-hover:text-cyan-200 transition-colors truncate block max-w-[200px] sm:max-w-xs">
                {nextItem.label}
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform shrink-0" />
          </button>
        ) : (
          <button
            onClick={() => onSelectModule('hero')}
            className="w-full md:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/30"
          >
            <span className="text-sm font-semibold">Kembali ke Halaman Judul</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

      </div>
    </div>
  );
};
