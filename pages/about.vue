<template>
  <AboutSection />
</template>

<script setup lang="ts">
import { getI18nNamespaces } from 'core/utils/route-i18n'

definePageMeta({
  layout: 'default',
})

const locale = useLocaleStore()
const namespaces = getI18nNamespaces('/about')
await useAsyncData('i18n-page-about', () => locale.loadBundles(namespaces))
</script>
