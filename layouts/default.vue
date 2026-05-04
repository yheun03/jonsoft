<template>
  <div class="app-shell">
    <LayoutAppHeader />
    <main class="app-main">
      <slot />
    </main>
    <LayoutAppFloating />
    <LayoutAppFooter />
  </div>
</template>

<script setup lang="ts">
const locale = useLocaleStore()

if (import.meta.client) {
  locale.hydrateLangFromStorage()
}

await useAsyncData('layout-i18n-common', () => locale.loadBundles(['common']))
</script>
