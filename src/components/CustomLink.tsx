'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export const CustomLink = ({ href, label }: { href: string, label: string }) => {
    const pathname = usePathname();
    const normalizedPath = pathname.replace(/^\/(fr|en)(?=\/|$)/, '');
    
    // Extraire la locale actuelle du pathname
    const currentLocale = pathname.match(/^\/(fr|en)(?=\/|$)/)?.[1] || 'fr';
    
    // Construire l'URL avec la locale préservée
    const localizedHref = href === '/' ? `/${currentLocale}` : `/${currentLocale}${href}`;

    const isActive = normalizedPath === (href === '/' ? '' : href);

  return (
    <Link href={localizedHref} className={`relative text-gray-200 ${isActive ? 'text-blue-500' : ''}`}>
        <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors rounded-full hover:bg-neutral-800/60 ${
          isActive ? "bg-neutral-800/60" : ""
        } justify-start px-4 py-2`}
      >
      {label}
    </div>
    </Link>
  )
}

export default CustomLink;