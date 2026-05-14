import { HERO } from '../content.js';

const links = [
  { label: 'Home',            href: '#hero' },
  { label: 'Work',            href: '#the-work' },
  { label: 'Recommendations', href: '#the-recommendations' },
  { label: 'Person',          href: '#the-person' },
  { label: 'Certifications',  href: '#certifications' },
  { label: 'Contact',         href: '#contact' }
];

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  );
}

export default function Navbar({ theme, onToggleTheme }) {
  const isDark = theme === 'linear-dark';

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <a className="navbar-logo" href="#hero">{HERO.name}</a>
        <div className="navbar-links" role="list">
          {links.map(l => (
            <a key={l.href} className="navbar-link" href={l.href} role="listitem">{l.label}</a>
          ))}
        </div>
        <button
          className="theme-btn"
          onClick={onToggleTheme}
          aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </nav>
  );
}
