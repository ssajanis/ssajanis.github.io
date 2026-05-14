import { useState } from 'react';
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

function HamburgerIcon({ open }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {open
        ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
        : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
      }
    </svg>
  );
}

export default function Navbar({ theme, onToggleTheme }) {
  const isDark = theme === 'linear-dark';
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() { setMenuOpen(false); }

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <a className="navbar-logo" href="#hero">{HERO.name}</a>
        <div className="navbar-links" role="list">
          {links.map(l => (
            <a key={l.href} className="navbar-link" href={l.href} role="listitem">{l.label}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className="theme-btn"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} role="list">
        {links.map(l => (
          <a
            key={l.href}
            className="mobile-menu-link"
            href={l.href}
            role="listitem"
            onClick={closeMenu}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
