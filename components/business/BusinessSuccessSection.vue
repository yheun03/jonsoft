<template>
    <div id="success" class="success">
        <div class="wrap">
            <h3 data-aos="fade-up" data-aos-delay="100" v-html="t('business.success.title')"></h3>
            <ul class="list-case">
                <li
                    v-for="successCase in successCases"
                    :key="successCase.id"
                    class="item"
                    data-aos="fade-up"
                    :data-aos-delay="successCase.delay"
                    @click="emit('open', successCase.id)"
                >
                    <div class="content">
                        <p class="title" v-html="t(`business.success.${successCase.messageKey}.title`)"></p>
                        <ul class="dscpt">
                            <li v-for="item in list(`business.success.${successCase.messageKey}.dscpt`)" :key="item">
                                {{ item }}
                            </li>
                        </ul>
                    </div>
                    <img :src="assetPath(successCase.image)" alt="" loading="lazy" decoding="async" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { assetPath } from '~/utils/assetPath';

type SuccessId = 'tailim' | 'kkleannara';

const emit = defineEmits<{
    open: [id: SuccessId];
}>();

const { t, tm, rt } = useI18n();
const list = (key: string) => {
    const message = tm(key);
    return Array.isArray(message) ? message.map((item) => rt(item)) : [];
};

const successCases: Array<{
    id: SuccessId;
    messageKey: 'case1' | 'case2';
    image: string;
    delay: number;
}> = [
    { id: 'tailim', messageKey: 'case1', image: '/assets/images/success/tailm.webp', delay: 180 },
    { id: 'kkleannara', messageKey: 'case2', image: '/assets/images/success/kkleannara.webp', delay: 260 },
];
</script>
