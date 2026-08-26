<template>
    <div class="modal active" @click.self="emit('close')">
        <div class="modal-content" :class="`content-${type}`">
            <div class="modal-header">
                <div class="heading">
                    <p class="title" v-html="t(`${messageRoot}.title`)"></p>
                    <p v-if="type === 'solution'" class="title-sub" v-html="t(`${messageRoot}.subtitle`)"></p>
                </div>
                <ul>
                    <li v-for="tag in tags" :key="tag" v-html="tag"></li>
                </ul>
                <a href="" class="btn type-round" @click.prevent="emit('close')">닫기</a>
            </div>
            <div class="modal-body">
                <div v-if="type === 'solution'" class="abstract">
                    <p v-html="t(`${messageRoot}.modal.abstract`)"></p>
                </div>
                <div v-if="hasScreenDescription" class="title">
                    <span v-html="t(`${messageRoot}.modal.screen.title`)"></span>
                    <p v-html="t(`${messageRoot}.modal.screen.dscpt`)"></p>
                </div>
                <div class="content">
                    <img :src="assetPath(t(`${messageRoot}.modal.src`))" :alt="t(`${messageRoot}.modal.alt`)" loading="lazy" decoding="async" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { assetPath } from '~/utils/assetPath';

type ModalType = 'solution' | 'success';
type ModalId = 'aps' | 'oms' | 'fems' | 'scm' | 'crm' | 'mes' | 'wcs' | 'tms' | 'ai' | 'wms' | 'tailim' | 'kkleannara';
type SuccessId = 'tailim' | 'kkleannara';

const props = defineProps<{
    type: ModalType;
    id: ModalId;
}>();

const emit = defineEmits<{
    close: [];
}>();

const { t, tm, rt } = useI18n();
const successMessageKeys: Record<SuccessId, 'case1' | 'case2'> = {
    tailim: 'case1',
    kkleannara: 'case2',
};

const messageRoot = computed(() => {
    if (props.type === 'solution') return `business.solutions.${props.id}`;
    return `business.success.${successMessageKeys[props.id as SuccessId]}`;
});

const tags = computed(() => {
    if (props.type === 'solution') return [t(`${messageRoot.value}.badge`)];

    const message = tm(`${messageRoot.value}.dscpt`);
    return Array.isArray(message) ? message.map((item) => rt(item)) : [];
});

const hasScreenDescription = computed(() => props.type === 'solution' && ['aps', 'crm', 'wcs'].includes(props.id));

const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') emit('close');
};

onMounted(() => document.addEventListener('keydown', onKeydown));
onUnmounted(() => document.removeEventListener('keydown', onKeydown));
</script>
