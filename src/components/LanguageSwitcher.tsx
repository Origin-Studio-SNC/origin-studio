'use client';

import { usePathname, useRouter } from 'next/navigation';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const newLocale = pathname.startsWith('/fr') ? 'en' : 'fr';

  // Fonction pour changer la langue
  const switchLocale = () => {
    const newPath = pathname.replace(/^\/(fr|en)/, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <button onClick={switchLocale} className="underline text-sm"> 
      {/* Bouton à modifier pour changer la langue */}
      {newLocale.toUpperCase()}
    </button>
  );
}