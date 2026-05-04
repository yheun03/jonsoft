<template>
  <BusinessSection />
</template>

<script setup lang="ts">
import { getI18nNamespaces } from 'core/utils/route-i18n'

definePageMeta({
  layout: 'default',
})

const locale = useLocaleStore()
const namespaces = getI18nNamespaces('/business')
await useAsyncData('i18n-page-business', () => locale.loadBundles(namespaces))
</script>
