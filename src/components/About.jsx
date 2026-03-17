import ppImage from '../assets/Pp.png';

const HIGHLIGHTS = [
  { value: '9+',  label: 'Projects shipped'               },
  { value: '8+',  label: 'Frameworks used'                },
  { value: '3',   label: 'Platforms: Web, Mobile, Desktop' },
  { value: '1yr', label: 'Industry experience'             },
];

export default function About() {
  return (
    <section id="about-me">
      <div className="wrap">
        <div className="s-label">background</div>
        <div className="s-title">About <em>Me</em></div>

        <div className="about-grid">
          {/* ── Text ── */}
          <div className="about-text">
            <p>
              Hello! I'm Navodya, a final-year Software Engineering student at the University
              of Plymouth (UK degree), based in Sri Lanka.
            </p>
            <p>
              I specialize in building <strong>production-grade full-stack applications</strong> across
              web, mobile, 3D, and AI/ML domains. My final-year project, <strong>CryptoPulse</strong>,
              integrates a Python ML engine (Facebook Prophet + VADER) with a React 19 frontend and
              Node.js/TypeScript API.
            </p>
            <p>
              As Team Lead on <strong>RoomCraft</strong>, I delivered a 3D furniture visualiser using
              Three.js and React Three Fiber across a 6-member team. I've also built{' '}
              <strong>IoT dashboards</strong> with MQTT sensor streams, Flutter apps with Stripe
              payments, and MATLAB ML pipelines for biometric authentication.
            </p>
            <p>
              I'm open to <strong>internships and junior developer roles</strong> in full-stack,
              mobile, or AI-integrated products.
            </p>

            <div className="about-highlights">
              {HIGHLIGHTS.map(h => (
                <div key={h.label} className="highlight-box">
                  <strong>{h.value}</strong>
                  <span>{h.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Photo ── */}
          <div>
            <div className="about-img-box">
              <div className="about-corner tl"></div>
              <div className="about-corner br"></div>

              
              <img src={ppImage} alt="Navodya Theshan" />
              

              <div className="about-tag">
                <div className="tag-dot"></div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--white)' }}>Navodya Theshan</div>
                  <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Available for work</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
