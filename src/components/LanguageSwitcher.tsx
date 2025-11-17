'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const LANGUAGES = [
  { code: 'fr', label: 'Français', labelShort: 'FR' },
  { code: 'en', label: 'English', labelShort: 'EN' },
  { code: 'de', label: 'Deutsch', labelShort: 'DE' },
];

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.startsWith('/fr') ? 'fr' : pathname.startsWith('/de') ? 'de' : 'en';
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const switchLocale = (newLocale: 'fr' | 'en' | 'de') => {
    const newPath = pathname.replace(/^\/(fr|en|de)/, `/${newLocale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  const currentLang = LANGUAGES.find(l => l.code === currentLocale)!;

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        className="flex items-center gap-1.5 bg-transparent text-white px-3 py-2 rounded-full hover:bg-white/10 transition-colors duration-200 focus:outline-none text-sm cursor-pointer"
        onClick={() => setIsOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span className="font-medium">{currentLang.labelShort}</span>
        <svg 
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-black/70 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[60]">
          {LANGUAGES.map((lang, index) => (
            <button
              key={lang.code}
              onClick={() => switchLocale(lang.code as 'fr' | 'en' | 'de')}
              className={`flex items-center justify-between w-full px-4 py-2.5 text-sm transition-colors backdrop-blur-xl cursor-pointer ${
                lang.code === currentLocale 
                  ? 'text-white font-semibold bg-white/10' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              } ${index !== LANGUAGES.length - 1 ? 'border-b border-white/5' : ''}`}
              role="option"
              aria-selected={lang.code === currentLocale}
            >
              <span>{lang.label}</span>
              {lang.code === currentLocale && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}