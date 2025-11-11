import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-dictionnary";
import { FooterTranslations, NotFoundTranslations } from "@/types/translations";
import { headers } from "next/headers";

export default async function NotFound() {
  // Récupération de la locale depuis les headers ou l'URL
  const headersList = await headers();
  const referer = headersList.get('referer') || '';
  
  // Extraction de la locale depuis le referer ou utilisation de la locale par défaut
  let locale: 'fr' | 'en' | 'de' = 'fr';
  const localeMatch = referer.match(/\/(fr|en|de)(?=\/|$)/);
  if (localeMatch && localeMatch[1]) {
    locale = localeMatch[1] as 'fr' | 'en' | 'de';
  }
  
  const dictionary = await getDictionary(locale);
  const footer = dictionary.footer as FooterTranslations;
  const notFound = dictionary.notFound as NotFoundTranslations;

  return (
    <>
      <Navbar params={{ locales: locale }} />
      
      <main className="flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-8xl font-bold text-[var(--color-accent-violet)] mb-6">
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {notFound.title}
            </h2>
            <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
              {notFound.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}`}>
                <Button
                  size="lg"
                  className="bg-[var(--color-accent-violet)] hover:bg-[var(--color-accent-violet)]/80 text-white font-semibold px-8 py-4 text-lg"
                >
                  {notFound.homeButton}
                </Button>
              </Link>
              <Link href={`/${locale}/about`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-neutral-600 text-neutral-300 hover:bg-neutral-800 font-semibold px-8 py-4 text-lg"
                >
                  {notFound.aboutButton}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer dictionary={footer} />
    </>
  );
}