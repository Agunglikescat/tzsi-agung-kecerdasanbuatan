import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Minimize2, 
  Maximize2, 
  Copy, 
  Check, 
  MessageSquare,
  HelpCircle,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { AgungLogo } from './AgungLogo';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Halo! Saya adalah **Asisten Edukasi AI** dari AGUNGPROJECT.ID. \n\nAda yang ingin Anda tanyakan seputar **Konsep AI**, **Ruang Lingkup & 7 Cabang AI**, **Sejarah Perkembangan AI (1956–2026)**, atau **Taksonomi AI vs Machine Learning**?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isMinimized]);

  const starterQuestions = [
    'Apa bedanya Machine Learning dan Deep Learning?',
    'Siapa saja pencetus Konferensi Dartmouth 1956?',
    'Mengapa terjadi periode AI Winter?',
    'Bagaimana IBM mendefinisikan AI?',
    'Apa kontribusi AlphaFold hingga meraih Nobel 2024?'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputMessage).trim();
    if (!messageText || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          messages: [...messages, userMessage]
        })
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || data.error || 'Maaf, tidak ada tanggapan yang diterima.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: 'Maaf, terjadi kendala koneksi ke server AI. Pastikan server aktif dan silakan coba sesaat lagi.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: 'Riwayat percakapan telah dibersihkan. Silakan ajukan pertanyaan baru seputar materi AI!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Helper to format basic markdown-style text (bold, lists, backticks)
  const formatMessageText = (content: string) => {
    return content.split('\n').map((line, idx) => {
      // Bold rendering
      let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Inline code
      processed = processed.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-[11px]">$1</code>');

      if (line.startsWith('- ') || line.startsWith('• ')) {
        return (
          <li 
            key={idx} 
            className="ml-4 list-disc text-slate-200"
            dangerouslySetInnerHTML={{ __html: processed.substring(2) }}
          />
        );
      }

      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p 
          key={idx} 
          className="mb-1 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: processed }}
        />
      );
    });
  };

  return (
    <>
      {/* Floating Action Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-20 sm:right-24 z-40 group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-semibold text-xs shadow-xl shadow-cyan-900/40 hover:scale-105 active:scale-95 transition-all border border-cyan-400/40"
          title="Buka Chatbot AI"
        >
          <div className="relative">
            <AgungLogo size={22} glow={false} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse" />
          </div>
          <span>Tanya Asisten AI</span>
          <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-black/30 text-[9px] text-cyan-200 font-mono uppercase">
            Gemini 1.5
          </span>
        </button>
      )}

      {/* Chat Window Modal / Drawer */}
      {isOpen && (
        <div 
          className={`fixed z-50 transition-all duration-300 shadow-2xl flex flex-col ${
            isMinimized
              ? 'bottom-6 right-6 w-80 h-14 rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-cyan-500/40 shadow-cyan-950/50 overflow-hidden'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between select-none">
            <div className="flex items-center gap-2.5">
              <AgungLogo size={26} glow={true} />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                    Asisten Edukasi AI
                  </h4>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-mono">
                    Gemini API
                  </span>
                </div>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                  <span>Siap Menjawab Materi</span>
                </p>
              </div>
            </div>

            {/* Header controls */}
            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={handleClearChat}
                className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Bersihkan Percakapan"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title={isMinimized ? 'Perbesar' : 'Kecilkan'}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Tutup Chatbot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body if not minimized */}
          {!isMinimized && (
            <>
              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                
                {/* Quick Starter Chips */}
                {messages.length <= 2 && (
                  <div className="space-y-2 pt-1 pb-2">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
                      <Lightbulb className="w-3 h-3 text-amber-400" />
                      Saran Pertanyaan Materi:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {starterQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(q)}
                          className="text-[11px] text-left px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-900/40 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Messages */}
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                    >
                      <div className="flex items-end gap-1.5 max-w-[88%]">
                        {!isUser && (
                          <div className="w-6 h-6 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0 mb-1">
                            <Bot className="w-3.5 h-3.5 text-cyan-300" />
                          </div>
                        )}

                        <div
                          className={`p-3.5 rounded-2xl ${
                            isUser
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-xs shadow-md'
                              : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-xs shadow-inner'
                          }`}
                        >
                          <div className="text-xs leading-relaxed">
                            {formatMessageText(msg.text)}
                          </div>
                        </div>
                      </div>

                      {/* Footer under message */}
                      <div className="flex items-center gap-2 px-1 text-[9px] text-slate-400">
                        <span>{msg.timestamp}</span>
                        {!isUser && (
                          <button
                            onClick={() => handleCopyText(msg.text, msg.id)}
                            className="hover:text-cyan-300 flex items-center gap-0.5 transition-colors"
                            title="Salin jawaban"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-2.5 h-2.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-2.5 h-2.5" />
                            )}
                            <span>{copiedId === msg.id ? 'Tersalin' : 'Salin'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
                    <div className="w-6 h-6 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce duration-300" />
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce duration-500" />
                      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce duration-700" />
                      <span className="ml-1 text-[11px] text-slate-400">Gemini sedang menyusun jawaban...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Footer */}
              <div className="p-3 bg-slate-900/90 border-t border-slate-800 space-y-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Tanyakan materi (misal: apa itu Turing Test?)..."
                    disabled={isLoading}
                    className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim()}
                    className={`p-2.5 rounded-xl font-bold transition-all shrink-0 ${
                      isLoading || !inputMessage.trim()
                        ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-900/40'
                    }`}
                    title="Kirim pesan"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                <div className="flex items-center justify-between text-[9px] text-slate-400 px-1 font-mono">
                  <span>Ditenagai model Gemini 1.5 Flash</span>
                  <span className="text-cyan-400 font-semibold">AGUNGPROJECT.ID</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
