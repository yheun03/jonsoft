<template>
    <div class="partners">
        <div class="wrap">
            <div class="title" data-aos="fade-up" data-aos-delay="200">{{ localized(partnerData[props.type].title) }}
            </div>
            <ul>
                <li v-for="item in items" :key="item.name" data-aos="zoom-in-up" :data-aos-delay="item.delay">
                    <img :src="assetPath(item.src)" :alt="localized(item.alt)">
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { assetPath } from '~/utils/assetPath'
import partnerData from '~/i18n/data/partner.json'

type LogoType = 'customer' | 'partner'

const props = defineProps<{
    type: LogoType
}>()

const locale = useLocaleStore()

const partnerCustomerKeys = new Set(['siemens', 'altis', 'kpa', 'kampa', 'korcham', 'chaint'])

const items = computed(() => {
    return partnerData[props.type].companies.map((item, index) => ({
        ...item,
        delay: props.type === 'customer' ? Math.min(350 + index * 50, 1300) : getPartnerDelay(item.name, index),
    }))
})

const localized = (item: Record<string, string>) => item[locale.lang] || item.ko || ''

function getPartnerDelay(name: string, index: number) {
    if (partnerCustomerKeys.has(name)) return 1300
    if (name === 'skCnc') return 950
    if (name === 'ltsGroup') return 1000
    if (name === 'lgCns') return 1100

    return 350 + index * 50
}
</script>
