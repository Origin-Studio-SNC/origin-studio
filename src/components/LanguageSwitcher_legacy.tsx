'use client';

import { usePathname, useRouter } from 'next/navigation';
import flagEN from '../../public/img/flagEN.png';
import flagFR from '../../public/img/flagFR.png';
// import flagDE from '../../public/img/flagDE.png'; // À ajouter quand l'image sera disponible
import { useState, useRef, useEffect } from 'react';

const LANGUAGES = [
  { code: 'fr', label: 'Français', labelShort: 'FR', flag: flagFR },
  { code: 'en', label: 'English', labelShort: 'EN', flag: flagEN },
  { code: 'de', label: 'Deutsch', labelShort: 'DE', flag: null }, // null en attendant flagDE
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
        className="flex items-center gap-2 bg-transparent text-white px-3 py-2 rounded-md hover:bg-neutral-800/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
        onClick={() => setIsOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {/* <Image
          src={currentLang.flag}
          alt={currentLang.label}
          width={20}
          height={20}
          className="w-auto h-auto bg-white rounded-sm"
        /> */}
        <span className="xl:hidden">{currentLang.labelShort}</span>
        <span className='hidden xl:block'>{currentLang.label}</span>
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {isOpen && (
        <div className="absolute overflow-hidden left-0 mt-2 w-full min-w-[120px] bg-zinc-800 rounded-md shadow-lg z-50">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => switchLocale(lang.code as 'fr' | 'en' | 'de')}
              className={`flex items-center gap-2 w-full px-4 py-2 text-white hover:bg-zinc-700 text-left ${lang.code === currentLocale ? 'font-bold' : ''}`}
              role="option"
              aria-selected={lang.code === currentLocale}
            >
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}