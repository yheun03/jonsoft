import type { Ref } from 'vue'
import { bindHistoryLegacyControls } from 'core/composables/useHistoryLegacy'
import { mountHistoryTimeline } from 'core/i18n/history'
import { applyLegacyDomI18n } from 'core/utils/applyLegacyDomI18n'

/**
 * 레거시 마크업(`data-i18n` 등)을 Vue 템플릿으로 옮긴 섹션 루트에 연결합니다.
 */
export function useLegacySectionRoot(root: Ref<HTMLElement | null>, namespaces: string[]) {
  const locale = useLocaleStore()
  let releaseHistoryControls: (() => void) | undefined

  async function syncDom() {
    await locale.loadBundles(namespaces)
    await nextTick()
    if (root.value && namespaces.includes('history')) {
      mountHistoryTimeline(root.value.querySelector('.history'))
      releaseHistoryControls?.()
      releaseHistoryControls = bindHistoryLegacyControls(root.value)
      if (import.meta.client) {
        const AOS = (await import('aos')).default
        await nextTick()
        AOS.refresh()
      }
    }
    if (root.value) {
      applyLegacyDomI18n(root.value, locale.bundles, locale.lang)
    }
  }

  watch(
    () => [locale.lang, locale.bundleEpoch] as const,
    () => {
      if (root.value) applyLegacyDomI18n(root.value, locale.bundles, locale.lang)
    },
  )

  onMounted(async () => {
    await syncDom()
  })

  onUnmounted(() => {
    releaseHistoryControls?.()
  })
}
