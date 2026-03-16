export default function Hero({ gotoSection }) {
  return (
    <section id="home">
      <div className="wrap">
        <div className="hero-inner">

          {/* ── LEFT ── */}
          <div className="hero-left">
            <div className="hero-eyebrow fade1">
              <span></span>Available for opportunities
            </div>

            <h1 className="hero-name fade2">
              Navodya<br /><em>Theshan</em>
            </h1>

            <p className="hero-role fade3">Full Stack &amp; Mobile App Developer</p>

            <p className="hero-desc fade4">
              Final-year <strong>Software Engineering</strong> student building production-grade apps
              across <strong>MERN stack</strong>, <strong>Flutter</strong>, <strong>Three.js</strong>,{' '}
              <strong>Python ML</strong> and <strong>IoT</strong>.
            </p>

            <div className="hero-btns fade5">
              <button className="btn-primary" onClick={() => gotoSection('works')}>
                View projects →
              </button>
              <a
                href="https://github.com/NavozZ"
                className="btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </div>

            <div className="hero-stats fade6">
              <div>
                <div className="stat-num">9<span>+</span></div>
                <div className="stat-label">Projects built</div>
              </div>
              <div>
                <div className="stat-num">8<span>+</span></div>
                <div className="stat-label">Tech stacks</div>
              </div>
              <div>
                <div className="stat-num">1<span>yr</span></div>
                <div className="stat-label">Industry exp.</div>
              </div>
            </div>
          </div>

          {/* ── RIGHT — terminal card ── */}
          <div className="hero-right fade-r">
            <div className="terminal">
              <div className="terminal-bar">
                <div className="t-dot" style={{ background: '#ff5f56' }}></div>
                <div className="t-dot" style={{ background: '#febc2e' }}></div>
                <div className="t-dot" style={{ background: '#28c840' }}></div>
                <span className="t-title">navodya@dev ~ profile.json</span>
              </div>
              <div className="terminal-body">
                <div><span className="t-prompt">$</span> <span className="t-cmd">cat profile.json</span></div>
                <div style={{ height: '4px' }}></div>
                <div style={{ color: 'var(--border2)' }}>{'{'}</div>
                <div className="t-out"><span className="t-key">"name"</span>: <span className="t-val">"Navodya Theshan"</span>,</div>
                <div className="t-out"><span className="t-key">"role"</span>: <span className="t-val">"Full Stack Developer"</span>,</div>
                <div className="t-out"><span className="t-key">"location"</span>: <span className="t-val">"Sri Lanka 🌴"</span>,</div>
                <div className="t-out"><span className="t-key">"stack"</span>: [</div>
                <div className="t-out" style={{ paddingLeft: '36px' }}>
                  <span className="t-tag">"React"</span>, <span className="t-tag">"Node.js"</span>,
                </div>
                <div className="t-out" style={{ paddingLeft: '36px' }}>
                  <span className="t-tag">"MongoDB"</span>, <span className="t-tag">"Express"</span>,
                </div>
                <div className="t-out" style={{ paddingLeft: '36px' }}>
                  <span className="t-tag">"Flutter"</span>, <span className="t-tag">"Three.js"</span>
                </div>
                <div className="t-out">],</div>
                <div className="t-out"><span className="t-key">"currently"</span>: <span className="t-val">"CryptoPulse 🚀"</span>,</div>
                <div className="t-out"><span className="t-key">"open_to"</span>: <span className="t-val">"internships"</span></div>
                <div style={{ color: 'var(--border2)' }}>{'}'}</div>
                <div style={{ height: '4px' }}></div>
                <div><span className="t-prompt">$</span><span className="t-cursor"></span></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
