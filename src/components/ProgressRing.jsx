import { useEffect, useRef } from 'react';

const CIRC = 34.56; // 2 * Math.PI * 5.5

export default function ProgressRing({ active, intervalMs }) {
  const ringRef = useRef(null);
  const rafRef  = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!active || !ringRef.current) return;
    cancelAnimationFrame(rafRef.current);
    ringRef.current.style.strokeDashoffset = String(CIRC);
    startRef.current = performance.now();

    function animate() {
      if (!ringRef.current) return;
      const pct = Math.min((performance.now() - startRef.current) / intervalMs, 1);
      ringRef.current.style.strokeDashoffset = String(CIRC * (1 - pct));
      if (pct < 1) rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(CIRC);
    };
  }, [active, intervalMs]);

  return (
    <svg className="progress-ring" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle className="ring-track" cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5"/>
      <circle
        ref={ringRef}
        className="ring-fill"
        cx="7" cy="7" r="5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray={String(CIRC)}
        strokeDashoffset={String(CIRC)}
        transform="rotate(-90 7 7)"
      />
    </svg>
  );
}
