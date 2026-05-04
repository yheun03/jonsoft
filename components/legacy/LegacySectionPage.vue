<template>
  <div ref="root" class="legacy-section-root" v-html="html" />
</template>

<script setup lang="ts">
import { applyLegacyDomI18n } from 'core/utils/applyLegacyDomI18n'
import { mountHistoryTimeline } from 'core/i18n/history'
import { bindHistoryLegacyControls } from 'core/composables/useHistoryLegacy'

const props = defineProps<{
  html: string
  namespaces: string[]
}>()

const root = ref<HTMLElement | null>(null)
const locale = useLocaleStore()

let releaseHistoryControls: (() => void) | undefined

async function syncDom() {
  await locale.loadBundles(props.namespaces)
  await nextTick()
  if (root.value && props.namespaces.includes('history')) {
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
</script>
