import Image from "next/image";

export default function AboutPage() {
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
            <a className="nav-link" href="/#projects">Projects</a>
            <a className="nav-link" href="/#experience">Experience</a>
            <a className="nav-link" href="/#contact">Contact</a>
            <div className="flex items-center gap-2">
              <span className="availability-dot" />
              <span className="text-emerald-300">Available</span>
            </div>
          </nav>
        </div>
        <div className="h-px w-full bg-emerald-700/40" />
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        <section className="terminal-border rounded-md p-6 md:p-8">
          <p className="font-mono text-emerald-400 mb-3 flex items-center gap-2">
            <span className="neon-text">&gt;_</span>
            <span className="text-emerald-400">mamuka@portfolio</span>
            <span className="text-emerald-700">:~$</span>
            <span>about</span>
          </p>

          <div className="grid md:grid-cols-[1fr_260px] gap-8 items-start">
            <div>
              <h1 className="font-mono text-xl text-emerald-400 mb-4">About Mamuka</h1>
              <p className="font-mono text-emerald-400 mb-2">$whoami</p>
              <p className="max-w-3xl text-emerald-100/90">
                Freelance/full‑stack developer with experience delivering React/Next.js frontends, Python/FastAPI and Laravel backends, and integrating real‑time messaging. Built and integrated APIs, worked across time zones with international teams, and focused on clean, efficient code and reliable results.
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
            <p className="font-mono text-emerald-400">$ cat /etc/specialties</p>
            <ul className="mt-3 list-disc pl-6 text-emerald-100/90 space-y-1">
              <li>Full-Stack Web Development (React, Next.js, Python, Laravel/PHP)</li>
              <li>REST API Development & Integration</li>
              <li>Database Design & Optimization (MySQL, PostgreSQL, MongoDB)</li>
              <li>CMS Development & Customization (Joomla)</li>
              <li>Debugging, Code Optimization & Maintenance</li>
              <li>Strong Problem-Solving & Result-Oriented Approach</li>
            </ul>
          </div>

          <div className="mt-10">
            <p className="font-mono text-emerald-400">$ cat /etc/tech-stack</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="terminal-border rounded-md p-4 text-center">
                <h4 className="font-mono text-emerald-400">Frontend</h4>
                <p className="mt-2 text-emerald-100/90">React, Next.js, Tailwind CSS, Three.js</p>
              </div>
              <div className="terminal-border rounded-md p-4 text-center">
                <h4 className="font-mono text-emerald-400">Backend</h4>
                <p className="mt-2 text-emerald-100/90">Laravel (PHP), Node.js/Express, Python/FastAPI</p>
              </div>
              <div className="terminal-border rounded-md p-4 text-center">
                <h4 className="font-mono text-emerald-400">Databases</h4>
                <p className="mt-2 text-emerald-100/90">MySQL, PostgreSQL, MongoDB, Redis, Firebase</p>
              </div>
              <div className="terminal-border rounded-md p-4 text-center">
                <h4 className="font-mono text-emerald-400">Tools & Cloud</h4>
                <p className="mt-2 text-emerald-100/90">Docker, Git & GitHub, Postman, AWS, Google Cloud, Vercel</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="font-mono text-emerald-400">$ ls ~/education</p>
            <ul className="mt-3 space-y-2 text-emerald-100/90">
              <li>Informatics and Management Systems — Georgian Technical University (2020–2024)</li>
              <li>Self‑Taught Developer — courses and real‑world projects</li>
            </ul>
          </div>

          <div className="mt-10">
            <p className="font-mono text-emerald-400">$ ls ~/skills</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="terminal-border rounded-md p-4">
                <h4 className="font-mono text-emerald-400 mb-3">Programming</h4>
                <ul className="space-y-2 text-emerald-100/90">
                  <li>JavaScript, Python, PHP, Java</li>
                </ul>
              </div>
              <div className="terminal-border rounded-md p-4">
                <h4 className="font-mono text-emerald-400 mb-3">Testing & Realtime</h4>
                <ul className="space-y-2 text-emerald-100/90">
                  <li>PyTest, Pusher, Socket.io</li>
                </ul>
              </div>
              <div className="terminal-border rounded-md p-4">
                <h4 className="font-mono text-emerald-400 mb-3">Version Control</h4>
                <ul className="space-y-2 text-emerald-100/90">
                  <li>Git, GitHub</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="font-mono text-emerald-400">$ ls ~/resume</p>
            <div className="mt-3">
              <a
                href="/resume.pdf"
                className="terminal-border rounded-md px-5 py-3 inline-flex items-center font-mono text-sm bg-emerald-500 text-black hover:bg-emerald-400"
              >
                Download Resume PDF
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


