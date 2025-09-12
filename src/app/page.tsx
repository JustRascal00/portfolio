import Typewriter from "./components/Typewriter";
import Image from "next/image";
import HologramPortrait from "./components/HologramPortrait";
import PixelText from "./components/PixelText";

export default function Home() {
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
            <a className="nav-link" href="/about">About</a>
            <a className="nav-link" href="#projects">Projects</a>
            <a className="nav-link" href="#experience">Experience</a>
            <a className="nav-link" href="#contact">Contact</a>
            <div className="flex items-center gap-2">
              <span className="availability-dot" />
              <span className="text-emerald-300">Available</span>
            </div>
          </nav>
        </div>
        <div className="h-px w-full bg-emerald-700/40" />
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 md:py-16">
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
                <Typewriter text="Developer's Portfolio" speedCps={34} cursorChar="|" />
              </span>
            </p>
            <div className="mt-8 font-mono">
              <p className="text-emerald-400">Portfolio Information:</p>
              <div className="mt-2 grid gap-1 text-sm">
                <p className="text-emerald-100/90"><span className="text-emerald-400">Name:</span> Mamuka Khokerashvili</p>
                <p className="text-emerald-100/90"><span className="text-emerald-400">Based in:</span> Tbilisi, Georgia</p>
                <p className="text-emerald-100/90"><span className="text-emerald-400">Profession:</span> Full-Stack Developer</p>
                <p className="text-emerald-100/90"><span className="text-emerald-400">Availability:</span> Available Now</p>
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
        <section id="tech-stack" className="mt-16">
          <div className="terminal-border rounded-md p-6 md:p-8">
            <p className="font-mono text-emerald-400">$ cat /etc/tech-stack</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="terminal-border rounded-md p-6 text-center">
                <div className="text-3xl mb-3">🧩</div>
                <h4 className="font-mono text-emerald-400">Frontend</h4>
                <p className="mt-2 text-emerald-100/90">React, Next.js, Tailwind CSS, Three.js</p>
              </div>
              <div className="terminal-border rounded-md p-6 text-center">
                <div className="text-3xl mb-3">⚙️</div>
                <h4 className="font-mono text-emerald-400">Backend</h4>
                <p className="mt-2 text-emerald-100/90">Laravel (PHP), Node.js/Express, Python/FastAPI</p>
              </div>
              <div className="terminal-border rounded-md p-6 text-center">
                <div className="text-3xl mb-3">🗄️</div>
                <h4 className="font-mono text-emerald-400">Databases</h4>
                <p className="mt-2 text-emerald-100/90">MySQL, PostgreSQL, MongoDB, Redis, Firebase</p>
              </div>
              <div className="terminal-border rounded-md p-6 text-center">
                <div className="text-3xl mb-3">☁️</div>
                <h4 className="font-mono text-emerald-400">Tools & Cloud</h4>
                <p className="mt-2 text-emerald-100/90">Docker, Git & GitHub, Postman, AWS, Google Cloud, Vercel</p>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-16">
          <h2 className="font-mono text-xl text-emerald-400 mb-4">Welcome to Mamuka Khokerashvili's Developer Portfolio!</h2>
          <p className="max-w-3xl text-emerald-100/90">
          Full-stack developer passionate about building dynamic and scalable web apps using React, Next.js, Python, and Laravel — turning complex ideas into clean, efficient, and user-friendly solutions.
          </p>
        </section>
        <section id="projects" className="mt-16">
          <div className="terminal-border rounded-md p-6 md:p-8">
            <p className="font-mono text-emerald-400 mb-3">Featured Project:</p>
            <h3 className="text-2xl md:text-3xl font-mono neon-text">Chat Application with AI</h3>
            <div className="mt-3 flex gap-2 font-mono text-xs flex-wrap">
              {["AI","Real-time","Chat","Full‑stack"].map(t => (
                <span key={t} className="terminal-border rounded px-2 py-1 text-emerald-300">{t}</span>
              ))}
            </div>
            <p className="mt-4 max-w-3xl text-emerald-100/90">
              Full-stack chat application integrating Google Gemini AI for advanced conversational capabilities with real-time messaging.
            </p>
            <ul className="mt-4 list-disc pl-5 text-emerald-100/90">
              <li>AI‑Powered Chat: Integrated Google Gemini AI for smart responses.</li>
              <li>Real‑time Messaging: Instant messaging using Express and MongoDB.</li>
              <li>Responsive Design: Optimized for mobile and desktop.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="terminal-border rounded-md px-5 py-3 font-mono text-sm bg-emerald-500 text-black hover:bg-emerald-400"
              >
                ↗ Live Demo
              </a>
              <a
                href="https://github.com/JustRascal00/CHATAI"
                className="terminal-border rounded-md px-5 py-3 font-mono text-sm hover:bg-emerald-500/10"
              >
                {'</>'} Code
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-16 border-t border-emerald-900/40">
        <div className="max-w-6xl mx-auto px-4 py-8 flex items-center justify-between text-sm font-mono">
          <span>© Mamuka Khokerashvili | 2025</span>
          <span className="text-emerald-400">v20.07.2025</span>
        </div>
      </footer>
    </div>
  );
}