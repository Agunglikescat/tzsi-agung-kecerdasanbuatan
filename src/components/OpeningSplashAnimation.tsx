import React, { useState, useEffect } from 'react';
import { AgungLogo } from './AgungLogo';
import { Sparkles, Brain, Cpu, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface OpeningSplashAnimationProps {
  onFinish?: () => void;
}

export const OpeningSplashAnimation: React.FC<OpeningSplashAnimationProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(10);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    // Smooth progress simulation
    const timer1 = setTimeout(() => setProgress(45), 200);
    const timer2 = setTimeout(() => setProgress(85), 600);
    const timer3 = setTimeout(() => setProgress(100), 950);

    // Trigger fade-out animation
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1200);

    // Complete and unmount
    const finishTimer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 400);
  };

  if (!isVisible) return null;

  return (
    <div 
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer transition-all duration-700 ease-out select-none ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none blur-sm' : 'opacity-100 scale-100'
      } ${
        isDark 
          ? 'bg-[#060814] text-white' 
          : 'bg-[#f8fafc] text-slate-900'
      }`}
      style={{
        backdropFilter: 'blur(20px)'
      }}
    >
      {/* Background ambient radial glow waves */}
      <div className={`absolute w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none transition-all duration-1000 ${
        isDark 
          ? 'bg-gradient-to-tr from-blue-600/30 via-purple-600/25 to-cyan-400/20 animate-pulse' 
          : 'bg-gradient-to-tr from-blue-400/35 via-indigo-300/30 to-cyan-300/25 animate-pulse'
      }`} />

      {/* Center Animated Logo & Ring Waves */}
      <div className="relative flex flex-col items-center z-10">
        
        {/* Pulsing Concentric Energy Rings */}
        <div className="relative flex items-center justify-center mb-6">
          <div className={`absolute w-36 h-36 rounded-full border-2 border-dashed animate-spin transition-colors duration-500 ${
            isDark ? 'border-cyan-400/30' : 'border-blue-500/40'
          }`} style={{ animationDuration: '14s' }} />

          <div className={`absolute w-44 h-44 rounded-full border transition-colors duration-500 animate-ping opacity-25 ${
            isDark ? 'border-purple-500/40' : 'border-indigo-400/40'
          }`} style={{ animationDuration: '2.5s' }} />

          {/* Central Logo Box */}
          <div className={`relative p-5 rounded-3xl shadow-2xl transition-all duration-500 ${
            isDark 
              ? 'bg-slate-900/90 border border-slate-700/80 shadow-cyan-500/20' 
              : 'bg-white border-2 border-slate-200 shadow-blue-500/20'
          }`}>
            <AgungLogo size={56} glow={isDark} />
          </div>
        </div>

        {/* Brand Title with chromatic shimmer */}
        <div className="text-center space-y-2 mt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-blue-500/10 border border-blue-500/30 text-blue-500">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Memulai Eksplorasi AI</span>
          </div>

          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            AGUNGPROJECT<span className="text-cyan-500">.ID</span>
          </h1>

          <p className={`text-xs sm:text-sm max-w-sm mx-auto font-medium ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Kurikulum & Ensiklopedia Komprehensif Kecerdasan Buatan
          </p>
        </div>

        {/* Animated Progress Track */}
        <div className="mt-8 w-64 sm:w-80 space-y-2">
          <div className={`h-2 w-full rounded-full overflow-hidden ${
            isDark ? 'bg-slate-800 border border-slate-700/80' : 'bg-slate-200 border border-slate-300'
          }`}>
            <div 
              className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 transition-all duration-300 ease-out rounded-full shadow-lg"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono font-medium">
            <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              {progress < 50 ? 'Inisialisasi Teori...' : progress < 90 ? 'Memuat 7 Cabang & Linimasa...' : 'Portal Siap!'}
            </span>
            <span className="text-cyan-500 font-bold">{progress}%</span>
          </div>
        </div>

        {/* Skip hint */}
        <button 
          onClick={handleSkip}
          className={`mt-6 inline-flex items-center gap-1.5 text-[11px] font-medium transition-colors px-3 py-1 rounded-lg ${
            isDark 
              ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' 
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <span>Klik untuk langsung masuk</span>
          <ArrowRight className="w-3 h-3" />
        </button>

      </div>
    </div>
  );
};
