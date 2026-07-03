import { createI18n } from 'vue-i18n'
import { localeMessages } from '~/i18n'

export default defineNuxtPlugin((nuxtApp) => {
  const locale = useLocaleStore()
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    warnHtmlMessage: false,
    locale: locale.lang,
    fallbackLocale: 'ko',
    messages: localeMessages,
  })

  nuxtApp.vueApp.use(i18n)

  locale.$subscribe((_mutation, state) => {
    i18n.global.locale.value = state.lang
  })
})
