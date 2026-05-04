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

await useAsyncData('layout-i18n-common', () => locale.loadBundles(['common']))
</script>
