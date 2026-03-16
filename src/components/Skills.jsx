const SKILL_GROUPS = [
  {
    title: 'Languages',
    tags: ['JavaScript', 'TypeScript', 'Java', 'C#', 'Python', 'Dart', 'MATLAB'],
  },
  {
    title: 'Frontend / Mobile',
    tags: ['React 18/19', 'Three.js', 'React Three Fiber', 'Tailwind CSS', 'Framer Motion', 'Flutter'],
  },
  {
    title: 'Backend / DB',
    tags: ['Node.js', 'Express.js', 'MongoDB Atlas', 'MySQL', 'MS SQL Server', 'Firebase', 'JWT'],
  },
  {
    title: 'AI / IoT / DevOps',
    tags: ['Prophet ML', 'VADER NLP', 'MQTT', 'Docker', 'GitHub Actions', 'Netlify', 'Vercel'],
  },
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <div className="s-label">capabilities</div>
        <div className="s-title">Tech <em>Stack</em></div>
        <div className="skills-grid">
          {SKILL_GROUPS.map(group => (
            <div key={group.title} className="skill-col">
              <div className="skill-col-title">
                <span className="icon">⬡</span> {group.title}
              </div>
              <div className="skill-tags">
                {group.tags.map(tag => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
