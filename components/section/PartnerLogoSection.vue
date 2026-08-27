<template>
    <div class="partners">
        <div class="wrap">
            <h2 class="title" data-aos="fade-up" data-aos-delay="100">{{ localized(partnerData[props.type].title) }}</h2>
            <ul>
                <li v-for="item in items" :key="item.name" data-aos="zoom-in-up" :data-aos-delay="item.delay">
                    <img :src="assetPath(item.src)" :alt="localized(item.alt)" loading="lazy" decoding="async" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { assetPath } from '~/utils/assetPath';
import partnerData from '~/i18n/data/partner.json';

type LogoType = 'customer' | 'partner';

const props = defineProps<{
    type: LogoType;
}>();

const locale = useLocaleStore();

const items = computed(() => {
    return partnerData[props.type].companies.map((item, index) => ({
        ...item,
        src: localizedLogoPath(item.src),
        delay: Math.min(100 + index * 50, 500),
    }));
});

const localized = (item: Record<string, string>) => item[locale.lang] || item.ko || '';

function localizedLogoPath(src: string) {
    if (locale.lang === 'ko') return src;
    return src.replace('/partners/', '/partners/en/');
}
</script>
