<template>
  <div ref="root" class="legacy-section-root" v-html="html" />
</template>

<script setup lang="ts">
import { applyLegacyDomI18n } from 'core/utils/applyLegacyDomI18n'

const props = defineProps<{
  html: string
  namespaces: string[]
}>()

const root = ref<HTMLElement | null>(null)
const locale = useLocaleStore()

useHistoryLegacy(root)

async function syncDom() {
  await locale.loadBundles(props.namespaces)
  await nextTick()
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
  locale.hydrateLangFromStorage()
  await syncDom()
})
</script>
