export type TranslationValue = string | boolean | TranslationValue[] | { [key: string]: TranslationValue };

export type Dictionary = {
  [key: string]: TranslationValue;
}; 