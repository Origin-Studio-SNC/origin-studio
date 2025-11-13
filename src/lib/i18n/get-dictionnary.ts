import frCommon from '@/locales/fr/common.json';
import enCommon from '@/locales/en/common.json';
import deCommon from '@/locales/de/common.json';
import frServices from '@/locales/fr/services.json';
import enServices from '@/locales/en/services.json';
import { Dictionary } from '@/types/dictionary';

const dictionaries: Record<'fr' | 'en' | 'de', Dictionary> = {
  fr: { ...frCommon, services: frServices },
  en: { ...enCommon, services: enServices },
  de: { ...deCommon },
};

// Fonction qui retourne le dictionnaire correspondant à la locale demandée
export const getDictionary = async (locale: 'fr' | 'en' | 'de'): Promise<Dictionary> => {
  return dictionaries[locale];
};
