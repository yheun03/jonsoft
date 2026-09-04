import { defineStore } from 'pinia';
import { defaultLocale, isLocaleCode, localeCodes, type LocaleCode } from '~/constants/locale';

export type { LocaleCode } from '~/constants/locale';
export const localeStorageKey = 'selectedLang';
export const localeCookieKey = 'jonsoftLocale';

export const useLocaleStore = defineStore('locale', {
    state: () => ({
        lang: defaultLocale as LocaleCode,
    }),
    actions: {
        setLang(next: LocaleCode) {
            this.lang = next;

            if (import.meta.client) {
                localStorage.setItem(localeStorageKey, next);
            }
        },
        hydrateLangFromStorage(fallback?: unknown) {
            if (!import.meta.client) return;

            const raw = localStorage.getItem(localeStorageKey) || sessionStorage.getItem(localeStorageKey);
            if (isLocaleCode(raw)) {
                this.setLang(raw);
            } else if (isLocaleCode(fallback)) {
                this.setLang(fallback);
            }
        },
    },
});
