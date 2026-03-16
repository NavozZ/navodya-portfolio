const NAV_ITEMS = [
  { id: 'home',     label: '#home'    },
  { id: 'works',    label: '#works'   },
  { id: 'skills',   label: '#skills'  },
  { id: 'about-me', label: '#about'   },
  { id: 'contacts', label: '#contact' },
];

export default function Navbar({ activeSection, mobileMenuOpen, setMobileMenuOpen, gotoSection, onLogoDotClick }) {
  return (
    <>
      <nav>
        <div className="nav-logo">
          <div className="logo-dot" onClick={onLogoDotClick} style={{ cursor:'default' }} title=""></div>Navodya
        </div>
        <ul className="nav-links">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button
                onClick={() => gotoSection(item.id)}
                className={activeSection === item.id ? 'active' : ''}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="nav-cta"
          onClick={() => { window.location.href = 'mailto:navodyatheshan4@gmail.com'; }}
        >
          hire me →
        </button>
        <button
          className="hamburger"
          onClick={() => setMobileMenuOpen(o => !o)}
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`mobile-menu${mobileMenuOpen ? ' open' : ''}`} id="mobileMenu">
        {NAV_ITEMS.map(item => (
          <button key={item.id} onClick={() => gotoSection(item.id)}>
            {item.label}
          </button>
        ))}
        <a
          href="mailto:navodyatheshan4@gmail.com"
          style={{
            display: 'block', marginTop: '12px', textAlign: 'center',
            padding: '10px', border: '1px solid #7c6aff', color: '#7c6aff',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '12px',
          }}
        >
          hire me →
        </a>
      </div>
    </>
  );
}
