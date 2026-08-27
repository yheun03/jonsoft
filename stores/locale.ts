import { defineStore } from 'pinia';

export type LocaleCode = 'ko' | 'en' | 'vi';
const localeCodes: LocaleCode[] = ['ko', 'en', 'vi'];
const localeStorageKey = 'selectedLang';

export const useLocaleStore = defineStore('locale', {
    state: () => ({
        lang: 'ko' as LocaleCode,
    }),
    actions: {
        setLang(next: LocaleCode) {
            this.lang = next;

            if (import.meta.client) {
                sessionStorage.setItem(localeStorageKey, next);
                document.documentElement.lang = next;
            }
        },
        hydrateLangFromStorage() {
            if (!import.meta.client) return;

            const raw = sessionStorage.getItem(localeStorageKey) as LocaleCode | null;
            if (raw && localeCodes.includes(raw)) {
                this.setLang(raw);
            }
        },
    },
});
