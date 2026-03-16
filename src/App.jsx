import { useState, useEffect, useRef } from 'react';
import Navbar           from './components/Navbar';
import Sidebar          from './components/Sidebar';
import Hero             from './components/Hero';
import Works            from './components/Works';
import Skills           from './components/Skills';
import About            from './components/About';
import Contact          from './components/Contact';
import Footer           from './components/Footer';
import ProjectModal     from './components/ProjectModal';
import AdminDashboard, { loadMedia } from './components/AdminDashboard';
import { projects }     from './data';
import builtInMedia     from './mediaData';

const SECTION_IDS   = ['home', 'works', 'skills', 'about-me', 'contacts'];
const SECRET_CLICKS = 5;
const SECRET_WINDOW = 2000;

// Merge mediaData.js (committed to GitHub, works on Vercel) with
// localStorage overrides (set via the Admin Dashboard locally).
// localStorage takes priority so local edits are always reflected.
function mergeMedia() {
  const local  = loadMedia();
  const merged = { ...builtInMedia };
  Object.keys(local).forEach(id => { merged[id] = local[id]; });
  return merged;
}

export default function App() {
  const [activeSection,   setActiveSection]   = useState('home');
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [adminOpen,        setAdminOpen]       = useState(false);
  const [allMedia,         setAllMedia]        = useState(mergeMedia);

  /* ── hidden trigger: click logo dot 5× within 2s ── */
  const clickTs = useRef([]);
  const handleLogoDotClick = () => {
    const now   = Date.now();
    const times = [...clickTs.current, now].filter(t => now - t < SECRET_WINDOW);
    clickTs.current = times;
    if (times.length >= SECRET_CLICKS) {
      clickTs.current = [];
      setAdminOpen(true);
    }
  };

  const handleAdminClose = () => {
    setAdminOpen(false);
    setAllMedia(mergeMedia()); // re-merge after any edits
  };

  useEffect(() => {
    const onScroll = () => {
      let cur = 'home';
      SECTION_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) cur = id;
      });
      setActiveSection(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const close = () => setMobileMenuOpen(false);
    window.addEventListener('scroll', close, { passive: true, once: true });
    return () => window.removeEventListener('scroll', close);
  }, [mobileMenuOpen]);

  const gotoSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <Navbar
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        gotoSection={gotoSection}
        onLogoDotClick={handleLogoDotClick}
      />
      <Sidebar />
      <main>
        <Hero    gotoSection={gotoSection} />
        <Works   projects={projects} openModal={setSelectedProject} allMedia={allMedia} />
        <Skills  />
        <About   />
        <Contact />
      </main>
      <Footer />
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          mediaItems={allMedia[selectedProject.id] || []}
          onClose={() => setSelectedProject(null)}
        />
      )}
      {adminOpen && (
        <AdminDashboard projects={projects} onClose={handleAdminClose} />
      )}
    </>
  );
}
