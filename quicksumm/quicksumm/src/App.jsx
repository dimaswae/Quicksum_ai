import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [length, setLength] = useState('Medium');
  const [isLoading, setIsLoading] = useState(false);

  // --- FUNGSI HUBUNG KE BACKEND ---
  const handleSummarize = async () => {
    if (!inputText) return alert("Paste your journal first, Riel!");

    setIsLoading(true);
    setSummary('');

    try {
      // Sesuaikan URL ini dengan port yang jalan di terminal backend lo (misal 5000 atau 8000)
      const response = await axios.post('http://localhost:5000/summarize', {
        text: inputText,
        length: length.toLowerCase()
      });

      // Sesuaikan 'response.data.summary' dengan struktur JSON dari backend Dimas
      setSummary(response.data.summary || response.data.result);
      
    } catch (error) {
      console.error("Error connecting to backend:", error);
      setSummary("Error: Gagal terhubung ke server. Pastiin backend sudah dijalankan di terminal sebelah!");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    alert("Summary copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#0f0821] text-white p-6 md:p-12 font-sans selection:bg-purple-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12 flex-wrap gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <span className="text-2xl">✨</span>
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                QUICKSUM
              </h1>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">AI Academic Summarizer</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#1a1433] border border-gray-800 rounded-2xl px-5 py-2.5">
            <span className="text-sm text-gray-500 font-bold uppercase">Length</span>
            <select 
              value={length}
              onChange={(e) => setLength(e.target.value)}
              disabled={isLoading}
              className="bg-transparent text-sm font-bold outline-none cursor-pointer appearance-none pr-4"
            >
              <option className="bg-[#1a1433]">Short</option>
              <option className="bg-[#1a1433]">Medium</option>
              <option className="bg-[#1a1433]">Long</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Column Input */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400 font-bold text-sm tracking-widest">
              <span>📄</span> INPUT JOURNAL
            </div>
            <textarea
              placeholder="Paste your journal or article here..."
              className="w-full h-[450px] bg-[#1a1433]/40 border border-gray-800 rounded-[32px] p-8 outline-none focus:border-purple-500 transition-all resize-none text-gray-300 placeholder:text-gray-700 text-lg leading-relaxed focus:ring-4 focus:ring-purple-900/10"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading}
            />
            <button 
              onClick={handleSummarize}
              disabled={isLoading}
              className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${
                isLoading 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 shadow-xl shadow-purple-500/20'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                  PROCESSING...
                </>
              ) : (
                <>✨ SUMMARIZE</>
              )}
            </button>
          </div>

          {/* Column Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400 font-bold text-sm tracking-widest">
              <span>✨</span> AI SUMMARY
            </div>
            <div className="w-full h-[450px] bg-[#1a1433]/40 border border-gray-800 rounded-[32px] p-8 text-gray-300 text-lg leading-relaxed overflow-y-auto relative">
              {isLoading ? (
                <div className="flex flex-col gap-4 animate-pulse">
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-800 rounded w-full"></div>
                  <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-800 rounded w-2/3"></div>
                </div>
              ) : (
                summary || <span className="text-gray-700 italic font-normal">Your summary will appear here...</span>
              )}
            </div>
            <button 
              onClick={copyToClipboard}
              disabled={!summary || isLoading}
              className="w-full py-5 bg-[#1a1433]/60 border border-gray-800 rounded-2xl font-bold text-xl text-gray-500 flex items-center justify-center gap-3 hover:bg-[#251e40] hover:text-white hover:border-gray-700 transition-all disabled:opacity-20"
            >
              <span>📋</span> COPY SUMMARY
            </button>
          </div>

        </div>

        <footer className="mt-20 text-center text-gray-800 text-[10px] font-bold uppercase tracking-[0.5em]">
          Quicksum AI &copy; 2026 • Informatics Engineering Project
        </footer>
      </div>
    </div>
  );
}

export default App;