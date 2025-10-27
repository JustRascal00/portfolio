"use client";
import Image from "next/image";
import LanguageToggle from "../components/LanguageToggle";
import { useI18n } from "../components/i18n";

export default function AboutPage() {
  const { t } = useI18n();
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
        <section className="terminal-border rounded-md p-6 md:p-8">
          <p className="font-mono text-emerald-400 mb-3 flex items-center gap-2">
            <span className="neon-text">&gt;_</span>
            <span className="text-emerald-400">mamuka@portfolio</span>
            <span className="text-emerald-700">:~$</span>
            <span>{t('about.cmd')}</span>
          </p>

          <div className="grid md:grid-cols-[1fr_260px] gap-8 items-start">
            <div>
              <h1 className="font-mono text-xl text-emerald-400 mb-4">{t('about.title')}</h1>
              <p className="font-mono text-emerald-400 mb-2">{t('about.whoami')}</p>
              <p className="max-w-3xl text-emerald-100/90">
                {t('about.whoami.body')}
              </p>
            </div>
            <div className="justify-self-end">
              <div className="overflow-hidden rounded-md terminal-border w-[220px] md:w-[220px]">
                <Image src="/selfie.jpeg" alt="Mamuka Khokerashvili" width={220} height={260} className="object-cover w-full h-auto" />
              </div>
              <p className="mt-2 text-xs font-mono text-emerald-300">selfie.jpeg</p>
            </div>
          </div>

          <div className="mt-10">
            <p className="font-mono text-emerald-400">{t('about.specialties.cmd')}</p>
            <ul className="mt-3 list-disc pl-6 text-emerald-100/90 space-y-1">
              <li>{t('about.specialties.1')}</li>
              <li>{t('about.specialties.2')}</li>
              <li>{t('about.specialties.3')}</li>
              <li>{t('about.specialties.4')}</li>
              <li>{t('about.specialties.5')}</li>
              <li>{t('about.specialties.6')}</li>
            </ul>
          </div>

          <div className="mt-10">
            <p className="font-mono text-emerald-400">{t('about.techStack.cmd')}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="terminal-border rounded-md p-6 text-center">
                <div className="text-3xl mb-3">🧩</div>
                <h4 className="font-mono text-emerald-400">{t('cards.frontend')}</h4>
                <p className="mt-2 text-emerald-100/90">React, Next.js, Tailwind CSS, Three.js</p>
              </div>
              <div className="terminal-border rounded-md p-6 text-center">
                <div className="text-3xl mb-3">⚙️</div>
                <h4 className="font-mono text-emerald-400">{t('cards.backend')}</h4>
                <p className="mt-2 text-emerald-100/90">Laravel (PHP), Node.js/Express, Python/FastAPI</p>
              </div>
              <div className="terminal-border rounded-md p-6 text-center">
                <div className="text-3xl mb-3">🗄️</div>
                <h4 className="font-mono text-emerald-400">{t('cards.databases')}</h4>
                <p className="mt-2 text-emerald-100/90">MySQL, PostgreSQL, MongoDB, Redis, Firebase</p>
              </div>
              <div className="terminal-border rounded-md p-6 text-center">
                <div className="text-3xl mb-3">☁️</div>
                <h4 className="font-mono text-emerald-400">{t('cards.tools')}</h4>
                <p className="mt-2 text-emerald-100/90">Docker, Git & GitHub, Postman, AWS, Google Cloud, Vercel</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="font-mono text-emerald-400">{t('about.education.cmd')}</p>
            <ul className="mt-3 space-y-2 text-emerald-100/90">
              <li>{t('about.education.1')}</li>
              <li>{t('about.education.2')}</li>
            </ul>
          </div>

          <div className="mt-10">
            <p className="font-mono text-emerald-400">{t('about.skills.cmd')}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="terminal-border rounded-md p-4">
                <h4 className="font-mono text-emerald-400 mb-3">{t('about.skills.programming')}</h4>
                <ul className="space-y-2 text-emerald-100/90">
                  <li>JavaScript, Python, PHP, Java</li>
                </ul>
              </div>
              <div className="terminal-border rounded-md p-4">
                <h4 className="font-mono text-emerald-400 mb-3">{t('about.skills.testing')}</h4>
                <ul className="space-y-2 text-emerald-100/90">
                  <li>PyTest, Pusher, Socket.io</li>
                </ul>
              </div>
              <div className="terminal-border rounded-md p-4">
                <h4 className="font-mono text-emerald-400 mb-3">{t('about.skills.vc')}</h4>
                <ul className="space-y-2 text-emerald-100/90">
                  <li>Git, GitHub</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="font-mono text-emerald-400">{t('about.resume.cmd')}</p>
            <div className="mt-3 flex flex-wrap gap-4">
              <a
                href="/CV/Cv.pdf"
                download="Mamuka_Khokerashvili_CV_Georgian.pdf"
                className="terminal-border rounded-md px-5 py-3 inline-flex items-center font-mono text-sm bg-emerald-500 text-black hover:bg-emerald-400"
              >
                <span className="mr-2">📄</span>
                {t('experience.cv.georgian')}
              </a>
              <a
                href="/CV/CvEng.pdf"
                download="Mamuka_Khokerashvili_CV_English.pdf"
                className="terminal-border rounded-md px-5 py-3 inline-flex items-center font-mono text-sm bg-emerald-500 text-black hover:bg-emerald-400"
              >
                <span className="mr-2">📄</span>
                {t('experience.cv.english')}
              </a>
            </div>
          </div>
        </section>
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
              href="https://linkedin.com/in/mamuka-khokerashvili"
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


