import { WORK_EXPERIENCE } from '../content.js';

function ChevronDown() {
  return (
    <svg className="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6"/>
    </svg>
  );
}

export default function WorkExperience({ onInteract }) {
  return (
    <div className="work-timeline" onClick={onInteract}>
      {WORK_EXPERIENCE.map(job => (
        <div key={job.company + job.dates} className="job-entry">
          <div className="job-role">{job.role}</div>
          <div className="job-company">
            {job.companyURL
              ? <a href={job.companyURL} target="_blank" rel="noopener noreferrer">{job.company}</a>
              : job.company
            }
            {' · '}
            <span className="caption">{job.dates} · {job.location}</span>
          </div>
          <p className="job-summary">{job.summary}</p>
          <details className="job-details">
            <summary>Key Accomplishments <ChevronDown /></summary>
            <div className="details-body">
              {job.accomplishments.map(a => (
                <div key={a.headline} className="detail-item">
                  <strong>{a.headline}</strong> {a.detail}
                </div>
              ))}
            </div>
          </details>
          <details className="job-details">
            <summary>Responsibilities <ChevronDown /></summary>
            <div className="details-body">
              {job.responsibilities.map(r => (
                <div key={r.headline} className="detail-item">
                  <strong>{r.headline}</strong> {r.detail}
                </div>
              ))}
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}
