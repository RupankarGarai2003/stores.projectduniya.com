'use client';

// Light / dark switch. The theme is applied before paint by a small script in the layout.
export default function ThemeToggle() {
  const flip = () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('pd-theme', next); } catch {}
  };
  return (
    <button type="button" className="theme-btn" onClick={flip} aria-label="Switch between light and dark theme">
      <span className="th-moon" aria-hidden="true">☾</span>
      <span className="th-sun" aria-hidden="true">☀</span>
    </button>
  );
}
