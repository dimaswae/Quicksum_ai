import { useState, useEffect } from 'react';
import useClipboard from '../hooks/useClipboard';

function estimateReadingTime(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / 200);
  return minutes < 1 ? 'Kurang dari 1 menit' : `~${minutes} menit baca`;
}

function formatTimestamp() {
  return new Date().toLocaleString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function OutputArea({ result, isLoading, loadingMessage }) {
  const { copied, copy } = useClipboard();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    function handleChange(e) { setReducedMotion(e.matches); }
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (result) {
      if (reducedMotion) {
        setShowResult(true);
      } else {
        setShowResult(false);
        const timer = setTimeout(() => setShowResult(true), 50);
        return () => clearTimeout(timer);
      }
    } else {
      setShowResult(false);
    }
  }, [result, reducedMotion]);

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ringkasan-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div aria-label="Membuat ringkasan..." role="status" style={containerStyle}>
        <div style={loadingContainer}>
          <div style={loadingIconWrap}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: reducedMotion ? 'none' : 'pulse 2s ease-in-out infinite' }}>
              <path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.2 6H8.2C6.3 13.7 5 11.5 5 9a7 7 0 0 1 7-7z" />
              <path d="M8 16h8M9 19h6" />
            </svg>
          </div>
          <p style={loadingTextStyle}>{loadingMessage || 'Menganalisis konten...'}</p>
          <div style={dotsRow}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  ...dotStyle,
                  animation: reducedMotion ? 'none' : `dotPulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
          @keyframes dotPulse {
            0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
            40% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  if (!result) {
    return (
      <div style={emptyContainer}>
        <div style={emptyCard}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ opacity: 0.6 }}>
            <rect x="6" y="4" width="36" height="40" rx="4" stroke="var(--color-primary)" strokeWidth="1.5" />
            <path d="M14 16h20M14 22h20M14 28h14" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            <circle cx="34" cy="34" r="10" fill="var(--color-surface)" stroke="var(--color-primary)" strokeWidth="1.5" />
            <path d="M34 29v10M29 34h10" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <h3 style={emptyTitleStyle}>Siap merangkum</h3>
          <p style={emptyDescStyle}>
            Ketik atau unggah teks di panel sebelah kiri, lalu tekan <strong>Ringkas Sekarang</strong>.
          </p>
          <div style={emptyStepsStyle}>
            <div style={emptyStepItem}>
              <span style={emptyStepNumber}>1</span>
              <span>Masukkan teks minimal 50 karakter</span>
            </div>
            <div style={emptyStepItem}>
              <span style={emptyStepNumber}>2</span>
              <span>Pilih panjang ringkasan</span>
            </div>
            <div style={emptyStepItem}>
              <span style={emptyStepNumber}>3</span>
              <span>Dapatkan ringkasan dalam hitungan detik</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const wordCount = result.split(/\s+/).filter(Boolean).length;
  const readingTime = estimateReadingTime(result);

  return (
    <div style={containerStyle}>
      <div style={metaBar}>
        <div style={metaBarLeft}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          <span style={metaTextStyle}>Ringkasan</span>
          <span style={metaDivider}>|</span>
          <span style={metaTextStyle}>{wordCount} kata</span>
          <span style={metaDivider}>|</span>
          <span style={metaTextStyle}>{readingTime}</span>
        </div>
        <span style={metaTimestamp}>{formatTimestamp()}</span>
      </div>

      <div
        style={{
          ...resultCard,
          opacity: showResult ? 1 : 0,
          transform: showResult ? 'translateY(0)' : 'translateY(8px)',
          transition: reducedMotion ? 'none' : 'opacity 400ms ease-out, transform 400ms ease-out',
        }}
      >
        <p style={resultTextStyle}>{result}</p>
      </div>

      <div style={actionBar}>
        <button
          onClick={() => copy(result)}
          style={{
            ...actionButtonBase,
            ...(copied ? actionButtonSuccess : actionButtonDefault),
          }}
          aria-label={copied ? 'Berhasil disalin' : 'Salin ringkasan'}
        >
          {copied ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Tersalin!
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Salin
            </>
          )}
        </button>

        <button
          onClick={handleDownload}
          style={{ ...actionButtonBase, ...actionButtonDefault }}
          aria-label="Unduh sebagai file teks"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Unduh .txt
        </button>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-md)',
};

const loadingContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--space-md)',
  padding: 'var(--space-3xl) var(--space-lg)',
  minHeight: 240,
};

const loadingIconWrap = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 64,
  height: 64,
  borderRadius: '50%',
  backgroundColor: 'rgba(13, 148, 136, 0.08)',
};

const loadingTextStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: 18,
  fontWeight: 500,
  color: 'var(--color-text)',
  margin: 0,
};

const dotsRow = {
  display: 'flex',
  gap: 6,
};

const dotStyle = {
  width: 6,
  height: 6,
  borderRadius: '50%',
  backgroundColor: 'var(--color-primary)',
};

const emptyContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'var(--space-2xl) var(--space-lg)',
  minHeight: 360,
};

const emptyCard = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: 'var(--space-md)',
  maxWidth: 360,
};

const emptyTitleStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: 22,
  fontWeight: 600,
  color: 'var(--color-text)',
  margin: 0,
};

const emptyDescStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: 16,
  color: 'var(--color-text-muted)',
  lineHeight: 1.6,
  margin: 0,
};

const emptyStepsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-sm)',
  marginTop: 'var(--space-sm)',
  width: '100%',
};

const emptyStepItem = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-sm)',
  fontSize: 15,
  color: 'var(--color-text-muted)',
  textAlign: 'left',
};

const emptyStepNumber = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  borderRadius: '50%',
  backgroundColor: 'rgba(13, 148, 136, 0.1)',
  color: 'var(--color-primary)',
  fontSize: 13,
  fontWeight: 700,
  flexShrink: 0,
};

const metaBar = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 16px',
  backgroundColor: 'var(--color-surface)',
  borderRadius: 10,
  border: '1px solid var(--color-border)',
  flexWrap: 'wrap',
  gap: 'var(--space-sm)',
};

const metaBarLeft = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-sm)',
};

const metaTextStyle = {
  fontSize: 14,
  color: 'var(--color-text-muted)',
  fontWeight: 500,
};

const metaDivider = {
  color: 'var(--color-border)',
  fontSize: 14,
};

const metaTimestamp = {
  fontSize: 13,
  color: 'var(--color-text-muted)',
};

const resultCard = {
  backgroundColor: 'var(--color-surface)',
  borderRadius: 12,
  padding: 'var(--space-lg)',
  boxShadow: 'var(--shadow-md)',
  maxWidth: '70ch',
};

const resultTextStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: 17,
  lineHeight: 1.8,
  color: 'var(--color-text)',
  margin: 0,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
};

const actionBar = {
  display: 'flex',
  gap: 'var(--space-sm)',
  flexWrap: 'wrap',
};

const actionButtonBase = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-xs)',
  padding: '10px 16px',
  borderRadius: 8,
  border: 'none',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  minHeight: 44,
  transition: 'all 150ms ease',
  fontFamily: 'var(--font-body)',
};

const actionButtonDefault = {
  backgroundColor: 'var(--color-background)',
  color: 'var(--color-text)',
  border: '1px solid var(--color-border)',
};

const actionButtonSuccess = {
  backgroundColor: 'rgba(22, 163, 74, 0.08)',
  color: 'var(--color-success)',
  border: '1px solid rgba(22, 163, 74, 0.2)',
};
