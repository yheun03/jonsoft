<template>
<div ref="root" class="legacy-section-root">
<section>
    <div class="banner">
        <img src="/assets/images/banner/page-business.webp" alt="메인 페이지의 배너 이미지 입니다. AI와 CPU로 형상화된 이미지입니다.">
    </div>
    <div class="module-text">
        <div class="wrap">
            <p class="title-sub" data-aos="fade-up" data-aos-delay="200"><span class="gradient-text" v-html="i18n('business.module-text.overview.title-sub')"></span></p>
            <p class="title" data-aos="fade-up" data-aos-delay="400" v-html="i18n('business.module-text.overview.title')"></p>
            <p class="dscpt" data-aos="fade-up" data-aos-delay="600" v-html="i18n('business.module-text.overview.dscpt')"></p>
        </div>
    </div>
    <div class="solution">
        <div class="list-solution">
            <div class="item" data-aos="fade-up" data-aos-delay="800" data-modal-target="aps" data-modal-type="solution">
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="i18n('business.solutions.aps.title')"></p>
                        <p v-html="i18n('business.solutions.aps.subtitle')"></p>
                    </div>
                    <img :src="i18n('business.solutions.aps.thumbnail') || '/assets/images/solution/aps.webp'" :alt="i18n('business.solutions.aps.thumbnail.alt') || 'APS 솔루션의 썸네일 이미지입니다.'">
                </div>
                <div class="content">
                    <span class="badge" v-html="i18n('business.solutions.aps.badge')"></span>
                    <p v-html="i18n('business.solutions.aps.dscpt')"></p>
                    <a href="#"><span v-html="i18n('business.solutions.button')"></span></a>
                </div>
            </div>
            <div class="item" data-aos="fade-up" data-aos-delay="1000" data-modal-target="oms" data-modal-type="solution">
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="i18n('business.solutions.oms.title')"></p>
                        <p v-html="i18n('business.solutions.oms.subtitle')"></p>
                    </div>
                    <img :src="i18n('business.solutions.oms.thumbnail') || '/assets/images/solution/oms.webp'" :alt="i18n('business.solutions.oms.thumbnail.alt') || 'OMS 솔루션의 썸네일 이미지입니다.'">
                </div>
                <div class="content">
                    <span class="badge" v-html="i18n('business.solutions.oms.badge')"></span>
                    <p v-html="i18n('business.solutions.oms.dscpt')"></p>
                    <a href="#"><span v-html="i18n('business.solutions.button')"></span></a>
                </div>
            </div>
            <div class="item" data-aos="fade-up" data-aos-delay="1400" data-modal-target="fems" data-modal-type="solution">
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="i18n('business.solutions.fems.title')"></p>
                        <p v-html="i18n('business.solutions.fems.subtitle')"></p>
                    </div>
                    <img :src="i18n('business.solutions.fems.thumbnail') || '/assets/images/solution/fems.webp'" :alt="i18n('business.solutions.fems.thumbnail.alt') || 'FEMS 솔루션의 썸네일 이미지입니다.'">
                </div>
                <div class="content">
                    <span class="badge" v-html="i18n('business.solutions.fems.badge')"></span>
                    <p v-html="i18n('business.solutions.fems.dscpt')"></p>
                    <a href="#"><span v-html="i18n('business.solutions.button')"></span></a>
                </div>
            </div>
            <div class="item" data-aos="fade-up" data-aos-delay="1800" data-modal-target="scm" data-modal-type="solution">
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="i18n('business.solutions.scm.title')"></p>
                        <p v-html="i18n('business.solutions.scm.subtitle')"></p>
                    </div>
                    <img :src="i18n('business.solutions.scm.thumbnail') || '/assets/images/solution/scm.webp'" :alt="i18n('business.solutions.scm.thumbnail.alt') || 'SCM 솔루션의 썸네일 이미지입니다.'">
                </div>
                <div class="content">
                    <span class="badge" v-html="i18n('business.solutions.scm.badge')"></span>
                    <p v-html="i18n('business.solutions.scm.dscpt')"></p>
                    <a href="#"><span v-html="i18n('business.solutions.button')"></span></a>
                </div>
            </div>
            <div class="item" data-aos="fade-up" data-aos-delay="2200" data-modal-target="crm" data-modal-type="solution">
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="i18n('business.solutions.crm.title')"></p>
                        <p v-html="i18n('business.solutions.crm.subtitle')"></p>
                    </div>
                    <img :src="i18n('business.solutions.crm.thumbnail') || '/assets/images/solution/crm.webp'" :alt="i18n('business.solutions.crm.thumbnail.alt') || 'CRM 솔루션의 썸네일 이미지입니다.'">
                </div>
                <div class="content">
                    <span class="badge" v-html="i18n('business.solutions.crm.badge')"></span>
                    <p v-html="i18n('business.solutions.crm.dscpt')"></p>
                    <a href="#"><span v-html="i18n('business.solutions.button')"></span></a>
                </div>
            </div>
            <div class="item" data-aos="fade-up" data-aos-delay="2400" data-modal-target="mes" data-modal-type="solution">
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="i18n('business.solutions.mes.title')"></p>
                        <p v-html="i18n('business.solutions.mes.subtitle')"></p>
                    </div>
                    <img :src="i18n('business.solutions.mes.thumbnail') || '/assets/images/solution/mes.webp'" :alt="i18n('business.solutions.mes.thumbnail.alt') || 'MES 솔루션의 썸네일 이미지입니다.'">
                </div>
                <div class="content">
                    <span class="badge" v-html="i18n('business.solutions.mes.badge')"></span>
                    <p v-html="i18n('business.solutions.mes.dscpt')"></p>
                    <a href="#"><span v-html="i18n('business.solutions.button')"></span></a>
                </div>
            </div>
            <div class="item" data-aos="fade-up" data-aos-delay="2000" data-modal-target="wcs" data-modal-type="solution">
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="i18n('business.solutions.wcs.title')"></p>
                        <p v-html="i18n('business.solutions.wcs.subtitle')"></p>
                    </div>
                    <img :src="i18n('business.solutions.wcs.thumbnail') || '/assets/images/solution/wcs.webp'" :alt="i18n('business.solutions.wcs.thumbnail.alt') || 'WCS 솔루션의 썸네일 이미지입니다.'">
                </div>
                <div class="content">
                    <span class="badge" v-html="i18n('business.solutions.wcs.badge')"></span>
                    <p v-html="i18n('business.solutions.wcs.dscpt')"></p>
                    <a href="#"><span v-html="i18n('business.solutions.button')"></span></a>
                </div>
            </div>
            <div class="item" data-aos="fade-up" data-aos-delay="2000" data-modal-target="tms" data-modal-type="solution">
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="i18n('business.solutions.tms.title')"></p>
                        <p v-html="i18n('business.solutions.tms.subtitle')"></p>
                    </div>
                    <img :src="i18n('business.solutions.tms.thumbnail') || '/assets/images/solution/tms.webp'" :alt="i18n('business.solutions.tms.thumbnail.alt') || 'TMS 솔루션의 썸네일 이미지입니다.'">
                </div>
                <div class="content">
                    <span class="badge" v-html="i18n('business.solutions.tms.badge')"></span>
                    <p v-html="i18n('business.solutions.tms.dscpt')"></p>
                    <a href="#"><span v-html="i18n('business.solutions.button')"></span></a>
                </div>
            </div>
            <div class="item" data-aos="fade-up" data-aos-delay="1600" data-modal-target="ai" data-modal-type="solution">
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="i18n('business.solutions.ai.title')"></p>
                        <p v-html="i18n('business.solutions.ai.subtitle')"></p>
                    </div>
                    <img :src="i18n('business.solutions.ai.thumbnail') || '/assets/images/solution/ai.webp'" :alt="i18n('business.solutions.ai.thumbnail.alt') || 'AI 솔루션의 썸네일 이미지입니다.'">
                </div>
                <div class="content">
                    <span class="badge" v-html="i18n('business.solutions.ai.badge')"></span>
                    <p v-html="i18n('business.solutions.ai.dscpt')"></p>
                    <a href="#"><span v-html="i18n('business.solutions.button')"></span></a>
                </div>
            </div>
            <div class="item" data-aos="fade-up" data-aos-delay="1200" data-modal-target="wms" data-modal-type="solution">
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="i18n('business.solutions.wms.title')"></p>
                        <p v-html="i18n('business.solutions.wms.subtitle')"></p>
                    </div>
                    <img :src="i18n('business.solutions.wms.thumbnail') || '/assets/images/solution/wms.webp'" :alt="i18n('business.solutions.wms.thumbnail.alt') || 'WMS 솔루션의 썸네일 이미지입니다.'">
                </div>
                <div class="content">
                    <span class="badge" v-html="i18n('business.solutions.wms.badge')"></span>
                    <p v-html="i18n('business.solutions.wms.dscpt')"></p>
                    <a href="#"><span v-html="i18n('business.solutions.button')"></span></a>
                </div>
            </div>
        </div>
    </div>
    <div class="success" id="success">
        <div class="wrap">
            <h3 v-html="i18n('business.success.title')" data-aos="fade-up" data-aos-delay="200"></h3>
            <ul class="list-case">
                <li class="item" data-aos="fade-up" data-aos-delay="400" data-modal-target="tailim" data-modal-type="success">
                    <div class="content">
                        <p class="title" v-html="i18n('business.success.case1.title')"></p>
                        <ul class="dscpt" v-html="i18n('business.success.case1.dscpt')"></ul>
                    </div>
                    <img src="/assets/images/success/tailm.webp" alt="">
                </li>
                <li class="item" data-aos="fade-up" data-aos-delay="600" data-modal-target="kkleannara" data-modal-type="success">
                    <div class="content">
                        <p class="title" v-html="i18n('business.success.case2.title')"></p>
                        <ul class="dscpt" v-html="i18n('business.success.case2.dscpt')"></ul>
                    </div>
                    <img src="/assets/images/success/kkleannara.webp" alt="">
                </li>
            </ul>
        </div>
    </div>
    <CommonAskBanner />
</section>
<div class="modal">
    <div class="modal-content content-solution" data-modal-id="aps" data-modal-type="solution">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="i18n('business.solutions.aps.title')"></p>
                <p class="title-sub" v-html="i18n('business.solutions.aps.subTitle')"></p>
            </div>
            <ul>
                <li v-html="i18n('business.solutions.aps.badge')"></li>
            </ul>
            <a href="" class="btn type-round">닫기</a>
        </div>
        <div class="modal-body">
            <div class="abstract">
                <p v-html="i18n('business.solutions.aps.modal.abstract')"></p>
            </div>
            <div class="title">
                <span v-html="i18n('business.solutions.aps.modal.screen.title')"></span>
                <p v-html="i18n('business.solutions.aps.modal.screen.dscpt')"></p>
            </div>
            <div class="content">
                <img :src="i18n('business.solutions.aps.modal.src') || '/assets/images/modal/solution/aps.webp'" :alt="i18n('business.solutions.aps.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal">
    <div class="modal-content content-solution" data-modal-id="oms" data-modal-type="solution">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="i18n('business.solutions.oms.title')"></p>
                <p class="title-sub" v-html="i18n('business.solutions.oms.subTitle')"></p>
            </div>
            <ul>
                <li v-html="i18n('business.solutions.oms.badge')"></li>
            </ul>
            <a href="" class="btn type-round">닫기</a>
        </div>
        <div class="modal-body">
            <div class="abstract">
                <p v-html="i18n('business.solutions.oms.modal.abstract')"></p>
            </div>
            <div class="content">
                <img :src="i18n('business.solutions.oms.modal.src') || '/assets/images/modal/solution/oms.webp'" :alt="i18n('business.solutions.oms.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal">
    <div class="modal-content content-solution" data-modal-id="fems" data-modal-type="solution">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="i18n('business.solutions.fems.title')"></p>
                <p class="title-sub" v-html="i18n('business.solutions.fems.subTitle')"></p>
            </div>
            <ul>
                <li v-html="i18n('business.solutions.fems.badge')"></li>
            </ul>
            <a href="" class="btn type-round">닫기</a>
        </div>
        <div class="modal-body">
            <div class="abstract">
                <p v-html="i18n('business.solutions.fems.modal.abstract')"></p>
            </div>
            <div class="content">
                <img :src="i18n('business.solutions.fems.modal.src') || '/assets/images/modal/solution/fems.webp'" :alt="i18n('business.solutions.fems.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal">
    <div class="modal-content content-solution" data-modal-id="scm" data-modal-type="solution">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="i18n('business.solutions.scm.title')"></p>
                <p class="title-sub" v-html="i18n('business.solutions.scm.subTitle')"></p>
            </div>
            <ul>
                <li v-html="i18n('business.solutions.scm.badge')"></li>
            </ul>
            <a href="" class="btn type-round">닫기</a>
        </div>
        <div class="modal-body">
            <div class="abstract">
                <p v-html="i18n('business.solutions.scm.modal.abstract')"></p>
            </div>
            <div class="content">
                <img :src="i18n('business.solutions.scm.modal.src') || '/assets/images/modal/solution/scm.webp'" :alt="i18n('business.solutions.scm.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal">
    <div class="modal-content content-solution" data-modal-id="crm" data-modal-type="solution">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="i18n('business.solutions.crm.title')"></p>
                <p class="title-sub" v-html="i18n('business.solutions.crm.subTitle')"></p>
            </div>
            <ul>
                <li v-html="i18n('business.solutions.crm.badge')"></li>
            </ul>
            <a href="" class="btn type-round">닫기</a>
        </div>
        <div class="modal-body">
            <div class="abstract">
                <p v-html="i18n('business.solutions.crm.modal.abstract')"></p>
            </div>
            <div class="title">
                <span v-html="i18n('business.solutions.crm.modal.screen.title')"></span>
                <p v-html="i18n('business.solutions.crm.modal.screen.dscpt')"></p>
            </div>
            <div class="content">
                <img :src="i18n('business.solutions.crm.modal.src') || '/assets/images/modal/solution/crm.webp'" :alt="i18n('business.solutions.crm.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal">
    <div class="modal-content content-solution" data-modal-id="mes" data-modal-type="solution">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="i18n('business.solutions.mes.title')"></p>
                <p class="title-sub" v-html="i18n('business.solutions.mes.subTitle')"></p>
            </div>
            <ul>
                <li v-html="i18n('business.solutions.mes.badge')"></li>
            </ul>
            <a href="" class="btn type-round">닫기</a>
        </div>
        <div class="modal-body">
            <div class="abstract">
                <p v-html="i18n('business.solutions.mes.modal.abstract')"></p>
            </div>
            <div class="content">
                <img :src="i18n('business.solutions.mes.modal.src') || '/assets/images/modal/solution/mes.webp'" :alt="i18n('business.solutions.mes.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal">
    <div class="modal-content content-solution" data-modal-id="wcs" data-modal-type="solution">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="i18n('business.solutions.wcs.title')"></p>
                <p class="title-sub" v-html="i18n('business.solutions.wcs.subTitle')"></p>
            </div>
            <ul>
                <li v-html="i18n('business.solutions.wcs.badge')"></li>
            </ul>
            <a href="" class="btn type-round">닫기</a>
        </div>
        <div class="modal-body">
            <div class="abstract">
                <p v-html="i18n('business.solutions.wcs.modal.abstract')"></p>
            </div>
            <div class="title">
                <span v-html="i18n('business.solutions.wcs.modal.screen.title')"></span>
                <p v-html="i18n('business.solutions.wcs.modal.screen.dscpt')"></p>
            </div>
            <div class="content">
                <img :src="i18n('business.solutions.wcs.modal.src') || '/assets/images/modal/solution/wcs.webp'" :alt="i18n('business.solutions.wcs.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal">
    <div class="modal-content content-solution" data-modal-id="tms" data-modal-type="solution">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="i18n('business.solutions.tms.title')"></p>
                <p class="title-sub" v-html="i18n('business.solutions.tms.subTitle')"></p>
            </div>
            <ul>
                <li v-html="i18n('business.solutions.tms.badge')"></li>
            </ul>
            <a href="" class="btn type-round">닫기</a>
        </div>
        <div class="modal-body">
            <div class="abstract">
                <p v-html="i18n('business.solutions.tms.modal.abstract')"></p>
            </div>
            <div class="content">
                <img :src="i18n('business.solutions.tms.modal.src') || '/assets/images/modal/solution/tms.webp'" :alt="i18n('business.solutions.tms.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal">
    <div class="modal-content content-solution" data-modal-id="ai" data-modal-type="solution">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="i18n('business.solutions.ai.title')"></p>
                <p class="title-sub" v-html="i18n('business.solutions.ai.subTitle')"></p>
            </div>
            <ul>
                <li v-html="i18n('business.solutions.ai.badge')"></li>
            </ul>
            <a href="" class="btn type-round">닫기</a>
        </div>
        <div class="modal-body">
            <div class="abstract">
                <p v-html="i18n('business.solutions.ai.modal.abstract')"></p>
            </div>
            <div class="content">
                <img :src="i18n('business.solutions.ai.modal.src') || '/assets/images/modal/solution/ai.webp'" :alt="i18n('business.solutions.ai.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal">
    <div class="modal-content content-solution" data-modal-id="wms" data-modal-type="solution">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="i18n('business.solutions.wms.title')"></p>
                <p class="title-sub" v-html="i18n('business.solutions.wms.subTitle')"></p>
            </div>
            <ul>
                <li v-html="i18n('business.solutions.wms.badge')"></li>
            </ul>
            <a href="" class="btn type-round">닫기</a>
        </div>
        <div class="modal-body">
            <div class="abstract">
                <p v-html="i18n('business.solutions.wms.modal.abstract')"></p>
            </div>
            <div class="content">
                <img :src="i18n('business.solutions.wms.modal.src') || '/assets/images/modal/solution/wms.webp'" :alt="i18n('business.solutions.wms.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal">
    <div class="modal-content content-success" data-modal-id="tailim" data-modal-type="success">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="i18n('business.success.case1.title')"></p>
            </div>
            <ul v-html="i18n('business.success.case1.dscpt')"></ul>
            <a href="" class="btn type-round">닫기</a>
        </div>
        <div class="modal-body">
            <div class="content">
                <img :src="i18n('business.success.case1.modal.src') || '/assets/images/modal/success/tailim.webp'" :alt="i18n('business.success.case1.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal">
    <div class="modal-content content-success" data-modal-id="kkleannara" data-modal-type="success">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="i18n('business.success.case2.title')"></p>
            </div>
            <ul v-html="i18n('business.success.case2.dscpt')"></ul>
            <a href="" class="btn type-round">닫기</a>
        </div>
        <div class="modal-body">
            <div class="content">
                <img :src="i18n('business.success.case2.modal.src') || '/assets/images/modal/success/kleannara.webp'" :alt="i18n('business.success.case2.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script setup lang="ts">
import { getI18nNamespaces } from 'core/utils/route-i18n'
import { useLegacySectionRoot } from 'core/composables/useLegacySectionRoot'
import CommonAskBanner from '~/components/section/CommonAskBanner.vue'

const { i18n } = useLocaleMessage()
const root = ref<HTMLElement | null>(null)
useLegacySectionRoot(root, getI18nNamespaces('/business'))
</script>
