<template>
    <div class="partners">
        <div class="wrap">
            <div class="title" data-aos="fade-up" data-aos-delay="200">{{ t(`${props.type}.title`) }}</div>
            <ul>
                <li v-for="item in items" :key="item.name" data-aos="zoom-in-up" :data-aos-delay="item.delay">
                    <img :src="item.src" :alt="item.alt">
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

type LogoType = 'customer' | 'partner'

const props = defineProps<{
    type: LogoType
}>()

const { t, te } = useI18n()

const customerItems = [
    'samsung-electro-mechanics', 'kt', 'kt-telecop', 'gs-retail', 'hanwha-hotel-resort',
    'cj-logistics', 'osstem-implant', 'incheon-national-university', 'lg-u-plus', 'paris-croissant',
    'tairim-packaging', 'samhwa-paint', 'sk-hynix', 'daeyang-group', 'kyungdong-naviant',
    'kklenanara', '3skbox', 'dubo-industry', 'jongrui-korea', 'k-package', 'orchem',
]

const partnerItems = [
    'ey-hanyoung', 'obzen', 'edentans', 'i-on-communications', 'gs-itm',
    'kohken', 'accenture', 'concentrix', 'naver-cloud', 'sk-cnc',
    'lts-group', 'lg-cns', 'siemens', 'altis', 'kpa', 'kampa', 'korcham', 'chaint',
]

const partnerCustomerKeys = new Set(['siemens', 'altis', 'kpa', 'kampa', 'korcham', 'chaint'])

const items = computed(() => {
    const names = props.type === 'customer' ? customerItems : partnerItems

    return names.map((name, index) => {
        const keyGroup = props.type === 'partner' && partnerCustomerKeys.has(name) ? 'customer' : props.type
        const srcKey = `${keyGroup}.companies.${name}.src`
        const altKey = `${keyGroup}.companies.${name}.alt`

        return {
            name,
            delay: props.type === 'customer' ? Math.min(350 + index * 50, 1300) : getPartnerDelay(name, index),
            src: te(srcKey) ? t(srcKey) : `/assets/logos/partners/${name}.png`,
            alt: te(altKey) ? t(altKey) : '',
        }
    })
})

function getPartnerDelay(name: string, index: number) {
    if (partnerCustomerKeys.has(name)) return 1300
    if (name === 'sk-cnc') return 950
    if (name === 'lts-group') return 1000
    if (name === 'lg-cns') return 1100

    return 350 + index * 50
}
</script>
