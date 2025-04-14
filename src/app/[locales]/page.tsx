import Image from "next/image";
import { getDictionary } from "@/lib/i18n/get-dictionnary";

export default async function Home({ params }: { params: { locale: 'fr' | 'en' } }) {
  // Fonction pour récupérer les traductions en fonction de la locale
  const dictionary = await getDictionary(params.locale);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>{dictionary.title}</h1>
    </div>
  );
}
