<template>
  <div class="floating">
    <div class="label">{{ label }}</div>
    <a href="/assets/files/JO&SOFT catalog.pdf" target="_blank" rel="noopener" />
  </div>
</template>

<script setup lang="ts">
const locale = useLocaleStore()
const { t } = useLocaleMessage()

const label = computed(() => t('common', 'floating'))
</script>
