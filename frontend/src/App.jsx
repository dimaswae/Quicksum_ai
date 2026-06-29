import ThemeToggle from './components/ThemeToggle';
import SummarizeForm from './components/SummarizeForm';

const EXAMPLES = [
  { text: 'Artikel ilmiah tentang dampak perubahan iklim terhadap keanekaragaman hayati laut menunjukkan bahwa suhu laut yang meningkat telah menyebabkan pemutihan karang secara massal di berbagai terumbu karang di seluruh dunia. Penelitian yang dipublikasikan pada tahun 2025 melibatkan 500 ilmuwan dari 50 negara dan mengumpulkan data selama 10 tahun dari 1.000 lokasi terumbu karang. Hasil penelitian menunjukkan bahwa 70% terumbu karang mengalami stres thermal, dan 30% di antaranya mengalami pemutihan parah yang dapat mengancam kelangsungan hidup ekosistem terumbu karang. Para peneliti merekomendasikan pengurangan emisi karbon secara signifikan dan perlindungan habitat laut untuk mengurangi dampak perubahan iklim terhadap terumbu karang.', label: 'Artikel ilmiah tentang iklim' },
  { text: 'Laporan tahunan perusahaan teknologi XYZ Corp menunjukkan pertumbuhan pendapatan sebesar 25% dibandingkan tahun sebelumnya, mencapai Rp 50 triliun. Pertumbuhan ini didorong oleh peningkatan layanan cloud computing sebesar 40% dan ekspansi ke pasar Asia Tenggara. Meskipun demikian, laba bersih mengalami penurunan 5% akibat investasi besar dalam riset dan pengembangan kecerdasan buatan. Perusahaan menghabiskan Rp 8 triliun untuk R&D, termasuk pengembangan model bahasa besar dan solusi AI untuk bisnis. CEO perusahaan menyatakan bahwa investasi ini akan memberikan hasil jangka panjang dan memperkuat posisi perusahaan di pasar AI yang kompetitif.', label: 'Laporan keuangan perusahaan' },
];

function App() {
  const handleExampleClick = (exampleText) => {
    const textarea = document.getElementById('summarize-input');
    if (textarea) {
      textarea.value = exampleText;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      textarea.focus();
      textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <header style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          <h1 style={titleStyle}>QuickSum.AI</h1>
        </div>
        <ThemeToggle />
      </header>

      <main style={mainStyle}>
        <section style={heroStyle}>
          <h2 style={heroTitleStyle}>Ringkas teks panjang dalam hitungan detik</h2>
          <p style={heroDescStyle}>
            Tempelkan teks, unggah dokumen, atau pilih contoh di bawah &mdash; AI akan merangkumnya untukmu.
          </p>
          <div style={exampleRow}>
            <span style={exampleLabel}>Coba dengan:</span>
            <div style={exampleButtons}>
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleExampleClick(ex.text)}
                  style={exampleButton}
                  aria-label={`Coba dengan contoh: ${ex.label}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  {ex.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <SummarizeForm />
      </main>

      <footer style={footerStyle}>
        &copy; 2026 QuickSum.AI &mdash; Dirangkum oleh AI
      </footer>

      <style>{`
        @media (max-width: 767px) {
          header { padding: 16px !important; }
          main { padding: 24px 16px !important; }
        }
        button[aria-label*="Coba dengan"]:hover {
          border-color: var(--color-primary) !important;
          color: var(--color-primary) !important;
          background-color: rgba(13, 148, 136, 0.04) !important;
        }
      `}</style>
    </div>
  );
}

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px 32px',
  borderBottom: '1px solid var(--color-border)',
};

const titleStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: 28,
  fontWeight: 700,
  margin: 0,
  color: 'var(--color-text)',
};

const heroStyle = {
  textAlign: 'center',
  marginBottom: 'var(--space-2xl)',
  padding: '0 var(--space-md)',
};

const heroTitleStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: 36,
  fontWeight: 700,
  color: 'var(--color-text)',
  margin: '0 0 var(--space-sm)',
  lineHeight: 1.3,
};

const heroDescStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: 18,
  color: 'var(--color-text-muted)',
  margin: '0 0 var(--space-lg)',
  lineHeight: 1.6,
};

const exampleRow = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--space-sm)',
};

const exampleLabel = {
  fontSize: 14,
  color: 'var(--color-text-muted)',
  fontWeight: 500,
};

const exampleButtons = {
  display: 'flex',
  gap: 'var(--space-sm)',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const exampleButton = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-xs)',
  padding: '8px 16px',
  borderRadius: 20,
  border: '1px solid var(--color-border)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 150ms ease',
  fontFamily: 'var(--font-body)',
  minHeight: 40,
};

const mainStyle = {
  maxWidth: 1200,
  margin: '0 auto',
  padding: '32px 32px 48px',
};

const footerStyle = {
  textAlign: 'center',
  padding: '24px 32px',
  color: 'var(--color-text-muted)',
  fontSize: 16,
  borderTop: '1px solid var(--color-border)',
};

export default App;
