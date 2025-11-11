import fr from '@/locales/fr/common.json';
import en from '@/locales/en/common.json';
import de from '@/locales/de/common.json';
import { Dictionary } from '@/types/dictionary';

const dictionaries: Record<'fr' | 'en' | 'de', Dictionary> = {
  fr,
  en,
  de,
};

// Fonction qui retourne le dictionnaire correspondant à la locale demandée
export const getDictionary = async (locale: 'fr' | 'en' | 'de'): Promise<Dictionary> => {
  return dictionaries[locale];
};
