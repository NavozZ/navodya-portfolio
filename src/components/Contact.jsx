import { useState } from 'react';

const INITIAL = { name: '', email: '', subject: '', message: '' };

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16, flexShrink: 0, color: 'var(--purple)' }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16, flexShrink: 0, color: 'var(--purple)' }}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16, flexShrink: 0, color: 'var(--purple)' }}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16, flexShrink: 0, color: 'var(--purple)' }}>
    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 00-5.487 0 12.36 12.36 0 00-.617-1.23A.077.077 0 008.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 00-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 00.031.055 20.03 20.03 0 005.993 2.98.078.078 0 00.084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 01-1.872-.878.075.075 0 01-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 01.078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 01.079.009c.12.098.245.195.372.288a.075.075 0 01-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 00-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 00.084.028 19.963 19.963 0 006.002-2.981.076.076 0 00.032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 00-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
  </svg>
);

const CONTACT_ITEMS = [
  {
    Icon: EmailIcon,
    label: 'Email',
    content: <a href="mailto:navodyatheshan4@gmail.com">navodyatheshan4@gmail.com</a>,
  },
  {
    Icon: LinkedInIcon,
    label: 'LinkedIn',
    content: (
      <a href="https://www.linkedin.com/in/navodya-t9a7397171/" target="_blank" rel="noopener noreferrer">
        linkedin.com/in/navodya-t
      </a>
    ),
  },
  {
    Icon: GitHubIcon,
    label: 'GitHub',
    content: (
      <a href="https://github.com/NavozZ" target="_blank" rel="noopener noreferrer">
        github.com/NavozZ
      </a>
    ),
  },
  {
    Icon: DiscordIcon,
    label: 'Discord',
    content: <span>NavozZ</span>,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL);
  const [status, setStatus]     = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const onChange = e =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus('success');
      } else {
        throw new Error(json.message || 'Something went wrong');
      }
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  };

  const resetForm = () => {
    setFormData(INITIAL);
    setStatus('idle');
    setErrorMsg('');
  };

  return (
    <section id="contacts">
      <div className="wrap">
        <div className="s-label">get in touch</div>
        <div className="s-title">Let's <em>Connect</em></div>

        <div className="contact-inner">
          {/* ── Left: form ── */}
          <div>
            {status === 'success' ? (
              <div className="form-success">
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>✅</div>
                <div style={{
                  fontFamily: "'Syne', sans-serif", fontSize: '18px',
                  fontWeight: 700, color: 'var(--white)', marginBottom: '8px',
                }}>
                  Message sent!
                </div>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '20px' }}>
                  Thanks for reaching out. I'll reply within 24 hours.
                </p>
                <button className="btn-ghost" onClick={resetForm}>
                  Send another →
                </button>
              </div>
            ) : (
              <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input
                      name="name"
                      className="form-input"
                      placeholder="Navodya Theshan"
                      required
                      value={formData.name}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="you@example.com"
                      required
                      value={formData.email}
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label className="form-label">Subject</label>
                  <input
                    name="subject"
                    className="form-input"
                    placeholder="Internship opportunity / Project inquiry..."
                    value={formData.subject}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label className="form-label">Message *</label>
                  <textarea
                    name="message"
                    className="form-input"
                    rows="5"
                    placeholder="Tell me about your project or opportunity..."
                    required
                    value={formData.message}
                    onChange={onChange}
                  />
                </div>

                {status === 'error' && (
                  <div className="form-error">{errorMsg}</div>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={status === 'sending'}
                  style={{ marginTop: '16px', alignSelf: 'flex-start' }}
                >
                  {status === 'sending' ? 'Sending...' : 'Send message →'}
                </button>
              </form>
            )}
          </div>

          {/* ── Right: contact info ── */}
          <div>
            <div className="contact-card">
              {CONTACT_ITEMS.map(({ Icon, label, content }) => (
                <div key={label} className="contact-item">
                  <Icon />
                  <div>
                    <div className="contact-lbl">{label}</div>
                    {content}
                  </div>
                </div>
              ))}
            </div>

            <p style={{
              fontSize: '12px', color: 'var(--dim)',
              lineHeight: 1.8, marginTop: '20px',
            }}>
              Open to internship and junior roles in full-stack, mobile, or
              AI-powered applications. Remote &amp; on-site.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
