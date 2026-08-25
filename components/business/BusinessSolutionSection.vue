<template>
    <div class="solution">
        <div class="list-solution">
            <div
                v-for="solution in solutions"
                :key="solution.id"
                class="item"
                data-aos="fade-up"
                :data-aos-delay="solution.delay"
                @click="emit('open', solution.id)"
            >
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="t(`business.solutions.${solution.id}.title`)"></p>
                        <p v-html="t(`business.solutions.${solution.id}.subtitle`)"></p>
                    </div>
                    <img :src="assetPath(t(`business.solutions.${solution.id}.thumbnail`))" :alt="t(`business.solutions.${solution.id}.alt`)" />
                </div>
                <div class="content">
                    <span class="badge" v-html="t(`business.solutions.${solution.id}.badge`)"></span>
                    <p v-html="t(`business.solutions.${solution.id}.dscpt`)"></p>
                    <a href="#" @click.prevent>
                        <span v-html="t('business.solutions.button')"></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { assetPath } from '~/utils/assetPath';

type SolutionId = 'aps' | 'oms' | 'fems' | 'scm' | 'crm' | 'mes' | 'wcs' | 'tms' | 'ai' | 'wms';

const emit = defineEmits<{
    open: [id: SolutionId];
}>();

const { t } = useI18n();

const solutions: Array<{ id: SolutionId; delay: number }> = [
    { id: 'aps', delay: 340 },
    { id: 'oms', delay: 420 },
    { id: 'fems', delay: 560 },
    { id: 'scm', delay: 600 },
    { id: 'crm', delay: 600 },
    { id: 'mes', delay: 600 },
    { id: 'wcs', delay: 600 },
    { id: 'tms', delay: 600 },
    { id: 'ai', delay: 580 },
    { id: 'wms', delay: 500 },
];
</script>
