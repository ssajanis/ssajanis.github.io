import { useAutoRotate } from '../hooks/useAutoRotate.js';
import { PERSON_STORY, PERSON_NOW, PERSON_ADVISE } from '../content.js';
import ProgressRing from './ProgressRing.jsx';

const INTERVAL = 5000;

function ArrowLeft() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

function ArrowRight() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
}

const CARDS = [
  { label: PERSON_STORY.eyebrowLabel,  id: 'story' },
  { label: PERSON_NOW.eyebrowLabel,    id: 'now' },
  { label: PERSON_ADVISE.eyebrowLabel, id: 'advise' }
];

function StoryCard() {
  return (
    <div className="person-card">
      <p className="person-lead">{PERSON_STORY.leadLine}</p>
      {PERSON_STORY.paragraphs.map((p, i) => <p key={i} className="person-para">{p}</p>)}
    </div>
  );
}

function NowCard() {
  return (
    <div className="person-card">
      {PERSON_NOW.rows.map(row => (
        <div key={row.label} className="person-now-row">
          <span className="person-now-label">{row.label}</span>
          <p className="person-now-content">{row.content}</p>
        </div>
      ))}
    </div>
  );
}

function AdviseCard() {
  return (
    <div className="person-card">
      <p className="person-lead">{PERSON_ADVISE.leadLine}</p>
      {PERSON_ADVISE.paragraphs.map((p, i) => <p key={i} className="person-para">{p}</p>)}
      <div className="avail-pill">{PERSON_ADVISE.availability.label}</div>
    </div>
  );
}

const PANELS = [StoryCard, NowCard, AdviseCard];

export default function ThePerson() {
  const { active, paused, goTo, next, prev } = useAutoRotate({ count: 3, intervalMs: INTERVAL });

  return (
    <section id="the-person">
      <div className="container">
        <div className="person-header">
          <p className="eyebrow">The Person</p>
          <h2 className="section-title">Behind the systems.</h2>

          <div className="tab-bar" role="tablist" aria-label="Person sections">
            {CARDS.map((c, i) => (
              <button
                key={c.id}
                className={`tab-btn${active === i ? ' active' : ''}`}
                role="tab"
                aria-selected={active === i}
                aria-controls={`person-panel-${c.id}`}
                onClick={() => goTo(i)}
              >
                {c.label}
                <ProgressRing active={active === i && !paused} intervalMs={INTERVAL} />
              </button>
            ))}
          </div>

          <div className="rotator-nav">
            <button className="arrow-btn" onClick={prev} aria-label="Previous card"><ArrowLeft /></button>
            {CARDS.map((c, i) => (
              <button
                key={c.id}
                className={`rotator-dot${active === i ? ' active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to ${c.label}`}
              />
            ))}
            <button className="arrow-btn" onClick={next} aria-label="Next card"><ArrowRight /></button>
          </div>
        </div>

        {CARDS.map((c, i) => {
          const Panel = PANELS[i];
          return (
            <div
              key={c.id}
              id={`person-panel-${c.id}`}
              className={`tab-panel${active === i ? ' active' : ''}`}
              role="tabpanel"
            >
              <Panel />
            </div>
          );
        })}
      </div>
    </section>
  );
}
