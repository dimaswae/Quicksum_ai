import { useState, useCallback, useRef } from 'react';
import useSummarize from '../hooks/useSummarize';
import FileUpload from './FileUpload';
import OutputArea from './OutputArea';
import LoadingSpinner from './LoadingSpinner';

const LENGTH_OPTIONS = [
  { value: 'short', label: 'Pendek' },
  { value: 'medium', label: 'Sedang' },
  { value: 'long', label: 'Panjang' },
];

export default function SummarizeForm() {
  const [text, setText] = useState('');
  const [length, setLength] = useState('medium');
  const [activeTab, setActiveTab] = useState('text');
  const { result, isLoading, error, loadingMessage, summarize, reset } = useSummarize();
  const resultRef = useRef(null);

  const charCount = text.length;
  const isValid = charCount >= 50;

  const handleTextChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleFileContent = useCallback((content) => {
    if (content) {
      setText(content);
      setActiveTab('text');
    }
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!isValid || isLoading) return;
    summarize(text, length);
  }, [isValid, isLoading, text, length, summarize]);

  return (
    <form onSubmit={handleSubmit} aria-label="Form ringkasan teks" style={formStyle}>
      <div ref={resultRef} />
      <div style={panelsContainer}>
        <div style={leftPanel}>
          <div style={tabSwitcherStyle} role="tablist" aria-label="Metode input">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'text'}
              aria-controls="panel-text"
              onClick={() => setActiveTab('text')}
              style={{
                ...tabStyle,
                ...(activeTab === 'text' ? tabActiveStyle : tabInactiveStyle),
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              </svg>
              Ketik Teks
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'upload'}
              aria-controls="panel-upload"
              onClick={() => setActiveTab('upload')}
              style={{
                ...tabStyle,
                ...(activeTab === 'upload' ? tabActiveStyle : tabInactiveStyle),
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
              Unggah File
            </button>
          </div>

          {activeTab === 'text' && (
            <div id="panel-text" role="tabpanel" aria-label="Input teks">
              <label htmlFor="summarize-input" style={labelStyle}>
                Teks yang akan diringkas
              </label>
              <textarea
                id="summarize-input"
                value={text}
                onChange={handleTextChange}
                placeholder="Tempelkan teks di sini, minimal 50 karakter..."
                rows={10}
                style={textAreaStyle}
                aria-describedby="char-count"
              />
              <div style={gaugeWrapStyle}>
                <div style={gaugeTrackStyle}>
                  <div
                    style={{
                      ...gaugeFillStyle,
                      width: `${Math.min((charCount / 50) * 100, 100)}%`,
                      backgroundColor: isValid ? 'var(--color-success)' : 'var(--color-error)',
                    }}
                  />
                </div>
                <div style={charCountRowStyle}>
                  <p
                    id="char-count"
                    style={{ ...charCountStyle, color: !isValid ? 'var(--color-error)' : 'var(--color-text-muted)' }}
                  >
                    {isValid ? (
                      <>{charCount} karakter &mdash; siap dirangkum</>
                    ) : (
                      <>{charCount} / 50 karakter minimum</>
                    )}
                  </p>
                  {text.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setText('')}
                      style={clearTextStyle}
                      aria-label="Hapus teks"
                    >
                      Hapus
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div id="panel-upload" role="tabpanel" aria-label="Unggah file">
              <FileUpload onFileContent={handleFileContent} disabled={isLoading} />
              {text.length > 0 && (
                <p style={fileLoadedHintStyle}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  File sudah dimuat &mdash; {charCount} karakter
                </p>
              )}
            </div>
          )}

          <div style={{ marginTop: 'var(--space-lg)' }}>
            <label style={labelStyle}>Panjang ringkasan</label>
            <div style={toggleGroup}>
              {LENGTH_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setLength(opt.value)}
                  style={{
                    ...toggleButton,
                    backgroundColor: length === opt.value ? 'var(--color-primary)' : 'transparent',
                    color: length === opt.value ? 'white' : 'var(--color-text)',
                    borderColor: length === opt.value ? 'var(--color-primary)' : 'var(--color-border)',
                  }}
                  aria-pressed={length === opt.value}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="btn-primary"
            style={{
              width: '100%',
              minHeight: 48,
              marginTop: 'var(--space-lg)',
              opacity: !isValid || isLoading ? 0.5 : 1,
              cursor: !isValid || isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-sm)',
            }}
          >
            {isLoading ? (
              <>
                <LoadingSpinner size={20} />
                <span>{loadingMessage || 'Meringkas...'}</span>
              </>
            ) : (
              'Ringkas Sekarang'
            )}
          </button>
        </div>

        <div style={rightPanel}>
          <OutputArea result={result} isLoading={isLoading} />
        </div>
      </div>

      {error && (
        <div style={inlineErrorStyle} role="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          <span style={inlineErrorTextStyle}>{error}</span>
          <button
            type="button"
            onClick={() => summarize(text, length)}
            style={retryButtonStyle}
          >
            Coba lagi
          </button>
        </div>
      )}
    </form>
  );
}

const formStyle = { width: '100%' };

const panelsContainer = {
  display: 'flex',
  gap: 'var(--space-xl)',
  alignItems: 'flex-start',
};

const leftPanel = {
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
};

const rightPanel = { flex: 1, minWidth: 0 };

const tabSwitcherStyle = {
  display: 'flex',
  gap: 2,
  backgroundColor: 'var(--color-background)',
  borderRadius: 10,
  padding: 4,
  marginBottom: 'var(--space-md)',
  border: '1px solid var(--color-border)',
};

const tabStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--space-sm)',
  padding: '10px 16px',
  borderRadius: 8,
  border: 'none',
  fontSize: 16,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 200ms ease',
  fontFamily: 'var(--font-body)',
  minHeight: 44,
};

const tabActiveStyle = {
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  boxShadow: 'var(--shadow-sm)',
};

const tabInactiveStyle = {
  backgroundColor: 'transparent',
  color: 'var(--color-text-muted)',
};

const labelStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 'var(--space-sm)',
  display: 'block',
  color: 'var(--color-text)',
};

const textAreaStyle = {
  width: '100%',
  minHeight: 200,
  padding: '12px 16px',
  border: '1px solid var(--color-border)',
  borderRadius: 8,
  fontSize: 16,
  fontFamily: 'var(--font-body)',
  lineHeight: 1.6,
  color: 'var(--color-text)',
  backgroundColor: 'var(--color-surface)',
  resize: 'vertical',
  transition: 'border-color 200ms ease, box-shadow 200ms ease',
  outline: 'none',
};

const charCountRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 'var(--space-xs)',
};

const gaugeWrapStyle = { marginTop: 'var(--space-xs)' };

const gaugeTrackStyle = {
  width: '100%',
  height: 4,
  borderRadius: 2,
  backgroundColor: 'var(--color-border)',
  overflow: 'hidden',
  marginBottom: 'var(--space-xs)',
};

const gaugeFillStyle = {
  height: '100%',
  borderRadius: 2,
  transition: 'width 200ms ease, background-color 200ms ease',
};

const charCountStyle = { fontSize: 16, marginTop: 0 };

const clearTextStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--color-text-muted)',
  fontSize: 16,
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: 4,
  transition: 'color 150ms ease',
};

const fileLoadedHintStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-xs)',
  marginTop: 'var(--space-sm)',
  fontSize: 16,
  color: 'var(--color-success)',
};

const toggleGroup = { display: 'flex', gap: 'var(--space-sm)' };

const toggleButton = {
  flex: 1,
  minHeight: 44,
  padding: '12px 16px',
  border: '1px solid',
  borderRadius: 8,
  fontSize: 16,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 200ms ease',
};

const inlineErrorStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-sm)',
  padding: '12px 16px',
  marginTop: 'var(--space-md)',
  borderRadius: 8,
  backgroundColor: 'rgba(220, 38, 38, 0.06)',
  border: '1px solid rgba(220, 38, 38, 0.15)',
};

const inlineErrorTextStyle = {
  flex: 1,
  fontSize: 16,
  color: 'var(--color-error)',
  fontFamily: 'var(--font-body)',
};

const retryButtonStyle = {
  padding: '6px 14px',
  borderRadius: 6,
  border: '1px solid var(--color-error)',
  backgroundColor: 'transparent',
  color: 'var(--color-error)',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 150ms ease',
  fontFamily: 'var(--font-body)',
  minHeight: 36,
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 767px) {
      form[aria-label="Form ringkasan teks"] > div:last-of-type {
        flex-direction: column !important;
      }
    }
    textarea#summarize-input:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.12);
    }
    button[style*="btn-primary"]:hover:not(:disabled) {
      transform: translateY(-1px);
    }
  `;
  document.head.appendChild(style);
}
