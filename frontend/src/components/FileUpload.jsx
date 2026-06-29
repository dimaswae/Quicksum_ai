import { useState, useRef, useCallback, useEffect } from 'react';

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['text/plain', 'application/pdf'];
const ALLOWED_EXTENSIONS = ['.txt', '.pdf'];

function getExtension(name) {
  const idx = name.lastIndexOf('.');
  return idx >= 0 ? name.slice(idx).toLowerCase() : '';
}

function validateFile(file) {
  const ext = getExtension(file.name);
  if (!ALLOWED_TYPES.includes(file.type) && !ALLOWED_EXTENSIONS.includes(ext)) {
    return 'Format tidak didukung. Gunakan .txt atau .pdf.';
  }
  if (file.size > MAX_SIZE) {
    return 'File terlalu besar. Maksimum 5MB.';
  }
  return null;
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileUpload({ onFileContent, disabled = false }) {
  const [zoneState, setZoneState] = useState('idle');
  const [fileInfo, setFileInfo] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (disabled) {
      setZoneState('idle');
      setFileInfo(null);
      setError(null);
    }
  }, [disabled]);

  const processFile = useCallback((file) => {
    setError(null);

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setZoneState('error');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFileInfo({ name: file.name, size: file.size });
      setZoneState('success');
      onFileContent?.(reader.result);
    };
    reader.onerror = () => {
      setError('Gagal membaca file.');
      setZoneState('error');
    };
    reader.readAsText(file);
  }, [onFileContent]);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
    setZoneState(file ? zoneState : 'idle');
  }, [disabled, processFile, zoneState]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    if (!disabled) setZoneState('dragover');
  }, [disabled]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    if (!disabled && zoneState !== 'success') setZoneState('idle');
  }, [disabled, zoneState]);

  const handleKeyDown = useCallback((e) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inputRef.current?.click();
    }
  }, [disabled]);

  const reset = useCallback(() => {
    setZoneState('idle');
    setFileInfo(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
    onFileContent?.(null);
  }, [onFileContent]);

  const borderColor = zoneState === 'dragover' || zoneState === 'success'
    ? 'var(--color-primary)'
    : zoneState === 'error'
      ? 'var(--color-error)'
      : 'var(--color-border)';

  const bgColor = zoneState === 'dragover'
    ? 'rgba(13, 148, 136, 0.05)'
    : 'transparent';

  return (
    <div style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onKeyDown={handleKeyDown}
        onClick={() => !disabled && inputRef.current?.click()}
        aria-label="Zona upload file. Seret file atau tekan Enter untuk memilih."
        style={{
          ...dropZoneStyle,
          borderColor,
          backgroundColor: bgColor,
          cursor: disabled ? 'default' : 'pointer',
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 3v12" />
        </svg>

        <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: 16 }}>
          {fileInfo
            ? <>{fileInfo.name} ({formatSize(fileInfo.size)})</>
            : <>Seret file ke sini, atau tekan <strong style={{ color: 'var(--color-primary)' }}>Pilih File</strong></>}
        </p>
        <p style={{ margin: '4px 0 0', color: 'var(--color-text-muted)', fontSize: 16 }}>
          Format: .txt atau .pdf &middot; Maks 5MB
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".txt,.pdf"
        onChange={handleFileChange}
        disabled={disabled}
        style={{ display: 'none' }}
        aria-hidden="true"
        tabIndex={-1}
      />

      <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-sm)' }}>
        {!fileInfo && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
            className="btn-secondary"
            style={{ minHeight: 44, cursor: disabled ? 'default' : 'pointer' }}
          >
            Pilih File
          </button>
        )}

        {fileInfo && (
          <button
            type="button"
            onClick={reset}
            disabled={disabled}
            aria-label="Hapus file"
            style={removeButtonStyle}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 4L12 12M12 4L4 12" />
            </svg>
            Hapus file
          </button>
        )}
      </div>

      {error && (
        <p role="alert" style={{ color: 'var(--color-error)', fontSize: 16, marginTop: 'var(--space-xs)' }}>
          {error}
        </p>
      )}
    </div>
  );
}

const dropZoneStyle = {
  border: '2px dashed',
  borderRadius: 12,
  padding: 32,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--space-sm)',
  textAlign: 'center',
  transition: 'border-color 200ms ease, background-color 200ms ease',
  minHeight: 140,
};

const removeButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-xs)',
  background: 'none',
  border: 'none',
  color: 'var(--color-error)',
  fontSize: 16,
  fontWeight: 600,
  minWidth: 44,
  minHeight: 44,
  padding: '8px 12px',
  borderRadius: 8,
  cursor: 'pointer',
};
