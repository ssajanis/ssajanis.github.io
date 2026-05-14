import { TECH_STACK } from '../content.js';

export default function TechStack() {
  return (
    <div className="tech-grid">
      {TECH_STACK.map(cat => (
        <div key={cat.category} className="tech-category">
          <div className="tech-cat-label">{cat.category}</div>
          <div className="tool-chips">
            {cat.tools.map(t => (
              <span key={t} className="tool-chip">{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
