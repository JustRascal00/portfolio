'use client';
import LanguageToggle from "../components/LanguageToggle";
import { useI18n } from "../components/i18n";

export default function Projects() {
  const { t } = useI18n();
  
  const projects = [
    {
      id: 'chatapp',
      title: t('projects.chatApp1.title'),
      category: t('projects.tags.chat'),
      description: t('projects.chatApp1.description'),
      techStack: ['Next.js', 'TypeScript', 'Prisma', 'Pusher'],
      liveUrl: '#',
      githubUrl: 'https://github.com/JustRascal00/chatapp',
      image: '/projects/Website1.png',
      isNew: false
    },
    {
      id: 'chatroom',
      title: t('projects.chatRoom.title'),
      category: t('projects.tags.chat'),
      description: t('projects.chatRoom.description'),
      techStack: ['PHP', 'SQL', 'JavaScript', 'CSS'],
      liveUrl: '#',
      githubUrl: 'https://github.com/JustRascal00/chatroom',
      image: '/projects/Website2.png',
      isNew: false
    },
    {
      id: 'rasapp',
      title: t('projects.whatsappClone.title'),
      category: t('projects.tags.chat'),
      description: t('projects.whatsappClone.description'),
      techStack: ['Next.js', 'Socket.io', 'Tailwind CSS', 'Node.js', 'Firebase'],
      liveUrl: '#',
      githubUrl: 'https://github.com/JustRascal00/rasapp',
      image: '/projects/Website3.png',
      isNew: false
    },
    {
      id: 'laravel-project-management',
      title: t('projects.projectManagement.title'),
      category: t('projects.tags.management'),
      description: t('projects.projectManagement.description'),
      techStack: ['Laravel', 'React', 'Inertia.js'],
      liveUrl: '#',
      githubUrl: 'https://github.com/JustRascal00/laravel-ProjectManagement-App',
      image: '/projects/Website4.png',
      isNew: false
    },
    {
      id: 'chatai',
      title: t('projects.title'),
      category: t('projects.tags.ai'),
      description: t('projects.summary'),
      techStack: ['React', 'Express', 'MongoDB', 'Google Gemini AI'],
      liveUrl: '#',
      githubUrl: 'https://github.com/JustRascal00/CHATAI',
      image: '/projects/Website5.png',
      isNew: true
    },
    {
      id: 'cv-website',
      title: t('projects.portfolio3d.title'),
      category: t('projects.tags.portfolio'),
      description: t('projects.portfolio3d.description'),
      techStack: ['Three.js', 'React Three Fiber', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: '#',
      githubUrl: 'https://github.com/JustRascal00/Cv-Website',
      image: '/projects/Website6.png',
      isNew: true
    },
    {
      id: 'webexplain',
      title: t('projects.webExplain.title'),
      category: t('projects.tags.ai'),
      description: t('projects.webExplain.description'),
      techStack: ['Next.js', 'TypeScript', 'Redis/Upstash', 'NextUI', 'Tailwind CSS', 'LlamaIndex/RAG', 'Lucide Icons'],
      liveUrl: '#',
      githubUrl: 'https://github.com/JustRascal00/webexplain',
      image: '/projects/Website7.png',
      isNew: true
    },
    {
      id: 'emotion-detection',
      title: t('projects.emotionDetection.title'),
      category: t('projects.tags.ai'),
      description: t('projects.emotionDetection.description'),
      techStack: ['React.js', 'Next.js', 'FastAPI', 'Python', 'DeepFace', 'YouTube API'],
      liveUrl: '#',
      githubUrl: 'https://github.com/JustRascal00/emotion-detection-ai',
      image: '/projects/Website8.png',
      isNew: true
    }
  ];

  return (
    <div className="scanlines crt-sweep min-h-screen w-full">
      <header className="sticky top-0 z-40 backdrop-blur-sm bg-black/30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 font-mono" aria-label="Go to home">
            <span className="neon-text">&gt;_</span>
            <span className="text-emerald-400">mamuka@portfolio</span>
            <span className="text-emerald-700">:~$</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 font-mono text-sm">
            <a className="nav-link" href="/about">{t('nav.about')}</a>
            <a className="nav-link bg-emerald-500 text-black px-3 py-1 rounded" href="/projects">{t('nav.projects')}</a>
            <a className="nav-link" href="/experience">{t('nav.experience')}</a>
            <a className="nav-link" href="/#contact">{t('nav.contact')}</a>
            <div className="flex items-center gap-2">
              <span className="availability-dot" />
              <span className="text-emerald-300">{t('nav.available')}</span>
              <LanguageToggle />
            </div>
          </nav>
        </div>
        <div className="h-px w-full bg-emerald-700/40" />
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 md:py-16 pb-24">
        {/* Terminal prompt */}
        <div className="font-mono text-emerald-400 mb-8">
          <span className="text-emerald-700">mamuka.dev@portfolio:~$</span> projects
        </div>

        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-emerald-400 mb-4">
            {t('projects.selected')}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="max-w-3xl text-emerald-100/90 text-lg">
            {t('projects.intro')}
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="terminal-border rounded-lg p-8 bg-black/20 hover:bg-black/30 transition-colors">
              {/* Project image */}
              <div className="w-full h-64 rounded-lg mb-6 overflow-hidden border border-emerald-700/30">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Project title and category */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-mono font-bold text-emerald-400 flex-1">{project.title}</h3>
                  {project.isNew && (
                    <span className="bg-red-500 text-white text-sm px-3 py-1 rounded font-mono">
                      New
                    </span>
                  )}
                </div>
                <span className="inline-block terminal-border rounded px-4 py-2 text-sm font-mono text-emerald-300">
                  {project.category}
                </span>
              </div>

              {/* Project description */}
              <p className="text-emerald-100/90 mb-6 text-base leading-relaxed">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="mb-8">
                <h4 className="font-mono text-emerald-400 mb-4 text-lg">{t('projects.techStack')}</h4>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="terminal-border rounded px-4 py-2 text-sm font-mono text-emerald-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4">
                <a
                  href={project.liveUrl}
                  className="flex-1 terminal-border rounded-lg px-6 py-4 font-mono text-base bg-emerald-500 text-black hover:bg-emerald-400 transition-colors text-center flex items-center justify-center gap-2"
                >
                  <span>👁</span>
                  {t('projects.viewProject')}
                </a>
                <a
                  href={project.githubUrl}
                  className="terminal-border rounded-lg px-6 py-4 font-mono text-base hover:bg-emerald-500/10 transition-colors text-center flex items-center justify-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>🐙</span>
                  {t('projects.github')}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional projects section */}
        <div className="mt-16">
          <h2 className="text-2xl font-mono font-bold text-emerald-400 mb-6">{t('projects.moreProjects')}</h2>
          <p className="text-emerald-100/90 mb-6">
            {t('projects.moreProjectsDesc')}
          </p>
          <a
            href="https://github.com/JustRascal00"
            className="terminal-border rounded-md px-6 py-3 font-mono text-sm hover:bg-emerald-500/10 transition-colors inline-flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>🐙</span>
            {t('projects.viewAll')}
          </a>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 border-t border-emerald-900/40 bg-black/80 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between text-sm font-mono">
          <span>© Mamuka Khokerashvili | 2025</span>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/JustRascal00"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
              aria-label="GitHub"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/mamuka-khokerashvili-538893277"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
              aria-label="LinkedIn"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <span className="text-emerald-400">v{new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '.')}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
