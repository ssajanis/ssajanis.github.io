import { CONTACT, HERO } from '../content.js';

function EmailIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
}

function LinkedInIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
}

function CalendarIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
}

const ICONS = { email: <EmailIcon />, linkedin: <LinkedInIcon />, calendly: <CalendarIcon /> };

export default function Contact() {
  const c = CONTACT;

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-layout">
          <div className="contact-copy">
            <p className="eyebrow">Contact</p>
            <h2 className="section-title contact-headline">{c.headline}</h2>
            <p className="contact-subhead">{c.subhead}</p>
            <div className="channels">
              {c.channels.map(ch => (
                <a
                  key={ch.type}
                  className="channel-link"
                  href={ch.href}
                  {...(ch.type !== 'email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {ICONS[ch.type]}
                  <span>{ch.label}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="reasons-grid">
            {c.reasons.map(r => (
              <div key={r.title} className="reason-card">
                <div className="reason-title">{r.title}</div>
                <p className="reason-body">{r.body}</p>
              </div>
            ))}
          </div>
        </div>

        <hr className="divider" />

        <footer className="site-footer">
          <div className="footer-left">
            <span className="footer-name">{HERO.name}</span>
            <span className="caption">{c.footer.location}</span>
          </div>
          <span className="caption">&copy; {c.footer.copyright}</span>
        </footer>
      </div>
    </section>
  );
}
