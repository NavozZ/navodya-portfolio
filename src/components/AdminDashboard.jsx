import { useState, useRef, useEffect } from 'react';

/* ══ Storage helpers ═════════════════════════════════════════ */
const STORAGE_KEY = 'nt_project_media_v2';

export function loadMedia() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch { return {}; }
}
function saveMedia(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); return true; }
  catch (e) { return e.name === 'QuotaExceededError' ? 'quota' : false; }
}

/* ── detect what kind of media a src string is ── */
export function getMediaType(src) {
  if (!src) return 'image';
  if (/youtube\.com|youtu\.be/.test(src)) return 'youtube';
  if (/vimeo\.com/.test(src))             return 'vimeo';
  if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(src)) return 'video';
  if (/^data:video/.test(src))            return 'video';
  return 'image';
}

/* ── build embed URL for YouTube ── */
export function ytEmbed(url) {
  const m =
    url.match(/youtu\.be\/([^?&#/]+)/) ||
    url.match(/[?&]v=([^&#]+)/) ||
    url.match(/embed\/([^?&#]+)/);
  if (!m) return null;
  const id = m[1];
  return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=1&modestbranding=1`;
}

/* ── build embed URL for Vimeo ── */
export function vimeoEmbed(url) {
  const m = url.match(/vimeo\.com\/(\d+)/);
  if (!m) return null;
  return `https://player.vimeo.com/video/${m[1]}?autoplay=1&muted=1&loop=1`;
}

/* ══ Flash message hook ══════════════════════════════════════ */
function useFlash() {
  const [msg, setMsg] = useState('');
  const flash = (text) => { setMsg(text); setTimeout(() => setMsg(''), 2500); };
  return [msg, flash];
}

/* ══ MediaThumb — one tile in the strip ═════════════════════ */
function MediaThumb({ item, index, total, onMove, onRemove }) {
  const type = getMediaType(item.src);
  return (
    <div className="adm-mthumb">
      {index === 0 && <div className="adm-mthumb-badge">Cover</div>}

      {type === 'image'
        ? <img src={item.src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
        : (
          <div style={{
            width:'100%', height:'100%', display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center', gap:4,
            background:'rgba(124,106,255,.1)',
          }}>
            <span style={{ fontSize:20 }}>▶</span>
            <span style={{ fontSize:9, color:'var(--muted)', textAlign:'center', padding:'0 4px' }}>
              {type === 'youtube' ? 'YouTube' : type === 'vimeo' ? 'Vimeo' : 'Video'}
            </span>
          </div>
        )
      }

      <div className="adm-mthumb-actions">
        <button title="Move left"  disabled={index === 0}         onClick={() => onMove(index, -1)}>←</button>
        <button title="Move right" disabled={index === total - 1} onClick={() => onMove(index, +1)}>→</button>
        <button title="Remove" className="adm-mthumb-del" onClick={() => onRemove(index)}>✕</button>
      </div>
    </div>
  );
}

/* ══ ProjectRow ══════════════════════════════════════════════ */
function ProjectRow({ project, items, onChange }) {
  const fileRef          = useRef();
  const [imgUrl, setImgUrl] = useState('');
  const [vidUrl, setVidUrl] = useState('');
  const [tab, setTab]       = useState('image');
  const [msg, flash]        = useFlash();

  const addItem = (src) => {
    const next = [...items, { src }];
    const res  = onChange(project.id, next);
    if (res === 'quota') flash('⚠ Storage full — use URLs instead of file uploads');
    else flash('✓ Added');
  };

  const onFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      flash('⚠ Max 4 MB per file — paste a URL instead');
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => addItem(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const onAddImageUrl = () => {
    const t = imgUrl.trim();
    if (!t) { flash('⚠ Enter a URL first'); return; }
    addItem(t);
    setImgUrl('');
  };

  const onAddVideoUrl = () => {
    const t = vidUrl.trim();
    if (!t) { flash('⚠ Enter a URL first'); return; }
    addItem(t);
    setVidUrl('');
  };

  const onRemove = (index) => {
    const next = items.filter((_, i) => i !== index);
    onChange(project.id, next);
  };

  const onMove = (index, dir) => {
    const next   = [...items];
    const target = index + dir;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(project.id, next);
  };

  const coverItem = items[0];
  const coverType = coverItem ? getMediaType(coverItem.src) : null;

  return (
    <div className="adm-row">

      {/* cover preview */}
      <div className={`adm-thumb ${project.thumbClass}`}>
        {coverItem
          ? coverType === 'image'
            ? <img src={coverItem.src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            : <div style={{ fontSize:28, color:'rgba(255,255,255,.7)' }}>▶</div>
          : <span style={{ fontSize:28 }}>{project.thumb}</span>
        }
      </div>

      {/* controls */}
      <div className="adm-info">
        <div className="adm-proj-name">{project.title}</div>
        <div className="adm-proj-badge">{project.badge}</div>

        {/* count + flash */}
        <div className="adm-status">
          {items.length > 0
            ? <span className="adm-badge-set">● {items.length} item{items.length !== 1 ? 's' : ''}</span>
            : <span className="adm-badge-none">○ No media yet</span>
          }
          {msg && <span className="adm-flash">{msg}</span>}
        </div>

        {/* thumbnail strip */}
        {items.length > 0 && (
          <div className="adm-strip">
            {items.map((item, i) => (
              <MediaThumb
                key={i}
                item={item}
                index={i}
                total={items.length}
                onMove={onMove}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}

        {/* add controls */}
        <div className="adm-add-box">
          <div className="adm-tabs">
            <button className={`adm-tab${tab === 'image' ? ' active' : ''}`} onClick={() => setTab('image')}>🖼 Image</button>
            <button className={`adm-tab${tab === 'video' ? ' active' : ''}`} onClick={() => setTab('video')}>▶ Video</button>
          </div>

          {tab === 'image' && (
            <div className="adm-add-inner">
              <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={onFile} />
              <button className="adm-btn adm-btn-upload" onClick={() => fileRef.current.click()}>
                ↑ Upload file
              </button>
              <div className="adm-url-row">
                <input
                  className="adm-url-input"
                  placeholder="Or paste image URL and press Enter..."
                  value={imgUrl}
                  onChange={e => setImgUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && onAddImageUrl()}
                />
                <button className="adm-btn adm-btn-save" onClick={onAddImageUrl}>Add</button>
              </div>
            </div>
          )}

          {tab === 'video' && (
            <div className="adm-add-inner">
              <div className="adm-url-row">
                <input
                  className="adm-url-input"
                  placeholder="YouTube URL · Vimeo URL · direct .mp4 URL..."
                  value={vidUrl}
                  onChange={e => setVidUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && onAddVideoUrl()}
                />
                <button className="adm-btn adm-btn-save" onClick={onAddVideoUrl}>Add</button>
              </div>
              <p style={{ fontSize:'10px', color:'var(--muted)', marginTop:'6px', lineHeight:1.6 }}>
                Supports YouTube, Vimeo, and direct <code style={{ color:'var(--purple2)' }}>.mp4 / .webm</code> links.
                All videos autoplay muted when the modal opens.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══ AdminDashboard (main overlay) ══════════════════════════ */
export default function AdminDashboard({ projects, onClose }) {
  const [media, setMedia] = useState(loadMedia);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const esc = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc); };
  }, [onClose]);

  const handleChange = (id, items) => {
    const next = { ...media };
    if (items.length === 0) delete next[id];
    else next[id] = items;
    const res = saveMedia(next);
    if (res === 'quota') return 'quota';
    setMedia(next);
  };

  const clearAll = () => {
    if (!window.confirm('Remove ALL media from every project?')) return;
    setMedia({});
    saveMedia({});
  };

  const totalItems  = Object.values(media).reduce((s, a) => s + a.length, 0);
  const totalProjects = Object.keys(media).length;

  return (
    <div className="adm-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="adm-panel">

        <div className="adm-header">
          <div>
            <div className="adm-header-title">
              <span style={{ color:'var(--purple)' }}>⬡</span> Project Media Manager
            </div>
            <div className="adm-header-sub">
              Multiple images &amp; videos per project · Gallery &amp; autoplay in modal · Esc to close
            </div>
          </div>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            <button className="adm-btn adm-btn-danger" onClick={clearAll}>Clear all</button>
            <button className="adm-btn adm-btn-close"  onClick={onClose}>✕ Close</button>
          </div>
        </div>

        <div className="adm-stats-bar">
          <span>{totalItems} items across {totalProjects} project{totalProjects !== 1 ? 's' : ''}</span>
          <span style={{ color:'var(--muted)', fontSize:10 }}>
            First item = card cover · ← → to reorder
          </span>
        </div>

        <div className="adm-list">
          {projects.map(p => (
            <ProjectRow
              key={p.id}
              project={p}
              items={media[p.id] || []}
              onChange={handleChange}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
