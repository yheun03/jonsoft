import {defineStore} from 'pinia';
import {getLocaleMessage} from '~/i18n/i18n';

export type LocaleCode = 'ko' | 'en' | 'ja' | 'vi';

export const useLocaleStore = defineStore('locale', {
    state: () => ({
        lang: 'ko' as LocaleCode,
        /** 번들 파일명(common, about, …) → 현재 언어 기준 파싱된 객체 */
        bundles: {} as Record<string, Record<string, unknown>>,
        /** 현재까지 적재해 둔 번들 이름 */
        loadedNamespaces: [] as string[],
        bundleEpoch: 0,
    }),
    actions: {
        async setLang(next: LocaleCode) {
            this.lang = next;
            const messages = await getLocaleMessage(next);
            for (const name of this.loadedNamespaces) {
                const slice = messages[name];
                if (slice) this.bundles[name] = slice;
            }
            if (import.meta.client) {
                localStorage.setItem('selectedLang', next);
                document.documentElement.lang = next;
            }
            this.bundleEpoch++;
        },
        hydrateLangFromStorage() {
            if (!import.meta.client) return;
            const raw = localStorage.getItem('selectedLang') as LocaleCode | null;
            if (raw && ['ko', 'en', 'ja', 'vi'].includes(raw) && raw !== this.lang) {
                this.setLang(raw);
            }
        },
        async loadBundles(names: string[]) {
            const messages = await getLocaleMessage(this.lang);
            for (const name of names) {
                const slice = messages[name];
                if (!slice) continue;
                if (!this.loadedNamespaces.includes(name)) this.loadedNamespaces.push(name);
                this.bundles[name] = slice;
            }
            this.bundleEpoch++;
            return true;
        },
        touchBundles() {
            this.bundleEpoch++;
        },
    },
});
