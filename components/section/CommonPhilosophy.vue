<template>
    <div class="philosophy">
        <div class="wrap full">
            <h3 data-aos="fade-up" data-aos-delay="100" v-html="t('common.philosophy.title')"></h3>
            <div class="list-philosophy">
                <div class="item" data-aos="fade-up" data-aos-delay="180">
                    <img data-aos="fade-up" src="/assets/images/philosophy-1.webp" alt="">
                    <div class="content">
                        <p data-aos="fade-up" data-aos-delay="260">{{ t('common.philosophy.talent.title') }}</p>
                        <dl>
                            <dt data-aos="fade-up" data-aos-delay="340">{{ t('common.philosophy.talent.subtitle') }}
                            </dt>
                            <dd data-aos="fade-up" data-aos-delay="420">{{ t('common.philosophy.talent.content.0') }}
                            </dd>
                            <dd data-aos="fade-up" data-aos-delay="500">{{ t('common.philosophy.talent.content.1') }}
                            </dd>
                            <dd data-aos="fade-up" data-aos-delay="560">{{ t('common.philosophy.talent.content.2') }}
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="item" data-aos="fade-up" data-aos-delay="420">
                    <img data-aos="fade-up" src="/assets/images/philosophy-2.webp" alt="">
                    <div class="content">
                        <p data-aos="fade-up" data-aos-delay="500">{{ t('common.philosophy.value.title') }}</p>
                        <dl>
                            <dt data-aos="fade-up" data-aos-delay="560">{{ t('common.philosophy.value.subtitle') }}
                            </dt>
                            <dd data-aos="fade-up" data-aos-delay="580">{{ t('common.philosophy.value.content.0') }}
                            </dd>
                            <dd data-aos="fade-up" data-aos-delay="600">{{ t('common.philosophy.value.content.1') }}
                            </dd>
                            <dd data-aos="fade-up" data-aos-delay="600">{{ t('common.philosophy.value.content.2') }}
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="item" data-aos="fade-up" data-aos-delay="580">
                    <img data-aos="fade-up" src="/assets/images/philosophy-3.webp" alt="">
                    <div class="content">
                        <p data-aos="fade-up" data-aos-delay="600">{{ t('common.philosophy.culture.title') }}</p>
                        <dl>
                            <dt data-aos="fade-up" data-aos-delay="600">{{ t('common.philosophy.culture.subtitle') }}
                            </dt>
                            <dd data-aos="fade-up" data-aos-delay="600">{{ t('common.philosophy.culture.content.0') }}
                            </dd>
                            <dd data-aos="fade-up" data-aos-delay="600">{{ t('common.philosophy.culture.content.1') }}
                            </dd>
                            <dd data-aos="fade-up" data-aos-delay="600">{{ t('common.philosophy.culture.content.2') }}
                            </dd>
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
