import ThemeToggle from './components/ThemeToggle';
import SummarizeForm from './components/SummarizeForm';

function App() {
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
            Tempelkan teks, atau unggah dokumen, AI akan merangkumnya untukmu.
          </p>
        </section>

        <SummarizeForm />
      </main>

      <footer style={footerStyle}>
        &copy; 2026 QuickSum.AI. All rights reserved.
      </footer>

      <style>{`
        @media (max-width: 767px) {
          header { padding: 16px !important; }
          main { padding: 24px 16px !important; }
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
