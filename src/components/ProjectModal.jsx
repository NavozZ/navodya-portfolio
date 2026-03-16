import { useState, useEffect, useRef } from 'react';
import { mockups } from '../data';
import { getMediaType, ytEmbed, vimeoEmbed } from './AdminDashboard';

/* ══ Icons ═══════════════════════════════════════════════════ */
const GalleryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21,15 16,10 5,21"/>
  </svg>
);
const BrowserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const MacbookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="14" rx="1"/>
    <path d="M1 20h22"/>
  </svg>
);
const MobileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <line x1="12" y1="18" x2="12" y2="18"/>
  </svg>
);

/* ══ MediaPlayer — renders one media item ════════════════════ */
function MediaPlayer({ src }) {
  const type   = getMediaType(src);
  const vidRef = useRef();

  /* autoplay native video when src changes */
  useEffect(() => {
    if (vidRef.current) {
      vidRef.current.load();
      vidRef.current.play().catch(() => {});
    }
  }, [src]);

  if (type === 'youtube') {
    const embed = ytEmbed(src);
    if (!embed) return <div className="media-error">Invalid YouTube URL</div>;
    return (
      <iframe
        key={src}
        src={embed}
        style={{ width:'100%', height:'100%', border:'none', display:'block' }}
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
        title="YouTube video"
      />
    );
  }

  if (type === 'vimeo') {
    const embed = vimeoEmbed(src);
    if (!embed) return <div className="media-error">Invalid Vimeo URL</div>;
    return (
      <iframe
        key={src}
        src={embed}
        style={{ width:'100%', height:'100%', border:'none', display:'block' }}
        allow="autoplay; fullscreen"
        allowFullScreen
        title="Vimeo video"
      />
    );
  }

  if (type === 'video') {
    return (
      <video
        ref={vidRef}
        key={src}
        muted
        autoPlay
        loop
        playsInline
        controls
        style={{ width:'100%', height:'100%', objectFit:'contain', display:'block', background:'#000' }}
      >
        <source src={src} />
        Your browser doesn't support HTML5 video.
      </video>
    );
  }

  /* image */
  return (
    <img
      src={src}
      alt=""
      style={{ width:'100%', height:'100%', objectFit:'contain', display:'block', background:'#0d0e14' }}
    />
  );
}

/* ══ GalleryView — carousel with thumbnails ═════════════════ */
function GalleryView({ mediaItems }) {
  const [idx, setIdx] = useState(0);
  const current = mediaItems[idx];
  const type    = getMediaType(current?.src);

  const prev = () => setIdx(i => (i - 1 + mediaItems.length) % mediaItems.length);
  const next = () => setIdx(i => (i + 1) % mediaItems.length);

  /* keyboard nav */
  useEffect(() => {
    const handler = e => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [mediaItems.length]);

  return (
    <div className="gallery-wrap">

      {/* main viewer */}
      <div className="gallery-main">
        <MediaPlayer src={current.src} />

        {/* prev / next arrows */}
        {mediaItems.length > 1 && (
          <>
            <button className="gallery-arrow gallery-arrow-l" onClick={prev}>‹</button>
            <button className="gallery-arrow gallery-arrow-r" onClick={next}>›</button>
            <div className="gallery-counter">{idx + 1} / {mediaItems.length}</div>
          </>
        )}

        {/* type badge */}
        {(type === 'youtube' || type === 'vimeo' || type === 'video') && (
          <div className="gallery-type-badge">▶ {type === 'youtube' ? 'YouTube' : type === 'vimeo' ? 'Vimeo' : 'Video'}</div>
        )}
      </div>

      {/* dot / thumbnail strip */}
      {mediaItems.length > 1 && (
        <div className="gallery-dots">
          {mediaItems.map((item, i) => {
            const t = getMediaType(item.src);
            return (
              <button
                key={i}
                className={`gallery-dot${i === idx ? ' active' : ''}`}
                onClick={() => setIdx(i)}
                title={`Item ${i + 1}`}
              >
                {t === 'image'
                  ? <img src={item.src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  : <span style={{ fontSize:12 }}>▶</span>
                }
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ══ Mockup device frames ════════════════════════════════════ */
function getContent(project, device) {
  if (project.live) {
    if (device === 'mobile') {
      return `<iframe src="${project.live}" sandbox="allow-scripts allow-same-origin allow-forms" loading="lazy"
        style="width:390px;height:844px;border:none;transform:scale(0.718);transform-origin:top left"
        title="${project.title}"></iframe>`;
    }
    return `<iframe src="${project.live}" sandbox="allow-scripts allow-same-origin allow-forms" loading="lazy"
      style="width:100%;height:100%;border:none" title="${project.title}"></iframe>`;
  }
  return mockups[project.id] || '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#525870">Preview coming soon</div>';
}

function BrowserFrame({ project }) {
  const url = project.live ? project.live.replace('https://', '') : 'localhost:5173';
  return (
    <div className="frame-browser">
      <div className="fb-bar">
        <div className="fb-dots">
          <span style={{ background:'#ff5f56' }}></span>
          <span style={{ background:'#febc2e' }}></span>
          <span style={{ background:'#28c840' }}></span>
        </div>
        <div style={{ display:'flex', gap:'5px', marginLeft:'4px' }}>
          {['←','→'].map(ch => (
            <span key={ch} style={{ width:'20px', height:'20px', borderRadius:'50%', background:'#1a1c24', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px', color:'#4a4e6a' }}>{ch}</span>
          ))}
        </div>
        <div className="fb-url">
          <span className="fb-lock">🔒</span>
          <span style={{ color:'#9fa6c0' }}>{url}</span>
        </div>
      </div>
      <div className="fb-content" dangerouslySetInnerHTML={{ __html: getContent(project, 'browser') }} />
    </div>
  );
}

function MacbookFrame({ project }) {
  return (
    <div className="frame-macbook">
      <div className="macbook-lid">
        <div className="macbook-notch"></div>
        <div className="macbook-inner" dangerouslySetInnerHTML={{ __html: getContent(project, 'macbook') }} />
      </div>
      <div className="macbook-base"></div>
      <div className="macbook-stand"></div>
      <div className="macbook-foot"></div>
    </div>
  );
}

function MobileFrame({ project }) {
  return (
    <div className="frame-mobile">
      <div className="mobile-body">
        <div className="mobile-notch"></div>
        <div className="mobile-screen" dangerouslySetInnerHTML={{ __html: getContent(project, 'mobile') }} />
        <div className="mobile-bar"></div>
      </div>
    </div>
  );
}

/* ══ ProjectModal ════════════════════════════════════════════ */
export default function ProjectModal({ project, mediaItems = [], onClose }) {
  const hasMedia = mediaItems.length > 0;
  const [device, setDevice] = useState(hasMedia ? 'gallery' : 'browser');

  const DEVICES = [
    ...(hasMedia ? [{ id:'gallery', label:'Gallery', Icon:GalleryIcon }] : []),
    { id:'browser', label:'Browser', Icon:BrowserIcon },
    { id:'macbook', label:'MacBook', Icon:MacbookIcon },
    { id:'mobile',  label:'Mobile',  Icon:MobileIcon  },
  ];

  /* body scroll lock + Escape */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  /* reset tab when project changes */
  useEffect(() => {
    setDevice(hasMedia ? 'gallery' : 'browser');
  }, [project.id, hasMedia]);

  const renderPreview = () => {
    if (device === 'gallery' && hasMedia) return <GalleryView mediaItems={mediaItems} />;
    if (device === 'browser')  return <BrowserFrame  project={project} />;
    if (device === 'macbook')  return <MacbookFrame  project={project} />;
    return <MobileFrame project={project} />;
  };

  return (
    <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">

        {/* header */}
        <div className="modal-header">
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <span className="modal-title">{project.title}</span>
            <span className="modal-badge">{project.badge}</span>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* device tabs */}
        <div className="device-bar">
          {DEVICES.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`device-btn${device === id ? ' active' : ''}`}
              onClick={() => setDevice(id)}
            >
              <Icon /> {label}
              {id === 'gallery' && mediaItems.length > 1 && (
                <span style={{ marginLeft:4, fontSize:9, color:'var(--muted)' }}>×{mediaItems.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* preview */}
        <div className="modal-preview">{renderPreview()}</div>

        {/* info */}
        <div className="modal-info">
          <div className="modal-col">
            <div className="modal-col-label">Key Features</div>
            <div className="modal-features">
              {project.features.slice(0, 5).map((f, i) => (
                <div key={i} className="modal-feat">{f}</div>
              ))}
            </div>
          </div>
          <div className="modal-col">
            <div className="modal-col-label">Links</div>
            <div className="modal-links">
              <a href={project.github} className="modal-btn modal-btn-p" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              {project.live && (
                <a href={project.live} className="modal-btn modal-btn-g" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
