import { useState, useEffect, useRef } from 'react';
import { METRICS, METRICS_CONFIG } from '../content.js';

const SETS = [
  METRICS.slice(0, 4),
  METRICS.slice(4, 8),
  METRICS.slice(8, 12)
];

function parseNumber(raw) {
  const m = raw.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)([^0-9]*)$/);
  if (!m) return null;
  return { prefix: m[1], num: parseFloat(m[2]), suffix: m[3], decimals: raw.indexOf('.') !== -1 ? (m[2].split('.')[1] || '').length : 0 };
}

function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

function AnimatedNumber({ raw, run, durationMs }) {
  const [display, setDisplay] = useState(raw);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!run) return;
    const parsed = parseNumber(raw);
    if (!parsed) { setDisplay(raw); return; }
    cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    function frame() {
      const pct = Math.min((performance.now() - start) / durationMs, 1);
      const val = parsed.num * easeOut(pct);
      const displayed = parsed.decimals > 0 ? val.toFixed(parsed.decimals) : Math.floor(val);
      setDisplay(parsed.prefix + displayed + parsed.suffix);
      if (pct < 1) rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [raw, run, durationMs]);

  return <>{display}</>;
}

export default function MetricsCarousel() {
  const cfg = METRICS_CONFIG;
  const [setIdx, setSetIdx] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [counterKey, setCounterKey] = useState(0);
  const [loops, setLoops] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  function scheduleNext() {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      // Fade out
      setOpacity(0);
      setTimeout(() => {
        setSetIdx(prev => {
          const next = (prev + 1) % 3;
          if (next === 0) setLoops(l => {
            const newL = l + 1;
            if (newL >= cfg.maxLoops) setPaused(true);
            return newL;
          });
          return next;
        });
        setCounterKey(k => k + 1);
        setTimeout(() => {
          setOpacity(1);
        }, 50);
      }, cfg.fadeOutMs);
    }, cfg.setIntervalMs);
  }

  useEffect(() => {
    if (paused) return;
    scheduleNext();
    return () => clearTimeout(timerRef.current);
  }, [setIdx, paused]);

  function handlePause() {
    if (!paused) {
      setPaused(true);
      clearTimeout(timerRef.current);
    }
  }

  const cards = SETS[setIdx];

  return (
    <section id="metrics" onMouseEnter={handlePause} onClick={handlePause} role="region" aria-label="Career metrics">
      <div className="container">
        <div
          className="metrics-set"
          style={{ opacity, transition: `opacity ${cfg.fadeOutMs}ms ease` }}
        >
          {cards.map((m) => (
            <div key={m.label} className="metric-card">
              <div className="metric-number">
                <AnimatedNumber raw={m.number} run={opacity === 1} durationMs={cfg.counterAnimationMs} key={counterKey + m.label} />
              </div>
              <div className="metric-label">{m.label}</div>
              <div className="metric-context">{m.context}</div>
            </div>
          ))}
        </div>
        {paused && (
          <p className="metrics-paused-note">Paused · hover to see all sets</p>
        )}
      </div>
    </section>
  );
}
