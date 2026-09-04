<template>
    <footer class="app-footer">
        <div class="wrap not-padding">
            <div>
                <NuxtLink to="/" class="logo-jon">
                    <img :src="assetPath(t('common.company.logo.src') || '/assets/logos/logo.svg')" :alt="t('common.company.logo.alt')" />
                </NuxtLink>
            </div>
            <div class="wrap-text">
                <nav :aria-label="footerNavLabel">
                    <ul class="gnb">
                        <li v-for="item in navigationItems" :key="item.to">
                            <NuxtLink :to="item.to">{{ t(item.labelKey) }}</NuxtLink>
                        </li>
                    </ul>
                </nav>
                <address>{{ t('common.company.address') }}</address>
                <p>{{ t('common.company.info') }}</p>
                <p class="copyright">{{ t('common.copyright') }}</p>
            </div>
            <div>
                <a href="https://www.innobiz.net/" class="logo-inobiz">
                    <img :src="assetPath(t('common.inobiz.src'))" :alt="t('common.inobiz.alt')" />
                </a>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { navigationItems } from '~/constants/navigation';
import { assetPath } from '~/utils/assetPath';

const { t, locale } = useI18n();
const footerNavLabels = { ko: '하단 메뉴', en: 'Footer navigation', vi: 'Điều hướng chân trang' };
const footerNavLabel = computed(() => footerNavLabels[locale.value as keyof typeof footerNavLabels]);
</script>
