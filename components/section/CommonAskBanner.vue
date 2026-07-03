<template>
    <div class="banner type-ask">
        <div class="wrap">
            <p class="title" data-aos="fade-up" data-aos-delay="200">{{ t('common', 'banner.ask.title') }}</p>
            <p data-aos="fade-up" data-aos-delay="400" v-html="t('common', 'banner.ask.dscpt')"></p>
            <a href="/contact" data-aos="fade-up" data-aos-delay="600" class="btn type-ask">
                <span>{{ t('common', 'banner.ask.button') }}</span>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useLocaleMessage()
</script>
