import { useState, useEffect, useRef } from 'react';
import { CASE_STUDIES } from '../content.js';

export default function CaseStudies({ onInteract }) {
  const [openId, setOpenId] = useState(null);
  const panelRef = useRef(null);

  // Auto-close when the expanded panel scrolls out of view
  useEffect(() => {
    if (!openId || !panelRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting) setOpenId(null); },
      { threshold: 0, rootMargin: '0px 0px -80px 0px' }
    );
    obs.observe(panelRef.current);
    return () => obs.disconnect();
  }, [openId]);

  // Scroll the panel into view when it opens
  useEffect(() => {
    if (openId && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [openId]);

  function toggle(id) {
    onInteract?.();
    setOpenId(prev => prev === id ? null : id);
  }

  const openCs = CASE_STUDIES.find(cs => cs.id === openId);

  return (
    <div className="cs-container">
      <div className="cs-grid">
        {CASE_STUDIES.map(cs => (
          <div
            key={cs.id}
            className={`cs-card${openId === cs.id ? ' cs-card-active' : ''}`}
          >
            <span className="cs-category">{cs.category}</span>
            <h3 className="cs-card-title">{cs.title}</h3>
            <p className="cs-card-hook">{cs.oneLineHook}</p>
            <button
              className="cs-read-more-btn"
              onClick={() => toggle(cs.id)}
            >
              {openId === cs.id ? 'Close' : 'Read more'}
            </button>
          </div>
        ))}
      </div>

      {openCs && (
        <div className="cs-expanded-panel" ref={panelRef}>
          <div className="cs-expanded-header">
            <div className="cs-expanded-meta">
              <span className="cs-category">{openCs.category}</span>
              <h3 className="cs-expanded-title">{openCs.title}</h3>
            </div>
            <button
              className="cs-close-btn"
              onClick={() => setOpenId(null)}
              aria-label="Close case study"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div className="cs-sections">
            <div className="cs-section"><h4>The Problem</h4><p>{openCs.sections.problem}</p></div>
            <div className="cs-section"><h4>The Approach</h4><p>{openCs.sections.approach}</p></div>
            <div className="cs-section"><h4>How I Built It</h4><p>{openCs.sections.howBuilt}</p></div>
            <div className="cs-section"><h4>The ROI</h4><p>{openCs.sections.roi}</p></div>
          </div>
          <div className="tool-chips">
            {openCs.tools.map(t => <span key={t} className="tool-chip">{t}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}
