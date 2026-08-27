import { createI18n, type LocaleMessageValue } from 'vue-i18n';
import type { LocaleCode } from '~/stores/locale';

const dictionaries = {
    ko: () => import('~/i18n/dictionary/ko.json'),
    en: () => import('~/i18n/dictionary/en.json'),
    vi: () => import('~/i18n/dictionary/vi.json'),
};

type LocaleDictionary = Record<string, LocaleMessageValue>;

const loadedMessages = new Map<LocaleCode, LocaleDictionary>();

async function loadDictionary(lang: LocaleCode) {
    const cached = loadedMessages.get(lang);
    if (cached) return cached;

    const messages = (await dictionaries[lang]()).default;
    loadedMessages.set(lang, messages);
    return messages;
}

export default defineNuxtPlugin(async (nuxtApp) => {
    const locale = useLocaleStore();
    locale.hydrateLangFromStorage();

    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        warnHtmlMessage: false,
        missingWarn: false,
        fallbackWarn: false,
        locale: locale.lang,
        fallbackLocale: 'ko',
        messages: {
            [locale.lang]: await loadDictionary(locale.lang),
        },
    });

    nuxtApp.vueApp.use(i18n);

    locale.$subscribe(async (_mutation, state) => {
        const selectedLang = state.lang;
        i18n.global.setLocaleMessage(selectedLang, await loadDictionary(selectedLang));

        if (locale.lang === selectedLang) {
            i18n.global.locale.value = selectedLang;
        }
    });
});
