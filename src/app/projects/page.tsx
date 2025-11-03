'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import LanguageToggle from "../components/LanguageToggle";
import { useI18n } from "../components/i18n";
import { PROJECTS_DATA } from "../data/projects";

type TranslationKey = string;

export default function Projects() {
  const { t } = useI18n();
  
  // Transform the data to include translated values
  const projects = PROJECTS_DATA.map(project => ({
    id: project.id,
    title: t(project.titleKey as TranslationKey),
    category: t(project.categoryKey as TranslationKey),
    description: t(project.descriptionKey as TranslationKey),
    techStack: project.techStack,
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
    image: project.image,
    isNew: project.isNew
  }));

  // Auto-detect uptime: derive initial badge by presence of a real liveUrl, then verify
  const initialStatuses = useMemo(() => {
    return projects.reduce<Record<string, 'loading' | 'live' | 'demo'>>((acc, p) => {
      if (!p.liveUrl || p.liveUrl === '#') {
        acc[p.id] = 'demo';
      } else {
        acc[p.id] = 'loading';
      }
      return acc;
    }, {});
  }, [projects]);

  const [statusById, setStatusById] = useState<Record<string, 'loading' | 'live' | 'demo'>>(initialStatuses);
  const [latencyById, setLatencyById] = useState<Record<string, number>>({});
  const [checkedAtById, setCheckedAtById] = useState<Record<string, number>>({});
  const statusCacheKey = 'projectStatusCache:v1';
  const hasHydratedRef = useRef(false);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // Filter/Search/Sort state
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'demo'>('all');
  const [techFilter, setTechFilter] = useState<string | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'new' | 'live' | 'az'>('new');

  const allTechs = useMemo(() => {
    const s = new Set<string>();
    projects.forEach(p => p.techStack.forEach(t => s.add(t)));
    return Array.from(s).sort((a,b)=>a.localeCompare(b));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let list = [...projects];
    if (statusFilter !== 'all') {
      list = list.filter(p => statusById[p.id] === statusFilter);
    }
    if (techFilter !== 'all') {
      list = list.filter(p => p.techStack.includes(techFilter));
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'new') {
      list.sort((a,b) => Number(b.isNew) - Number(a.isNew));
    } else if (sortBy === 'live') {
      list.sort((a,b) => {
        const sa = statusById[a.id] === 'live' ? 1 : 0;
        const sb = statusById[b.id] === 'live' ? 1 : 0;
        return sb - sa;
      });
    } else if (sortBy === 'az') {
      list.sort((a,b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [projects, statusById, statusFilter, techFilter, searchTerm, sortBy]);

  useEffect(() => {
    let isCancelled = false;
    // hydrate from cache once on mount
    if (!hasHydratedRef.current && typeof window !== 'undefined') {
      hasHydratedRef.current = true;
      try {
        const raw = localStorage.getItem(statusCacheKey);
        if (raw) {
          const parsed = JSON.parse(raw) as {
            statusById: Record<string, 'live' | 'demo'>,
            latencyById: Record<string, number>,
            checkedAtById: Record<string, number>
          };
          setStatusById(prev => ({ ...prev, ...parsed.statusById }));
          setLatencyById(parsed.latencyById || {});
          setCheckedAtById(parsed.checkedAtById || {});
        }
      } catch { /* ignore bad cache */ }
    }

    projects.forEach((p) => {
      if (!p.liveUrl || p.liveUrl === '#') return;

      // Try a quick HEAD request; fall back to considering it live on opaque success
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);
      const start = performance.now();

      fetch(p.liveUrl, { method: 'HEAD', mode: 'no-cors', cache: 'no-store', signal: controller.signal })
        .then(() => {
          if (isCancelled) return;
          setStatusById(prev => ({ ...prev, [p.id]: 'live' }));
          const ms = Math.round(performance.now() - start);
          setLatencyById(prev => ({ ...prev, [p.id]: ms }));
          setCheckedAtById(prev => ({ ...prev, [p.id]: Date.now() }));
        })
        .catch(() => {
          if (isCancelled) return;
          setStatusById(prev => ({ ...prev, [p.id]: 'demo' }));
          setCheckedAtById(prev => ({ ...prev, [p.id]: Date.now() }));
        })
        .finally(() => clearTimeout(timeout));
    });

    return () => {
      isCancelled = true;
    };
  }, [projects]);

  // persist cache when values change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const payload = JSON.stringify({ statusById, latencyById, checkedAtById });
      localStorage.setItem(statusCacheKey, payload);
    } catch { /* ignore quota */ }
  }, [statusById, latencyById, checkedAtById]);

  // reveal-on-scroll
  useEffect(() => {
    if (!gridRef.current) return;
    const nodes = Array.from(gridRef.current.querySelectorAll('[data-reveal]')) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('opacity-100','translate-y-0');
          (e.target as HTMLElement).classList.remove('opacity-0','translate-y-4');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  }, [filteredProjects]);

  return (
    <div className="scanlines crt-sweep min-h-screen w-full">
      <header className="sticky top-0 z-40 backdrop-blur-sm bg-black/30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 font-mono" aria-label="Go to home">
            <span className="neon-text">&gt;_</span>
            <span className="text-emerald-400">mamuka@portfolio</span>
            <span className="text-emerald-700">:~$</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 font-mono text-sm">
            <a className="nav-link" href="/about">{t('nav.about')}</a>
            <a className="nav-link bg-emerald-500 text-black px-3 py-1 rounded" href="/projects">{t('nav.projects')}</a>
            <a className="nav-link" href="/experience">{t('nav.experience')}</a>
            <a className="nav-link" href="/contact">{t('nav.contact')}</a>
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

        {/* Controls */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={()=>setStatusFilter('all')} className={`terminal-border rounded px-3 py-1 text-sm font-mono ${statusFilter==='all'?'bg-emerald-500/10 text-emerald-300':'text-emerald-300'}`}>All</button>
            <button onClick={()=>setStatusFilter('live')} className={`terminal-border rounded px-3 py-1 text-sm font-mono ${statusFilter==='live'?'bg-emerald-500/10 text-emerald-300':'text-emerald-300'}`}>Live</button>
            <button onClick={()=>setStatusFilter('demo')} className={`terminal-border rounded px-3 py-1 text-sm font-mono ${statusFilter==='demo'?'bg-emerald-500/10 text-emerald-300':'text-emerald-300'}`}>Demo</button>
            <span className="mx-2 h-5 w-px bg-emerald-700/40" />
            <select value={techFilter} onChange={(e)=>setTechFilter(e.target.value as string | 'all')} className="terminal-border bg-black/30 text-emerald-200 text-sm font-mono rounded px-2 py-1">
              <option value="all">All Tech</option>
              {allTechs.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <span className="mx-2 h-5 w-px bg-emerald-700/40" />
            <select value={sortBy} onChange={(e)=>setSortBy(e.target.value as 'new' | 'live' | 'az')} className="terminal-border bg-black/30 text-emerald-200 text-sm font-mono rounded px-2 py-1">
              <option value="new">New first</option>
              <option value="live">Live first</option>
              <option value="az">A–Z</option>
            </select>
          </div>
          <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search projects..." className="terminal-border bg-black/30 text-emerald-200 text-sm font-mono rounded px-3 py-2 w-full md:w-64" />
        </div>

        {/* Live region for status updates */}
        <div className="sr-only" aria-live="polite">
          {projects.map(p => (
            <span key={p.id}>{p.title}: {statusById[p.id]}</span>
          ))}
        </div>

        {/* Projects grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              data-reveal
              className="terminal-border rounded-lg p-8 bg-black/20 hover:bg-black/30 transition-colors transform-gpu opacity-0 translate-y-4"
              onMouseMove={(e) => {
                const card = e.currentTarget as HTMLDivElement;
                const rect = card.getBoundingClientRect();
                const px = (e.clientX - rect.left) / rect.width;
                const py = (e.clientY - rect.top) / rect.height;
                const rx = (py - 0.5) * -6;
                const ry = (px - 0.5) * 6;
                card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget as HTMLDivElement;
                card.style.transform = '';
              }}
              style={{ boxShadow: statusById[project.id] === 'live' ? '0 0 40px rgba(16,185,129,0.15)' : undefined }}
            >
              {/* Project image */}
              <div className="w-full h-64 rounded-lg mb-6 overflow-hidden border border-emerald-700/30">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Project title and category */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-mono font-bold text-emerald-400 flex-1">{project.title}</h3>
                  {statusById[project.id] === 'loading' && (
                    <span
                      className="relative inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-700/40"
                      title="Checking availability..."
                    >
                      <svg className="animate-spin h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-90" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                      </svg>
                      Checking
                    </span>
                  )}
                  {statusById[project.id] === 'live' && (
                    <span
                      className="relative inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full font-mono bg-gradient-to-r from-emerald-400 to-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                      aria-label="Live site"
                      title={`Live • ${latencyById[project.id] ? `${latencyById[project.id]} ms` : ''}${checkedAtById[project.id] ? ` • checked ${new Date(checkedAtById[project.id]).toLocaleTimeString()}` : ''}`}
                    >
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/30 opacity-60" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black/70" />
                      </span>
                      Live
                    </span>
                  )}
                  {statusById[project.id] === 'demo' && (
                    <span
                      className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full font-mono bg-slate-700 text-white border border-slate-500/60"
                      aria-label="Demo only"
                      title="Demo: not reachable"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-90">
                        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
                      </svg>
                      Demo
                    </span>
                  )}
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
                {statusById[project.id] === 'live' && (
                  <a
                    href={project.liveUrl}
                    className="flex-1 terminal-border rounded-lg px-6 py-4 font-mono text-base bg-emerald-500 text-black hover:bg-emerald-400 transition-colors text-center flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.35)]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>👁</span>
                    View Live
                  </a>
                )}
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
