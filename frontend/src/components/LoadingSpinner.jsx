import { useState, useEffect } from 'react';

export default function LoadingSpinner({ size = 40, fullscreen = false }) {
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

  if (reducedMotion) {
    const content = <span style={{ color: 'var(--color-text-muted)' }}>Memuat...</span>;

    if (fullscreen) {
      return (
        <div style={overlayStyle} role="status" aria-label="Memuat...">
          {content}
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} role="status" aria-label="Memuat...">
        {content}
      </div>
    );
  }

  const svg = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'spin 800ms linear infinite' }}
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="20"
        r="17"
        stroke="var(--color-border)"
        strokeWidth="3"
      />
      <path
        d="M20 3a17 17 0 0 1 17 17"
        stroke="var(--color-primary)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );

  if (fullscreen) {
    return (
      <div style={overlayStyle} role="status" aria-label="Memuat...">
        {svg}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} role="status" aria-label="Memuat...">
      {svg}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'color-mix(in srgb, var(--color-background) 80%, transparent)',
  zIndex: 9999,
};
