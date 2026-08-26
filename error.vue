<template>
    <div class="error-layout">
        <a class="skip-link" href="#error-content">본문 바로가기</a>
        <main id="error-content" class="error-page" tabindex="-1">
            <div class="wrap error-page__inner">
                <div class="error-page__visual" aria-hidden="true">
                    <span class="error-page__label">ERROR</span>
                    <strong class="error-page__code">{{ statusCode }}</strong>
                </div>
                <div class="error-page__content">
                    <img class="error-page__logo" :src="assetPath('/assets/logos/word.svg')" alt="JO&SOFT" />
                    <h1>{{ t(`${messageKey}.title`) }}</h1>
                    <p class="error-page__description">{{ t(`${messageKey}.description`) }}</p>
                    <div class="error-page__actions">
                        <button type="button" class="btn error-page__button error-page__button--primary" @click="goHome">
                            {{ t('error.home') }}
                        </button>
                        <NuxtLink to="/contact" class="error-page__button error-page__button--secondary">
                            {{ t('error.contact') }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';
import { useI18n } from 'vue-i18n';
import AppFooter from '~/components/layout/AppFooter.vue';
import AppHeader from '~/components/layout/AppHeader.vue';
import { assetPath } from '~/utils/assetPath';

const props = defineProps<{
    error: NuxtError;
}>();

const { t } = useI18n();
const statusCode = computed(() => props.error.statusCode || 500);
const messageKey = computed(() => (statusCode.value === 404 ? 'error.notFound' : 'error.default'));

const goHome = () => clearError({ redirect: '/' });
</script>
