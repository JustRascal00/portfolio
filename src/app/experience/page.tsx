'use client';
import LanguageToggle from "../components/LanguageToggle";
import { useI18n } from "../components/i18n";

export default function Experience() {
  const { t } = useI18n();
  
  const experiences = [
    {
      title: t('experience.freelance.title'),
      company: t('experience.freelance.company'),
      location: t('experience.freelance.location'),
      period: t('experience.freelance.period'),
      achievements: [
        t('experience.freelance.achievement1'),
        t('experience.freelance.achievement2'),
        t('experience.freelance.achievement3'),
        t('experience.freelance.achievement4')
      ]
    },
    {
      title: t('experience.backend.title'),
      company: t('experience.backend.company'),
      location: t('experience.backend.location'),
      period: t('experience.backend.period'),
      achievements: [
        t('experience.backend.achievement1'),
        t('experience.backend.achievement2'),
        t('experience.backend.achievement3'),
        t('experience.backend.achievement4'),
        t('experience.backend.achievement5'),
        t('experience.backend.achievement6'),
        t('experience.backend.achievement8'),
        t('experience.backend.achievement9'),
        t('experience.backend.achievement10')
      ]
    },
    {
      title: t('experience.database.title'),
      company: t('experience.database.company'),
      location: t('experience.database.location'),
      period: t('experience.database.period'),
      achievements: [
        t('experience.database.achievement1'),
        t('experience.database.achievement2'),
        t('experience.database.achievement3'),
        t('experience.database.achievement4')
      ]
    }
  ];

  const frontendTechnologies = ["React", "Next.js", "TypeScript", "JavaScript", "CSS", "Tailwind CSS"];
  const backendTechnologies = ["Laravel", "PHP", "Python", "SQL", "MySQL", "Joomla CMS"];

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
            <a className="nav-link" href="/projects">{t('nav.projects')}</a>
            <a className="nav-link bg-emerald-500 text-black px-3 py-1 rounded" href="/experience">{t('nav.experience')}</a>
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
          <span className="text-emerald-700">mamuka.dev@portfolio:~$</span> experience
        </div>

        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-emerald-400 mb-4">
            {t('experience.title')}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="max-w-3xl text-emerald-100/90 text-lg">
            {t('experience.subtitle')}
          </p>
        </div>

        {/* Experience timeline */}
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              {/* Individual vertical line for each job - starts at title, ends after last achievement */}
              <div className="absolute left-0 top-8 w-1 bg-emerald-400" style={{height: 'calc(100% - 2rem)'}}></div>
              
              <div className="pl-8">
                {/* Job title and dates */}
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-mono font-bold text-emerald-400">
                    {exp.title}
                  </h2>
                  <span className="text-emerald-300 font-mono text-sm">
                    {exp.period}
                  </span>
                </div>
                
                {/* Company and location */}
                <div className="mb-6">
                  <p className="text-emerald-200 font-mono text-sm">
                    <span className="font-semibold">{exp.company}</span>
                    <span className="text-emerald-500 mx-2">•</span>
                    <span className="text-emerald-300">{exp.location}</span>
                  </p>
                </div>
                
                {/* Achievements */}
                <div className="space-y-3">
                  {exp.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-400 rounded-sm mt-2 flex-shrink-0"></div>
                      <p className="text-emerald-100/90 leading-relaxed font-mono text-sm">
                        {achievement}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Expertise Section */}
        <div className="mt-16 p-8 terminal-border rounded-lg bg-black/20">
          <h2 className="text-2xl font-mono font-bold text-emerald-400 mb-6">
            {t('experience.technicalExpertise.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-mono text-emerald-300 mb-4 text-lg">{t('experience.technicalExpertise.frontend')}</h3>
              <div className="flex flex-wrap gap-3">
                {frontendTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="terminal-border rounded px-4 py-2 text-sm font-mono text-emerald-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-mono text-emerald-300 mb-4 text-lg">{t('experience.technicalExpertise.backend')}</h3>
              <div className="flex flex-wrap gap-3">
                {backendTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="terminal-border rounded px-4 py-2 text-sm font-mono text-emerald-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
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