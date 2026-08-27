<template>
    <div class="philosophy">
        <div class="wrap full">
            <h2 data-aos="fade-up" data-aos-delay="100" v-html="t('common.philosophy.title')"></h2>
            <div class="list-philosophy">
                <div class="item" data-aos="fade-up" data-aos-delay="100">
                    <img src="/assets/images/philosophy-1.webp" alt="" loading="lazy" decoding="async" />
                    <div class="content">
                        <p>{{ t('common.philosophy.talent.title') }}</p>
                        <dl>
                            <dt>{{ t('common.philosophy.talent.subtitle') }}</dt>
                            <dd>{{ t('common.philosophy.talent.content.0') }}</dd>
                            <dd>{{ t('common.philosophy.talent.content.1') }}</dd>
                            <dd>{{ t('common.philosophy.talent.content.2') }}</dd>
                        </dl>
                    </div>
                </div>
                <div class="item" data-aos="fade-up" data-aos-delay="200">
                    <img src="/assets/images/philosophy-2.webp" alt="" loading="lazy" decoding="async" />
                    <div class="content">
                        <p>{{ t('common.philosophy.value.title') }}</p>
                        <dl>
                            <dt>{{ t('common.philosophy.value.subtitle') }}</dt>
                            <dd>{{ t('common.philosophy.value.content.0') }}</dd>
                            <dd>{{ t('common.philosophy.value.content.1') }}</dd>
                            <dd>{{ t('common.philosophy.value.content.2') }}</dd>
                        </dl>
                    </div>
                </div>
                <div class="item" data-aos="fade-up" data-aos-delay="300">
                    <img src="/assets/images/philosophy-3.webp" alt="" loading="lazy" decoding="async" />
                    <div class="content">
                        <p>{{ t('common.philosophy.culture.title') }}</p>
                        <dl>
                            <dt>{{ t('common.philosophy.culture.subtitle') }}</dt>
                            <dd>{{ t('common.philosophy.culture.content.0') }}</dd>
                            <dd>{{ t('common.philosophy.culture.content.1') }}</dd>
                            <dd>{{ t('common.philosophy.culture.content.2') }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
