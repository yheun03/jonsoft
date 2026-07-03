<template>
  <CustomerSection />
</template>

<script setup lang="ts">
import { getI18nNamespaces } from '~/utils/route-i18n'

definePageMeta({
  layout: 'default',
})

const locale = useLocaleStore()
const namespaces = getI18nNamespaces('/customer')
await useAsyncData('i18n-page-customer', () => locale.loadBundles(namespaces))
</script>
