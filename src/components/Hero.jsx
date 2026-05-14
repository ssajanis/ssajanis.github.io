import { useState, useEffect, useRef } from 'react';
import { HERO } from '../content.js';
import MetricsRail from './MetricsRail.jsx';

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % HERO.rotatingWords.length);
        setVisible(true);
      }, 280);
    }, HERO.rotateIntervalMs);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section id="hero">
      <div className="container">
        <div className="hero-grid">

          <div className="hero-left">
            <div className="hero-top">
              <div className="pill">
                <span className="pill-dot" aria-hidden="true" />
                {HERO.statusPill}
              </div>
            </div>

            <h1 className="hero-name">{HERO.name}.</h1>
            <p className="hero-role">{HERO.role}</p>

            <p className="hero-rotating">
              <span className="hero-prefix">{HERO.rotatingPrefix}</span>
              {' '}
              <strong
                className="hero-word"
                style={{ opacity: visible ? 1 : 0 }}
              >
                {HERO.rotatingWords[wordIdx]}
              </strong>
            </p>

            <p className="hero-desc">{HERO.description}</p>

            <div className="hero-ctas">
              <a className="btn-primary" href={HERO.primaryCTA.href}>
                {HERO.primaryCTA.label}
              </a>
              <a className="btn-secondary" href={HERO.secondaryCTA.href}>
                {HERO.secondaryCTA.label}
              </a>
              <a
                className="hero-li-btn"
                href={HERO.linkedInURL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <LinkedInIcon />
              </a>
            </div>

            <p className="hero-meta">{HERO.metaRow}</p>
          </div>

          <div className="hero-right">
            <MetricsRail />
          </div>

        </div>
      </div>
    </section>
  );
}
