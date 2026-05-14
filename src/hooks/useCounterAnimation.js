import { useState, useEffect, useRef } from 'react';

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function useCounterAnimation(target, durationMs = 1000, trigger = true) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    cancelAnimationFrame(rafRef.current);
    const start = performance.now();

    function frame() {
      const elapsed = performance.now() - start;
      const pct = Math.min(elapsed / durationMs, 1);
      setValue(target * easeOutCubic(pct));
      if (pct < 1) rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, durationMs, trigger]);

  return value;
}

export function formatMetricNumber(raw, animatedValue) {
  const m = raw.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)([^0-9]*)$/);
  if (!m) return raw;
  const prefix  = m[1];
  const num     = parseFloat(m[2]);
  const suffix  = m[3];
  const hasDecimal = raw.indexOf('.') !== -1;
  const decimals   = hasDecimal ? (m[2].split('.')[1] || '').length : 0;
  const displayed  = decimals > 0
    ? ((animatedValue / num) * num).toFixed(decimals)  // keep ratio
    : Math.floor(animatedValue);
  return prefix + displayed + suffix;
}
