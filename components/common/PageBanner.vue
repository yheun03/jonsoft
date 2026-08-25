<template>
    <div class="banner" :class="{ 'set-bg-bottom': bottomAligned }">
        <slot />
        <img :src="assetPath(src)" :alt="alt" />
    </div>
</template>

<script setup lang="ts">
import { assetPath } from '~/utils/assetPath';

withDefaults(
    defineProps<{
        src: string;
        alt?: string;
        bottomAligned?: boolean;
    }>(),
    {
        alt: '',
        bottomAligned: false,
    },
);
</script>
