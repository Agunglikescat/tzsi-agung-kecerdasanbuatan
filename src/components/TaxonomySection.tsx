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
  FileCheck,
  BookOpen,
  Sparkles,
  ArrowRightLeft,
  Binary,
  Code2,
  Workflow
} from 'lucide-react';
import { QuickFactBadge } from './QuickFactModal';
import { AnimatedLetterText } from './AnimatedLetterText';

interface TaxonomySectionProps {
  onNavigateToNext: () => void;
}

export const TaxonomySection: React.FC<TaxonomySectionProps> = ({ onNavigateToNext }) => {
  const [activeLayer, setActiveLayer] = useState<'ai' | 'ml' | 'dl' | 'genai'>('ai');
  const [activeTab, setActiveTab] = useState<'venn' | 'workflow' | 'table' | 'levels' | 'sources'>('venn');
  const [tableFilter, setTableFilter] = useState<'all' | 'fundamental' | 'data' | 'system' | 'practical'>('all');
  const [revealedQuiz, setRevealedQuiz] = useState<{ [key: number]: boolean }>({});

  const filteredComparison = tableFilter === 'all' 
    ? TAXONOMY_COMPARISON 
    : TAXONOMY_COMPARISON.filter(item => item.category === tableFilter);

  const layerInfo = {
    ai: {
      title: "Artificial Intelligence (Kecerdasan Buatan)",
      tag: "Himpunan Terluar (Semesta)",
      shortFormula: "AI = Sistem yang meniru perilaku cerdas manusia (Simbolik + Pembelajaran Data)",
      desc: "Disiplin induk yang mencakup seluruh konsep, teori, dan metode untuk membuat mesin bertindak atau berpikir secara cerdas, baik melalui algoritma aturan logika manual (Rule-based, IF-THEN, Sistem Pakar, Tree Search) maupun melalui pembelajaran data.",
      scope: "Mencakup Machine Learning, Pemrosesan Bahasa Alami, Sistem Pakar, Robotika, Logika Fuzzy, dan Algoritma Genetik.",
      analogy: "Ibarat seluruh kategori 'Transportasi & Kendaraan' di dunia.",
      quote: "The science and engineering of making intelligent machines. — John McCarthy (1956)",
      source: "Russell & Norvig (2020), Artificial Intelligence: A Modern Approach (4th ed.)"
    },
    ml: {
      title: "Machine Learning (Pembelajaran Mesin)",
      tag: "Sub-Himpunan AI",
      shortFormula: "ML = Algoritma yang belajar mandiri dari data tanpa di-hardcode",
      desc: "Cabang spesifik dari AI di mana mesin tidak diprogram aturan langkah-demi-langkah secara manual, melainkan belajar mendeteksi pola matematika dan probabilitas dari sampel data historis untuk membuat inferensi mandiri.",
      scope: "Regresi Linier/Logistik, Support Vector Machines (SVM), Random Forest, K-Means Clustering, Q-Learning.",
      analogy: "Ibarat kategori 'Mobil Bermesin' yang berada di dalam rumpun kendaraan.",
      quote: "Field of study that gives computers the ability to learn without being explicitly programmed. — Arthur Samuel (IBM, 1959)",
      source: "Tom M. Mitchell (Carnegie Mellon Univ, 1997), 'Machine Learning'"
    },
    dl: {
      title: "Deep Learning (Pembelajaran Mendalam)",
      tag: "Sub-Himpunan Machine Learning",
      shortFormula: "DL = Jaringan Saraf Tiruan Dalam (Representation Learning Otomatis)",
      desc: "Evolusi Machine Learning berbasis Jaringan Saraf Tiruan berlapis dalam (Deep Neural Networks). Keunggulan khususnya adalah kemampuan mengekstrak fitur mentah berdimensi tinggi secara bertingkat (Representation Learning) tanpa rekayasa fitur manual dari manusia.",
      scope: "Convolutional Neural Networks (CNN), Recurrent Neural Networks (RNN/LSTM), Transformer, Autoencoder.",
      analogy: "Ibarat 'Mobil Listrik Otonom Berkecepatan Tinggi' di dalam kategori mobil.",
      quote: "Deep learning allows computational models composed of multiple processing layers to learn representations of data with multiple levels of abstraction. — LeCun, Bengio, & Hinton (Nature, 2015)",
      source: "LeCun et al. (Nature Vol. 521, 2015)"
    },
    genai: {
      title: "Generative AI & Foundation Models",
      tag: "Cabang Terkini Deep Learning",
      shortFormula: "GenAI = Model Generatif Skala Raksasa Penghasil Konten Baru",
      desc: "Sistem Deep Learning modern berskala raksasa (miliaran hingga triliunan parameter) yang tidak hanya mengklasifikasikan atau memprediksi data, tetapi mampu menciptakan konten baru (teks, kode, gambar, audio, 3D, video) yang menyerupai ciptaan manusia.",
      scope: "Large Language Models (GPT, Gemini, Llama), Diffusion Models (Midjourney, Stable Diffusion), Multimodal Agents.",
      analogy: "Ibarat fitur 'Autopilot Penuh & Asisten Navigasi Interaktif' pada mobil listrik generasi mutakhir.",
      quote: "Generative AI marks the transition from analytical pattern detection to creative synthesis and agentic task execution.",
      source: "Stanford HAI Artificial Intelligence Index Report (2024)"
    }
  };

  const interactiveScenarios = [
    {
      id: 1,
      title: "Sistem Lampu Lalu Lintas Berdasarkan Sensor Timer & Ambang Batas",
      scenario: "Sebuah persimpangan jalan memiliki lampu hijau yang otomatis menyala jika sensor magnetik mendeteksi ada antrean kendaraan lebih dari 5 mobil selama 30 detik (Aturan IF antrean > 5 THEN hijau).",
      answer: "AI Tradisional / Rule-Based System",
      explanation: "Sistem ini menggunakan logika aturan deterministik kaku yang dirancang secara eksplisit oleh manusia tanpa proses pembelajaran data statistik."
    },
    {
      id: 2,
      title: "Penyaring Email Spam Gmail",
      scenario: "Gmail memeriksa ribuan email masuk, mengekstrak kata kunci mencurigakan, dan menggunakan algoritma Naive Bayes/SVM untuk menghitung probabilitas apakah sebuah email adalah promosi atau phishing.",
      answer: "Machine Learning (ML)",
      explanation: "Sistem belajar dari sampel jutaan email yang pernah ditandai oleh pengguna di masa lalu untuk memperbarui bobot probabilitas secara otomatis."
    },
    {
      id: 3,
      title: "Persepsi Mobil Otonom Mendeteksi Pejalan Kaki di Malam Hari",
      scenario: "Kamera mobil mengirimkan jutaan aliran piksel mentah ke jaringan saraf Convolutional Neural Network (CNN) multi-layer untuk mendeteksi kontur tubuh pejalan kaki dalam kondisi gelap.",
      answer: "Deep Learning (DL)",
      explanation: "Memproses input data mentah berdimensi tinggi (piksel visual) tanpa rekayasa fitur manual, menggunakan jaringan saraf tiruan berlapis banyak."
    }
  ];

  return (
    <section id="taksonomi" className="py-16 md:py-24 bg-slate-950/50 backdrop-blur-[2px] border-b border-slate-800/60 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                <GitFork className="w-3.5 h-3.5 text-indigo-400" />
                <span>Taksonomi & Relasi Hubungan</span>
              </div>
              <QuickFactBadge sectionId="taksonomi" variant="inline" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              <AnimatedLetterText text="AI vs Machine Learning" />
              <span className="text-slate-300 font-semibold text-xl sm:text-2xl ml-2 block sm:inline">
                (Taksonomi AI)
              </span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Perbandingan mendalam, visualisasi diagram hierarki dan alur kerja (workflow), tabel komparasi parameter teknis, serta penjelasan bersumber dari literatur valid (Arthur Samuel, Tom Mitchell, Russell & Norvig, Nature).
            </p>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex flex-wrap gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('venn')}
              className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                activeTab === 'venn' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Diagram Venn
            </button>
            <button
              onClick={() => setActiveTab('workflow')}
              className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                activeTab === 'workflow' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Alur Paradigma
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                activeTab === 'table' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tabel Komparasi
            </button>
            <button
              onClick={() => setActiveTab('levels')}
              className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                activeTab === 'levels' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Level ANI, AGI, ASI
            </button>
            <button
              onClick={() => setActiveTab('sources')}
              className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                activeTab === 'sources' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sumber Valid
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: INTERACTIVE VENN DIAGRAM VISUALIZER */}
        {/* ============================================================== */}
        {activeTab === 'venn' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/90 rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-2xl animate-in fade-in duration-300">
            
            {/* Visual Nested Boxes / Venn Representation Left */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-2 sm:p-4">
              <div className="w-full max-w-md space-y-3">
                
                {/* Outer Ring: AI */}
                <div 
                  onClick={() => setActiveLayer('ai')}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                    activeLayer === 'ai' 
                      ? 'bg-blue-950/80 border-blue-400 shadow-xl shadow-blue-900/50 scale-[1.02] ring-2 ring-blue-400/20' 
                      : 'bg-slate-900/90 border-blue-600/40 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-blue-300 mb-2">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-blue-400" />
                      Artificial Intelligence (AI)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-900/80 border border-blue-500/40 text-blue-200">
                      Cakupan Payung Induk
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
                        ? 'bg-cyan-950/90 border-cyan-400 shadow-lg shadow-cyan-900/50 scale-[1.02] ring-2 ring-cyan-400/20' 
                        : 'bg-slate-950/80 border-cyan-600/40 hover:border-cyan-400'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-cyan-300 mb-2">
                      <span className="flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-cyan-400" />
                        Machine Learning (ML)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-900/80 border border-cyan-500/40 text-cyan-200">
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
                          ? 'bg-indigo-950/90 border-indigo-400 shadow-md shadow-indigo-900/50 scale-[1.02] ring-2 ring-indigo-400/20' 
                          : 'bg-slate-900/80 border-indigo-600/40 hover:border-indigo-400'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-indigo-300 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-indigo-400" />
                          Deep Learning (DL)
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-900/80 border border-indigo-500/40 text-indigo-200">
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
                            ? 'bg-purple-900/90 border-purple-300 shadow-md shadow-purple-900/50 font-bold scale-[1.02]' 
                            : 'bg-purple-950/40 border-purple-600/40 hover:border-purple-300'
                        }`}
                      >
                        <span className="text-xs font-bold text-purple-200 flex items-center justify-center gap-1">
                          ✨ Generative AI & Foundation Models
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <span className="inline-block text-[11px] text-cyan-300 font-medium bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                    💡 Klik setiap lapisan di atas untuk membaca rincian karakteristiknya
                  </span>
                </div>
              </div>
            </div>

            {/* Right Information Panel for Selected Layer */}
            <div className="lg:col-span-6 space-y-4 bg-slate-850 p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {layerInfo[activeLayer].tag}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Taksonomi Standar: ACM / IEEE
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {layerInfo[activeLayer].title}
                </h3>
                <p className="text-xs text-cyan-300 font-semibold mt-1">
                  {layerInfo[activeLayer].shortFormula}
                </p>
              </div>

              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
                <p>{layerInfo[activeLayer].desc}</p>
                
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <strong className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">
                    Cakupan Algoritma & Model:
                  </strong>
                  <p className="text-xs text-indigo-200 font-mono">
                    {layerInfo[activeLayer].scope}
                  </p>
                </div>

                <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-900/50 text-blue-200 text-xs flex items-center gap-2">
                  <span className="text-base">🚗</span>
                  <span><strong>Analogi Sederhana:</strong> {layerInfo[activeLayer].analogy}</span>
                </div>

                {/* Valid Academic Quote */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Kutipan Otoritatif Sumber Valid:
                  </span>
                  <p className="text-xs text-slate-300 italic">
                    "{layerInfo[activeLayer].quote}"
                  </p>
                  <span className="text-[10px] text-slate-500 block font-mono">
                    Rujukan: {layerInfo[activeLayer].source}
                  </span>
                </div>
              </div>

              {/* Summary key rule */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  <span>Hukum Logika Himpunan (Venn Rule):</span>
                </div>
                <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                  "Semua Deep Learning adalah Machine Learning, dan semua Machine Learning adalah AI. Namun tidak semua AI adalah Machine Learning (misal AI simbolik/aturan manual)."
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: WORKFLOW PARADIGM COMPARISON (Visual Alur Logika) */}
        {/* ============================================================== */}
        {activeTab === 'workflow' && (
          <div className="bg-slate-900 p-6 sm:p-10 rounded-2xl border border-slate-800 shadow-xl space-y-8 animate-in fade-in duration-300">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Pergeseran Paradigma Pemrograman: Tradisional vs Machine Learning
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Bagaimana cara kerja komputer menghasilkan keputusan? Inilah perbedaan fundamental antara pendekatan berbasis aturan (rule-based) dengan pembelajaran mesin berbasis data (data-driven).
              </p>
            </div>

            {/* 3 Paradigms Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Traditional Programming / Classical AI */}
              <div className="p-6 rounded-2xl bg-slate-850 border border-slate-700 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-500/30">
                      Paradigma 1
                    </span>
                    <Code2 className="w-4 h-4 text-blue-400" />
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Pemrograman Klasik & AI Simbolik
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Manusia merumuskan <strong>Aturan Logika (Rules)</strong> secara manual, lalu memasukkannya bersama <strong>Data</strong> ke dalam komputer untuk menghasilkan <strong>Jawaban (Output)</strong>.
                  </p>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-center space-y-1.5 text-blue-300">
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                    Input: Data + Aturan Manual
                  </div>
                  <div className="text-slate-500">⬇️ Mesin Eksekusi</div>
                  <div className="bg-blue-900/30 p-1.5 rounded border border-blue-800 text-white font-bold">
                    Output: Jawaban Pasti
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  Kelemahan: Sangat rapuh jika menghadapi data acak di luar aturan (brittleness problem).
                </p>
              </div>

              {/* Card 2: Machine Learning */}
              <div className="p-6 rounded-2xl bg-slate-850 border-2 border-cyan-500/50 shadow-lg shadow-cyan-950/40 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                      Paradigma 2 (Revolusioner)
                    </span>
                    <Database className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Machine Learning (Data-Driven)
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Manusia memasukkan <strong>Data</strong> dan contoh <strong>Jawaban (Labels)</strong> ke komputer. Algoritma statistik belajar sendiri untuk merumuskan <strong>Aturan (Model Prediktif)</strong>.
                  </p>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-center space-y-1.5 text-cyan-300">
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                    Input: Data + Contoh Jawaban
                  </div>
                  <div className="text-slate-500">⬇️ Algoritma Pembelajaran</div>
                  <div className="bg-cyan-900/40 p-1.5 rounded border border-cyan-700 text-white font-bold">
                    Output: Aturan Model (Model)
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  Kekuatan: Mampu menggeneralisasi pola pada data baru yang belum pernah dilihat sebelumnya.
                </p>
              </div>

              {/* Card 3: Deep Learning */}
              <div className="p-6 rounded-2xl bg-slate-850 border border-slate-700 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                      Paradigma 3 (Modern)
                    </span>
                    <Zap className="w-4 h-4 text-indigo-400" />
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Deep Learning (Hierarki Neuron)
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Data mentah berdimensi tinggi (piksel, gelombang suara, teks) diproses melalui puluhan lapisan neuron buatan untuk mempelajari fitur secara otomatis (Representation Learning).
                  </p>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-center space-y-1.5 text-indigo-300">
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                    Input: Data Mentah Tanpa Seleksi
                  </div>
                  <div className="text-slate-500">⬇️ Multi-Layer Hidden Representation</div>
                  <div className="bg-indigo-900/40 p-1.5 rounded border border-indigo-700 text-white font-bold">
                    Output: Representasi & Prediksi
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  Kekuatan: Mengeliminasi kebutuhan feature engineering manual yang memakan waktu lama.
                </p>
              </div>

            </div>

            {/* Interactive Scenario Widget: Test Your Understanding */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <h4 className="text-sm font-bold text-white">
                  Studi Kasus Interaktif: Tentukan Apakah Kasus Ini AI Klasik, ML, atau DL!
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {interactiveScenarios.map((sc) => {
                  const isRevealed = revealedQuiz[sc.id];
                  return (
                    <div 
                      key={sc.id} 
                      className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Skenario {sc.id}
                        </span>
                        <h5 className="text-xs font-bold text-white">
                          {sc.title}
                        </h5>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {sc.scenario}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800">
                        {!isRevealed ? (
                          <button
                            onClick={() => setRevealedQuiz(prev => ({ ...prev, [sc.id]: true }))}
                            className="w-full py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-500/40 text-[11px] font-semibold transition-all"
                          >
                            Buka Jawaban & Pembahasan
                          </button>
                        ) : (
                          <div className="space-y-1.5 animate-in fade-in duration-200">
                            <span className="text-[11px] font-bold text-emerald-400 block">
                              ✅ {sc.answer}
                            </span>
                            <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-950 p-2 rounded border border-slate-800">
                              {sc.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: DETAILED COMPARISON MATRIX TABLE */}
        {/* ============================================================== */}
        {activeTab === 'table' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl animate-in fade-in duration-300">
            
            {/* Table Header & Category Filters */}
            <div className="p-4 sm:p-6 bg-slate-850 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Matriks Perbandingan Detail Parameter Teknis
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Komparasi komprehensif antara AI Simbolik Tradisional, Machine Learning, dan Deep Learning.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  { id: 'all', label: 'Semua Parameter' },
                  { id: 'fundamental', label: 'Konsep & Logika' },
                  { id: 'data', label: 'Data & Fitur' },
                  { id: 'system', label: 'Arsitektur & Hardware' },
                  { id: 'practical', label: 'Praktik & Industri' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setTableFilter(f.id as any)}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      tableFilter === f.id
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Body */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-950 text-slate-300 border-b border-slate-800">
                    <th className="p-4 font-bold text-slate-200 w-1/4">Parameter / Atribut</th>
                    <th className="p-4 font-bold text-blue-300 w-1/4">Artificial Intelligence (AI)</th>
                    <th className="p-4 font-bold text-cyan-300 w-1/4">Machine Learning (ML)</th>
                    <th className="p-4 font-bold text-indigo-300 w-1/4">Deep Learning (DL)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {filteredComparison.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-850/80 transition-colors">
                      <td className="p-4 font-bold text-white bg-slate-900/60 align-top">
                        {row.attribute}
                      </td>
                      <td className="p-4 leading-relaxed align-top">
                        {row.artificialIntelligence}
                      </td>
                      <td className="p-4 leading-relaxed bg-cyan-950/15 align-top">
                        {row.machineLearning}
                      </td>
                      <td className="p-4 leading-relaxed bg-indigo-950/15 align-top">
                        {row.deepLearning}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <span>Sumber Rujukan: Russell & Norvig (2020), Tom Mitchell (1997), dan LeCun et al. (Nature 2015)</span>
              <span className="font-mono text-cyan-400">Terverifikasi Standar Akademik</span>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: CLASSIFICATION BY CAPACITY (ANI, AGI, ASI) */}
        {/* ============================================================== */}
        {activeTab === 'levels' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TAXONOMY_LEVELS.map((lvl, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-6 bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition-all shadow-xl"
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

        {/* ============================================================== */}
        {/* TAB 5: VALID SOURCES & ACADEMIC GROUNDING */}
        {/* ============================================================== */}
        {activeTab === 'sources' && (
          <div className="bg-slate-900 p-6 sm:p-10 rounded-2xl border border-slate-800 shadow-xl space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Rujukan Valid & Definisi Formal Pakar Terkemuka
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Kutipan kata demi kata dari para perumus utama kecerdasan buatan dan pembelajaran mesin:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Arthur Samuel */}
              <div className="p-5 rounded-xl bg-slate-850 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300">Arthur Samuel (IBM, 1959)</span>
                  <span className="text-[10px] font-mono text-slate-400">IBM Journal of R&D</span>
                </div>
                <blockquote className="text-xs sm:text-sm text-slate-200 italic border-l-2 border-cyan-400 pl-3">
                  "Machine learning is the field of study that gives computers the ability to learn without being explicitly programmed."
                </blockquote>
                <p className="text-xs text-slate-400">
                  Samuel menciptakan program permainan catur (checkers) pertama di IBM 704 yang mampu belajar dari ribuan langkah permainan sebelumnya dan mengalahkan penciptanya sendiri.
                </p>
              </div>

              {/* Tom Mitchell */}
              <div className="p-5 rounded-xl bg-slate-850 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300">Tom M. Mitchell (CMU, 1997)</span>
                  <span className="text-[10px] font-mono text-slate-400">McGraw-Hill Textbook</span>
                </div>
                <blockquote className="text-xs sm:text-sm text-slate-200 italic border-l-2 border-cyan-400 pl-3">
                  "A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E."
                </blockquote>
                <p className="text-xs text-slate-400">
                  Formulasi matematis presisi pertama yang mendefinisikan pembelajaran mesin sebagai optimasi kinerja tugas T terukur P seiring bertambahnya pengalaman data E.
                </p>
              </div>

              {/* Russell & Norvig */}
              <div className="p-5 rounded-xl bg-slate-850 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-300">Stuart Russell & Peter Norvig (2020)</span>
                  <span className="text-[10px] font-mono text-slate-400">Pearson Education</span>
                </div>
                <blockquote className="text-xs sm:text-sm text-slate-200 italic border-l-2 border-blue-400 pl-3">
                  "We define an agent as anything that can be viewed as perceiving its environment through sensors and acting upon that environment through actuators."
                </blockquote>
                <p className="text-xs text-slate-400">
                  Menempatkan AI dalam kerangka Rational Agent (agen rasional) yang bertindak memaksimalkan utilitas dalam kondisi ketidakpastian.
                </p>
              </div>

              {/* Yann LeCun, Bengio, Hinton */}
              <div className="p-5 rounded-xl bg-slate-850 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300">LeCun, Bengio, & Hinton (Nature, 2015)</span>
                  <span className="text-[10px] font-mono text-slate-400">Nature Vol. 521</span>
                </div>
                <blockquote className="text-xs sm:text-sm text-slate-200 italic border-l-2 border-indigo-400 pl-3">
                  "Conventional machine-learning techniques were limited in their ability to process natural data in their raw form... Deep learning methods are representation-learning methods with multiple levels of representation."
                </blockquote>
                <p className="text-xs text-slate-400">
                  Menjelaskan mengapa Deep Learning mengungguli metode klasik dalam memproses data natural mentah (suara, citra, teks).
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Next Section CTA */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={onNavigateToNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 font-semibold text-xs transition-all group"
          >
            <span>Lanjut ke Bagian: Evaluasi & Uji Pemahaman (Kuis)</span>
            <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
