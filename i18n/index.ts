import type { LocaleCode } from '~/stores/locale'
import en from './locales/en'
import ja from './locales/ja'
import ko from './locales/ko'
import vi from './locales/vi'

/** 페이지 번들명(common, about, …) → 해당 언어 메시지 트리 */
export const localeMessages: Record<LocaleCode, Record<string, Record<string, unknown>>> = {
  ko,
  en,
  ja,
  vi,
}
