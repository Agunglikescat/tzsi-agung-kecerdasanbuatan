export interface AIBranch {
  id: string;
  name: string;
  shortDesc: string;
  originalText: string;
  fullExplanation: string;
  academicSource: string;
  sourceType: string;
  yearOrReference: string;
  keyConcepts: string[];
  realWorldExamples: string[];
  iconName: string;
  tagColor: string;
}

export interface TimelineMilestone {
  year: string;
  period: string;
  title: string;
  bulletPoints: string[];
  deepExplanation: string;
  validSource: string;
  significance: string;
  figuresOrOrg: string[];
  category: 'foundational' | 'downturn' | 'breakthrough' | 'modern';
  metricHighlight?: {
    value: string;
    label: string;
  };
  quote?: string;
  yearNumber: number;
}

export interface ComparisonItem {
  attribute: string;
  artificialIntelligence: string;
  machineLearning: string;
  deepLearning: string;
  category: 'fundamental' | 'data' | 'system' | 'practical';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source: string;
}

export interface ReferenceItem {
  id: string;
  title: string;
  authors: string;
  year: string;
  publisher: string;
  type: 'Book' | 'Paper' | 'Official Report' | 'Award Announcement';
  urlOrDoi: string;
  relevance: string;
}

export const CONCEPT_DATA = {
  title: "Konsep AI",
  subtitle: "Fondasi Ilmiah Kecerdasan Buatan",
  section1: {
    question: "Apa itu AI?",
    originalText: "Artificial Intelligence (AI) atau kecerdasan buatan adalah bidang dalam ilmu komputer yang berfokus pada pengembangan sistem yang dapat meniru kecerdasan manusia. Sistem ini dirancang agar mampu belajar, bernalar, mengambil keputusan, serta menyelesaikan masalah dengan cara yang menyerupai pemikiran manusia.",
    academicExplanation: "Secara ilmiah, AI mencakup studi tentang agen komputasi cerdas (computational agents) yang mampu mengamati lingkungannya melalui sensor dan mengambil tindakan rasional melalui aktuator demi memaksimalkan probabilitas keberhasilan mencapai tujuan.",
    sources: [
      "Russell, S., & Norvig, P. (2020). Artificial Intelligence: A Modern Approach (4th ed.). Pearson.",
      "Poole, D., & Mackworth, A. (2017). Artificial Intelligence: Foundations of Computational Agents. Cambridge University Press."
    ]
  },
  section2: {
    title: "Definisi AI menurut IBM & Pencetusnya",
    originalText: "IBM mendefinisikan AI sebagai teknologi yang memungkinkan komputer dan mesin meniru kemampuan belajar, memahami, memecahkan masalah, mengambil keputusan, kreativitas, dan otonomi manusia. Sementara John McCarthy orang yang pertama kali mencetuskan istilah Artificial Intelligence mendefinisikannya sebagai ilmu dan rekayasa untuk membuat mesin cerdas, khususnya program komputer yang cerdas.",
    mccarthyQuote: "The science and engineering of making intelligent machines, especially intelligent computer programs.",
    ibmQuote: "Technology that enables computers and machines to simulate human intelligence and problem-solving capabilities.",
    turingQuote: "I propose to consider the question, 'Can machines think?' (Alan Turing, 1950 - Computing Machinery and Intelligence)",
    quadrants: [
      {
        title: "Thinking Humanly",
        desc: "Pendekatan Kognitif: Meneliti model pemikiran manusia melalui eksperimen psikologis dan neurosains komputasional.",
        example: "General Problem Solver (Newell & Simon, 1961)"
      },
      {
        title: "Thinking Rationally",
        desc: "Pendekatan Logika: Menggunakan penalaran silogisme dan logika formal tanpa kesalahan berpikir.",
        example: "Sistem Logika Orde Pertama (Prolog)"
      },
      {
        title: "Acting Humanly",
        desc: "Pendekatan Turing Test: Kemampuan sistem untuk berperilaku secara meyakinkan menyerupai manusia.",
        example: "Natural Language Chatbots & Imitation Game"
      },
      {
        title: "Acting Rationally",
        desc: "Pendekatan Agen Rasional: Mengambil tindakan terbaik yang diharapkan mencapai hasil maksimal dengan sumber daya yang ada.",
        example: "Sistem Pengemudi Otonom & AlphaGo"
      }
    ]
  }
};

export const AI_BRANCHES: AIBranch[] = [
  {
    id: "ml",
    name: "Machine Learning (ML)",
    shortDesc: "Sistem yang belajar dari data secara otomatis",
    originalText: "Machine Learning : sistem yang belajar dari data secara otomatis",
    fullExplanation: "Machine Learning adalah sub-bidang kecerdasan buatan yang memungkinkan algoritma komputasi untuk mengenali pola, mengekstraksi wawasan, dan meningkatkan performa prediktif secara mandiri berdasarkan data historis tanpa harus diprogram secara aturan deterministik eksplisit (hard-coded rules). Paradigma ini membagi pembelajaran ke dalam Supervised Learning (data berlabel), Unsupervised Learning (pencarian klaster tersembunyi), dan Reinforcement Learning (umpan balik reward & penalty).",
    academicSource: "Arthur Samuel (IBM Journal of Research and Development, 1959) & Tom M. Mitchell (Carnegie Mellon University, 1997 - 'Machine Learning')",
    sourceType: "Jurnal & Buku Teks Akademik",
    yearOrReference: "Mitchell (1997), Samuel (1959)",
    keyConcepts: [
      "Supervised Learning (Regresi & Klasifikasi)",
      "Unsupervised Learning (Clustering & Reduksi Dimensi)",
      "Reinforcement Learning (Policy & Value Function)",
      "Generalisasi & Penanganan Overfitting/Underfitting"
    ],
    realWorldExamples: [
      "Sistem filtering spam email Gmail (klasifikasi Bayesian/SVM)",
      "Algoritma rekomendasi video dan produk (Collaborative Filtering)",
      "Model estimasi risiko kredit di perbankan"
    ],
    iconName: "BrainCircuit",
    tagColor: "blue"
  },
  {
    id: "dl",
    name: "Deep Learning (DL)",
    shortDesc: "Jaringan saraf berlapis untuk data kompleks",
    originalText: "Deep Learning : jaringan saraf berlapis untuk data kompleks",
    fullExplanation: "Deep Learning adalah evolusi lanjut dari Machine Learning yang menggunakan arsitektur Jaringan Saraf Tiruan Mendalam (Deep Artificial Neural Networks) dengan multi-lapisan representasi tersembunyi (hidden layers). Keunggulan fundamentalnya terletak pada 'representation learning' otomatis: sistem mengekstrak fitur abstrak bertingkat secara hierarkis langsung dari data mentah berdimensi tinggi (piksel, sinyal audio, token teks) tanpa intervensi rekayasa fitur manual (manual feature engineering).",
    academicSource: "Yann LeCun, Yoshua Bengio, & Geoffrey Hinton (Nature Vol. 521, 2015 - 'Deep Learning')",
    sourceType: "Publikasi Ilmiah Nature",
    yearOrReference: "LeCun et al. (Nature 2015)",
    keyConcepts: [
      "Backpropagation & Stochastic Gradient Descent (SGD)",
      "Convolutional Neural Networks (CNN) untuk data visual",
      "Transformer & Multi-Head Self-Attention untuk data sekuensial",
      "Penanganan Vanishing/Exploding Gradients (ResNet)"
    ],
    realWorldExamples: [
      "Pengenalan ucapan otomatis end-to-end (OpenAI Whisper)",
      "Segmentasi medis citra MRI dan CT-Scan",
      "Prediksi pelipatan struktur protein molekuler (AlphaFold)"
    ],
    iconName: "Network",
    tagColor: "indigo"
  },
  {
    id: "nlp",
    name: "Natural Language Processing (NLP)",
    shortDesc: "AI yang memahami & menghasilkan bahasa manusia",
    originalText: "Natural Language Processing (NLP) : AI yang memahami & menghasilkan bahasa manusia",
    fullExplanation: "Natural Language Processing adalah bidang interdisipliner di persimpangan ilmu komputer, kecerdasan buatan, dan linguistik komputasional. NLP terbagi menjadi dua pilar utama: Natural Language Understanding (NLU) untuk mengurai semantik, sintaksis, konteks, dan sentimen; serta Natural Language Generation (NLG) untuk memproduksi teks yang koheren dan kontekstual. Perkembangan modern NLP didorong oleh arsitektur Transformer dan Large Language Models (LLM).",
    academicSource: "Daniel Jurafsky & James H. Martin (Stanford University, 2024 - 'Speech and Language Processing, 3rd ed.')",
    sourceType: "Buku Standar Universitas Stanford",
    yearOrReference: "Jurafsky & Martin (Stanford 2024)",
    keyConcepts: [
      "Tokenization & Word/Subword Embeddings",
      "Attention Mechanism ('Attention Is All You Need', Vaswani et al. 2017)",
      "Analisis Sentimen & Named Entity Recognition (NER)",
      "Machine Translation & Conversational Dialogue"
    ],
    realWorldExamples: [
      "Large Language Models seperti ChatGPT, Gemini, Claude",
      "Penerjemah multibahasa otomatis (Google Translate)",
      "Asisten virtual perintah suara (Siri, Alexa, Google Assistant)"
    ],
    iconName: "MessageSquareCode",
    tagColor: "emerald"
  },
  {
    id: "cv",
    name: "Computer Vision",
    shortDesc: "AI yang \"melihat\" & memahami gambar/video",
    originalText: "Computer Vision : AI yang \"melihat\" & memahami gambar/video",
    fullExplanation: "Computer Vision adalah disiplin ilmu AI yang berupaya menduplikasi kemampuan sistem visual manusia agar komputer dapat mengekstraksi, memproses, menginterpretasikan, dan memahami struktur 3D dari gambar atau video digital. Sistem ini bekerja melalui analisis matriks piksel warna, gradien tepi, deteksi batas objek, estimasi kedalaman visual, hingga pelacakan gerak (optical flow).",
    academicSource: "Richard Szeliski (Springer, 2022 - 'Computer Vision: Algorithms and Applications, 2nd ed.') & Dr. Fei-Fei Li (Stanford Vision Lab)",
    sourceType: "Monograf Referensi Industri & Springer",
    yearOrReference: "Szeliski (2022), ImageNet Project",
    keyConcepts: [
      "Image Classification & Localization",
      "Object Detection (YOLO, Faster R-CNN)",
      "Semantic & Instance Segmentation",
      "3D Scene Reconstruction & Optical Flow"
    ],
    realWorldExamples: [
      "Persepsi visual mobil otonom (Tesla Autopilot, Waymo)",
      "Sistem autentikasi biometrik wajah (Apple FaceID)",
      "Pemeriksaan cacat otomatis pada lini manufaktur presisi"
    ],
    iconName: "Eye",
    tagColor: "purple"
  },
  {
    id: "robotics",
    name: "Robotics",
    shortDesc: "AI yang berinteraksi dengan dunia fisik",
    originalText: "Robotics : AI yang berinteraksi dengan dunia fisik",
    fullExplanation: "Robotika cerdas (Intelligent Robotics) adalah integrasi sistem mekanik, sensorik, aktuasi fisik, dan algoritma kecerdasan buatan. AI dalam robotika bertanggung jawab atas persepsi lingkungan (SLAM - Simultaneous Localization and Mapping), perencanaan lintasan gerak (motion planning), kontrol manipulasi objek dinamis, serta navigasi otonom di ruang nyata tanpa membahayakan manusia.",
    academicSource: "Sebastian Thrun, Wolfram Burgard, & Dieter Fox (MIT Press, 2005 - 'Probabilistic Robotics') & IEEE Robotics and Automation Society",
    sourceType: "MIT Press Textbook & IEEE Standards",
    yearOrReference: "Thrun et al. (MIT Press 2005)",
    keyConcepts: [
      "Sensor Fusion (LiDAR, Kamera, IMU, Sonar)",
      "SLAM (Simultaneous Localization and Mapping)",
      "Kinematika Invers & Dynamic Trajectory Planning",
      "Physical Human-Robot Collaboration (Cobots)"
    ],
    realWorldExamples: [
      "Robot bipedal humanoid dinamis (Boston Dynamics Atlas)",
      "Robot logistik armada gudang otonom (Amazon Kiva/Proteus)",
      "Robot bedah mikro invasif minimal (Da Vinci Surgical System)"
    ],
    iconName: "Bot",
    tagColor: "amber"
  },
  {
    id: "expert-systems",
    name: "Sistem Pakar (Expert Systems)",
    shortDesc: "AI berbasis aturan meniru keputusan pakar",
    originalText: "Sistem Pakar (Expert Systems) : AI berbasis aturan meniru keputusan pakar",
    fullExplanation: "Sistem Pakar merupakan paradigma AI Simbolik (Good Old-Fashioned AI / GOFAI) yang mengemulasikan kemampuan pengambilan keputusan seorang pakar manusia dalam domain spesifik. Arsitekturnya secara ketat memisahkan dua komponen utama: 'Knowledge Base' (kumpulan fakta terverifikasi dan kaidah aturan kondisional IF-THEN) dan 'Inference Engine' (mesin pelacak logika deduktif menggunakan forward chaining atau backward chaining). Keunggulannya adalah memiliki kemampuan eksplanasi penalaran yang transparan (auditable reasoning).",
    academicSource: "Edward Feigenbaum (Stanford University, Knowledge Engineering pioneer) & Joseph C. Giarratano (2005 - 'Expert Systems: Principles and Programming')",
    sourceType: "Arsip Stanford Knowledge Systems Lab",
    yearOrReference: "Feigenbaum (1977), Giarratano & Riley (2005)",
    keyConcepts: [
      "Knowledge Representation (Aturan IF-THEN)",
      "Inference Engine (Forward Chaining & Backward Chaining)",
      "Penanganan Ketidakpastian (Fuzzy Logic & Certainty Factor)",
      "Audit Trail & Modul Penjelasan Transparan"
    ],
    realWorldExamples: [
      "MYCIN (Sistem legendaris Stanford untuk diagnosis infeksi bakteri darah)",
      "DENDRAL (Sistem identifikasi struktur kimia organik)",
      "Mesin underwriting asuransi dan kalkulasi pajak berbasis regulasi hukum"
    ],
    iconName: "Cpu",
    tagColor: "rose"
  },
  {
    id: "ethics",
    name: "AI Ethics & Safety",
    shortDesc: "Studi dampak sosial, privasi, bias, keamanan AI",
    originalText: "AI Ethics & Safety : studi dampak sosial, privasi, bias, keamanan AI",
    fullExplanation: "AI Ethics & Safety adalah disiplin keilmuan dan kebijakan yang memastikan pengembangan kecerdasan buatan berjalan selaras dengan martabat kemanusiaan, keselamatan publik, dan nilai keadilan universal. Fokus kajiannya meliputi: mitigasi algorithmic bias (diskriminasi data latih), privasi data pengguna, keterjelian (explainability/XAI), ketahanan terhadap serangan adversarial (jailbreak/poisoning), tata kelola hak cipta, serta alignment problem (menjamin sistem supercerdas tetap tunduk pada tujuan mulia peradaban manusia).",
    academicSource: "UNESCO (2021 - 'Recommendation on the Ethics of Artificial Intelligence') & Nick Bostrom (Oxford University - 'Superintelligence: Paths, Dangers, Strategies')",
    sourceType: "Rekomendasi Resmi Konsensus 193 Negara Anggota UNESCO",
    yearOrReference: "UNESCO (2021), EU AI Act (2024)",
    keyConcepts: [
      "Algorithmic Fairness & Bias Mitigation",
      "Explainable AI (XAI) & Transparansi Model",
      "AI Safety & Value Alignment Problem",
      "Regulasi Kepatuhan Hukum (EU AI Act, Tata Kelola Etis)"
    ],
    realWorldExamples: [
      "Audit independen terhadap algoritma penilaian kredit perbankan",
      "Penerapan Content Credentials (C2PA) watermarking pada gambar AI",
      "Protokol Red-Teaming untuk mencegah kebocoran data pada LLM enterprise"
    ],
    iconName: "ShieldCheck",
    tagColor: "teal"
  }
];

export const TIMELINE_DATA: TimelineMilestone[] = [
  {
    year: "1956",
    yearNumber: 1956,
    period: "Kelahiran Disiplin Ilmu Resmi",
    title: "Konferensi Dartmouth, Kelahiran Istilah \"AI\"",
    bulletPoints: [
      "Digagas oleh John McCarthy, Marvin Minsky, Nathaniel Rochester, dan Claude Shannon",
      "Berlangsung 8 minggu di Dartmouth College, AS",
      "Titik awal AI sebagai bidang ilmu resmi"
    ],
    deepExplanation: "Pada musim panas tahun 1956, Dartmouth Summer Research Project on Artificial Intelligence diselenggarakan atas inisiatif matematikawan John McCarthy (Dartmouth), Marvin Minsky (Harvard), Nathaniel Rochester (IBM), dan Claude Shannon (Bell Labs). Dalam proposal pendanaan yang diajukan ke Rockefeller Foundation pada 31 Agustus 1955, istilah 'Artificial Intelligence' pertama kali resmi dicetuskan. Konferensi selama 8 minggu ini mempertemukan para pionir yang mendemonstrasikan program seperti Logic Theorist (Allen Newell, Herbert Simon, dan Cliff Shaw) yang mampu membuktikan teorema matematika secara simbolik. Peristiwa ini memisahkan studi kecerdasan komputasi dari payung sibernetika dan meletakkannya sebagai disiplin mandiri.",
    validSource: "McCarthy, J., Minsky, M. L., Rochester, N., & Shannon, C. E. (1955). A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence. AI Magazine, 27(4), 12-14.",
    significance: "Mendirikan fondasi teori, istilah baku 'Artificial Intelligence', serta agenda riset komputasi simbolik selama 2 dekade berikutnya.",
    figuresOrOrg: ["John McCarthy", "Marvin Minsky", "Claude Shannon", "Nathaniel Rochester", "Dartmouth College"],
    category: "foundational",
    metricHighlight: {
      value: "8 Minggu",
      label: "Durasi Konferensi Sejarah Dartmouth"
    },
    quote: "Every aspect of learning or any other feature of intelligence can in principle be so precisely described that a machine can be made to simulate it."
  },
  {
    year: "1974–1993",
    yearNumber: 1974,
    period: "Musim Dingin Riset & Evaluasi Realitas",
    title: "Era AI Winter (Musim Dingin AI)",
    bulletPoints: [
      "Dua periode penurunan minat & dana riset AI",
      "Penyebab: ekspektasi terlalu tinggi, teknologi belum siap",
      "Riset AI sempat hampir terhenti selama ±20 tahun"
    ],
    deepExplanation: "AI Winter adalah istilah historis untuk dua periode penurunan drastis pendanaan dan antusiasme akademik terhadap kecerdasan buatan. Gelombang pertama (1974–1980) dipicu oleh terbitnya Lighthill Report (1973) di Inggris yang mengkritik kegagalan AI dalam memecahkan masalah skala dunia nyata (combinatorial explosion) dan pemangkasan dana besar-besaran oleh DARPA (Mansfield Amendment). Gelombang kedua (1987–1993) terjadi menyusul runtuhnya pasar komputer khusus Lisp Machine serta keterbatasan komersial sistem pakar yang rapuh ketika menghadapi kasus di luar basis aturan. Keterbatasan komputasi (CPU lambat, memori kilobyte) dan minimnya data digital membuktikan bahwa ekspektasi awal terlalu prematur.",
    validSource: "Lighthill, J. (1973). 'Artificial Intelligence: A General Survey'. Science Research Council Report. & Crevier, D. (1993). 'AI: The Tumultuous Search for Artificial Intelligence'.",
    significance: "Menjadi pelajaran epistemologis terpenting dalam sejarah komputasi agar tidak membesar-besarkan klaim (hype) tanpa fondasi matematis dan kapasitas perangkat keras yang memadai.",
    figuresOrOrg: ["Sir James Lighthill", "DARPA", "Mansfield Amendment", "Komunitas Riset Simbolik"],
    category: "downturn",
    metricHighlight: {
      value: "±20 Tahun",
      label: "Periode Evaluasi & Defisit Pendanaan Riset"
    },
    quote: "In no part of the field have the discoveries made so far produced the major impact that was then promised."
  },
  {
    year: "1997",
    yearNumber: 1997,
    period: "Kemenangan Komputasi Simbolik & Paralel",
    title: "Deep Blue Mengalahkan Kasparov",
    bulletPoints: [
      "Superkomputer catur buatan IBM",
      "Mengalahkan Garry Kasparov, juara catur dunia",
      "Pertama kalinya mesin menang atas manusia terbaik dalam permainan strategi kompleks"
    ],
    deepExplanation: "Pada 11 Mei 1997 di New York City, superkomputer IBM bernama Deep Blue mengukir sejarah dengan mengalahkan Grandmaster Garry Kasparov, juara dunia catur bertahan, dalam pertandingan enam babak dengan skor 3.5 lawan 2.5 (dua menang untuk Deep Blue, satu untuk Kasparov, dan tiga remis). Deep Blue dibangun dengan arsitektur 30-node IBM RS/6000 SP didukung oleh 480 prosesor catur kustom berbasis VLSI, memungkinkannya mengevaluasi hingga 200 juta kemungkinan langkah per detik menggunakan algoritma minimax alpha-beta pruning yang diperkaya basis data pembukaan dan endgame grandmaster.",
    validSource: "Campbell, M., Hoane, A. J., & Hsu, F. H. (2002). 'Deep Blue'. Artificial Intelligence Journal, 134(1-2), 57-83. IBM Research Archives.",
    significance: "Meruntuhkan mitos bahwa intuisi permainan strategi kompleks hanya milik otak manusia, membuktikan bahwa komputasi paralel masif mampu menundukkan kecerdasan taktis manusia terbaik.",
    figuresOrOrg: ["IBM Research", "Feng-hsiung Hsu", "Murray Campbell", "Garry Kasparov"],
    category: "breakthrough",
    metricHighlight: {
      value: "200 Juta",
      label: "Posisi Papan Catur Dievaluasi / Detik"
    },
    quote: "For the first time in history, a reigning world chess champion was defeated by a computer system under tournament conditions."
  },
  {
    year: "2012",
    yearNumber: 2012,
    period: "Revolusi Jaringan Saraf Tiruan & GPU",
    title: "AlexNet, Ledakan Deep Learning",
    bulletPoints: [
      "Menang telak di kompetisi pengenalan gambar ImageNet",
      "Membuktikan kekuatan deep learning",
      "Memicu ledakan riset & investasi AI modern"
    ],
    deepExplanation: "Pada kompetisi ImageNet Large Scale Visual Recognition Challenge (ILSVRC) 2012, Alex Krizhevsky bersama pembimbingnya Ilya Sutskever dan Geoffrey Hinton dari University of Toronto memamerkan 'AlexNet', sebuah arsitektur Convolutional Neural Network (CNN) 8-lapis. AlexNet mencatatkan top-5 error rate hanya 15.3%, menghancurkan pesaing terdekatnya yang masih menggunakan metode Computer Vision tradisional berbasis hand-crafted features dengan selisih spektakuler sebesar 10.8 poin persentase. Kemenangan ini didorong oleh pemanfaatan kartu grafis (NVIDIA GTX 580) untuk komputasi tensor paralel, fungsi aktivasi non-linear ReLU, dan teknik regularisasi Dropout.",
    validSource: "Krizhevsky, A., Sutskever, I., & Hinton, G. E. (2012). 'ImageNet Classification with Deep Convolutional Neural Networks'. Advances in Neural Information Processing Systems (NeurIPS 2012), 25, 1097-1105.",
    significance: "Mengakhiri dominasi algoritma manual klasik, menyalakan revolusi Deep Learning modern global, dan memicu investasi triliunan dolar di sektor AI.",
    figuresOrOrg: ["Alex Krizhevsky", "Ilya Sutskever", "Geoffrey Hinton", "ImageNet (Fei-Fei Li)", "NVIDIA"],
    category: "breakthrough",
    metricHighlight: {
      value: "15.3% Error",
      label: "Top-5 Error ImageNet (Turun Drastis dari 26.2%)"
    },
    quote: "Our network achieves top-1 and top-5 error rates of 37.5% and 15.3% which is considerably better than previous state-of-the-art."
  },
  {
    year: "2022",
    yearNumber: 2022,
    period: "Demokratisasi Generative AI & Konsumen Global",
    title: "ChatGPT Diluncurkan",
    bulletPoints: [
      "Dirilis OpenAI, 30 November 2022",
      "100 juta pengguna hanya dalam 2 bulan",
      "Aplikasi dengan pertumbuhan tercepat dalam sejarah"
    ],
    deepExplanation: "Pada 30 November 2022, OpenAI merilis riset preview ChatGPT berbasis model GPT-3.5 ke domain publik tanpa dipungut biaya. Menggunakan arsitektur Generative Pre-trained Transformer dengan pelatihan tambahan Reinforcement Learning from Human Feedback (RLHF), sistem ini mampu merespons dialog bahasa alami dengan keluwesan, penalaran konteks, penerjemahan bahasa, pembuatan kode pemrograman, dan sintesis pengetahuan umum. Menurut data UBS, ChatGPT mengumpulkan 100 juta pengguna aktif bulanan hanya dalam tempo 64 hari sejak dirilis, memecahkan rekor adopsi platform konsumen internet tercepat sepanjang sejarah umat manusia.",
    validSource: "OpenAI. (2022). 'Introducing ChatGPT'. OpenAI Research Blog. & UBS Investment Bank. (Feb 2023). 'ChatGPT Consumer Adoption Trajectory Report'.",
    significance: "Mengubah persepsi dunia dari AI sebagai instrumen laboratorium sains menjadi perkakas produktivitas sehari-hari yang dapat diakses oleh siapa saja di muka bumi.",
    figuresOrOrg: ["OpenAI", "Sam Altman", "Greg Brockman", "Ilya Sutskever"],
    category: "modern",
    metricHighlight: {
      value: "100 Juta",
      label: "Pengguna Aktif Hanya dalam 64 Hari"
    },
    quote: "ChatGPT is trained using Reinforcement Learning from Human Feedback (RLHF) to make the model safer and more capable."
  },
  {
    year: "2024–2026",
    yearNumber: 2024,
    period: "Rekognisi Tertinggi Sains Dunia & Sistem Otonom",
    title: "Nobel Prize & Era AI Agents",
    bulletPoints: [
      "AlphaFold (Google DeepMind) raih Nobel Kimia 2024",
      "AI mulai bertransisi dari \"menjawab\" -> \"bertindak\"",
      "Kemunculan AI agents yang bekerja otomatis"
    ],
    deepExplanation: "Tahun 2024 mencatat tonggak sejarah ketika Royal Swedish Academy of Sciences menganugerahkan dua Hadiah Nobel sekaligus untuk pionir AI: Nobel Fisika 2024 diberikan kepada John J. Hopfield dan Geoffrey E. Hinton atas fondasi jaringan saraf tiruan; sedangkan Nobel Kimia 2024 diberikan kepada David Baker, Demis Hassabis, dan John M. Jumper (Google DeepMind) atas terobosan AlphaFold dalam memecahkan misteri pelipatan 200 juta struktur protein 3D. Memasuki periode 2025–2026, terjadi pergeseran paradigma dari LLM generatif pasif ('menjawab pertanyaan') menjadi 'Agentic AI' ('bertindak secara otonom'). Sistem AI kini mampu merumuskan rencana multi-langkah (recursive reasoning), mengeksekusi kode di background, berinteraksi dengan API, dan mengoperasikan komputer secara mandiri layaknya agen digital profesional.",
    validSource: "The Nobel Prize Organization. (Oct 2024). Press releases: 'The Nobel Prize in Physics 2024' & 'The Nobel Prize in Chemistry 2024'. & Google DeepMind Research (AlphaFold3, 2024).",
    significance: "Kecerdasan Buatan resmi diakui sebagai katalisator revolusi sains fundamental dunia dan memasuki tahap evolusi agen cerdas mandiri (action-oriented intelligence).",
    figuresOrOrg: ["Geoffrey Hinton", "John Hopfield", "Demis Hassabis", "John Jumper", "Google DeepMind", "Komite Nobel"],
    category: "modern",
    metricHighlight: {
      value: "200 Juta+",
      label: "Struktur Protein 3D Terpecahkan (AlphaFold)"
    },
    quote: "For foundational discoveries that enable machine learning with artificial neural networks, and for protein structure prediction."
  }
];

export const TAXONOMY_COMPARISON: ComparisonItem[] = [
  {
    attribute: "Definisi Konseptual",
    artificialIntelligence: "Payung disiplin ilmu induk komprehensif untuk menciptakan entitas komputasi yang mampu meniru perilaku cerdas manusia (penalaran, persepsi, sintesis logika).",
    machineLearning: "Sub-himpunan AI yang berfokus pada algoritma matematis-statistik yang secara otomatis mempelajari pola dari kumpulan data masa lalu tanpa diprogram secara eksplisit.",
    deepLearning: "Sub-himpunan khusus Machine Learning yang memanfaatkan Jaringan Saraf Tiruan berlapis dalam (Deep Neural Networks) untuk mengekstrak fitur abstrak bertingkat secara otomatis.",
    category: "fundamental"
  },
  {
    attribute: "Paradigma Pemrograman & Logika",
    artificialIntelligence: "Dapat menggunakan logika aturan manual kaku (IF-THEN, Mesin Inferensi Simbolik, Tree Search) atau berbasis pembelajaran data.",
    machineLearning: "Murni berbasis pembelajaran statistik probabilistik dan minimisasi fungsi objektif/loss dari data latih (data-driven learning).",
    deepLearning: "Representasi tensor hierarkis non-linear berlapis-lapis (Backpropagation, konvolusi, mekanisme self-attention).",
    category: "fundamental"
  },
  {
    attribute: "Kebutuhan Volume Data",
    artificialIntelligence: "Tidak selalu membutuhkan data besar; sistem pakar rule-based hanya butuh puluhan aturan logika terstruktur dari pakar manusia.",
    machineLearning: "Membutuhkan data terstruktur dalam jumlah ratusan hingga puluhan ribu baris data tabel berfitur jelas untuk konvergensi model.",
    deepLearning: "Sangat 'lapar data' (data-hungry); memerlukan jutaan sampel data mentah berdimensi tinggi (gambar, audio, teks token) agar tidak overfitting.",
    category: "data"
  },
  {
    attribute: "Intervensi Rekayasa Fitur (Feature Engineering)",
    artificialIntelligence: "Dirancang secara manual oleh manusia / pakar logika sistem informasi.",
    machineLearning: "Sangat bergantung pada keahlian manusia (data scientist) dalam menyeleksi, mentransformasi, dan mengekstrak fitur variabel sebelum pelatihan.",
    deepLearning: "Feature representation learning otomatis; neuron lapisan tersembunyi mempelajari pola dari primitif (tepi/frekuensi) hingga semantik tinggi secara mandiri.",
    category: "data"
  },
  {
    attribute: "Algoritma & Arsitektur Utama",
    artificialIntelligence: "Algoritma Pencarian A*, Minimax, Logika Fuzzy, Sistem Pakar Forward/Backward Chaining, Rule Engines.",
    machineLearning: "Regresi Linier & Logistik, Support Vector Machine (SVM), Decision Tree, Random Forest, K-Means, XGBoost, Naive Bayes.",
    deepLearning: "Convolutional Neural Network (CNN), Transformer (GPT, BERT, Gemini), Recurrent Neural Network (LSTM), Autoencoders, GANs, Diffusion.",
    category: "system"
  },
  {
    attribute: "Kebutuhan Perangkat Keras Komputasi",
    artificialIntelligence: "Dapat berjalan mulus di CPU biasa dengan konsumsi memori ringan.",
    machineLearning: "Optimal pada CPU multi-core modern atau GPU entry-level untuk operasi matriks standar.",
    deepLearning: "Wajib menggunakan akselerator komputasi khusus (NVIDIA GPU Tensor Cores, Google Cloud TPU) untuk pelatihan ratusan miliar bobot matriks.",
    category: "system"
  },
  {
    attribute: "Interpretabilitas Model (Transparansi)",
    artificialIntelligence: "Sangat tinggi pada sistem simbolik (White-Box); keputusan dapat dilacak jejak auditnya per baris logika inferensi.",
    machineLearning: "Tergantung model; model linier dan pohon keputusan mudah diinterpretasikan, sedangkan model ensemble membutuhkan SHAP/LIME (Gray-Box).",
    deepLearning: "Cenderung 'Black-Box'; sangat rumit menjelaskan secara analitis mengapa kombinasi jutaan bobot non-linear menghasilkan keputusan tertentu.",
    category: "practical"
  },
  {
    attribute: "Contoh Kasus Nyata di Industri",
    artificialIntelligence: "Pengatur siklus lampu lalu lintas cerdas, Mesin Catur Deep Blue (1997), Sistem Pakar Regulasi Pajak, NPC game klasik.",
    machineLearning: "Pendeteksi transaksi fraud kartu kredit, Filter spam Gmail, Prediksi harga real estate, Sistem rekomendasi belanja e-commerce.",
    deepLearning: "Mobil otonom Waymo/Tesla, Large Language Models (ChatGPT, Gemini), Deteksi kanker pada citra radiologi MRI, AlphaFold prediksi protein.",
    category: "practical"
  }
];

export const TAXONOMY_LEVELS = [
  {
    name: "Artificial Narrow Intelligence (ANI)",
    alias: "Weak AI (AI Sempit)",
    status: "Sudah Beroperasi Penuh Saat Ini",
    desc: "AI yang dirancang dan dilatih secara spesifik untuk menyelesaikan satu tugas tunggal tertentu dengan tingkat kecakapan menyamai atau melampaui manusia. Sistem ini tidak memiliki kesadaran, kehendak diri, ataupun kemampuan mentransfer pengetahuannya ke ranah di luar keahliannya.",
    examples: ["Sistem Catur Deep Blue", "Pengenalan Wajah Apple FaceID", "Sistem Rekomendasi Spotify", "Model Bahasa Large Language Models (LLM)"]
  },
  {
    name: "Artificial General Intelligence (AGI)",
    alias: "Strong AI (AI Umum)",
    status: "Tahap Penelitian & Pengembangan Aktif",
    desc: "Sistem teoritis hipotetis yang memiliki kemampuan kognitif setara manusia di seluruh spektrum domain keilmuan, mampu bernalar abstrak, beradaptasi dengan lingkungan baru tanpa pelatihan ulang, memiliki akal sehat (common sense), dan merencanakan masa depan.",
    examples: ["Target riset institusi global (OpenAI, Google DeepMind, Stanford HAI)", "Agen penalaran mandiri multi-disiplin"]
  },
  {
    name: "Artificial Superintelligence (ASI)",
    alias: "Super AI (Kecerdasan Super)",
    status: "Konsep Filosofis & Hipotesis Masa Depan",
    desc: "Entitas kecerdasan komputasi yang melampaui kemampuan intelektual seluruh gabungan otak manusia paling jenius di bumi dalam segala bidang, mulai dari kreativitas ilmiah murni, penemuan hukum fisika baru, hingga hikmat sosial.",
    examples: ["Kajian Teori Singularitas Teknologi (Ray Kurzweil, Nick Bostrom)", "Kajian Eksistensial AI Safety & Alignment"]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Kapan istilah 'Artificial Intelligence' pertama kali resmi dicetuskan dan pada forum apa?",
    options: [
      "1950, dalam artikel Alan Turing tentang 'Imitation Game'",
      "1956, pada Konferensi Dartmouth yang digagas oleh John McCarthy dkk.",
      "1997, saat superkomputer IBM Deep Blue mengalahkan Garry Kasparov",
      "2012, pada kompetisi pengenalan gambar ImageNet"
    ],
    correctIndex: 1,
    explanation: "Istilah 'Artificial Intelligence' pertama kali dirumuskan dalam proposal riset Agustus 1955 oleh John McCarthy, Marvin Minsky, Nathaniel Rochester, dan Claude Shannon, kemudian resmi dideklarasikan pada Dartmouth Summer Research Project 1956.",
    source: "McCarthy et al. (Dartmouth 1956)"
  },
  {
    id: 2,
    question: "Apa perbedaan fundamental antara Machine Learning tradisional dan Deep Learning dalam hal pemrosesan fitur data?",
    options: [
      "Machine learning tidak menggunakan komputer, sedangkan deep learning menggunakan superkomputer",
      "Machine learning memerlukan rekayasa fitur manual oleh manusia, sedangkan Deep Learning mengekstrak representasi fitur secara otomatis bertingkat",
      "Machine learning hanya untuk teks, sedangkan Deep Learning hanya untuk angka",
      "Deep Learning tidak memerlukan data pelatihan sama sekali"
    ],
    correctIndex: 1,
    explanation: "Ciri khas Deep Learning adalah 'representation learning' hierarkis; model belajar menyaring fitur dari level primitif (tepi/piksel) ke level semantik tinggi (mata, hidung, wajah) secara otomatis tanpa manual feature engineering.",
    source: "LeCun, Bengio, & Hinton (Nature 2015)"
  },
  {
    id: 3,
    question: "Apa penyebab utama terjadinya periode 'AI Winter' (1974–1993) menurut catatan sejarah resmi?",
    options: [
      "Pelarangan hukum terhadap seluruh riset komputer oleh PBB",
      "Ekspektasi berlebihan (overpromising) yang tidak diimbangi kesiapan teknologi, komputasi minim, dan pemangkasan dana riset besar-besaran",
      "Seluruh ilmuwan AI beralih ke riset internet",
      "Kecerdasan buatan telah mencapai titik jenuh dan dianggap selesai dikembangkan"
    ],
    correctIndex: 1,
    explanation: "AI Winter terjadi akibat jurang antara janji/hype yang terlalu tinggi dengan realitas teknologi saat itu (Lighthill Report 1973, rapuhnya sistem pakar, dan keterbatasan CPU/memori), sehingga lembaga donor seperti DARPA memotong anggaran riset.",
    source: "Lighthill Report (1973) & Crevier (1993)"
  },
  {
    id: 4,
    question: "Penghargaan Nobel Kimia 2024 dianugerahkan kepada Demis Hassabis dan John M. Jumper (Google DeepMind) berkat kontribusi AI dalam bidang apa?",
    options: [
      "Menciptakan mesin pencari Google pertama kali",
      "Memecahkan masalah komputasi 50 tahun mengenai prediksi pelipatan struktur protein melalui sistem AlphaFold",
      "Menemukan algoritma enkripsi blockchain",
      "Membuat sistem pengemudi otonom komersial pertama"
    ],
    correctIndex: 1,
    explanation: "Demis Hassabis dan John Jumper dianugerahi Nobel Kimia 2024 atas terobosan AlphaFold yang berhasil memprediksi struktur 3D dari hampir seluruh 200 juta protein yang diketahui sains, membuka lompatan besar dalam biomedis dan desain obat.",
    source: "The Nobel Prize in Chemistry 2024 (Press Release)"
  },
  {
    id: 5,
    question: "Cabang AI manakah yang berfokus pada arsitektur pemisahan antara 'Knowledge Base' (aturan IF-THEN) dan 'Inference Engine'?",
    options: [
      "Computer Vision",
      "Sistem Pakar (Expert Systems)",
      "Robotics",
      "Deep Learning"
    ],
    correctIndex: 1,
    explanation: "Sistem Pakar (Expert Systems) dirancang dengan memisahkan Knowledge Base (aturan fakta dari pakar) dan Inference Engine (mekanisme penalaran forward/backward chaining) untuk mengambil keputusan logis yang dapat diaudit.",
    source: "Edward Feigenbaum (Stanford University) & Giarratano"
  }
];

export const REFERENCES_LIST: ReferenceItem[] = [
  {
    id: "ref-1",
    title: "Artificial Intelligence: A Modern Approach (4th Edition)",
    authors: "Stuart Russell & Peter Norvig",
    year: "2020",
    publisher: "Pearson Education",
    type: "Book",
    urlOrDoi: "ISBN: 978-0134610993",
    relevance: "Buku rujukan standar internasional paling komprehensif di lebih dari 1.500 universitas di seluruh dunia untuk konsep agen rasional, taksonomi AI, dan ruang lingkup AI."
  },
  {
    id: "ref-2",
    title: "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence",
    authors: "John McCarthy, Marvin L. Minsky, Nathaniel Rochester, & Claude E. Shannon",
    year: "1955",
    publisher: "Dartmouth College Archives / AI Magazine",
    type: "Paper",
    urlOrDoi: "AI Magazine Vol. 27 No. 4 (2006 Reprint)",
    relevance: "Dokumen historis resmi tempat kata 'Artificial Intelligence' pertama kali dituliskan dan dirumuskan sebagai agenda riset komputasi modern."
  },
  {
    id: "ref-3",
    title: "Deep Learning",
    authors: "Yann LeCun, Yoshua Bengio, & Geoffrey Hinton",
    year: "2015",
    publisher: "Nature, 521(7553), 436-444",
    type: "Paper",
    urlOrDoi: "doi:10.1038/nature14539",
    relevance: "Makalah terobosan utama yang merangkum fondasi matematis dan kebangkitan arsitektur Deep Learning di abad ke-21."
  },
  {
    id: "ref-4",
    title: "ImageNet Classification with Deep Convolutional Neural Networks",
    authors: "Alex Krizhevsky, Ilya Sutskever, & Geoffrey E. Hinton",
    year: "2012",
    publisher: "Advances in Neural Information Processing Systems (NeurIPS 2012)",
    type: "Paper",
    urlOrDoi: "NeurIPS 2012 / AlexNet",
    relevance: "Karya ilmiah yang menjadi pemicu ledakan modern deep learning dan akselerasi GPU dalam visi komputer global."
  },
  {
    id: "ref-5",
    title: "Recommendation on the Ethics of Artificial Intelligence",
    authors: "UNESCO General Conference (193 Member States)",
    year: "2021",
    publisher: "United Nations Educational, Scientific and Cultural Organization (UNESCO)",
    type: "Official Report",
    urlOrDoi: "SHS/BIO/REC-AI/2021",
    relevance: "Instrumen penetapan standar global pertama yang diadopsi secara aklamasi untuk etika AI, perlindungan hak asasi, privasi, dan tata kelola sistem cerdas."
  },
  {
    id: "ref-6",
    title: "The Nobel Prize in Physics & Chemistry 2024 Press Announcements",
    authors: "The Royal Swedish Academy of Sciences",
    year: "2024",
    publisher: "Nobel Media AB",
    type: "Award Announcement",
    urlOrDoi: "nobelprize.org (Physics 2024 & Chemistry 2024)",
    relevance: "Pengakuan saintifik tertinggi dunia atas machine learning (Hopfield & Hinton) dan penerapan AI dalam penemuan struktur biokimia protein (AlphaFold oleh Hassabis & Jumper)."
  },
  {
    id: "ref-7",
    title: "Machine Learning (McGraw-Hill Series in Computer Science)",
    authors: "Tom M. Mitchell (Carnegie Mellon University)",
    year: "1997",
    publisher: "McGraw-Hill",
    type: "Book",
    urlOrDoi: "ISBN: 978-0070428072",
    relevance: "Definisi matematis standar pertama tentang proses pembelajaran mesin: 'A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E.'"
  }
];
