import 'server-only';

const dictionaries = {
  // Importation du dictionnaire français
  fr: () => import('@/locales/fr/common.json').then((module) => module.default),
  // Importation du dictionnaire anglais
  en: () => import('@/locales/en/common.json').then((module) => module.default),
};

// Fonction qui retourne le dictionnaire correspondant à la locale demandée
export const getDictionary = async (locale: 'fr' | 'en') => {
  return dictionaries[locale]();
};
