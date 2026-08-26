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
                        <li>
                            <NuxtLink to="/about">ABOUT US</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/business">BUSINESS & SOLUTION</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/customer">CUSTOMER & PARTNERS</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/contact">CONTACT US</NuxtLink>
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
import { assetPath } from '~/utils/assetPath';

const { t } = useI18n();
const locale = useLocaleStore();
const footerNavLabels = { ko: '하단 메뉴', en: 'Footer navigation', vi: 'Điều hướng chân trang' };
const footerNavLabel = computed(() => footerNavLabels[locale.lang]);
</script>
