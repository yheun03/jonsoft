import { defineStore } from 'pinia'
import { useApi } from 'core/composables/useApi'

export type LocaleCode = 'ko' | 'en' | 'ja' | 'vi'

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    lang: 'ko' as LocaleCode,
    /** i18n JSON 파일명 → 파싱된 객체 */
    bundles: {} as Record<string, Record<string, unknown>>,
    bundleEpoch: 0,
  }),
  actions: {
    setLang(next: LocaleCode) {
      this.lang = next
      if (import.meta.client) {
        localStorage.setItem('selectedLang', next)
        document.documentElement.lang = next
      }
    },
    hydrateLangFromStorage() {
      if (!import.meta.client) return
      const raw = localStorage.getItem('selectedLang') as LocaleCode | null
      if (raw && ['ko', 'en', 'ja', 'vi'].includes(raw)) this.setLang(raw)
    },
    async loadBundles(names: string[]) {
      const api = useApi()
      for (const name of names) {
        if (this.bundles[name]) continue
        const data = (await api.get(`/api/i18n/${name}`)) as Record<string, unknown>
        this.bundles[name] = data
        this.bundleEpoch++
      }
    },
    touchBundles() {
      this.bundleEpoch++
    },
  },
})
