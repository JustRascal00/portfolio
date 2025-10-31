'use client';
import Link from "next/link";
import LanguageToggle from "../components/LanguageToggle";
import { useI18n } from "../components/i18n";
import { useState } from "react";
import emailjs from '@emailjs/browser';

export default function Contact() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'mamuka.khokerashvili00@gmail.com'
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
            <a className="nav-link" href="/projects">{t('nav.projects')}</a>
            <a className="nav-link" href="/experience">{t('nav.experience')}</a>
            <a className="nav-link bg-emerald-500 text-black px-3 py-1 rounded" href="/contact">{t('nav.contact')}</a>
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
          <span className="text-emerald-700">mamuka.dev@portfolio:~$</span> contact
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Section - Contact Information */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-mono font-bold text-emerald-400 mb-6">
                Contact Information
                <span className="animate-pulse">|</span>
              </h1>
              <p className="text-emerald-100/90 leading-relaxed font-mono text-sm">
                Looking to bring your web application to life or scale your digital product? I help startups and teams turn ideas into production-ready solutions. From full-stack applications to AI-powered tools, I bring deep expertise and a builder&apos;s mindset to every collaboration.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-mono font-bold text-emerald-400 mb-4">Direct Contact</h2>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700">$</span>
                  <span className="text-emerald-300">email</span>
                  <span className="text-emerald-400">mamuka.khokerashvili00@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700">$</span>
                  <span className="text-emerald-300">phone</span>
                  <span className="text-emerald-400">+995 551 21 55 57</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-mono font-bold text-emerald-400 mb-4">Social Links</h2>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700">$</span>
                  <span className="text-emerald-300">github</span>
                  <a href="https://github.com/JustRascal00" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    github.com/JustRascal00
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700">$</span>
                  <span className="text-emerald-300">linkedin</span>
                  <a href="https://linkedin.com/in/mamuka-khokerashvili" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    linkedin.com/in/mamuka-khokerashvili
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="terminal-border rounded-lg p-8 bg-black/20">
            <h2 className="text-2xl font-mono font-bold text-emerald-400 mb-8">Say hello!</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-emerald-400 font-mono text-sm mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-black/60 border border-emerald-400 rounded-md text-emerald-100 font-mono text-sm placeholder-emerald-500/60 focus:border-emerald-300 focus:outline-none focus:ring-1 focus:ring-emerald-300"
                  required
                />
              </div>

              <div>
                <label className="block text-emerald-400 font-mono text-sm mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-black/60 border border-emerald-400 rounded-md text-emerald-100 font-mono text-sm placeholder-emerald-500/60 focus:border-emerald-300 focus:outline-none focus:ring-1 focus:ring-emerald-300"
                  required
                />
              </div>

              <div>
                <label className="block text-emerald-400 font-mono text-sm mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message here..."
                  rows={6}
                  className="w-full px-4 py-3 bg-black/60 border border-emerald-400 rounded-md text-emerald-100 font-mono text-sm placeholder-emerald-500/60 focus:border-emerald-300 focus:outline-none focus:ring-1 focus:ring-emerald-300 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-500 text-white font-mono font-bold py-3 px-6 rounded-md hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
              
              {submitStatus === 'success' && (
                <div className="text-emerald-400 font-mono text-sm text-center">
                  ✓ Message sent successfully! I&apos;ll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="text-red-400 font-mono text-sm text-center">
                  ✗ Failed to send message. Please try again or email me directly.
                </div>
              )}
            </form>
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
