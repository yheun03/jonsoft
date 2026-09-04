export const defaultLocale = 'ko' as const;

export const localeDefinitions = {
    ko: {
        code: 'ko',
        htmlLang: 'ko',
        ogLocale: 'ko_KR',
        shortLabel: 'KOR',
        nativeName: '한국어',
    },
    vi: {
        code: 'vi',
        htmlLang: 'vi',
        ogLocale: 'vi_VN',
        shortLabel: 'VIE',
        nativeName: 'Tiếng Việt',
    },
    en: {
        code: 'en',
        htmlLang: 'en',
        ogLocale: 'en_US',
        shortLabel: 'ENG',
        nativeName: 'English',
    },
} as const;

export type LocaleCode = keyof typeof localeDefinitions;
export type LocalizedValue<T> = Partial<Record<LocaleCode, T>>;

export const localeCodes = Object.keys(localeDefinitions) as LocaleCode[];

export function isLocaleCode(value: unknown): value is LocaleCode {
    return typeof value === 'string' && Object.hasOwn(localeDefinitions, value);
}

export function getLocalizedValue<T>(values: LocalizedValue<T>, locale: LocaleCode): T | undefined {
    return values[locale] ?? values[defaultLocale] ?? values.en ?? values.vi;
}
