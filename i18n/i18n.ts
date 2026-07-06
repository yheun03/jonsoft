import { createI18n, type I18n } from 'vue-i18n'
import numberFormats from './numberFormats.json'
import type { LocaleCode } from '~/stores/locale'

const dictionaries = {
  ko: () => import('./dictionary/ko.json'),
  en: () => import('./dictionary/en.json'),
  ja: () => import('./dictionary/ja.json'),
  vi: () => import('./dictionary/vi.json'),
}

const loadedMessages = new Map<LocaleCode, Record<string, Record<string, unknown>>>()

export function setupI18n(locale: LocaleCode = 'ko') {
  return createI18n({
    legacy: false,
    globalInjection: true,
    warnHtmlMessage: false,
    missingWarn: false,
    fallbackWarn: false,
    locale,
    fallbackLocale: 'ko',
    numberFormats,
  })
}

export async function getLocaleMessage(locale: LocaleCode) {
  const cached = loadedMessages.get(locale)
  if (cached) return cached

  const messages = (await dictionaries[locale]()).default as Record<string, Record<string, unknown>>
  loadedMessages.set(locale, messages)
  return messages
}

export async function loadLocaleMessages(i18n: I18n, locale: LocaleCode) {
  const messages = await getLocaleMessage(locale)
  i18n.global.setLocaleMessage(locale, messages)
  return messages
}
