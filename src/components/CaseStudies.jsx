import { useRef } from 'react';
import { CASE_STUDIES } from '../content.js';

function ChevronDown() {
  return (
    <svg className="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6"/>
    </svg>
  );
}

export default function CaseStudies({ onInteract }) {
  const listRef = useRef(null);

  function handleToggle(e) {
    onInteract?.();
    const opened = e.target.closest('details');
    if (!opened || !opened.open) return;
    if (!listRef.current) return;
    listRef.current.querySelectorAll('details[open]').forEach(d => {
      if (d !== opened) d.open = false;
    });
  }

  return (
    <div className="cs-list" ref={listRef} onClick={handleToggle}>
      {CASE_STUDIES.map(cs => (
        <details key={cs.id} className="cs-item">
          <summary>
            <div className="cs-summary-inner">
              <span className="cs-category">{cs.category}</span>
              <span className="cs-title-text">{cs.title}</span>
              <span className="cs-hook">{cs.oneLineHook}</span>
            </div>
            <ChevronDown />
          </summary>
          <div className="details-body cs-body">
            <div className="cs-sections">
              <div className="cs-section"><h4>The Problem</h4><p>{cs.sections.problem}</p></div>
              <div className="cs-section"><h4>The Approach</h4><p>{cs.sections.approach}</p></div>
              <div className="cs-section"><h4>How I Built It</h4><p>{cs.sections.howBuilt}</p></div>
              <div className="cs-section"><h4>The ROI</h4><p>{cs.sections.roi}</p></div>
            </div>
            <div className="tool-chips">
              {cs.tools.map(t => <span key={t} className="tool-chip">{t}</span>)}
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
