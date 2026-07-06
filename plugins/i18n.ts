import { loadLocaleMessages, setupI18n } from '~/i18n/i18n'

export default defineNuxtPlugin(async (nuxtApp) => {
  const locale = useLocaleStore()
  const i18n = setupI18n(locale.lang)

  await loadLocaleMessages(i18n, locale.lang)

  nuxtApp.vueApp.use(i18n)

  locale.$subscribe(async (_mutation, state) => {
    await loadLocaleMessages(i18n, state.lang)
    i18n.global.locale.value = state.lang
  })
})
