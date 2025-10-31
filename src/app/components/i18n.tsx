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
    ka: 'დეველოპერი 2+ წლიანი გამოცდილებით, ვებაპლიკაციების და API-ების შექმნაში. ვფლობ React, Next.js, Laravel და FastAPI ტექნოლოგიებს. მაქვს მტკიცე ცოდნა მონაცემთა ბაზებში (MySQL, PostgreSQL, MongoDB) და შედეგზე ორიენტირებული მიდგომა.',
    en: 'developer with 2+ years of experience in building web applications and APIs. Proficient in React, Next.js, Laravel, and FastAPI, with strong knowledge of databases (MySQL, PostgreSQL, MongoDB) and a results-oriented approach.',
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

  // Projects page
  'projects.selected': { ka: 'რჩეული პროექტები', en: 'Selected Projects' },
  'projects.intro': { ka: 'ვებ-დეველოპმენტის, AI-ს და ფულ-სტექ აპლიკაციების კურირებული კოლექცია. რეალური პროექტების, თანამედროვე ვებ-გადაწყვეტილებების და ინოვაციური ტექნოლოგიების ჩვენება 2+ წლის გამოცდილებით.', en: 'A curated collection of web development, AI, and full-stack applications. Showcasing real-world projects, modern web solutions, and innovative technologies built over 2+ years.' },
  'projects.techStack': { ka: 'ტექნოლოგიები', en: 'Tech Stack' },
  'projects.viewProject': { ka: 'პროექტის ნახვა', en: 'View Project' },
  'projects.github': { ka: 'GitHub', en: 'GitHub' },
  'projects.moreProjects': { ka: 'სხვა პროექტები', en: 'More Projects' },
  'projects.moreProjectsDesc': { ka: 'დამატებითი პროექტების და კოდის ნახვა GitHub-ზე.', en: 'Explore additional projects and source code on GitHub.' },
  'projects.viewAll': { ka: 'ყველა პროექტის ნახვა', en: 'View All Projects' },
  'projects.tags.portfolio': { ka: 'პორტფოლიო', en: 'Portfolio' },
  'projects.portfolio.title': { ka: 'დეველოპერის პორტფოლიო', en: 'Developer Portfolio' },
  'projects.portfolio.description': { ka: 'თანამედროვე და ინტერაქტიული პორტფოლიო ვებსაიტი ჰოლოგრაფიული ეფექტებით, ანიმაციებით და მრავალენოვანი მხარდაჭერით. ოპტიმიზირებული მობილური და დესკტოპ გამოცდილებისთვის.', en: 'Modern and interactive portfolio website with holographic effects, animations, and multi-language support. Optimized for mobile and desktop experience.' },

  // All 8 projects
  'projects.chatApp1.title': { ka: 'ჩატის აპლიკაცია #1', en: 'Chat Application #1' },
  'projects.chatApp1.description': { ka: 'ჩატის აპლიკაცია Next.js-ით ფრონტენდისთვის და MongoDB-ით ბექენდისთვის. ინტეგრირებულია React დინამიური ინტერფეისისთვის და Pusher რეალური დროის მესიჯინგისთვის.', en: 'This chat application is built using Next.js for the front end and MongoDB for the back end. It incorporates React for a dynamic user interface and Pusher for real-time messaging capabilities.' },

  'projects.chatRoom.title': { ka: 'ჩატის ოთახის აპლიკაცია', en: 'Chat Room Application' },
  'projects.chatRoom.description': { ka: 'მარტივი ჩატის ოთახის აპლიკაცია PHP-ით ბექენდისთვის და SQL-ით ბაზის მართვისთვის. მომხმარებლებს შეუძლიათ ჩატის ოთახებში შესვლა, მესიჯების გაგზავნა და ისტორიის ნახვა.', en: 'This project is a simple chat room application utilizing PHP for the backend and SQL for database management. Users can join chat rooms, send messages, and view message history.' },

  'projects.whatsappClone.title': { ka: 'WhatsApp-ის კლონი', en: 'WhatsApp Clone' },
  'projects.whatsappClone.description': { ka: 'WhatsApp-ის კლონი Next.js-ით ფრონტენდისთვის და PostgreSQL-ით ბაზის მართვისთვის. Socket.io რეალური დროის კომუნიკაციისთვის, ხმისა და ვიდეო ზარების მხარდაჭერით.', en: 'A WhatsApp clone developed using Next.js for the frontend and PostgreSQL for database management. Features Socket.io for real-time communication, supporting voice and video calls.' },

  'projects.projectManagement.title': { ka: 'პროექტების მართვის აპლიკაცია', en: 'Project Management App' },
  'projects.projectManagement.description': { ka: 'ფულ-სტექ პროექტების მართვის აპლიკაცია Laravel-ით (ბექენდი) და React-ით (ფრონტენდი). მოიცავს დავალებების მართვას და გუნდურ კოლაბორაციას.', en: 'Full-stack project management application using Laravel (backend) and React (frontend). Includes features like task management and team collaboration.' },

  'projects.portfolio3d.title': { ka: '3D პორტფოლიო', en: '3D Portfolio' },
  'projects.portfolio3d.description': { ka: '3D ვებ-დეველოპერის პორტფოლიო React-ით, Three.js-ით და გაფართოებული 3D გრაფიკით ინტერაქტიული გამოცდილებისთვის.', en: 'A 3D web developer portfolio built using React, Three.js, and advanced 3D graphics for an interactive experience.' },

  'projects.webExplain.title': { ka: 'WebExplain', en: 'WebExplain' },
  'projects.webExplain.description': { ka: 'ჭკვიანი ჩატის აპლიკაცია, რომელიც ავტომატურად აანალიზებს ვებ-გვერდებს და უზრუნველყოფს კონტექსტულ პასუხებს RAG (Retrieval-Augmented Generation) ტექნოლოგიით და LLM ინტეგრაციით.', en: 'An intelligent chat application that automatically analyzes web pages and provides contextual responses using RAG (Retrieval-Augmented Generation) technology and LLM integration.' },

  'projects.emotionDetection.title': { ka: 'ემოციების ამოცნობის AI', en: 'Emotion Detection AI' },
  'projects.emotionDetection.description': { ka: 'ახალი თაობის AI ვებ-აპლიკაცია, რომელიც განკუთვნილია ემოციების ამოცნობისა და ანალიზისთვის სურათებიდან, ვიდეოებიდან და YouTube-ის ლაივ სტრიმებიდან.', en: 'A cutting-edge AI web application designed to detect and analyze emotions from images, videos, and live YouTube streams.' },

  // Additional tags
  'projects.tags.management': { ka: 'მართვა', en: 'Management' },

  // About: lists and section titles
  'about.specialties.1': { ka: 'ფულ-სტექ ვებ-დეველოპმენტი (React, Next.js, Python, Laravel/PHP)', en: 'Full-Stack Web Development (React, Next.js, Python, Laravel/PHP)' },
  'about.specialties.2': { ka: 'REST API-ის შექმნა და ინტეგრაცია', en: 'REST API Development & Integration' },
  'about.specialties.3': { ka: 'მონაცემთა ბაზების დიზაინი და ოპტიმიზაცია (MySQL, PostgreSQL, MongoDB)', en: 'Database Design & Optimization (MySQL, PostgreSQL, MongoDB)' },
  'about.specialties.4': { ka: 'CMS სისტემების შექმნა და კასტომიზაცია (Joomla)', en: 'CMS Development & Customization (Joomla)' },
  'about.specialties.5': { ka: 'დებაგინგი, კოდის ოპტიმიზაცია და მხარდაჭერა', en: 'Debugging, Code Optimization & Maintenance' },
  'about.specialties.6': { ka: 'პრობლემების გადაჭრის უნარი და შედეგზე ორიენტირებული მიდგომა', en: 'Strong Problem-Solving & Result-Oriented Approach' },

  'about.education.1': { ka: 'ინფორმატიკისა და მართვის სისტემები — საქართველოს ტექნიკური უნივერსიტეტი (2020–2024)', en: 'Informatics and Management Systems — Georgian Technical University (2020–2024)' },
  'about.education.2': { ka: 'თვითსწავლება — კურსები და რეალური პროექტები', en: 'Self‑Taught Developer — courses and real‑world projects' },

  'about.skills.programming': { ka: 'პროგრამირება', en: 'Programming' },
  'about.skills.testing': { ka: 'ტესტირება და რეალთაიმი', en: 'Testing & Realtime' },
  'about.skills.vc': { ka: 'ვერსიის კონტროლი', en: 'Version Control' },

  // Experience page
  'experience.title': { ka: 'სამუშაო გამოცდილება', en: 'Work Experience' },
  'experience.subtitle': { ka: 'ბოლო როლები და შერჩეული მიღწევები.', en: 'Recent roles and selected achievements.' },
  'experience.technicalExpertise.title': { ka: 'ტექნიკური ექსპერტიზა', en: 'Technical Expertise' },
  'experience.technicalExpertise.frontend': { ka: 'ფრონტენდ ტექნოლოგიები', en: 'Frontend Technologies' },
  'experience.technicalExpertise.backend': { ka: 'ბექენდ ტექნოლოგიები', en: 'Backend Technologies' },

  // Experience entries
  'experience.freelance.title': { ka: 'ფრილანს დეველოპერი', en: 'Freelance Developer' },
  'experience.freelance.company': { ka: 'Upwork/Freelancer.com', en: 'Upwork/Freelancer.com' },
  'experience.freelance.location': { ka: 'დისტანციურად', en: 'Remote' },
  'experience.freelance.period': { ka: '2022 | 2023', en: '2022 | 2023' },
  'experience.freelance.achievement1': { ka: 'შევქმენი სრულფასოვანი ვებ პროექტები React-ის, Next.js-ის, Python-ის და Laravel-ის გამოყენებით, კლიენტებისათვის', en: 'Developed full-stack solutions using React, Next.js, Python and Laravel(PHP)' },
  'experience.freelance.achievement2': { ka: 'დავაპროგრამე და დავინტეგრე API-ები Python-ისა და PHP-ის გამოყენებით ', en: 'Built and integrated APIs using Python and PHP, ensuring secure and efficient data exchange' },
  'experience.freelance.achievement3': { ka: 'წარმატებით შევასრულე და კლიენტთა კმაყოფილებით მივაწოდე პროექტები', en: 'Delivered projects on time with consistent client satisfaction' },
  'experience.freelance.achievement4': { ka: 'ვითანამშრომლე საერთაშორისო კლიენტებთან სხვადასხვა დროის ზონაში', en: 'Collaborated with international clients across multiple time zones' },

  'experience.backend.title': { ka: 'ბექენდ დეველოპერი', en: 'Backend Developer' },
  'experience.backend.company': { ka: 'Money4you.financial', en: 'Money4you.financial' },
  'experience.backend.location': { ka: 'საქართველო, თბილისი', en: 'Georgia, Tbilisi' },
  'experience.backend.period': { ka: '2023 | 2024', en: '2023 | 2024' },
  'experience.backend.achievement1': { ka: 'ვმართავდი პროექტებს და უზრუნველვყოფდი მათ წარმატებულ შესრულებას Laravel-ის გამოყენებით', en: 'Successful project management using Laravel methodologies' },
  'experience.backend.achievement2': { ka: 'SQL და MySQL მონაცემთა ბაზებთან მუშაობა', en: 'Strong experience with SQL and MySQL databases' },
  'experience.backend.achievement3': { ka: 'ვზრუნავდი პროგრამული უზრუნველყოფის სრული ფუნქციონირების უზრუნველყოფაზე   ', en: 'Full functionality of the software to make it comprehensive development' },
  'experience.backend.achievement4': { ka: 'შედეგზე ორიენტირებული მიდგომა მუშაობაში', en: 'A result-oriented approach to work' },
  'experience.backend.achievement5': { ka: 'API-ების აშენებისა და ინტეგრაციის გამოცდილება', en: 'Experience building and integrating APIs' },
  'experience.backend.achievement6': { ka: 'გუნდურ მუშაობის უნარი', en: 'Ability to work as a team' },
  'experience.backend.achievement8': { ka: 'არსებული კოდის ბაზების დებაგინგის, ოპტიმიზაციისა და მოვლის უნარი', en: 'Skilled in debugging, optimizing, and maintaining existing codebases' },
  'experience.backend.achievement9': { ka: 'მაღალი კოდის ხარისხისა და ეფექტურობის სტანდარტების შენარჩუნებით შედეგების მიღწევაზე ფოკუსირება', en: 'Focused on achieving results while maintaining high standards of code quality and efficiency' },
  'experience.backend.achievement10': { ka: 'Laravel-თან მუშაობის პარალელურად, ვმართავდი Joomla-ზე დაფუძნებულ CMS-ს. აპლიკაცია შეიქმნა ორივე ჩარჩოს გამოყენებით,რისგამოც Laravel-ის ფუნქციონალი სრულად უნდა ყოფილიყო თავსებადი Joomla-ს სტრუქტურასთან და მონაცემთა მოდელებთან', en: 'While working with Laravel, I also managed and extended a Joomla-based CMS. The application was built using both frameworks, so all Laravel features had to be fully compatible with Joomla\'s structure and data models' },

  'experience.database.title': { ka: 'მონაცემთა ბაზის ოპერატორი', en: 'Database Operator' },
  'experience.database.company': { ka: 'IT Service Georgia', en: 'IT Service Georgia' },
  'experience.database.location': { ka: 'საქართველო, თბილისი', en: 'Georgia, Tbilisi' },
  'experience.database.period': { ka: '2024/დღემდე', en: '2024/Present' },
  'experience.database.achievement1': { ka: 'ვაფიქსირებ მონაცემებს ბაზაში სწორად და ზუსტად ', en: 'Correctly recording data in the database' },
  'experience.database.achievement2': { ka: 'მომხმარებლებს ვაწვდი ინფორმაციას მომსახურებებსა და პროდუქტებზე', en: 'Providing information to customers about services/products' },
  'experience.database.achievement3': { ka: 'განაცხადებისა და შეკვეთების მიღება/ჩაწერა', en: 'Receiving/recording applications and orders' },
  'experience.database.achievement4': { ka: 'პრობლემების აღმოჩენის შემთხვევაში ვწყვეტ და ვგზავნი შესაბამის დეპარტამენტთან', en: 'Solving problems and forwarding them to the appropriate department' },

  // CV Download
  'experience.cv.download': { ka: 'CV-ის ჩამოტვირთვა', en: 'Download CV' },
  'experience.cv.georgian': { ka: 'ქართული CV', en: 'Georgian CV' },
  'experience.cv.english': { ka: 'ინგლისური CV', en: 'English CV' },

  // Social Links
  'footer.github': { ka: 'GitHub', en: 'GitHub' },
  'footer.linkedin': { ka: 'LinkedIn', en: 'LinkedIn' },

  // Contact page
  'contact.title': { ka: 'კონტაქტის ინფორმაცია', en: 'Contact Information' },
  'contact.description': {
    ka: 'მოგსურთ თქვენი ვებ აპლიკაცია შევქმნა ან ციფრული პროდუქტი გაიზარდოს? დავეხმარები სტარტაპებსა და გუნდებს იდეების წარმოადგენაში წარმოებისთვის მზად გადაწყვეტილებებად. ფულ-სტექ აპლიკაციებიდან AI-ით გაძლიერებულ ინსტრუმენტებამდე, მოვაქვს ღრმა ექსპერტიზა და მშენებლის მენტალიტეტი ყველა კოლაბორაციაში.',
    en: 'Looking to bring your web application to life or scale your digital product? I help startups and teams turn ideas into production-ready solutions. From full-stack applications to AI-powered tools, I bring deep expertise and a builder&apos;s mindset to every collaboration.'
  },
  'contact.directContact': { ka: 'პირდაპირი კონტაქტი', en: 'Direct Contact' },
  'contact.email': { ka: 'ელფოსტა', en: 'email' },
  'contact.phone': { ka: 'ტელეფონი', en: 'phone' },
  'contact.socialLinks': { ka: 'სოციალური ბმულები', en: 'Social Links' },
  'contact.github': { ka: 'GitHub', en: 'github' },
  'contact.linkedin': { ka: 'LinkedIn', en: 'linkedin' },
  'contact.form.title': { ka: 'მოგვწერე!', en: 'Say hello!' },
  'contact.form.name': { ka: 'სახელი', en: 'Name' },
  'contact.form.namePlaceholder': { ka: 'თქვენი სახელი', en: 'Your Name' },
  'contact.form.email': { ka: 'ელფოსტა', en: 'Email' },
  'contact.form.emailPlaceholder': { ka: 'your@email.com', en: 'your@email.com' },
  'contact.form.message': { ka: 'მესიჯი', en: 'Message' },
  'contact.form.messagePlaceholder': { ka: 'შეიყვანეთ თქვენი მესიჯი აქ...', en: 'Enter your message here...' },
  'contact.form.sending': { ka: 'გაგზავნა...', en: 'Sending...' },
  'contact.form.submit': { ka: 'გაგზავნა', en: 'Submit' },
  'contact.form.success': { ka: '✓ მესიჯი წარმატებით გაიგზავნა! მალე დაგიკავშირდები.', en: '✓ Message sent successfully! I&apos;ll get back to you soon.' },
  'contact.form.error': { ka: '✗ მესიჯის გაგზავნა ვერ მოხერხდა. გთხოვთ სცადოთ თავიდან ან მიწეროთ პირდაპირ.', en: '✗ Failed to send message. Please try again or email me directly.' },
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


