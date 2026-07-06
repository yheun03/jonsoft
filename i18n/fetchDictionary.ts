import type { LocaleCode } from '~/stores/locale'
import { getLocaleMessage } from './i18n'

export default function fetchDictionary(locale: LocaleCode = 'ko') {
  return getLocaleMessage(locale)
}
