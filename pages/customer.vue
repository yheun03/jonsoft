<template>
  <LegacySectionPage :html="html" :namespaces="namespaces" />
</template>

<script setup lang="ts">
import html from '~/assets/fragments/customer-section.html?raw'
import { getI18nNamespaces } from 'core/utils/route-i18n'

definePageMeta({
  layout: 'default',
})

const locale = useLocaleStore()
const namespaces = getI18nNamespaces('/customer')
await useAsyncData('i18n-page-customer', () => locale.loadBundles(namespaces))
</script>
