import { useState, useEffect, useCallback } from 'react';

const ICONS = {
  success: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="10" fill="var(--color-success)" />
      <path d="M6 10.5L8.5 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="10" fill="var(--color-error)" />
      <path d="M7 7L13 13M13 7L7 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="10" fill="var(--color-primary)" />
      <path d="M10 9V14M10 6.5V7" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

const BORDER_COLORS = {
  success: 'var(--color-success)',
  error: 'var(--color-error)',
  info: 'var(--color-primary)',
};

export default function ToastNotification({ message, type = 'info', onClose, duration = 4000 }) {
  const [exiting, setExiting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    function handleChange(e) {
      setReducedMotion(e.matches);
    }
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  const handleClose = useCallback(() => {
    setExiting(true);
    const timer = setTimeout(() => {
      onClose?.();
    }, reducedMotion ? 0 : 150);
    return () => clearTimeout(timer);
  }, [onClose, reducedMotion]);

  useEffect(() => {
    if (duration <= 0) return;

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, handleClose]);

  const animationStyle = reducedMotion
    ? {}
    : exiting
      ? { animation: 'toastFadeOut 150ms ease-in forwards' }
      : { animation: 'toastSlideInUp 200ms ease-out' };

  return (
    <div aria-live="polite" style={containerStyle}>
      <div
        role={type === 'error' ? 'alert' : undefined}
        style={{
          ...toastStyle,
          borderLeftColor: BORDER_COLORS[type],
          ...animationStyle,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)' }}>
          <span style={{ flexShrink: 0, marginTop: 2 }}>{ICONS[type]}</span>
          <p style={{ margin: 0, flex: 1, lineHeight: 1.5 }}>{message}</p>
          <button
            onClick={handleClose}
            aria-label="Tutup"
            style={closeButtonStyle}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      <style>{`
        @keyframes toastSlideInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes toastFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

const containerStyle = {
  position: 'fixed',
  bottom: 'var(--space-lg)',
  right: 'var(--space-lg)',
  zIndex: 9999,
  maxWidth: 380,
  minWidth: 280,
};

const toastStyle = {
  backgroundColor: 'var(--color-surface)',
  borderLeft: '4px solid',
  borderRadius: 8,
  padding: 16,
  boxShadow: 'var(--shadow-lg)',
  fontFamily: 'var(--font-body)',
  fontSize: 16,
  color: 'var(--color-text)',
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  padding: 0,
  minWidth: 44,
  minHeight: 44,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: 'var(--color-text-muted)',
  flexShrink: 0,
};
