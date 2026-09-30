import React, { useState } from 'react';
import { TAXONOMY_COMPARISON, TAXONOMY_LEVELS } from '../data/aiData';
import { 
  GitFork, 
  Layers, 
  Cpu, 
  Zap, 
  Target, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  Database,
  Sliders,
  Eye,
  FileCheck
} from 'lucide-react';

interface TaxonomySectionProps {
  onNavigateToNext: () => void;
}

export const TaxonomySection: React.FC<TaxonomySectionProps> = ({ onNavigateToNext }) => {
  const [activeLayer, setActiveLayer] = useState<'ai' | 'ml' | 'dl' | 'genai'>('ai');
  const [activeTab, setActiveTab] = useState<'venn' | 'table' | 'levels'>('venn');

  const layerInfo = {
    ai: {
      title: "Artificial Intelligence (Kecerdasan Buatan)",
      tag: "Himpunan Terluar (Semesta)",
      desc: "Disiplin induk yang mencakup seluruh konsep, teori, dan metode untuk membuat mesin bertindak atau berpikir secara cerdas, baik melalui algoritma aturan logika manual (Rule-based, IF-THEN, Sistem Pakar, Tree Search) maupun melalui pembelajaran data.",
      scope: "Mencakup Machine Learning, Pemrosesan Bahasa Alami, Sistem Pakar, Robotika, Logika Fuzzy, dan Algoritma Genetik.",
      analogy: "Ibarat seluruh kategori 'Kendaraan Bermotor' di dunia."
    },
    ml: {
      title: "Machine Learning (Pembelajaran Mesin)",
      tag: "Sub-Himpunan AI",
      desc: "Cabang spesifik dari AI di mana mesin tidak diprogram aturan langkah-demi-langkah secara manual, melainkan belajar mendeteksi pola matematika dan probabilitas dari sampel data historis untuk membuat inferensi mandiri.",
      scope: "Regresi Linier/Logistik, Support Vector Machines (SVM), Random Forest, K-Means Clustering, Q-Learning.",
      analogy: "Ibarat kategori 'Mobil' yang berada di dalam rumpun kendaraan bermotor."
    },
    dl: {
      title: "Deep Learning (Pembelajaran Mendalam)",
      tag: "Sub-Himpunan Machine Learning",
      desc: "Evolusi Machine Learning berbasis Jaringan Saraf Tiruan berlapis dalam (Deep Neural Networks). Keunggulan khususnya adalah kemampuan mengekstrak fitur mentah berdimensi tinggi secara bertingkat (Representation Learning) tanpa rekayasa fitur manual dari manusia.",
      scope: "Convolutional Neural Networks (CNN), Recurrent Neural Networks (RNN/LSTM), Transformer, Autoencoder.",
      analogy: "Ibarat 'Mobil Listrik Otonom Berkecepatan Tinggi' yang berada di dalam kategori mobil."
    },
    genai: {
      title: "Generative AI & Foundation Models",
      tag: "Cabang Terkini Deep Learning",
      desc: "Sistem Deep Learning modern berskala raksasa (miliaran hingga triliunan parameter) yang tidak hanya mengklasifikasikan atau memprediksi data, tetapi mampu menciptakan konten baru (teks, kode, gambar, audio, 3D, video) yang menyerupai ciptaan manusia.",
      scope: "Large Language Models (GPT, Gemini, Llama), Diffusion Models (Midjourney, Stable Diffusion), Multimodal Agents.",
      analogy: "Ibarat fitur 'Autopilot Penuh & Asisten Navigasi Interaktif' pada mobil listrik generasi mutakhir."
    }
  };

  return (
    <section id="taksonomi" className="py-16 md:py-24 bg-slate-950 border-b border-slate-800 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
              <GitFork className="w-3.5 h-3.5 text-indigo-400" />
              <span>Taksonomi & Relasi Hubungan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI vs Machine Learning (Taksonomi AI)
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Memahami batasan hierarkis antara Kecerdasan Buatan (AI), Machine Learning (ML), Deep Learning (DL), serta perbandingan parameter teknis.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('venn')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'venn' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Diagram Venn Interaktif
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'table' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Matriks Komparasi Detail
            </button>
            <button
              onClick={() => setActiveTab('levels')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'levels' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Klasifikasi ANI, AGI, ASI
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: INTERACTIVE VENN DIAGRAM / HIERARCHY */}
        {/* ============================================================== */}
        {activeTab === 'venn' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/90 rounded-2xl p-6 sm:p-10 border border-slate-800">
            
            {/* Visual Nested Boxes / Venn Representation */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-4">
              <div className="w-full max-w-md space-y-3">
                
                {/* Outer Ring: AI */}
                <div 
                  onClick={() => setActiveLayer('ai')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                    activeLayer === 'ai' 
                      ? 'bg-blue-950/80 border-blue-400 shadow-lg shadow-blue-900/50 scale-[1.02]' 
                      : 'bg-slate-900/90 border-blue-600/40 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-blue-300 mb-2">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-blue-400" />
                      Artificial Intelligence (AI)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-900/60 border border-blue-500/30">
                      Cakupan Terluar
                    </span>
                  </div>

                  {/* Middle Ring: ML */}
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveLayer('ml');
                    }}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${
                      activeLayer === 'ml' 
                        ? 'bg-cyan-950/90 border-cyan-400 shadow-md shadow-cyan-900/50 scale-[1.02]' 
                        : 'bg-slate-950/80 border-cyan-600/40 hover:border-cyan-400'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-cyan-300 mb-2">
                      <span className="flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-cyan-400" />
                        Machine Learning (ML)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-900/60 border border-cyan-500/30">
                        Sub-Himpunan AI
                      </span>
                    </div>

                    {/* Inner Ring: DL */}
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveLayer('dl');
                      }}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer relative ${
                        activeLayer === 'dl' 
                          ? 'bg-indigo-950/90 border-indigo-400 shadow-md shadow-indigo-900/50 scale-[1.02]' 
                          : 'bg-slate-900/80 border-indigo-600/40 hover:border-indigo-400'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-indigo-300 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-indigo-400" />
                          Deep Learning (DL)
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-900/60 border border-indigo-500/30">
                          Sub-Himpunan ML
                        </span>
                      </div>

                      {/* Core: Generative AI */}
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLayer('genai');
                        }}
                        className={`p-3 rounded-md border-2 transition-all cursor-pointer text-center ${
                          activeLayer === 'genai' 
                            ? 'bg-purple-900/90 border-purple-300 shadow-md shadow-purple-900/50 font-bold' 
                            : 'bg-purple-950/40 border-purple-600/40 hover:border-purple-300'
                        }`}
                      >
                        <span className="text-xs font-bold text-purple-200 flex items-center justify-center gap-1">
                          ✨ Generative AI & LLM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-center text-slate-400 italic">
                  💡 Klik salah satu lapisan kotak di atas untuk melihat rincian karakteristiknya.
                </p>
              </div>
            </div>

            {/* Right Information Panel for Selected Layer */}
            <div className="lg:col-span-6 space-y-4 bg-slate-850 p-6 rounded-2xl border border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {layerInfo[activeLayer].tag}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Taksonomi Rujukan: Russell & Norvig (2020)
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {layerInfo[activeLayer].title}
              </h3>

              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
                <p>{layerInfo[activeLayer].desc}</p>
                
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <strong className="text-xs font-semibold text-slate-400 block mb-1 uppercase tracking-wider">
                    Cakupan & Algoritma:
                  </strong>
                  <p className="text-xs text-indigo-200 font-mono">
                    {layerInfo[activeLayer].scope}
                  </p>
                </div>

                <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-900/50 text-blue-200 text-xs flex items-center gap-2">
                  <span className="text-base">🚗</span>
                  <span><strong>Analogi Sederhana:</strong> {layerInfo[activeLayer].analogy}</span>
                </div>
              </div>

              {/* Summary key rule */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 text-xs space-y-1.5">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  <span>Prinsip Rumus Taksonomi Logis:</span>
                </div>
                <p className="text-slate-300 font-mono text-[11px]">
                  "Semua Deep Learning adalah Machine Learning, dan semua Machine Learning adalah AI. Tetapi tidak semua AI adalah Machine Learning (ada AI simbolik berbasis aturan manual)."
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: DETAILED COMPARISON TABLE */}
        {/* ============================================================== */}
        {activeTab === 'table' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
            <div className="p-4 sm:p-6 bg-slate-850 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Matriks Perbandingan Teknis: AI vs ML vs DL
                </h3>
                <p className="text-xs text-slate-400">
                  Perbandingan parameter arsitektur komputasi, data, dan interpretabilitas.
                </p>
              </div>
              <span className="text-xs font-mono bg-slate-900 text-slate-300 px-3 py-1 rounded border border-slate-700">
                Standar Kurikulum Computer Science
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-950 text-slate-300 border-b border-slate-800">
                    <th className="p-4 font-bold text-slate-200 w-1/4">Parameter / Atribut</th>
                    <th className="p-4 font-bold text-blue-300 w-1/4">Kecerdasan Buatan (AI)</th>
                    <th className="p-4 font-bold text-cyan-300 w-1/4">Machine Learning (ML)</th>
                    <th className="p-4 font-bold text-indigo-300 w-1/4">Deep Learning (DL)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {TAXONOMY_COMPARISON.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-850/60 transition-colors">
                      <td className="p-4 font-semibold text-white bg-slate-900/50">
                        {row.attribute}
                      </td>
                      <td className="p-4 leading-relaxed">
                        {row.artificialIntelligence}
                      </td>
                      <td className="p-4 leading-relaxed bg-cyan-950/10">
                        {row.machineLearning}
                      </td>
                      <td className="p-4 leading-relaxed bg-indigo-950/10">
                        {row.deepLearning}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: CLASSIFICATION BY CAPACITY (ANI, AGI, ASI) */}
        {/* ============================================================== */}
        {activeTab === 'levels' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TAXONOMY_LEVELS.map((lvl, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-6 bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono">
                        Level {idx + 1}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                        idx === 0 
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                          : idx === 1 
                          ? 'bg-amber-950 text-amber-300 border border-amber-800' 
                          : 'bg-purple-950 text-purple-300 border border-purple-800'
                      }`}>
                        {lvl.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white">
                      {lvl.name}
                    </h3>
                    <div className="text-xs text-slate-400 italic">
                      Alias: {lvl.alias}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lvl.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Contoh & Implementasi:
                    </span>
                    <ul className="space-y-1">
                      {lvl.examples.map((ex, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-indigo-400 shrink-0" />
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Section CTA */}
        <div className="mt-12 flex justify-end">
          <button
            onClick={onNavigateToNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold text-xs transition-all group"
          >
            <span>Uji Pemahaman Materi (Kuis Interaktif)</span>
            <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
