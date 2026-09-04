import { createI18n } from 'vue-i18n';
import en from '~/i18n/dictionary/en.json';
import ko from '~/i18n/dictionary/ko.json';
import vi from '~/i18n/dictionary/vi.json';
import { defaultLocale, isLocaleCode, localeDefinitions, type LocaleCode } from '~/constants/locale';
import { localeCookieKey } from '~/stores/locale';

export default defineNuxtPlugin((nuxtApp) => {
    const localeStore = useLocaleStore();
    const localeCookie = useCookie<string>(localeCookieKey, {
        default: () => defaultLocale,
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
    });
    const initialLocale = isLocaleCode(localeCookie.value) ? localeCookie.value : defaultLocale;

    if (import.meta.server) localeStore.lang = initialLocale;

    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        warnHtmlMessage: false,
        missingWarn: false,
        fallbackWarn: false,
        locale: localeStore.lang,
        fallbackLocale: 'ko',
        messages: { ko, en, vi },
    });

    nuxtApp.vueApp.use(i18n);

    watch(
        () => localeStore.lang,
        (lang: LocaleCode) => {
            i18n.global.locale.value = lang;
            localeCookie.value = lang;

            if (import.meta.client) {
                document.documentElement.lang = localeDefinitions[lang].htmlLang;
            }
        },
        { immediate: true },
    );

    nuxtApp.hook('app:mounted', () => {
        localeStore.hydrateLangFromStorage(localeCookie.value);
    });
});
