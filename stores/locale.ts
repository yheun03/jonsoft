import { defineStore } from 'pinia';

export type LocaleCode = 'ko' | 'en' | 'ja' | 'vi';
const localeCodes: LocaleCode[] = ['ko', 'en', 'ja', 'vi'];

export const useLocaleStore = defineStore('locale', {
    state: () => ({
        lang: 'ko' as LocaleCode,
    }),
    actions: {
        setLang(next: LocaleCode) {
            this.lang = next;

            if (import.meta.client) {
                localStorage.setItem('selectedLang', next);
                document.documentElement.lang = next;
            }
        },
        hydrateLangFromStorage() {
            if (!import.meta.client) return;

            const raw = localStorage.getItem('selectedLang') as LocaleCode | null;
            if (raw && localeCodes.includes(raw)) {
                this.setLang(raw);
            }
        },
    },
});
