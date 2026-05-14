import { useState, useEffect, useRef } from 'react';
import { METRICS } from '../content.js';

const INTERVAL_MS = 4000;
const FADE_MS = 320;
const COUNTER_MS = 1200;

function parseValue(raw) {
  const m = raw.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)([^0-9]*)$/);
  if (!m) return null;
  return {
    prefix: m[1],
    num: parseFloat(m[2]),
    suffix: m[3],
    decimals: raw.indexOf('.') !== -1 ? (m[2].split('.')[1] || '').length : 0,
  };
}

function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

function AnimatedValue({ raw, run }) {
  const [display, setDisplay] = useState(raw);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!run) return;
    const parsed = parseValue(raw);
    if (!parsed) { setDisplay(raw); return; }
    cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    function frame() {
      const pct = Math.min((performance.now() - start) / COUNTER_MS, 1);
      const val = parsed.num * easeOut(pct);
      const displayed = parsed.decimals > 0 ? val.toFixed(parsed.decimals) : Math.floor(val);
      setDisplay(parsed.prefix + displayed + parsed.suffix);
      if (pct < 1) rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [raw, run]);

  return <>{display}</>;
}

export default function MetricsRail() {
  const [setIdx, setSetIdx] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [counterKey, setCounterKey] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  function fadeTo(idx) {
    setOpacity(0);
    setTimeout(() => {
      setSetIdx(idx);
      setCounterKey(k => k + 1);
      setTimeout(() => setOpacity(1), 30);
    }, FADE_MS);
  }

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => fadeTo((setIdx + 1) % 3), INTERVAL_MS);
    return () => clearTimeout(timerRef.current);
  }, [setIdx, paused]);

  function handleInteract() {
    if (!paused) {
      setPaused(true);
      clearTimeout(timerRef.current);
    }
  }

  function goTo(idx) {
    handleInteract();
    fadeTo(idx);
  }

  const cards = METRICS[setIdx];

  return (
    <div className="metrics-rail" onMouseEnter={handleInteract}>
      <div className="rail-header">
        <span className="rail-label">By the numbers</span>
        <span className="rail-rule" />
      </div>

      <div
        className="metrics-rail-cards"
        style={{ opacity, transition: `opacity ${FADE_MS}ms ease` }}
      >
        {cards.map((m, i) => (
          <div key={m.label + i} className="metric-card">
            <div className="metric-value">
              <AnimatedValue raw={m.value} run={opacity === 1} key={counterKey + m.label} />
            </div>
            <div className="metric-label">{m.label}</div>
            <div className="metric-sub">{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="rail-indicator">
        <span className="rail-dots">
          {[0, 1, 2].map(i => (
            <button
              key={i}
              className={`rail-dot${setIdx === i ? ' active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Metric set ${i + 1}`}
            />
          ))}
        </span>
        <span>{paused ? 'Paused, you took control' : `Auto-rotating · ${INTERVAL_MS / 1000}s`}</span>
      </div>
    </div>
  );
}
