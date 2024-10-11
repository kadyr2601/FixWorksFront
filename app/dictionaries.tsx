export type Locale = 'en' | 'ru';

const dictionaries: Record<Locale, () => Promise<any>> = {
    en: () => import('@/public/dictionaries/en.json').then((module) => module.default),
    ru: () => import('@/public/dictionaries/ru.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
    return dictionaries[locale]();
};
