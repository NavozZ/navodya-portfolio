import { getMediaType } from './AdminDashboard';

export default function Works({ projects, openModal, allMedia = {} }) {
  return (
    <section id="works">
      <div className="wrap">
        <div className="section-header">
          <div>
            <div className="s-label">portfolio</div>
            <div className="s-title" style={{ marginBottom: 0 }}>
              Selected <em>Works</em>
            </div>
          </div>
          <a href="https://github.com/NavozZ" className="view-all" target="_blank" rel="noopener noreferrer">
            View all ——›
          </a>
        </div>

        <div className="projects-grid">
          {projects.map(p => {
            const items = allMedia[p.id] || [];
            const cover = items[0] || null;
            const coverType = cover ? getMediaType(cover.src) : null;

            return (
              <div
                key={p.id}
                className="proj-card"
                onClick={() => openModal(p)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && openModal(p)}
              >
                <div className={`proj-thumb ${p.thumbClass}`}>
                  {/* custom cover image */}
                  {cover && coverType === 'image' && (
                    <img
                      src={cover.src}
                      alt={p.title}
                      style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
                    />
                  )}
                  {/* video cover indicator */}
                  {cover && coverType !== 'image' && (
                    <div style={{
                      position:'absolute', inset:0, display:'flex', flexDirection:'column',
                      alignItems:'center', justifyContent:'center', gap:6,
                      background:'rgba(124,106,255,.12)',
                    }}>
                      <span style={{ fontSize:28 }}>▶</span>
                    </div>
                  )}

                  {/* media count badge */}
                  {items.length > 1 && (
                    <div style={{
                      position:'absolute', top:8, left:8, background:'rgba(124,106,255,.85)',
                      color:'#fff', fontSize:9, padding:'2px 7px', zIndex:2,
                    }}>
                      {items.length} media
                    </div>
                  )}

                  {/* fallback emoji (only when no cover) */}
                  {!cover && <span className="proj-emoji">{p.thumb}</span>}

                  <span className="proj-thumb-title">{p.title}</span>
                  <span className="proj-hint">click to explore</span>
                </div>
                <div className="proj-body">
                  <p className="proj-stack">{p.stack}</p>
                  <p className="proj-name">{p.tagline}</p>
                  <p className="proj-desc">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
