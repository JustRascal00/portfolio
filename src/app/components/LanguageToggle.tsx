'use client';

import { useI18n } from './i18n';

export default function LanguageToggle() {
  const { lang, toggle } = useI18n();
  return (
    <button
      onClick={toggle}
      className="terminal-border rounded px-3 py-1 font-mono text-xs hover:bg-emerald-500/10"
      aria-label={lang === 'ka' ? 'Switch to English' : 'გადართვა ქართულზე'}
      title={lang === 'ka' ? 'Switch to English' : 'გადართვა ქართულზე'}
    >
      {lang === 'ka' ? 'EN' : 'KA'}
    </button>
  );
}


