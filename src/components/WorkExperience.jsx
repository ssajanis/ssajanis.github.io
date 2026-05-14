import { useState, useEffect, useRef } from 'react';
import { WORK_EXPERIENCE } from '../content.js';

export default function WorkExperience({ onInteract }) {
  const [openIdx, setOpenIdx] = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (openIdx === null || !panelRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting) setOpenIdx(null); },
      { threshold: 0, rootMargin: '0px 0px -80px 0px' }
    );
    obs.observe(panelRef.current);
    return () => obs.disconnect();
  }, [openIdx]);

  useEffect(() => {
    if (openIdx !== null && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [openIdx]);

  function toggle(idx) {
    onInteract?.();
    setOpenIdx(prev => prev === idx ? null : idx);
  }

  const openJob = openIdx !== null ? WORK_EXPERIENCE[openIdx] : null;

  return (
    <div className="we-container">
      <div className="we-grid">
        {WORK_EXPERIENCE.map((job, idx) => (
          <div
            key={job.company + job.dates}
            className={`we-card${openIdx === idx ? ' we-card-active' : ''}`}
          >
            <div className="we-card-header">
              <h3 className="we-card-role">{job.role}</h3>
              <div className="we-card-meta">
                {job.companyURL
                  ? <a className="we-company-link" href={job.companyURL} target="_blank" rel="noopener noreferrer">{job.company}</a>
                  : <span className="we-company-link">{job.company}</span>
                }
                {' · '}
                <span className="we-card-dates">{job.dates} · {job.location}</span>
              </div>
            </div>
            <p className="we-card-summary">{job.summary}</p>
            <div className="we-card-tags">
              <span className="we-tag">Key Achievements</span>
              <span className="we-tag">Key Responsibilities</span>
            </div>
            <button className="cs-read-more-btn" onClick={() => toggle(idx)}>
              {openIdx === idx ? 'Close' : 'Learn More'}
            </button>
          </div>
        ))}
      </div>

      {openJob && (
        <div className="cs-expanded-panel" ref={panelRef}>
          <div className="cs-expanded-header">
            <div className="cs-expanded-meta">
              <div className="we-panel-meta">
                {openJob.companyURL
                  ? <a className="we-company-link" href={openJob.companyURL} target="_blank" rel="noopener noreferrer">{openJob.company}</a>
                  : <span className="we-company-link">{openJob.company}</span>
                }
                {' · '}
                <span className="we-card-dates">{openJob.dates} · {openJob.location}</span>
              </div>
              <h3 className="cs-expanded-title">{openJob.role}</h3>
            </div>
            <button
              className="cs-close-btn"
              onClick={() => setOpenIdx(null)}
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div className="we-panel-sections">
            <div className="we-panel-col">
              <h4 className="we-panel-heading">Key Achievements</h4>
              <div className="we-detail-list">
                {openJob.accomplishments.map(a => (
                  <div key={a.headline} className="we-detail-item">
                    <strong>{a.headline}</strong> {a.detail}
                  </div>
                ))}
              </div>
            </div>
            <div className="we-panel-col">
              <h4 className="we-panel-heading">Key Responsibilities</h4>
              <div className="we-detail-list">
                {openJob.responsibilities.map(r => (
                  <div key={r.headline} className="we-detail-item">
                    <strong>{r.headline}</strong> {r.detail}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
