<template>
  <div class="app-shell">
    <a class="skip-link" href="#main-content">본문 바로가기</a>
    <AppHeader />
    <main id="main-content" class="app-main" tabindex="-1">
      <slot />
    </main>
    <AppFloating />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const locale = useLocaleStore()

await useAsyncData('layout-i18n-common', () => locale.loadBundles(['common']))
</script>
