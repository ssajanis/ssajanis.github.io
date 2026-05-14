import { useState, useEffect, useRef } from 'react';
import { THE_RECOMMENDATIONS } from '../content.js';

const RECS  = THE_RECOMMENDATIONS.recommendations;
const CFG   = THE_RECOMMENDATIONS;
const PER   = 2;

const SETS = [];
for (let i = 0; i < RECS.length; i += PER) {
  SETS.push(RECS.slice(i, i + PER));
}

function ArrowLeft() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

function ArrowRight() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
}

export default function TheRecommendations() {
  const [setIdx, setSetIdx] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  function goTo(idx) {
    setPaused(true);
    fadeTo(idx);
  }

  function fadeTo(idx) {
    clearTimeout(timerRef.current);
    setOpacity(0);
    setTimeout(() => {
      setSetIdx(idx);
      setOpacity(1);
    }, 400);
  }

  function scheduleNext() {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      fadeTo((setIdx + 1) % SETS.length);
    }, 5000);
  }

  useEffect(() => {
    if (paused) return;
    scheduleNext();
    return () => clearTimeout(timerRef.current);
  }, [setIdx, paused]);



  const cards = SETS[setIdx];

  return (
    <section id="the-recommendations">
      <div className="container">
        <div className="recs-header">
          <p className="eyebrow">{CFG.sectionHeader.eyebrow}</p>
          <h2 className="section-title">{CFG.sectionHeader.title}</h2>
          <p className="section-sub">{CFG.sectionHeader.subhead}</p>
        </div>

        <div
          className="recs-row"
          style={{ opacity, transition: `opacity 400ms ease` }}
        >
          {cards.map((rec, i) => (
            <article key={rec.name + i} className="rec-card" style={{ animationDelay: `${i * CFG.staggerMs}ms` }}>
              <p className="rec-quote">"{rec.quote}"</p>
              <div className="rec-footer">
                <div className="rec-avatar" aria-hidden="true">
                  {rec.name.charAt(0)}
                </div>
                <div className="rec-meta">
                  <div className="rec-name">{rec.name}</div>
                  <div className="rec-title-text">{rec.title}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="rotator-nav" style={{ marginTop: 20, justifyContent: 'center' }}>
          <button className="arrow-btn" onClick={() => goTo((setIdx - 1 + SETS.length) % SETS.length)} aria-label="Previous set"><ArrowLeft /></button>
          {SETS.map((_, i) => (
            <button
              key={i}
              className={`rotator-dot${setIdx === i ? ' active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Recommendation set ${i + 1}`}
            />
          ))}
          <button className="arrow-btn" onClick={() => goTo((setIdx + 1) % SETS.length)} aria-label="Next set"><ArrowRight /></button>
        </div>

        <div className="recs-footer-row">
          <a
            className="btn-text"
            href={CFG.linkedInURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read all 18 recommendations on LinkedIn &#8594;
          </a>
        </div>
      </div>
    </section>
  );
}
