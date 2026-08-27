<template>
    <div class="banner type-ask">
        <div class="wrap">
            <h2 class="title" data-aos="fade-up" data-aos-delay="100">{{ t('common.banner.ask.title') }}</h2>
            <p data-aos="fade-up" data-aos-delay="200" v-html="t('common.banner.ask.dscpt')"></p>
            <NuxtLink to="/contact" data-aos="fade-up" data-aos-delay="300" class="btn type-ask">
                <span>{{ t('common.banner.ask.button') }}</span>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
