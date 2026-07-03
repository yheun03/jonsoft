<template>
    <div class="philosophy">
        <div class="wrap full">
            <h3 data-aos="fade-up" data-aos-delay="200" v-html="t('common.philosophy.title')"></h3>
            <div class="list-philosophy">
                <div class="item" data-aos="fade-up" data-aos-delay="400">
                    <img data-aos="fade-up" src="/assets/images/philosophy-1.webp" alt="">
                    <div class="content">
                        <p data-aos="fade-up" data-aos-delay="600">{{ t('common.philosophy.talent.title') }}</p>
                        <dl>
                            <dt data-aos="fade-up" data-aos-delay="800">{{ t('common.philosophy.talent.subtitle') }}</dt>
                            <dd data-aos="fade-up" data-aos-delay="1000">{{ t('common.philosophy.talent.content.0') }}</dd>
                            <dd data-aos="fade-up" data-aos-delay="1200">{{ t('common.philosophy.talent.content.1') }}</dd>
                            <dd data-aos="fade-up" data-aos-delay="1400">{{ t('common.philosophy.talent.content.2') }}</dd>
                        </dl>
                    </div>
                </div>
                <div class="item" data-aos="fade-up" data-aos-delay="1000">
                    <img data-aos="fade-up" src="/assets/images/philosophy-2.webp" alt="">
                    <div class="content">
                        <p data-aos="fade-up" data-aos-delay="1200">{{ t('common.philosophy.value.title') }}</p>
                        <dl>
                            <dt data-aos="fade-up" data-aos-delay="1400">{{ t('common.philosophy.value.subtitle') }}</dt>
                            <dd data-aos="fade-up" data-aos-delay="1600">{{ t('common.philosophy.value.content.0') }}</dd>
                            <dd data-aos="fade-up" data-aos-delay="1800">{{ t('common.philosophy.value.content.1') }}</dd>
                            <dd data-aos="fade-up" data-aos-delay="2000">{{ t('common.philosophy.value.content.2') }}</dd>
                        </dl>
                    </div>
                </div>
                <div class="item" data-aos="fade-up" data-aos-delay="1600">
                    <img data-aos="fade-up" src="/assets/images/philosophy-3.webp" alt="">
                    <div class="content">
                        <p data-aos="fade-up" data-aos-delay="1800">{{ t('common.philosophy.culture.title') }}</p>
                        <dl>
                            <dt data-aos="fade-up" data-aos-delay="2000">{{ t('common.philosophy.culture.subtitle') }}</dt>
                            <dd data-aos="fade-up" data-aos-delay="2200">{{ t('common.philosophy.culture.content.0') }}</dd>
                            <dd data-aos="fade-up" data-aos-delay="2400">{{ t('common.philosophy.culture.content.1') }}</dd>
                            <dd data-aos="fade-up" data-aos-delay="2600">{{ t('common.philosophy.culture.content.2') }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
