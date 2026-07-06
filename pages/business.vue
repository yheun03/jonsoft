<template>
<section ref="root" class="legacy-section-root">
    <div class="banner">
        <img src="/assets/images/banner/page-business.webp" alt="메인 페이지의 배너 이미지 입니다. AI와 CPU로 형상화된 이미지입니다.">
    </div>
    <div class="module-text">
        <div class="wrap">
            <p class="title-sub" data-aos="fade-up" data-aos-delay="200"><span class="gradient-text" v-html="t('business.module-text.overview.title-sub')"></span></p>
            <p class="title" data-aos="fade-up" data-aos-delay="400" v-html="t('business.module-text.overview.title')"></p>
            <p class="dscpt" data-aos="fade-up" data-aos-delay="600" v-html="t('business.module-text.overview.dscpt')"></p>
        </div>
    </div>
    <div class="solution">
        <div class="list-solution">
            <div class="item" data-aos="fade-up" data-aos-delay="800" @click="openModal('solution', 'aps')">
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="t('business.solutions.aps.title')"></p>
                        <p v-html="t('business.solutions.aps.subtitle')"></p>
                    </div>
                    <img :src="t('business.solutions.aps.thumbnail') || '/assets/images/solution/aps.webp'" :alt="t('business.solutions.aps.thumbnail.alt') || 'APS 솔루션의 썸네일 이미지입니다.'">
                </div>
                <div class="content">
                    <span class="badge" v-html="t('business.solutions.aps.badge')"></span>
                    <p v-html="t('business.solutions.aps.dscpt')"></p>
                    <a href="#" @click.prevent><span v-html="t('business.solutions.button')"></span></a>
                </div>
            </div>
            <div class="item" data-aos="fade-up" data-aos-delay="1000" @click="openModal('solution', 'oms')">
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="t('business.solutions.oms.title')"></p>
                        <p v-html="t('business.solutions.oms.subtitle')"></p>
                    </div>
                    <img :src="t('business.solutions.oms.thumbnail') || '/assets/images/solution/oms.webp'" :alt="t('business.solutions.oms.thumbnail.alt') || 'OMS 솔루션의 썸네일 이미지입니다.'">
                </div>
                <div class="content">
                    <span class="badge" v-html="t('business.solutions.oms.badge')"></span>
                    <p v-html="t('business.solutions.oms.dscpt')"></p>
                    <a href="#" @click.prevent><span v-html="t('business.solutions.button')"></span></a>
                </div>
            </div>
            <div class="item" data-aos="fade-up" data-aos-delay="1400" @click="openModal('solution', 'fems')">
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="t('business.solutions.fems.title')"></p>
                        <p v-html="t('business.solutions.fems.subtitle')"></p>
                    </div>
                    <img :src="t('business.solutions.fems.thumbnail') || '/assets/images/solution/fems.webp'" :alt="t('business.solutions.fems.thumbnail.alt') || 'FEMS 솔루션의 썸네일 이미지입니다.'">
                </div>
                <div class="content">
                    <span class="badge" v-html="t('business.solutions.fems.badge')"></span>
                    <p v-html="t('business.solutions.fems.dscpt')"></p>
                    <a href="#" @click.prevent><span v-html="t('business.solutions.button')"></span></a>
                </div>
            </div>
            <div class="item" data-aos="fade-up" data-aos-delay="1800" @click="openModal('solution', 'scm')">
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="t('business.solutions.scm.title')"></p>
                        <p v-html="t('business.solutions.scm.subtitle')"></p>
                    </div>
                    <img :src="t('business.solutions.scm.thumbnail') || '/assets/images/solution/scm.webp'" :alt="t('business.solutions.scm.thumbnail.alt') || 'SCM 솔루션의 썸네일 이미지입니다.'">
                </div>
                <div class="content">
                    <span class="badge" v-html="t('business.solutions.scm.badge')"></span>
                    <p v-html="t('business.solutions.scm.dscpt')"></p>
                    <a href="#" @click.prevent><span v-html="t('business.solutions.button')"></span></a>
                </div>
            </div>
            <div class="item" data-aos="fade-up" data-aos-delay="2200" @click="openModal('solution', 'crm')">
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="t('business.solutions.crm.title')"></p>
                        <p v-html="t('business.solutions.crm.subtitle')"></p>
                    </div>
                    <img :src="t('business.solutions.crm.thumbnail') || '/assets/images/solution/crm.webp'" :alt="t('business.solutions.crm.thumbnail.alt') || 'CRM 솔루션의 썸네일 이미지입니다.'">
                </div>
                <div class="content">
                    <span class="badge" v-html="t('business.solutions.crm.badge')"></span>
                    <p v-html="t('business.solutions.crm.dscpt')"></p>
                    <a href="#" @click.prevent><span v-html="t('business.solutions.button')"></span></a>
                </div>
            </div>
            <div class="item" data-aos="fade-up" data-aos-delay="2400" @click="openModal('solution', 'mes')">
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="t('business.solutions.mes.title')"></p>
                        <p v-html="t('business.solutions.mes.subtitle')"></p>
                    </div>
                    <img :src="t('business.solutions.mes.thumbnail') || '/assets/images/solution/mes.webp'" :alt="t('business.solutions.mes.thumbnail.alt') || 'MES 솔루션의 썸네일 이미지입니다.'">
                </div>
                <div class="content">
                    <span class="badge" v-html="t('business.solutions.mes.badge')"></span>
                    <p v-html="t('business.solutions.mes.dscpt')"></p>
                    <a href="#" @click.prevent><span v-html="t('business.solutions.button')"></span></a>
                </div>
            </div>
            <div class="item" data-aos="fade-up" data-aos-delay="2000" @click="openModal('solution', 'wcs')">
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="t('business.solutions.wcs.title')"></p>
                        <p v-html="t('business.solutions.wcs.subtitle')"></p>
                    </div>
                    <img :src="t('business.solutions.wcs.thumbnail') || '/assets/images/solution/wcs.webp'" :alt="t('business.solutions.wcs.thumbnail.alt') || 'WCS 솔루션의 썸네일 이미지입니다.'">
                </div>
                <div class="content">
                    <span class="badge" v-html="t('business.solutions.wcs.badge')"></span>
                    <p v-html="t('business.solutions.wcs.dscpt')"></p>
                    <a href="#" @click.prevent><span v-html="t('business.solutions.button')"></span></a>
                </div>
            </div>
            <div class="item" data-aos="fade-up" data-aos-delay="2000" @click="openModal('solution', 'tms')">
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="t('business.solutions.tms.title')"></p>
                        <p v-html="t('business.solutions.tms.subtitle')"></p>
                    </div>
                    <img :src="t('business.solutions.tms.thumbnail') || '/assets/images/solution/tms.webp'" :alt="t('business.solutions.tms.thumbnail.alt') || 'TMS 솔루션의 썸네일 이미지입니다.'">
                </div>
                <div class="content">
                    <span class="badge" v-html="t('business.solutions.tms.badge')"></span>
                    <p v-html="t('business.solutions.tms.dscpt')"></p>
                    <a href="#" @click.prevent><span v-html="t('business.solutions.button')"></span></a>
                </div>
            </div>
            <div class="item" data-aos="fade-up" data-aos-delay="1600" @click="openModal('solution', 'ai')">
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="t('business.solutions.ai.title')"></p>
                        <p v-html="t('business.solutions.ai.subtitle')"></p>
                    </div>
                    <img :src="t('business.solutions.ai.thumbnail') || '/assets/images/solution/ai.webp'" :alt="t('business.solutions.ai.thumbnail.alt') || 'AI 솔루션의 썸네일 이미지입니다.'">
                </div>
                <div class="content">
                    <span class="badge" v-html="t('business.solutions.ai.badge')"></span>
                    <p v-html="t('business.solutions.ai.dscpt')"></p>
                    <a href="#" @click.prevent><span v-html="t('business.solutions.button')"></span></a>
                </div>
            </div>
            <div class="item" data-aos="fade-up" data-aos-delay="1200" @click="openModal('solution', 'wms')">
                <div class="thumbnail">
                    <div class="dim">
                        <p class="title" v-html="t('business.solutions.wms.title')"></p>
                        <p v-html="t('business.solutions.wms.subtitle')"></p>
                    </div>
                    <img :src="t('business.solutions.wms.thumbnail') || '/assets/images/solution/wms.webp'" :alt="t('business.solutions.wms.thumbnail.alt') || 'WMS 솔루션의 썸네일 이미지입니다.'">
                </div>
                <div class="content">
                    <span class="badge" v-html="t('business.solutions.wms.badge')"></span>
                    <p v-html="t('business.solutions.wms.dscpt')"></p>
                    <a href="#" @click.prevent><span v-html="t('business.solutions.button')"></span></a>
                </div>
            </div>
        </div>
    </div>
    <div class="success" id="success">
        <div class="wrap">
            <h3 v-html="t('business.success.title')" data-aos="fade-up" data-aos-delay="200"></h3>
            <ul class="list-case">
                <li class="item" data-aos="fade-up" data-aos-delay="400" @click="openModal('success', 'tailim')">
                    <div class="content">
                        <p class="title" v-html="t('business.success.case1.title')"></p>
                        <ul class="dscpt">
                            <li v-for="item in list('business.success.case1.dscpt')" :key="item">{{ item }}</li>
                        </ul>
                    </div>
                    <img src="/assets/images/success/tailm.webp" alt="">
                </li>
                <li class="item" data-aos="fade-up" data-aos-delay="600" @click="openModal('success', 'kkleannara')">
                    <div class="content">
                        <p class="title" v-html="t('business.success.case2.title')"></p>
                        <ul class="dscpt">
                            <li v-for="item in list('business.success.case2.dscpt')" :key="item">{{ item }}</li>
                        </ul>
                    </div>
                    <img src="/assets/images/success/kkleannara.webp" alt="">
                </li>
            </ul>
        </div>
    </div>
    <CommonAskBanner />
</section>
<div class="modal" :class="{ active: isModal('solution', 'aps') }" @click.self="closeModal">
    <div class="modal-content content-solution">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="t('business.solutions.aps.title')"></p>
                <p class="title-sub" v-html="t('business.solutions.aps.subTitle')"></p>
            </div>
            <ul>
                <li v-html="t('business.solutions.aps.badge')"></li>
            </ul>
            <a href="" class="btn type-round" @click.prevent="closeModal">닫기</a>
        </div>
        <div class="modal-body">
            <div class="abstract">
                <p v-html="t('business.solutions.aps.modal.abstract')"></p>
            </div>
            <div class="title">
                <span v-html="t('business.solutions.aps.modal.screen.title')"></span>
                <p v-html="t('business.solutions.aps.modal.screen.dscpt')"></p>
            </div>
            <div class="content">
                <img :src="t('business.solutions.aps.modal.src') || '/assets/images/modal/solution/aps.webp'" :alt="t('business.solutions.aps.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal" :class="{ active: isModal('solution', 'oms') }" @click.self="closeModal">
    <div class="modal-content content-solution">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="t('business.solutions.oms.title')"></p>
                <p class="title-sub" v-html="t('business.solutions.oms.subTitle')"></p>
            </div>
            <ul>
                <li v-html="t('business.solutions.oms.badge')"></li>
            </ul>
            <a href="" class="btn type-round" @click.prevent="closeModal">닫기</a>
        </div>
        <div class="modal-body">
            <div class="abstract">
                <p v-html="t('business.solutions.oms.modal.abstract')"></p>
            </div>
            <div class="content">
                <img :src="t('business.solutions.oms.modal.src') || '/assets/images/modal/solution/oms.webp'" :alt="t('business.solutions.oms.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal" :class="{ active: isModal('solution', 'fems') }" @click.self="closeModal">
    <div class="modal-content content-solution">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="t('business.solutions.fems.title')"></p>
                <p class="title-sub" v-html="t('business.solutions.fems.subTitle')"></p>
            </div>
            <ul>
                <li v-html="t('business.solutions.fems.badge')"></li>
            </ul>
            <a href="" class="btn type-round" @click.prevent="closeModal">닫기</a>
        </div>
        <div class="modal-body">
            <div class="abstract">
                <p v-html="t('business.solutions.fems.modal.abstract')"></p>
            </div>
            <div class="content">
                <img :src="t('business.solutions.fems.modal.src') || '/assets/images/modal/solution/fems.webp'" :alt="t('business.solutions.fems.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal" :class="{ active: isModal('solution', 'scm') }" @click.self="closeModal">
    <div class="modal-content content-solution">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="t('business.solutions.scm.title')"></p>
                <p class="title-sub" v-html="t('business.solutions.scm.subTitle')"></p>
            </div>
            <ul>
                <li v-html="t('business.solutions.scm.badge')"></li>
            </ul>
            <a href="" class="btn type-round" @click.prevent="closeModal">닫기</a>
        </div>
        <div class="modal-body">
            <div class="abstract">
                <p v-html="t('business.solutions.scm.modal.abstract')"></p>
            </div>
            <div class="content">
                <img :src="t('business.solutions.scm.modal.src') || '/assets/images/modal/solution/scm.webp'" :alt="t('business.solutions.scm.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal" :class="{ active: isModal('solution', 'crm') }" @click.self="closeModal">
    <div class="modal-content content-solution">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="t('business.solutions.crm.title')"></p>
                <p class="title-sub" v-html="t('business.solutions.crm.subTitle')"></p>
            </div>
            <ul>
                <li v-html="t('business.solutions.crm.badge')"></li>
            </ul>
            <a href="" class="btn type-round" @click.prevent="closeModal">닫기</a>
        </div>
        <div class="modal-body">
            <div class="abstract">
                <p v-html="t('business.solutions.crm.modal.abstract')"></p>
            </div>
            <div class="title">
                <span v-html="t('business.solutions.crm.modal.screen.title')"></span>
                <p v-html="t('business.solutions.crm.modal.screen.dscpt')"></p>
            </div>
            <div class="content">
                <img :src="t('business.solutions.crm.modal.src') || '/assets/images/modal/solution/crm.webp'" :alt="t('business.solutions.crm.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal" :class="{ active: isModal('solution', 'mes') }" @click.self="closeModal">
    <div class="modal-content content-solution">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="t('business.solutions.mes.title')"></p>
                <p class="title-sub" v-html="t('business.solutions.mes.subTitle')"></p>
            </div>
            <ul>
                <li v-html="t('business.solutions.mes.badge')"></li>
            </ul>
            <a href="" class="btn type-round" @click.prevent="closeModal">닫기</a>
        </div>
        <div class="modal-body">
            <div class="abstract">
                <p v-html="t('business.solutions.mes.modal.abstract')"></p>
            </div>
            <div class="content">
                <img :src="t('business.solutions.mes.modal.src') || '/assets/images/modal/solution/mes.webp'" :alt="t('business.solutions.mes.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal" :class="{ active: isModal('solution', 'wcs') }" @click.self="closeModal">
    <div class="modal-content content-solution">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="t('business.solutions.wcs.title')"></p>
                <p class="title-sub" v-html="t('business.solutions.wcs.subTitle')"></p>
            </div>
            <ul>
                <li v-html="t('business.solutions.wcs.badge')"></li>
            </ul>
            <a href="" class="btn type-round" @click.prevent="closeModal">닫기</a>
        </div>
        <div class="modal-body">
            <div class="abstract">
                <p v-html="t('business.solutions.wcs.modal.abstract')"></p>
            </div>
            <div class="title">
                <span v-html="t('business.solutions.wcs.modal.screen.title')"></span>
                <p v-html="t('business.solutions.wcs.modal.screen.dscpt')"></p>
            </div>
            <div class="content">
                <img :src="t('business.solutions.wcs.modal.src') || '/assets/images/modal/solution/wcs.webp'" :alt="t('business.solutions.wcs.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal" :class="{ active: isModal('solution', 'tms') }" @click.self="closeModal">
    <div class="modal-content content-solution">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="t('business.solutions.tms.title')"></p>
                <p class="title-sub" v-html="t('business.solutions.tms.subTitle')"></p>
            </div>
            <ul>
                <li v-html="t('business.solutions.tms.badge')"></li>
            </ul>
            <a href="" class="btn type-round" @click.prevent="closeModal">닫기</a>
        </div>
        <div class="modal-body">
            <div class="abstract">
                <p v-html="t('business.solutions.tms.modal.abstract')"></p>
            </div>
            <div class="content">
                <img :src="t('business.solutions.tms.modal.src') || '/assets/images/modal/solution/tms.webp'" :alt="t('business.solutions.tms.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal" :class="{ active: isModal('solution', 'ai') }" @click.self="closeModal">
    <div class="modal-content content-solution">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="t('business.solutions.ai.title')"></p>
                <p class="title-sub" v-html="t('business.solutions.ai.subTitle')"></p>
            </div>
            <ul>
                <li v-html="t('business.solutions.ai.badge')"></li>
            </ul>
            <a href="" class="btn type-round" @click.prevent="closeModal">닫기</a>
        </div>
        <div class="modal-body">
            <div class="abstract">
                <p v-html="t('business.solutions.ai.modal.abstract')"></p>
            </div>
            <div class="content">
                <img :src="t('business.solutions.ai.modal.src') || '/assets/images/modal/solution/ai.webp'" :alt="t('business.solutions.ai.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal" :class="{ active: isModal('solution', 'wms') }" @click.self="closeModal">
    <div class="modal-content content-solution">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="t('business.solutions.wms.title')"></p>
                <p class="title-sub" v-html="t('business.solutions.wms.subTitle')"></p>
            </div>
            <ul>
                <li v-html="t('business.solutions.wms.badge')"></li>
            </ul>
            <a href="" class="btn type-round" @click.prevent="closeModal">닫기</a>
        </div>
        <div class="modal-body">
            <div class="abstract">
                <p v-html="t('business.solutions.wms.modal.abstract')"></p>
            </div>
            <div class="content">
                <img :src="t('business.solutions.wms.modal.src') || '/assets/images/modal/solution/wms.webp'" :alt="t('business.solutions.wms.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal" :class="{ active: isModal('success', 'tailim') }" @click.self="closeModal">
    <div class="modal-content content-success">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="t('business.success.case1.title')"></p>
            </div>
            <ul>
                <li v-for="item in list('business.success.case1.dscpt')" :key="item">{{ item }}</li>
            </ul>
            <a href="" class="btn type-round" @click.prevent="closeModal">닫기</a>
        </div>
        <div class="modal-body">
            <div class="content">
                <img :src="t('business.success.case1.modal.src') || '/assets/images/modal/success/tailim.webp'" :alt="t('business.success.case1.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
<div class="modal" :class="{ active: isModal('success', 'kkleannara') }" @click.self="closeModal">
    <div class="modal-content content-success">
        <div class="modal-header">
            <div class="heading">
                <p class="title" v-html="t('business.success.case2.title')"></p>
            </div>
            <ul>
                <li v-for="item in list('business.success.case2.dscpt')" :key="item">{{ item }}</li>
            </ul>
            <a href="" class="btn type-round" @click.prevent="closeModal">닫기</a>
        </div>
        <div class="modal-body">
            <div class="content">
                <img :src="t('business.success.case2.modal.src') || '/assets/images/modal/success/kleannara.webp'" :alt="t('business.success.case2.modal.alt') || ''">
            </div>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getI18nNamespaces } from '~/utils/route-i18n'
import { useLegacySectionRoot } from '~/composables/useLegacySectionRoot'
import CommonAskBanner from '~/components/Section/CommonAskBanner.vue'

definePageMeta({
  layout: 'default',
})

const locale = useLocaleStore()
const namespaces = getI18nNamespaces('/business')
await useAsyncData('i18n-page-business', () => locale.loadBundles(namespaces))

const { t, tm, rt } = useI18n()
const list = (key: string) => {
  const message = tm(key)
  return Array.isArray(message) ? message.map((item) => rt(item)) : []
}
const activeModal = ref({ type: '', id: '' })
const openModal = (type: string, id: string) => {
  activeModal.value = { type, id }
}
const closeModal = () => {
  activeModal.value = { type: '', id: '' }
}
const isModal = (type: string, id: string) =>
  activeModal.value.type === type && activeModal.value.id === id

watch(activeModal, (modal) => {
  if (import.meta.client) {
    document.body.classList.toggle('modal-open', Boolean(modal.id))
  }
})

onUnmounted(() => {
  document.body.classList.remove('modal-open')
})

const root = ref<HTMLElement | null>(null)
useLegacySectionRoot(root, namespaces)
</script>
