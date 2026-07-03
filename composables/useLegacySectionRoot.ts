import type { Ref } from 'vue'
import { bindHistoryLegacyControls } from '~/composables/useHistoryLegacy'
import { mountHistoryTimeline } from '~/i18n/history'

/**
 * Vue 템플릿으로 옮긴 섹션 루트에 레거시 인터랙션을 연결합니다.
 */
export function useLegacySectionRoot(root: Ref<HTMLElement | null>, namespaces: string[]) {
  const locale = useLocaleStore()
  let releaseHistoryControls: (() => void) | undefined

  function optimizeImageLoading(scope: HTMLElement) {
    const images = [...scope.querySelectorAll<HTMLImageElement>('img')]
    images.forEach((img) => {
      const inTopBanner = img.closest('.banner') && !img.closest('.banner.type-ask')
      img.decoding = 'async'
      if (inTopBanner) {
        img.loading = 'eager'
        img.fetchPriority = 'high'
        return
      }
      img.loading = 'lazy'
      img.fetchPriority = 'low'
    })
  }

  async function syncDom() {
    await locale.loadBundles(namespaces)
    await nextTick()
    if (root.value && namespaces.includes('history')) {
      mountHistoryTimeline(root.value.querySelector('.history'), locale.bundles, locale.lang)
      releaseHistoryControls?.()
      releaseHistoryControls = bindHistoryLegacyControls(root.value)
      if (import.meta.client) {
        const AOS = (await import('aos')).default
        await nextTick()
        AOS.refresh()
      }
    }
    if (root.value) {
      optimizeImageLoading(root.value)
    }
  }

  watch(
    () => [locale.lang, locale.bundleEpoch] as const,
    () => {
      if (root.value && namespaces.includes('history')) {
        mountHistoryTimeline(root.value.querySelector('.history'), locale.bundles, locale.lang)
        releaseHistoryControls?.()
        releaseHistoryControls = bindHistoryLegacyControls(root.value)
      }
    },
  )

  onMounted(async () => {
    await syncDom()
  })

  onUnmounted(() => {
    releaseHistoryControls?.()
  })
}
