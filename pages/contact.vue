<template>
  <ContactSection />
</template>

<script setup lang="ts">
import { getI18nNamespaces } from '~/utils/route-i18n'

definePageMeta({
  layout: 'default',
})

const locale = useLocaleStore()
const namespaces = getI18nNamespaces('/contact')
await useAsyncData('i18n-page-contact', () => locale.loadBundles(namespaces))
</script>
