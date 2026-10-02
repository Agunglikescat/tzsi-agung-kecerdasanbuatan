import React, { useState } from 'react';
import { 
  Lightbulb, 
  X, 
  Sparkles, 
  BookOpen, 
  Share2, 
  Check, 
  ChevronRight, 
  ChevronLeft,
  ExternalLink,
  Award
} from 'lucide-react';

export interface QuickFact {
  id: string;
  sectionId: string;
  category: string;
  title: string;
  fact: string;
  deepExplanation: string;
  source: string;
  year?: string;
  badge?: string;
}

export const SECTION_FACTS: Record<string, QuickFact[]> = {
  hero: [
    {
      id: 'hero-1',
      sectionId: 'hero',
      category: 'Asal Usul Historis',
      badge: 'Dartmouth 1955',
      title: 'Istilah AI Lahir dari Proposal Dana $13.500',
      fact: 'John McCarthy pertama kali menciptakan istilah "Artificial Intelligence" pada proposal riset 31 Agustus 1955 untuk Konferensi Dartmouth 1956.',
      deepExplanation: 'Pada proposal tersebut, John McCarthy bersama Marvin Minsky, Nathaniel Rochester, dan Claude Shannon meminta dana riset sebesar $13.500 kepada Rockefeller Foundation untuk mendanai lokakarya musim panas 2 bulan dengan 10 ilmuwan. Proposal ini menegaskan hipotesis bahwa setiap aspek pembelajaran dan kecerdasan manusia pada prinsipnya dapat dijelaskan secara presisi hingga mesin dapat menyimulasikannya.',
      source: 'McCarthy, J., Minsky, M. L., Rochester, N., & Shannon, C. E. (1955). "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence".',
      year: '1955'
    },
    {
      id: 'hero-2',
      sectionId: 'hero',
      category: 'Prestasi Sains',
      badge: 'Nobel Prize 2024',
      title: 'AI Meraih Dua Hadiah Nobel Sekaligus di Tahun 2024',
      fact: 'Untuk pertama kalinya dalam sejarah, fondasi dan aplikasi AI dianugerahi Hadiah Nobel Fisika dan Nobel Kimia pada tahun yang sama.',
      deepExplanation: 'John Hopfield dan Geoffrey Hinton memenangkan Hadiah Nobel Fisika 2024 atas penemuan fondasi Artificial Neural Networks. Keesokan harinya, Demis Hassabis dan John Jumper dari Google DeepMind memenangkan Hadiah Nobel Kimia 2024 atas AlphaFold yang memecahkan masalah prediksi struktur 200 juta protein dunia.',
      source: 'The Nobel Foundation. (Oktober 2024). "The Nobel Prize in Physics and Chemistry 2024 Official Press Releases".',
      year: '2024'
    }
  ],
  konsep: [
    {
      id: 'konsep-1',
      sectionId: 'konsep',
      category: 'Sejarah Pemikiran',
      badge: 'The Imitation Game',
      title: 'Alan Turing Tidak Pernah Menyebut "Turing Test"',
      fact: 'Dalam makalah legendarisnya tahun 1950, Alan Turing menyebut uji kecerdasannya sebagai "The Imitation Game" (Permainan Tiruan).',
      deepExplanation: 'Makalah Turing berjudul "Computing Machinery and Intelligence" di jurnal Mind dibuka dengan kalimat terkenal: "I propose to consider the question, \'Can machines think?\'". Istilah "Turing Test" baru dipopulerkan bertahun-tahun kemudian oleh komunitas ilmuwan komputer sebagai penghormatan atas dedikasi dan visi brilian sang bapak ilmu komputer modern.',
      source: 'Turing, A. M. (1950). "Computing Machinery and Intelligence". Mind, 59(236), 433-460.',
      year: '1950'
    },
    {
      id: 'konsep-2',
      sectionId: 'konsep',
      category: 'Definisi Industri',
      badge: 'Definisi IBM',
      title: 'IBM Mendefinisikan AI Berdasarkan 4 Kemampuan Manusia',
      fact: 'Bagi IBM, kecerdasan buatan bukan sekadar algoritma matematis, melainkan teknologi yang meniru cara berpikir, belajar, memahami, dan memecahkan masalah manusia.',
      deepExplanation: 'Definisi resmi IBM menekankan bahwa AI sejati menggabungkan ilmu komputer dan dataset berukuran masif untuk memecahkan masalah secara otonom. Ini mencakup sub-bidang Machine Learning dan Deep Learning yang menciptakan sistem prediksi atau klasifikasi berdasarkan data input nyata.',
      source: 'IBM Cloud Education. (2023). "What is Artificial Intelligence (AI)? Definisi dan Taksonomi Resmi IBM".',
      year: '2023'
    },
    {
      id: 'konsep-3',
      sectionId: 'konsep',
      category: 'Filosofi AI',
      badge: 'Russell & Norvig',
      title: 'Mengapa Kuadran "Acting Rationally" Menjadi Standar Utama AI Modern?',
      fact: 'Buku standar universitas dunia memilih fokus pada "Bertindak Rasional" (Acting Rationally) daripada meniru kelemahan emosional manusia.',
      deepExplanation: 'Menurut Stuart Russell dan Peter Norvig, manusia sering bertindak tidak rasional karena bias kognitif, kelelahan, dan emosi sesaat. Oleh karena itu, pendekatan AI modern berpusat pada "Rational Agent"—agen komputasi yang memaksimalkan ekspektasi keberhasilan pencapaian tujuan objektif berdasarkan informasi lingkungan yang diterimanya.',
      source: 'Russell, S., & Norvig, P. (2020). "Artificial Intelligence: A Modern Approach (4th ed.)". Pearson.',
      year: '2020'
    }
  ],
  'ruang-lingkup': [
    {
      id: 'scope-1',
      sectionId: 'ruang-lingkup',
      category: 'Computer Vision',
      badge: 'ImageNet Milestone',
      title: 'ImageNet Dimulai dari Mengunduh 14 Juta Gambar dari Internet',
      fact: 'Revolusi Deep Learning modern lahir berkat kerja keras Prof. Fei-Fei Li mengumpulkan 14 juta gambar berlabel menggunakan ribuan pekerja lepas online.',
      deepExplanation: 'Pada tahun 2007–2009, banyak ilmuwan meragukan proyek ImageNet karena dianggap pekerjaan sia-sia. Namun Fei-Fei Li yakin bahwa algoritma cerdas membutuhkan data berskala raksasa. Dataset ImageNet inilah yang kemudian digunakan dalam kompetisi global 2012, tempat AlexNet meledakkan era kecerdasan buatan berbasis GPU.',
      source: 'Deng, J., Dong, W., Socher, R., Li, L.-J., Li, K., & Fei-Fei, L. (2009). "ImageNet: A Large-Scale Hierarchical Image Database". IEEE CVPR.',
      year: '2009'
    },
    {
      id: 'scope-2',
      sectionId: 'ruang-lingkup',
      category: 'Sistem Pakar',
      badge: 'MYCIN 1970s',
      title: 'MYCIN: Sistem Pakar yang Mengalahkan Dokter Spesialis Manusia',
      fact: 'Sistem Pakar MYCIN yang dibuat di Stanford University tahun 1972 memiliki tingkat akurasi diagnosis infeksi darah 65%, melampaui dokter spesialis manusia.',
      deepExplanation: 'Dalam uji klinis evaluasi buta (blind study), MYCIN mengungguli dokter manusia yang hanya memiliki tingkat preskripsi tepat 42%–62.5%. MYCIN menggunakan sekitar 600 aturan logika IF-THEN deduktif terpisah dengan mesin inferensi chaining. Walau demikian, sistem ini tidak pernah diterapkan secara luas karena belum adanya payung hukum pertanggungjawaban medis jika komputer salah mendiagnosis.',
      source: 'Buchanan, B. G., & Shortliffe, E. H. (1984). "Rule-Based Expert Systems: The MYCIN Experiments of the Stanford Heuristic Programming Project". Addison-Wesley.',
      year: '1984'
    },
    {
      id: 'scope-3',
      sectionId: 'ruang-lingkup',
      category: 'Etika & Regulasi',
      badge: 'EU AI Act 2024',
      title: 'Regulasi AI Mengkategorikan Risiko Menjadi 4 Tingkatan',
      fact: 'Undang-Undang Kecerdasan Buatan Uni Eropa (EU AI Act 2024) adalah hukum regulasi komprehensif pertama di dunia yang mengikat secara pidana.',
      deepExplanation: 'EU AI Act membagi sistem AI ke dalam: 1) Risiko Tidak Dapat Diterima (dilarang total, misal social scoring), 2) Risiko Tinggi (wajib audit ketat, misal rekrutmen & kesehatan), 3) Risiko Spesifik/Transparansi (misal chatbot harus mengaku bukan manusia), dan 4) Risiko Minimal (filter spam bebas digunakan).',
      source: 'European Parliament. (2024). "Artificial Intelligence Act (Regulation EU 2024/1689)". Official Journal of the European Union.',
      year: '2024'
    }
  ],
  sejarah: [
    {
      id: 'sejarah-1',
      sectionId: 'sejarah',
      category: 'Era Catur Komputer',
      badge: 'Deep Blue 1997',
      title: 'Deep Blue Mengevaluasi 200 Juta Posisi Catur per Detik',
      fact: 'Superkomputer IBM Deep Blue mengalahkan Juara Dunia Garry Kasparov berkat 480 prosesor catur akselerasi khusus (VLSI ASIC).',
      deepExplanation: 'Pertandingan 6 babak di New York City pada Mei 1997 berakhir dengan skor 3.5 - 2.5 untuk kemenangan Deep Blue. Ini menandai pertama kalinya dalam sejarah peradaban seorang juara dunia catur manusia bertahan dikalahkan oleh mesin dalam format turnamen resmi dengan kontrol waktu standar.',
      source: 'Campbell, M., Hoane, A. J., & Hsu, F.-h. (2002). "Deep Blue". Artificial Intelligence, 134(1-2), 57-83.',
      year: '1997'
    },
    {
      id: 'sejarah-2',
      sectionId: 'sejarah',
      category: 'Adopsi Teknologi',
      badge: 'Rekor ChatGPT',
      title: 'Pertumbuhan Konsumen Tercepat Sepanjang Sejarah Internet',
      fact: 'ChatGPT mengumpulkan 100 juta pengguna aktif bulanan hanya dalam tempo 64 hari sejak dirilis pada 30 November 2022.',
      deepExplanation: 'Sebagai perbandingan riil kecepatan adopsi teknologi: TikTok membutuhkan waktu 9 bulan, Instagram membutuhkan 2,5 tahun, Spotify membutuhkan 4,5 tahun, dan ponsel genggam membutuhkan 16 tahun untuk menjangkau 100 juta pengguna global.',
      source: 'UBS Investment Bank. (Februari 2023). "ChatGPT Sets Record for Fastest-Growing Consumer Application in History". Analisis Data Similarweb.',
      year: '2022'
    },
    {
      id: 'sejarah-3',
      sectionId: 'sejarah',
      category: 'Krisis AI Winter',
      badge: 'Lighthill Report',
      title: 'Pemberhentian Dana Riset Karena "Lighthill Report 1973"',
      fact: 'Laporan ilmiah Sir James Lighthill di Inggris menyebabkan penutupan hampir seluruh laboratorium AI di universitas Inggris selama lebih dari satu dekade.',
      deepExplanation: 'Lighthill menyimpulkan bahwa AI tidak akan pernah mampu menyelesaikan permasalahan praktis dunia nyata karena kendala ledakan kombinatorial (combinatorial explosion). Laporan ini memicu kepanikan di kalangan badan riset AS (DARPA) dan memicu era AI Winter Pertama yang mematikan pendanaan riset kecerdasan buatan.',
      source: 'Lighthill, J. (1973). "Artificial Intelligence: A General Survey". Science Research Council Report.',
      year: '1973'
    }
  ],
  taksonomi: [
    {
      id: 'taksonomi-1',
      sectionId: 'taksonomi',
      category: 'Paradigma Coding',
      badge: 'Tradisional vs ML',
      title: 'Machine Learning Membalikkan Arah Alur Pemrograman',
      fact: 'Dalam koding klasik manusia memasukkan aturan untuk mencari jawaban; dalam ML manusia memasukkan jawaban dan data agar mesin merumuskan aturannya.',
      deepExplanation: 'Prof. Pedro Domingos menganalogikan Machine Learning seperti "pemrograman industri yang membuat kodingannya sendiri". Programmer tidak lagi menulis jutaan baris logika `if-else` manual untuk mengenali kucing, melainkan memberi 100.000 foto kucing dan membiarkan algoritma gradient descent menyesuaikan bobot matematisnya secara otomatis.',
      source: 'Domingos, P. (2015). "The Master Algorithm: How the Quest for the Ultimate Learning Machine Will Remake Our World". Basic Books.',
      year: '2015'
    },
    {
      id: 'taksonomi-2',
      sectionId: 'taksonomi',
      category: 'Spektrum Kecerdasan',
      badge: 'ANI vs AGI vs ASI',
      title: 'Seluruh AI yang Digunakan Saat Ini Masih Berstatus "ANI" (Narrow)',
      fact: 'Meskipun ChatGPT dan Gemini tampak sangat cerdas, keduanya masih tergolong Artificial Narrow Intelligence (ANI), belum AGI.',
      deepExplanation: 'ANI adalah kecerdasan buatan yang hanya terampil pada domain tugas yang dilatihkan (misal bahasa atau catur). Model bahasa tercanggih saat ini tidak memiliki kesadaran sejati (consciousness), emosi, maupun otonomi lintas domain tanpa perintah prompt. Transisi menuju AGI (Artificial General Intelligence) masih menjadi topik riset teoretis paling intensif di dunia.',
      source: 'Bostrom, N. (2014). "Superintelligence: Paths, Dangers, Strategies". Oxford University Press.',
      year: '2014'
    }
  ],
  kuis: [
    {
      id: 'kuis-1',
      sectionId: 'kuis',
      category: 'Psikologi Belajar',
      badge: 'The Testing Effect',
      title: 'Mengerjakan Kuis Meningkatkan Retensi Otak Hingga 50%',
      fact: 'Penelitian psikologi kognitif membuktikan bahwa tes aktif menghasilkan daya ingat jauh lebih kuat dibandingkan sekadar membaca ulang rangkuman.',
      deepExplanation: 'Fenomena ini dikenal sebagai "The Retrieval Practice Effect" (Roediger & Karpicke, 2006). Saat otak dipaksa memanggil kembali (recall) konsep yang baru dibaca untuk menjawab soal pilihan ganda, sinapsis memori diperkuat secara permanen, mencegah kurva lupa Ebbinghaus hingga lebih dari 50% efektivitas retensi jangka panjang.',
      source: 'Roediger, H. L., & Karpicke, J. D. (2006). "Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention". Psychological Science, 17(3), 249-255.',
      year: '2006'
    }
  ],
  referensi: [
    {
      id: 'ref-1',
      sectionId: 'referensi',
      category: 'Standar Akademik',
      badge: 'Buku Pegangan Dunia',
      title: 'Buku Russell & Norvig Digunakan di 1.500+ Universitas Global',
      fact: 'Buku "Artificial Intelligence: A Modern Approach" (AIMA) telah diadopsi di lebih dari 135 negara dan diterjemahkan ke dalam 15+ bahasa dunia.',
      deepExplanation: 'Dikenal sebagai "Alkitabnya Mahasiswa AI", buku karangan Stuart Russell (Profesor UC Berkeley) dan Peter Norvig (Direktur Riset Google) ini menyatukan seluruh cabang AI di bawah satu paradigma elegan: Desain Agen Cerdas yang Rasional.',
      source: 'Pearson Higher Education. (2021). "Global Adoption & Citation Impact of AIMA 4th Edition".',
      year: '2021'
    }
  ]
};

interface QuickFactBadgeProps {
  sectionId: string;
  className?: string;
  variant?: 'inline' | 'floating' | 'banner';
}

export const QuickFactBadge: React.FC<QuickFactBadgeProps> = ({
  sectionId,
  className = '',
  variant = 'inline'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const facts = SECTION_FACTS[sectionId] || SECTION_FACTS['hero'];
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentFact = facts[currentFactIndex] || facts[0];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentFactIndex((prev) => (prev + 1) % facts.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentFactIndex((prev) => (prev - 1 + facts.length) % facts.length);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `💡 Tahukah Anda? ${currentFact.title}\n\n"${currentFact.fact}"\n\nPenjelasan: ${currentFact.deepExplanation}\n\nSumber: ${currentFact.source}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Trigger Button depending on variant */}
      {variant === 'banner' ? (
        <div 
          onClick={() => setIsOpen(true)}
          className={`cursor-pointer group flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 hover:border-amber-400/60 transition-all shadow-sm shadow-amber-950/20 ${className}`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0 group-hover:scale-110 group-hover:bg-amber-500/30 transition-all shadow-sm">
              <Lightbulb className="w-4 h-4 animate-pulse text-amber-300" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Tahukah Anda?
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {currentFact.badge || 'Fakta Cepat'}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                {currentFact.title}
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-amber-300 group-hover:translate-x-1 transition-transform flex items-center gap-1 shrink-0">
            <span>Buka Fakta</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 hover:border-amber-400 text-amber-300 text-xs font-semibold transition-all hover:scale-105 shadow-sm shadow-amber-950/30 group ${className}`}
          title="Klik untuk membuka Fakta Cepat / Tahukah Anda seputar topik ini"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>Tahukah Anda?</span>
          <span className="text-[10px] bg-amber-400/20 text-amber-200 px-1.5 py-0.2 rounded-full font-bold">
            {facts.length} Fakta
          </span>
        </button>
      )}

      {/* Interactive Modal Popup */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl shadow-amber-950/40 overflow-hidden animate-in zoom-in-95 duration-250 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950/50 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shadow-md shadow-amber-500/20">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Tahukah Anda?
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      Fakta {currentFactIndex + 1} dari {facts.length}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    {currentFact.category}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                title="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Fact Highlight Banner */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-100">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wide mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentFact.badge || 'Sorotan Fakta'}</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white leading-snug mb-2">
                  {currentFact.title}
                </h4>
                <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-medium">
                  "{currentFact.fact}"
                </p>
              </div>

              {/* In-Depth Explanation */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Penjelasan Mendalam:</span>
                </h5>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-850/60 p-3.5 rounded-xl border border-slate-800">
                  {currentFact.deepExplanation}
                </p>
              </div>

              {/* Source Verification Citation */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
                <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="font-semibold text-emerald-300">Sumber Valid & Terverifikasi: </span>
                  <span className="italic">{currentFact.source}</span>
                  {currentFact.year && <span className="font-semibold text-slate-300"> ({currentFact.year})</span>}
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-2">
              {/* Copy Quote Button */}
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-700"
                title="Salin ringkasan fakta ke clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300 font-bold">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Salin Fakta</span>
                  </>
                )}
              </button>

              {/* Pagination if multiple facts */}
              {facts.length > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    title="Fakta Sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-400 px-1">
                    {currentFactIndex + 1} / {facts.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    title="Fakta Selanjutnya"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
