import { useState, useEffect, useRef } from 'react';

export function useAutoRotate({ count, intervalMs, maxLoops = null }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loopsCompleted, setLoopsCompleted] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    if (maxLoops !== null && loopsCompleted >= maxLoops) return;

    intervalRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % count;
        if (next === 0) setLoopsCompleted(l => l + 1);
        return next;
      });
    }, intervalMs);

    return () => clearInterval(intervalRef.current);
  }, [paused, count, intervalMs, maxLoops, loopsCompleted]);

  const pause  = () => setPaused(true);
  const goTo   = (idx) => { setActive(idx); pause(); };
  const next   = () => { setActive(prev => (prev + 1) % count); pause(); };
  const prev   = () => { setActive(prev => (prev - 1 + count) % count); pause(); };

  return { active, paused, pause, goTo, next, prev };
}
