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

    // Primary model is set to gemini-2.5-flash with safety fallback to gemini-3.8-flash if unavailable
    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          topP: 0.95,
        }
      });
    } catch (modelErr: any) {
      const errMsg = modelErr?.message || '';
      if (errMsg.includes('gemini-2.5-flash') || errMsg.includes('NOT_FOUND') || errMsg.includes('404')) {
        console.warn('gemini-2.5-flash is not available on this API key, falling back to gemini-3.8-flash:', errMsg);
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            topP: 0.95,
          }
        });
      } else {
        throw modelErr;
      }
    }

    const replyText = response.text || 'Maaf, saya tidak dapat memproses jawaban saat ini.';
    res.status(200).json({ reply: replyText });
  } catch (error: any) {
    console.error('Vercel API error calling Gemini:', error);
    res.status(500).json({
      error: error?.message || 'Terjadi kesalahan saat memproses permintaan AI.',
      reply: 'Mohon maaf, terjadi gangguan saat menghubungi layanan AI. Silakan coba beberapa saat lagi.'
    });
  }
}
