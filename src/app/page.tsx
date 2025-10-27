'use client';
import Typewriter from "./components/Typewriter";
import Image from "next/image";
import HologramPortrait from "./components/HologramPortrait";
import PixelText from "./components/PixelText";
import LanguageToggle from "./components/LanguageToggle";
import { useI18n } from "./components/i18n";

export default function Home() {
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
            <a className="nav-link" href="#contact">{t('nav.contact')}</a>
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
        <section className="grid md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_380px] gap-10 items-stretch">
          <div className="terminal-border p-6 md:p-8 rounded-md">
            <div className="ascii-box terminal-border p-4 md:p-6 rounded-md overflow-auto bg-black/40">
              {/* Enhanced pixel text display */}
              <div className="flex flex-col items-center gap-2">
                <PixelText 
                  text="MAMUKA" 
                  pixelSize={6} 
                  gapSize={1} 
                  className="text-emerald-400 font-bold tracking-wider" 
                />
                <PixelText 
                  text="KHOKERASHVILI" 
                  pixelSize={6} 
                  gapSize={1} 
                  className="text-emerald-300 font-bold tracking-wider" 
                />
              </div>
              
              {/* Alternative: Single line version if you prefer */}
              {/* 
              <div className="text-center">
                <PixelText 
                  text="MAMUKA KHOKERASHVILI" 
                  pixelSize={5} 
                  gapSize={1} 
                  className="text-emerald-400 font-bold tracking-wide" 
                />
              </div>
              */}
            </div>
            <p className="mt-4 font-mono text-emerald-300">
              <span className="whitespace-nowrap">
                <Typewriter text={t('hero.title')} speedCps={34} cursorChar="|" />
              </span>
            </p>
            <div className="mt-8 font-mono">
              <p className="text-emerald-400">{t('hero.info.title')}</p>
              <div className="mt-2 grid gap-1 text-sm">
                <p className="text-emerald-100/90"><span className="text-emerald-400">{t('hero.info.name')}</span> Mamuka Khokerashvili</p>
                <p className="text-emerald-100/90"><span className="text-emerald-400">{t('hero.info.basedIn')}</span> Tbilisi, Georgia</p>
                <p className="text-emerald-100/90"><span className="text-emerald-400">{t('hero.info.profession')}</span> Full-Stack Developer</p>
                <p className="text-emerald-100/90"><span className="text-emerald-400">{t('hero.info.availability')}</span> {t('hero.info.availableNow')}</p>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="overflow-hidden rounded-lg relative h-[200px] md:h-[260px] lg:h-[320px] xl:h-[380px]">
              <HologramPortrait
                src="/selfie.jpeg"
                alt="Mamuka Khokerashvili"
                sampleSize={5}
                neonIntensity={0.95}
                cycleMs={5600}
                noiseAmount={0.12}
                mode="hybrid"
                overlays={false}
                className="absolute inset-0"
              />
            </div>
          </div>
        </section>
        <section className="mt-16">
          <h2 className="font-mono text-xl text-emerald-400 mb-4">{t('welcome.heading')}</h2>
          <p className="max-w-3xl text-emerald-100/90">
            {t('welcome.body')}
          </p>
        </section>
        <section id="projects" className="mt-16">
          <div className="terminal-border rounded-md p-6 md:p-8">
            <p className="font-mono text-emerald-400 mb-3">{t('projects.featured')}</p>
            <h3 className="text-2xl md:text-3xl font-mono neon-text">{t('projects.title')}</h3>
            <div className="mt-3 flex gap-2 font-mono text-xs flex-wrap">
              {[
                t('projects.tags.ai'),
                t('projects.tags.realtime'),
                t('projects.tags.chat'),
                t('projects.tags.fullstack'),
              ].map((tag) => (
                <span key={tag} className="terminal-border rounded px-2 py-1 text-emerald-300">{tag}</span>
              ))}
            </div>
            <p className="mt-4 max-w-3xl text-emerald-100/90">
              {t('projects.summary')}
            </p>
            <ul className="mt-4 list-disc pl-5 text-emerald-100/90">
              <li>{t('projects.bullet.ai')}</li>
              <li>{t('projects.bullet.realtime')}</li>
              <li>{t('projects.bullet.responsive')}</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="terminal-border rounded-md px-5 py-3 font-mono text-sm bg-emerald-500 text-black hover:bg-emerald-400"
              >
                {t('projects.cta.live')}
              </a>
              <a
                href="https://github.com/JustRascal00/CHATAI"
                className="terminal-border rounded-md px-5 py-3 font-mono text-sm hover:bg-emerald-500/10"
              >
                {t('projects.cta.code')}
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