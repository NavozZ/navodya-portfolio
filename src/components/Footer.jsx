const FOOTER_LINKS = [
  { label: 'GitHub',    href: 'https://github.com/NavozZ' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/navodya-t9a7397171/' },
  { label: 'Portfolio', href: 'https://bit.ly/navodyatheshan' },
];

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-inner">
          <div className="footer-logo">NT.</div>
          <div className="footer-copy">© 2026 Navodya Theshan. All rights reserved.</div>
          <div className="footer-links">
            {FOOTER_LINKS.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
