<template>
    <div class="modal active" @click.self="emit('close')">
        <div ref="dialog" class="modal-content" :class="`content-${type}`" role="dialog" aria-modal="true" :aria-labelledby="titleId" tabindex="-1">
            <div class="modal-header">
                <div class="heading">
                    <h2 :id="titleId" class="title" v-html="t(`${messageRoot}.title`)"></h2>
                    <p v-if="type === 'solution'" class="title-sub" v-html="t(`${messageRoot}.subtitle`)"></p>
                </div>
                <ul>
                    <li v-for="tag in tags" :key="tag" v-html="tag"></li>
                </ul>
                <button ref="closeButton" type="button" class="btn type-round" @click="emit('close')">{{ closeLabel }}</button>
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
import type { SolutionId, SuccessId } from '~/types/business';
import { assetPath } from '~/utils/assetPath';

const props = defineProps<{ type: 'solution'; id: SolutionId } | { type: 'success'; id: SuccessId }>();

const emit = defineEmits<{
    close: [];
}>();

const { t, tm, rt, locale } = useI18n();
const dialog = ref<HTMLElement | null>(null);
const closeButton = ref<HTMLButtonElement | null>(null);
const titleId = computed(() => `business-modal-title-${props.type}-${props.id}`);
const closeLabels = { ko: '닫기', en: 'Close', vi: 'Đóng' };
const closeLabel = computed(() => closeLabels[locale.value as keyof typeof closeLabels]);
let previouslyFocused: HTMLElement | null = null;
const backgroundElements: HTMLElement[] = [];
const successMessageKeys: Record<SuccessId, 'case1' | 'case2'> = {
    tailim: 'case1',
    kkleannara: 'case2',
};

const messageRoot = computed(() => {
    if (props.type === 'solution') return `business.solutions.${props.id}`;
    return `business.success.${successMessageKeys[props.id]}`;
});

const tags = computed(() => {
    if (props.type === 'solution') return [t(`${messageRoot.value}.badge`)];

    const message = tm(`${messageRoot.value}.dscpt`);
    return Array.isArray(message) ? message.map((item) => rt(item)) : [];
});

const hasScreenDescription = computed(() => props.type === 'solution' && ['aps', 'crm', 'wcs'].includes(props.id));

const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        emit('close');
        return;
    }
    if (event.key !== 'Tab' || !dialog.value) return;

    const focusable = Array.from(
        dialog.value.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
    ).filter((element) => !element.hasAttribute('hidden'));
    if (!focusable.length) {
        event.preventDefault();
        dialog.value.focus();
        return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
};

onMounted(async () => {
    previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.querySelectorAll<HTMLElement>('.app-header, .app-main > section, .floating, .app-footer').forEach((element) => {
        element.inert = true;
        backgroundElements.push(element);
    });
    document.addEventListener('keydown', onKeydown);
    await nextTick();
    closeButton.value?.focus();
});
onUnmounted(() => {
    document.removeEventListener('keydown', onKeydown);
    backgroundElements.forEach((element) => (element.inert = false));
    previouslyFocused?.focus();
});
</script>
