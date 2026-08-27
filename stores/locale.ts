import { defineStore } from 'pinia';

export type LocaleCode = 'ko' | 'en' | 'vi';
export const localeCodes: readonly LocaleCode[] = ['ko', 'en', 'vi'];
const localeStorageKey = 'selectedLang';

export function isLocaleCode(value: string): value is LocaleCode {
    return localeCodes.includes(value as LocaleCode);
}

export const useLocaleStore = defineStore('locale', {
    state: () => ({
        lang: 'ko' as LocaleCode,
    }),
    actions: {
        setLang(next: LocaleCode) {
            this.lang = next;

            if (import.meta.client) {
                sessionStorage.setItem(localeStorageKey, next);
            }
        },
        hydrateLangFromStorage() {
            if (!import.meta.client) return;

            const raw = sessionStorage.getItem(localeStorageKey);
            if (raw && isLocaleCode(raw)) {
                this.setLang(raw);
            }
        },
    },
});
