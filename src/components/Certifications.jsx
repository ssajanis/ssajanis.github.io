import { CERTIFICATIONS } from '../content.js';

export default function Certifications() {
  const { sectionHeader, issuers } = CERTIFICATIONS;

  return (
    <section id="certifications">
      <div className="container">
        <div className="certs-header">
          <p className="eyebrow">{sectionHeader.eyebrow}</p>
          <h2 className="section-title">{sectionHeader.title}</h2>
          <p className="section-sub">{sectionHeader.subhead}</p>
        </div>
        <div className="certs-grid">
          {issuers.map(group => (
            <div key={group.issuer} className="cert-group">
              <div className="cert-issuer">{group.issuer}</div>
              <ul className="cert-list">
                {group.certs.map(c => <li key={c}>{c}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
