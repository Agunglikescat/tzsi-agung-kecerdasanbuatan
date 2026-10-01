import React from 'react';
import { ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { AgungLogo } from './AgungLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Overview */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3 text-white font-bold text-base">
              <AgungLogo size={36} variant="badge" glow={false} />
              <div>
                <span className="text-white font-extrabold text-base tracking-tight">
                  AGUNGPROJECT<span className="text-cyan-400">.ID</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono block">
                  Pusat Edukasi & Ensiklopedia Kecerdasan Buatan
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Platform edukasi interaktif berbasis web untuk mempelajari Konsep AI (Gambar 1), Ruang Lingkup dan 7 Cabang Utama (Gambar 2), Sejarah Perkembangan AI dari 1956 hingga Era Nobel & AI Agents (Gambar 3), serta Taksonomi AI vs Machine Learning dengan rujukan ilmiah terverifikasi.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verifikasi Kurikulum: Russell & Norvig, Nature, Stanford, & UNESCO</span>
            </div>
          </div>

          {/* Col 2: Navigasi Modul */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold text-xs uppercase tracking-wider">
              Navigasi Materi
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate('konsep')} className="hover:text-cyan-400 transition-colors">
                  Gambar 1: Konsep AI & IBM
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ruang-lingkup')} className="hover:text-cyan-400 transition-colors">
                  Gambar 2: Ruang Lingkup (7 Cabang)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sejarah')} className="hover:text-cyan-400 transition-colors">
                  Gambar 3: Sejarah Perkembangan AI
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('taksonomi')} className="hover:text-cyan-400 transition-colors">
                  Taksonomi: AI vs ML vs DL
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Evaluasi & Pustaka */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold text-xs uppercase tracking-wider">
              Evaluasi & Rujukan
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate('kuis')} className="hover:text-cyan-400 transition-colors">
                  Uji Pemahaman (Kuis)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('referensi')} className="hover:text-cyan-400 transition-colors">
                  Daftar Pustaka & DOI
                </button>
              </li>
              <li>
                <button onClick={scrollToTop} className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  <span>Kembali ke Atas</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 Portal Pembelajaran AI • Didesain untuk kemudahan belajar konsep, cabang, dan sejarah AI.
          </div>
          <div className="flex items-center gap-1">
            <span>Dibuat dengan standar HTML5, Tailwind CSS, & React JS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
