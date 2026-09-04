<template>
    <nav class="tab page-navigator" :aria-label="label">
        <ul class="page-navigator__list" :role="type === 'anchor' ? 'tablist' : undefined">
            <li
                v-for="(item, index) in items"
                :key="item.id"
                class="page-navigator__item"
                :class="{ active: currentItem === item.id }"
                :data-aos="animated ? 'fade-up' : undefined"
                :data-aos-delay="animated ? (index + 1) * 100 : undefined"
            >
                <a v-if="type === 'scroll'" class="page-navigator__link" :href="item.href" @click.prevent="scrollToSection(item)">
                    {{ item.label }}
                </a>
                <button
                    v-else
                    :id="`${idPrefix}-tab-${item.id}`"
                    type="button"
                    role="tab"
                    class="page-navigator__button"
                    :aria-selected="modelValue === item.id"
                    :aria-controls="item.panelId"
                    @click="selectItem(item.id)"
                >
                    {{ item.label }}
                </button>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
export type PageNavigatorType = 'scroll' | 'anchor';

export interface PageNavigatorItem {
    id: string;
    label: string;
    href?: string;
    panelId?: string;
}

const props = withDefaults(
    defineProps<{
        type: PageNavigatorType;
        items: PageNavigatorItem[];
        label: string;
        modelValue?: string;
        activeId?: string;
        idPrefix?: string;
        animated?: boolean;
    }>(),
    {
        modelValue: '',
        activeId: '',
        idPrefix: 'navigator',
        animated: false,
    },
);

const emit = defineEmits<{
    'update:modelValue': [value: string];
    change: [value: string];
}>();

const currentItem = computed(() => (props.type === 'anchor' ? props.modelValue : props.activeId));

const selectItem = (id: string) => {
    emit('update:modelValue', id);
    emit('change', id);
};

const scrollToSection = (item: PageNavigatorItem) => {
    if (!item.href) return;

    const section = document.querySelector<HTMLElement>(item.href);
    if (!section) return;

    const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0;
    const top = window.scrollY + section.getBoundingClientRect().top - headerHeight - 20;

    window.scrollTo({ top, behavior: 'smooth' });
    section.focus({ preventScroll: true });
    emit('change', item.id);
};
</script>
