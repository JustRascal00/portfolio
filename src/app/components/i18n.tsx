'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Language = 'ka' | 'en';

type Translations = Record<string, Record<Language, string>>;

const translations: Translations = {
  'nav.about': { ka: 'ჩემ შესახებ', en: 'About' },
  'nav.projects': { ka: 'პროექტები', en: 'Projects' },
  'nav.experience': { ka: 'გამოცდილება', en: 'Experience' },
  'nav.contact': { ka: 'კონტაქტი', en: 'Contact' },
  'nav.available': { ka: 'ხელმისაწვდომი', en: 'Available' },

  'hero.title': { ka: "დეველოპერის პორტფოლიო", en: "Developer's Portfolio" },
  'hero.info.title': { ka: 'პორტფოლიოს ინფორმაცია:', en: 'Portfolio Information:' },
  'hero.info.name': { ka: 'სახელი:', en: 'Name:' },
  'hero.info.basedIn': { ka: 'ქალაქი:', en: 'Based in:' },
  'hero.info.profession': { ka: 'პროფესია:', en: 'Profession:' },
  'hero.info.availability': { ka: 'ხელმისაწვდომობა:', en: 'Availability:' },
  'hero.info.availableNow': { ka: 'ახლა ხელმისაწვდომი', en: 'Available Now' },

  'welcome.heading': {
    ka: 'კეთილი იყოს თქვენი მობრძანება მამუკა ხოხერაშვილის პორტფოლიოში!',
    en: "Welcome to Mamuka Khokerashvili's Developer Portfolio!",
  },
  'welcome.body': {
    ka: 'ფულ-სტექ დეველოპერი, რომელსაც უყვარს ვებ აპლიკაციების შექმნა React‑ით, Next.js‑ით, Python‑ით და Laravel‑ით — რთული იდეების სუფთა, ეფექტურ და მომხმარებელზე მორგებულ გადაწყვეტილებებად გადაქცევა.',
    en: 'Full-stack developer passionate about building dynamic and scalable web apps using React, Next.js, Python, and Laravel — turning complex ideas into clean, efficient, and user-friendly solutions.',
  },

  'about.cmd': { ka: 'about', en: 'about' },
  'about.title': { ka: 'ჩემ შესახებ', en: 'About' },
  'about.whoami': { ka: '$whoami', en: '$whoami' },
  'about.whoami.body': {
    ka: 'ფულსტექ დეველოპერი 2+ წლიანი პროფესიული გამოცდილებით მასშტაბირებადი ვებაპლიკაციებისა და API-ების შექმნაში. აქვს დამტკიცებული გამოცდილება სრულფასოვანი გადაწყვეტილებების მიწოდებაში თანამედროვე JavaScript ჩარჩოებით (React, Next.js), სერვერულ ტექნოლოგიებით (Python/FastAPI, PHP/Laravel) და მძლავრ მონაცემთა ბაზების სისტემებით (MySQL, PostgreSQL, MongoDB).',
    en: 'full-stack developer with 2+ years of professional experience building scalable web applications and APIs. Proven track record delivering end-to-end solutions using modern JavaScript frameworks (React, Next.js), backend technologies (Python/FastAPI, PHP/Laravel), and robust database systems (MySQL, PostgreSQL, MongoDB).',
  },
  'about.specialties.cmd': { ka: '$ cat /etc/specialties', en: '$ cat /etc/specialties' },
  'about.techStack.cmd': { ka: '$ cat /etc/tech-stack', en: '$ cat /etc/tech-stack' },
  'about.education.cmd': { ka: '$ ls ~/education', en: '$ ls ~/education' },
  'about.skills.cmd': { ka: '$ ls ~/skills', en: '$ ls ~/skills' },
  'about.resume.cmd': { ka: '$ ls ~/resume', en: '$ ls ~/resume' },
  'about.resume.download': { ka: 'რეზიუმეს PDF ჩამოტვირთვა', en: 'Download Resume PDF' },

  'cards.frontend': { ka: 'ფრონტენდი', en: 'Frontend' },
  'cards.backend': { ka: 'ბექენდი', en: 'Backend' },
  'cards.databases': { ka: 'ბაზები', en: 'Databases' },
  'cards.tools': { ka: 'ინსტრუმენტები და ღრუბელი', en: 'Tools & Cloud' },

  // Home: Featured Project block
  'projects.featured': { ka: 'რჩეული პროექტი:', en: 'Featured Project:' },
  'projects.title': { ka: 'ჩატი ხელოვნური ინტელექტით', en: 'Chat Application with AI' },
  'projects.tags.ai': { ka: 'AI', en: 'AI' },
  'projects.tags.realtime': { ka: 'რეალთაიმი', en: 'Real-time' },
  'projects.tags.chat': { ka: 'ჩატი', en: 'Chat' },
  'projects.tags.fullstack': { ka: 'ფულსტექ', en: 'Full‑stack' },
  'projects.summary': {
    ka: 'ფულსტექ ჩატის აპლიკაცია Google Gemini AI-ს ინტეგრაციით და რეალურ დროში მესიჯინგით.',
    en: 'Full-stack chat application integrating Google Gemini AI for advanced conversational capabilities with real-time messaging.',
  },
  'projects.bullet.ai': { ka: 'AI-ით გაძლიერებული ჩატი: ინტეგრირებული Gemini AI ჭკვიანი პასუხებისთვის.', en: 'AI‑Powered Chat: Integrated Google Gemini AI for smart responses.' },
  'projects.bullet.realtime': { ka: 'რეალთაიმ მესიჯინგი: მყისიერი კომუნიკაცია Express და MongoDB-ით.', en: 'Real‑time Messaging: Instant messaging using Express and MongoDB.' },
  'projects.bullet.responsive': { ka: 'რეზპონსიული დიზაინი: ოპტიმიზირებული მობილურსა და დესკტოპზე.', en: 'Responsive Design: Optimized for mobile and desktop.' },
  'projects.cta.live': { ka: '↗ ლაივი', en: '↗ Live Demo' },
  'projects.cta.code': { ka: '</> კოდი', en: '</> Code' },

  // About: lists and section titles
  'about.specialties.1': { ka: 'ფულ-სტექ ვებ-დეველოპმენტი (React, Next.js, Python, Laravel/PHP)', en: 'Full-Stack Web Development (React, Next.js, Python, Laravel/PHP)' },
  'about.specialties.2': { ka: 'REST API-ის შექმნა და ინტეგრაცია', en: 'REST API Development & Integration' },
  'about.specialties.3': { ka: 'მონაცემთა ბაზების დიზაინი და ოპტიმიზაცია (MySQL, PostgreSQL, MongoDB)', en: 'Database Design & Optimization (MySQL, PostgreSQL, MongoDB)' },
  'about.specialties.4': { ka: 'CMS სისტემების შექმნა და კასტომიზაცია (Joomla)', en: 'CMS Development & Customization (Joomla)' },
  'about.specialties.5': { ka: 'დესბაგინგი, კოდის ოპტიმიზაცია და მხარდაჭერა', en: 'Debugging, Code Optimization & Maintenance' },
  'about.specialties.6': { ka: 'ძლიერი समस्यების გადაჭრა და შედეგზე ორიენტირებულობა', en: 'Strong Problem-Solving & Result-Oriented Approach' },

  'about.education.1': { ka: 'ინფორმატიკისა და მართვის სისტემები — საქართველოს ტექნიკური უნივერსიტეტი (2020–2024)', en: 'Informatics and Management Systems — Georgian Technical University (2020–2024)' },
  'about.education.2': { ka: 'თვითსწავლება — კურსები და რეალური პროექტები', en: 'Self‑Taught Developer — courses and real‑world projects' },

  'about.skills.programming': { ka: 'პროგრამირება', en: 'Programming' },
  'about.skills.testing': { ka: 'ტესტირება და რეალთაიმი', en: 'Testing & Realtime' },
  'about.skills.vc': { ka: 'ვერსიის კონტროლი', en: 'Version Control' },
};

type I18nContextType = {
  lang: Language;
  t: (key: keyof typeof translations) => string;
  toggle: () => void;
  setLang: (l: Language) => void;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('ka');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? (localStorage.getItem('lang') as Language | null) : null;
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', lang);
      try {
        document.documentElement.lang = lang;
      } catch {}
    }
  }, [lang]);

  const t = useMemo(() => {
    return (key: keyof typeof translations) => translations[key]?.[lang] ?? translations[key]?.en ?? '';
  }, [lang]);

  const toggle = () => setLang((prev) => (prev === 'ka' ? 'en' : 'ka'));

  const value = useMemo(() => ({ lang, t, toggle, setLang }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}


