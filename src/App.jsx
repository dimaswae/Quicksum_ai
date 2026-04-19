import React, { useState } from 'react';


const SparksIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v3m6.36 1.36-2.12 2.12M21 12h-3m-1.36 6.36-2.12-2.12M12 21v-3m-6.36-1.36 2.12-2.12M3 12h3m1.36-6.36 2.12 2.12"/>
    <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/>
  </svg>
);

function App() {
  const [inputText, setInputText] = useState('akakndkdnd'); 
  const [summary, setSummary] = useState('');
  const [length, setLength] = useState('Medium');
  const [isLoading, setIsLoading] = useState(false); 


  const handleSummarize = () => {
    if (!inputText) return alert("Paste your journal first!");
    
    setIsLoading(true);
    setSummary('');

    setTimeout(() => {
      setSummary(`This is a mock AI summary for mode ${length.toUpperCase()} based on your input: "${inputText.substring(0, 50)}...". The UI is now matching your Figma design with the correct gradient and animations.`);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0f0821] text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- REVISI 1: HEADER SECTION --- */}
        <div className="flex justify-between items-start mb-16 gap-6 flex-wrap">
          <div>
            <div className="flex items-center gap-4">
              {/* Box Logo Gradasi */}
              <div className="w-12 h-12 bg-gradient-to-br from-[#8A3FFC] via-[#E82DD9] to-[#0D6EFD] rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/10">
                <span className="text-3xl text-white">✨</span>
              </div>
              
              {/* Judul QUICKSUM dengan Teks Gradasi (Sesuai Figma) */}
              <h1 className="text-5xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#8A3FFC] via-[#E82DD9] to-[#0D6EFD]">
                QUICKSUM
              </h1>
            </div>
            <p className="text-gray-500 mt-2 ml-1 text-sm">Summarize journals instantly with AI</p>
          </div>

          {/* Summary Length Dropdown (Kanan Atas Figma) */}
          <div className="flex items-center gap-3 bg-[#1a1433] border border-gray-800 rounded-full px-5 py-2.5">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Summary Length</span>
            <select 
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="bg-transparent text-sm font-semibold text-white outline-none cursor-pointer appearance-none pr-6 relative"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '1.2em' }}
            >
              <option className='bg-[#1a1433]'>Short</option>
              <option className='bg-[#1a1433]'>Medium</option>
              <option className='bg-[#1a1433]'>Long</option>
            </select>
          </div>
        </div>

        {/* --- MAIN CONTENT: 2 COLUMNS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* COLUMN 1: INPUT */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 text-lg text-gray-300 font-semibold tracking-tight">
              <span>📄</span> Input
            </div>
            <div className="relative group">
              <textarea
                placeholder="Paste your journal or article here..."
                className="w-full h-[460px] bg-[#1a1433]/30 border border-gray-800/60 rounded-[32px] p-8 outline-none focus:border-[#8A3FFC]/50 transition-all resize-none text-gray-300 placeholder:text-gray-700 text-lg leading-relaxed focus:ring-4 focus:ring-purple-900/10"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              {/* Border Glow Effect on Focus */}
              <div className="absolute inset-0 rounded-[32px] border-2 border-transparent group-focus-within:border-purple-500/20 -z-10 transition-all duration-300"></div>
            </div>

            {/* --- REVISI 2: TOMBOL SUMMARIZE DENGAN ANIMASI LOADING --- */}
            <button 
              onClick={handleSummarize}
              disabled={isLoading}
              className={`w-full py-5 rounded-[20px] font-extrabold text-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${
                isLoading 
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' // Saat Loading
                : 'bg-gradient-to-r from-[#8A3FFC] via-[#E82DD9] to-[#0D6EFD] text-white hover:opacity-90 shadow-lg shadow-purple-500/10' // Saat Normal
              }`}
            >
              {isLoading ? (
                <>
                  {/* Animasi Spinner Simple */}
                  <div className="w-5 h-5 border-3 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  Sedang Meringkas...
                </>
              ) : (
                <>
                  <SparksIcon />
                  Summarize
                </>
              )}
            </button>
          </div>

          {/* COLUMN 2: SUMMARY */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 text-lg text-gray-300 font-semibold tracking-tight">
              <span>✨</span> Summary
            </div>
            <div className="relative">
              <div className="w-full h-[460px] bg-[#1a1433]/30 border border-gray-800/60 rounded-[32px] p-8 text-gray-400 text-lg leading-relaxed overflow-y-auto">
                {summary || <span className='text-gray-700'>Your summary will appear here...</span>}
              </div>
              {/* Efek gradasi pudar di bawah kotak hasil */}
              <div className="absolute bottom-4 left-4 right-4 h-16 bg-gradient-to-t from-[#0f0821] to-transparent pointer-events-none rounded-b-[32px]"></div>
            </div>

            <button className="w-full py-5 bg-[#1a1433]/60 border border-gray-800 rounded-[20px] font-extrabold text-xl text-gray-400 flex items-center justify-center gap-3 hover:bg-[#251e40] hover:text-white hover:border-gray-700 transition-all">
              <span>📋</span> Copy Summary
            </button>
          </div>

        </div>

        <footer className="mt-24 text-center text-gray-700 text-[11px] font-medium uppercase tracking-[0.3em]">
          QUICKSUM &copy; 2026 • DARK MODE EDITION • BUILD FOR INF PROJECT
        </footer>

      </div>
    </div>
  );
}

export default App;