<template>
<div ref="root" class="legacy-section-root">
<section>
    <div class="banner set-bg-bottom">
        <div class="module-text">
            <div class="wrap">
                <p class="title-sub"><span class="gradient-text" data-aos="fade-up" data-aos-delay="200" v-html="i18n('about.banner.title-sub')"></span></p>
                <p class="title" data-aos="fade-up" data-aos-delay="400" v-html="i18n('about.banner.title')"></p>
                <ul class="dscpt" data-aos="fade-up" data-aos-delay="600" v-html="i18n('about.banner.dscpt')"></ul>
            </div>
        </div>
        <img src="/assets/images/banner/page-about.webp" alt="메인 페이지의 배너 이미지 입니다. AI와 CPU로 형상화된 이미지입니다.">
    </div>
    <div class="module-text">
        <div class="wrap">
            <p class="title-sub" data-aos="fade-up" data-aos-delay="800" ><span class="gradient-text" v-html="i18n('about.module-text.overview.title-sub')"></span></p>
            <p class="title" data-aos="fade-up" data-aos-delay="1000" v-html="i18n('about.module-text.overview.title')"></p>
            <p class="dscpt" data-aos="fade-up" data-aos-delay="1200" v-html="i18n('about.module-text.overview.dscpt')"></p>
        </div>
    </div>
    <div class="summary">
        <div class="wrap">
            <ul>
                <li data-aos="fade-up" data-aos-delay="200">
                    <img src="/assets/icons/120/ic-building.svg" alt="">
                    <div class="content">
                        <p class="dscpt"><span>10+</span></p>
                        <p class="title" v-html="i18n('about.summary.item-01.title')"></p>
                        <span class="eyebrow" v-html="i18n('about.summary.item-01.standard')"></span>
                    </div>
                </li>
                <li data-aos="fade-up" data-aos-delay="400">
                    <img src="/assets/icons/120/ic-factory.svg" alt="">
                    <div class="content">
                        <p class="dscpt"><span>71+</span></p>
                        <p class="title" v-html="i18n('about.summary.item-02.title')"></p>
                        <span class="eyebrow" v-html="i18n('about.summary.item-02.standard')"></span>
                    </div>
                </li>
                <li data-aos="fade-up" data-aos-delay="600">
                    <img src="/assets/icons/120/ic-partner.svg" alt="">
                    <div class="content">
                        <p class="dscpt"><span>20</span></p>
                        <p class="title" v-html="i18n('about.summary.item-03.title')"></p>
                        <span class="eyebrow" v-html="i18n('about.summary.item-03.standard')"></span>
                    </div>
                </li>
                <li data-aos="fade-up" data-aos-delay="800">
                    <img src="/assets/icons/120/ic-hand.svg" alt="">
                    <div class="content">
                        <p class="dscpt"><span>12</span></p>
                        <p class="title" v-html="i18n('about.summary.item-04.title')"></p>
                        <span class="eyebrow" v-html="i18n('about.summary.item-04.standard')"></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="awards">
        <p data-aos="fade-up" data-aos-delay="200" v-html="i18n('about.awards.title')" class="title"></p>
        <p data-aos="fade-up" data-aos-delay="400" v-html="i18n('about.awards.dscpt')" class="title-sub"></p>
        <div class="list-awards">
            <div data-aos="fade-up" data-aos-delay="600" class="item item-01">
                <div class="thumbnail">
                    <img data-aos="fade-up" src="/assets/images/awards/img01-1.webp" alt="">
                    <img data-aos="fade-up" src="/assets/images/awards/img01-2.webp" alt="">
                </div>
                <div class="content">
                    <p data-aos="fade-up" v-html="i18n('about.awards.item-01.title')"></p>
                </div>
            </div>
            <div data-aos="fade-up" data-aos-delay="800" class="item item-02">
                <div class="thumbnail">
                    <img data-aos="fade-up" src="/assets/images/awards/img02-1.webp" alt="">
                    <img data-aos="fade-up" src="/assets/images/awards/img02-2.webp" alt="">
                </div>
                <div class="content">
                    <p data-aos="fade-up" v-html="i18n('about.awards.item-02.title')"></p>
                </div>
            </div>
            <div data-aos="fade-up" data-aos-delay="1200" class="item item-03">
                <div class="thumbnail">
                    <img data-aos="fade-up" src="/assets/images/awards/img03-1.webp" alt="">
                    <img data-aos="fade-up" src="/assets/images/awards/img03-2.webp" alt="">
                </div>
                <div class="content">
                    <p data-aos="fade-up" v-html="i18n('about.awards.item-03.title')"></p>
                </div>
            </div>
            <div data-aos="fade-up" data-aos-delay="1000" class="item item-04">
                <div class="thumbnail">
                    <img data-aos="fade-up" src="/assets/images/awards/img04-1.webp" alt="">
                    <img data-aos="fade-up" src="/assets/images/awards/img04-2.webp" alt="">
                </div>
                <div class="content">
                    <p data-aos="fade-up" v-html="i18n('about.awards.item-04.title')"></p>
                </div>
            </div>
        </div>
    </div>
    <div class="module-text">
        <div class="wrap">
            <p class="title-sub"><span class="gradient-text" data-aos="fade-up" data-aos-delay="200" v-html="i18n('about.module-text.feature.title')"></span></p>
            <p class="title" data-aos="fade-up" data-aos-delay="400" v-html="i18n('about.module-text.feature.dscpt')"></p>
        </div>
    </div>
    <div class="feature">
        <div class="wrap">
            <div class="list-feature">
                <div data-aos="fade-up" data-aos-delay="600" class="item item-01">
                    <div class="front">
                        <p class="title" data-aos="fade-up" data-aos-delay="700" v-html="i18n('about.feature.item-01.title')"></p>
                    </div>
                    <div class="back">
                        <ul v-html="i18n('about.feature.item-01.content')"></ul>
                        <a href="/business#success" v-html="i18n('about.feature.button')"></a>
                    </div>
                </div>
                <div data-aos="fade-up" data-aos-delay="800" class="item item-02">
                    <div class="front">
                        <p class="title" data-aos="fade-up" data-aos-delay="900" v-html="i18n('about.feature.item-02.title')"></p>
                    </div>
                    <div class="back">
                        <ul v-html="i18n('about.feature.item-02.content')"></ul>
                        <a href="/business#success" v-html="i18n('about.feature.button')"></a>
                    </div>
                </div>
                <div data-aos="fade-up" data-aos-delay="1000" class="item item-03">
                    <div class="front">
                        <p class="title" data-aos="fade-up" data-aos-delay="1100" v-html="i18n('about.feature.item-03.title')"></p>
                    </div>
                    <div class="back">
                        <ul v-html="i18n('about.feature.item-03.content')"></ul>
                        <a href="/business#success" v-html="i18n('about.feature.button')"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
            <div class="history">
        <div class="wrap">
            <p class="title" data-aos="fade-up" data-aos-delay="200" v-html="i18n('history.banner.title')"></p>
            <div class="history-timeline">
                <div class="history-year">
                    <ul></ul>
                </div>
                <ul class="history-content" data-aos="fade-up" data-aos-delay="900"></ul>
            </div>
        </div>
    </div>
    <CommonPhilosophy />
    <CommonAskBanner />
</section>
</div>
</template>

<script setup lang="ts">
import { getI18nNamespaces } from 'core/utils/route-i18n'
import { useLegacySectionRoot } from 'core/composables/useLegacySectionRoot'
import CommonAskBanner from '~/components/section/CommonAskBanner.vue'
import CommonPhilosophy from '~/components/section/CommonPhilosophy.vue'

const { i18n } = useLocaleMessage()
const root = ref<HTMLElement | null>(null)
useLegacySectionRoot(root, getI18nNamespaces('/about'))
</script>
