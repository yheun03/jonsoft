<template>
    <div class="app-shell">
        <a class="skip-link" href="#main-content">{{ skipLabel }}</a>
        <AppHeader />
        <main id="main-content" class="app-main" tabindex="-1">
            <slot />
        </main>
        <AppFloating />
        <AppFooter />
    </div>
</template>

<script setup lang="ts">
import AppFloating from '~/components/layout/AppFloating.vue';
import AppFooter from '~/components/layout/AppFooter.vue';
import AppHeader from '~/components/layout/AppHeader.vue';

const locale = useLocaleStore();
const skipLabels = { ko: '본문 바로가기', en: 'Skip to main content', vi: 'Chuyển đến nội dung chính' };
const skipLabel = computed(() => skipLabels[locale.lang]);
</script>
