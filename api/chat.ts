import { GoogleGenAI } from '@google/genai';

// Initialize GoogleGenAI with process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const SYSTEM_INSTRUCTION = `Anda adalah "Asisten Edukasi AI" resmi dari portal AGUNGPROJECT.ID.
Tugas Anda adalah menjadi tutor interaktif yang ramah, cerdas, akurat, dan edukatif untuk membantu pengguna memahami materi yang dipelajari di portal ini:
1. Konsep AI (Gambar 1):
   - Definisi dasar AI: ilmu komputer berfokus pada sistem yang meniru kecerdasan manusia (belajar, bernalar, mengambil keputusan, memecahkan masalah).
   - Definisi IBM: teknologi yang memungkinkan komputer meniru kemampuan belajar, memahami, kreativitas, dan otonomi.
   - John McCarthy (1955/1956 Dartmouth): ilmu dan rekayasa untuk membuat mesin cerdas.
   - Alan Turing (1950): Uji Turing (The Imitation Game) dalam makalah "Computing Machinery and Intelligence".
   - 4 Kuadran AI menurut Stuart Russell & Peter Norvig: Thinking Humanly, Thinking Rationally, Acting Humanly, Acting Rationally.

2. Ruang Lingkup & 7 Cabang Utama AI (Gambar 2):
   - Machine Learning: sistem yang belajar otomatis dari data (Arthur Samuel 1959, Tom Mitchell 1997).
   - Deep Learning: jaringan saraf tiruan berlapis dalam untuk data kompleks dan representation learning otomatis (LeCun, Bengio, Hinton 2015).
   - NLP: memahami dan menghasilkan bahasa alami (Stanford NLP, Jurafsky & Martin).
   - Computer Vision: persepsi visual dari gambar/video digital (Szeliski, Fei-Fei Li ImageNet).
   - Robotics: interaksi fisik dengan dunia nyata, fusi sensor & SLAM (Sebastian Thrun MIT Press, IEEE RAS).
   - Sistem Pakar (Expert Systems): AI simbolik berbasis aturan IF-THEN terpisah antara Knowledge Base dan Inference Engine (Edward Feigenbaum Stanford, MYCIN).
   - AI Ethics & Safety: mitigasi bias, transparansi XAI, privasi, keamanan, dan alignment problem (UNESCO 2021, EU AI Act 2024).

3. Sejarah Perkembangan AI (Gambar 3):
   - 1956: Konferensi Dartmouth oleh McCarthy, Minsky, Rochester, Shannon (lahirnya istilah AI).
   - 1974-1993: Era AI Winter (Lighthill Report 1973, kegagalan ekspektasi tinggi, pemotongan dana DARPA, rapuhnya sistem pakar).
   - 1997: IBM Deep Blue mengalahkan Garry Kasparov (200 juta posisi/detik).
   - 2012: AlexNet meledakkan Deep Learning di ImageNet (error rate 15.3%, GPU Nvidia).
   - 2022: Peluncuran ChatGPT oleh OpenAI (100 juta pengguna dalam 2 bulan, Transformer + RLHF).
   - 2024-2026: Hadiah Nobel Fisika (Hopfield & Hinton), Nobel Kimia (AlphaFold oleh Hassabis & Jumper untuk 200 juta struktur protein), serta transisi menuju era AI Agents yang bekerja otomatis.

4. AI vs Machine Learning (Taksonomi AI):
   - Hubungan himpunan: AI (Payung Induk) ⊃ Machine Learning (Data-Driven) ⊃ Deep Learning (Deep Neural Nets) ⊃ Generative AI & Foundation Models.
   - Pemrograman Tradisional: Data + Aturan Manual -> Jawaban.
   - Machine Learning: Data + Jawaban -> Aturan Model.
   - Tingkat kecerdasan: ANI (Narrow/Weak), AGI (General/Strong), ASI (Superintelligence).

Instruksi gaya menjawab:
- Jawab dalam Bahasa Indonesia yang santun, jelas, terstruktur (gunakan bullet points atau penekanan tebal bila membantu).
- Selalu sertakan sumber valid atau tokoh terkait bila menjelaskan konsep/sejarah.
- Berikan penjelasan yang mudah dipahami pemula namun tetap berbobot ilmiah.`;

export default async function handler(req: any, res: any) {
  // Set CORS headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { messages, message } = req.body || {};
    const userPrompt = message || (messages && messages[messages.length - 1]?.text);

    if (!userPrompt || typeof userPrompt !== 'string') {
      res.status(400).json({ error: 'Pesan pengguna tidak boleh kosong.' });
      return;
    }

    const rawApiKey = process.env.GEMINI_API_KEY?.trim().replace(/^["']|["']$/g, '');
    if (!rawApiKey) {
      res.status(500).json({
        error: 'GEMINI_API_KEY belum disetel.',
        reply: '⚠️ **GEMINI_API_KEY belum terpasang di Vercel.**\n\nSilakan tambahkan Environment Variable `GEMINI_API_KEY` di Dashboard Vercel (*Settings > Environment Variables*) dengan API key resmi dari https://aistudio.google.com/app/apikey (diawali `AIzaSy...`), lalu lakukan Redeploy.'
      });
      return;
    }

    const contents: any[] = [];

    if (Array.isArray(messages) && messages.length > 1) {
      const history = messages.slice(-9, -1);
      for (const m of history) {
        contents.push({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: userPrompt }]
    });

    // Try available Gemini models with graceful fallback
    const candidateModels = ['gemini-2.5-flash', 'gemini-3.8-flash', 'gemini-flash-latest'];
    let response: any = null;
    let lastError: any = null;

    for (const modelName of candidateModels) {
      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            topP: 0.95,
          }
        });
        if (response && response.text) {
          break;
        }
      } catch (err: any) {
        lastError = err;
        const msg = err?.message || '';
        if (msg.includes('401') || msg.includes('UNAUTHENTICATED') || msg.includes('invalid authentication credentials')) {
          break;
        }
      }
    }

    if (!response || !response.text) {
      throw lastError || new Error('Tidak ada respon dari model Gemini.');
    }

    const replyText = response.text || 'Maaf, saya tidak dapat memproses jawaban saat ini.';
    res.status(200).json({ reply: replyText });
  } catch (error: any) {
    console.error('Vercel API error calling Gemini:', error);
    const errMsg = error?.message || '';
    let userNotice = 'Mohon maaf, terjadi gangguan saat menghubungi layanan AI. Silakan coba beberapa saat lagi.';

    if (errMsg.includes('401') || errMsg.includes('UNAUTHENTICATED') || errMsg.includes('invalid authentication credentials')) {
      userNotice = '⚠️ **API Key Gemini Tidak Valid / Tidak Diizinkan (Error 401)**\n\nKunci API yang digunakan saat ini tidak valid atau telah kedaluwarsa. Pastikan:\n1. Buka [Google AI Studio](https://aistudio.google.com/app/apikey) dan klik **Create API key**.\n2. Salin kunci (yang diawali **`AIzaSy...`**).\n3. Pasang di Vercel: **Settings > Environment Variables > GEMINI_API_KEY** lalu klik **Redeploy**.';
    } else if (errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED')) {
      userNotice = '⏳ Kuota penggunaan API key Gemini telah mencapai batas limit (Rate limit / Quota exceeded). Mohon tunggu 1-2 menit lalu coba kembali.';
    }

    res.status(500).json({
      error: errMsg,
      reply: userNotice
    });
  }
}
