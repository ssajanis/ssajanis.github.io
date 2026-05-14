import { useAutoRotate } from '../hooks/useAutoRotate.js';
import { THE_WORK } from '../content.js';
import ProgressRing from './ProgressRing.jsx';
import CaseStudies from './CaseStudies.jsx';
import WorkExperience from './WorkExperience.jsx';
import TechStack from './TechStack.jsx';

function ArrowLeft() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

function ArrowRight() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
}

const TABS = THE_WORK.tabs;
const PANELS = [CaseStudies, WorkExperience, TechStack];

export default function TheWork() {
  const { active, paused, goTo, next, prev } = useAutoRotate({
    count: TABS.length,
    intervalMs: THE_WORK.rotateIntervalMs
  });

  function handleInteract() {
    if (!paused) {
      // force pause by going to same index
    }
  }

  return (
    <section id="the-work">
      <div className="container">
        <div className="work-header">
          <div className="work-title-row">
            <p className="eyebrow">{THE_WORK.sectionHeader.eyebrow}</p>
            <h2 className="section-title">{THE_WORK.sectionHeader.title}</h2>
            <p className="section-sub">{THE_WORK.sectionHeader.subhead}</p>
          </div>

          <div className="tab-bar" role="tablist" aria-label="Work sections">
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                className={`tab-btn${active === i ? ' active' : ''}`}
                role="tab"
                aria-selected={active === i}
                aria-controls={`work-panel-${tab.id}`}
                onClick={() => goTo(i)}
              >
                {tab.label}
                <ProgressRing active={active === i && !paused} intervalMs={THE_WORK.rotateIntervalMs} />
              </button>
            ))}
          </div>

          <div className="rotator-nav">
            <button className="arrow-btn" onClick={prev} aria-label="Previous tab"><ArrowLeft /></button>
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                className={`rotator-dot${active === i ? ' active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to ${tab.label}`}
              />
            ))}
            <button className="arrow-btn" onClick={next} aria-label="Next tab"><ArrowRight /></button>
          </div>
        </div>

        {TABS.map((tab, i) => {
          const Panel = PANELS[i];
          return (
            <div
              key={tab.id}
              id={`work-panel-${tab.id}`}
              className={`tab-panel${active === i ? ' active' : ''}`}
              role="tabpanel"
            >
              <Panel onInteract={() => {}} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
