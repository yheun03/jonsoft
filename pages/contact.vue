<template>
<section ref="root" class="legacy-section-root">
    <div class="navigator">
        <div class="tab">
            <ul>
                <li class="active" data-aos="fade-up" data-aos-delay="200"><a href="javascript:void(0)" v-html="t('contact.tab.location')"></a></li>
                <li data-aos="fade-up" data-aos-delay="400"><a href="javascript:void(0)" v-html="t('contact.tab.recruitment')"></a></li>
            </ul>
        </div>
        <div class="tab-content">
            <div class="contact">
                <div class="wrap not-padding">
                    <h2 v-html="t('contact.contact.title')" data-aos="fade-up" data-aos-delay="600"></h2>
                    <div class="info">
                        <dl>
                            <dt v-html="t('contact.contact.headquarters')" data-aos="fade-up" data-aos-delay="800"></dt>
                            <dd data-aos="fade-up" data-aos-delay="1000">
                                <strong>T</strong> 031-717-8816 / <strong>F</strong> 031-718-8817
                            </dd>
                        </dl>
                        <dl>
                            <dt v-html="t('contact.contact.email')" data-aos="fade-up" data-aos-delay="1200"></dt>
                            <dd>
                                <span data-aos="fade-up" data-aos-delay="1400"><strong v-html="t('contact.contact.sales.grade')"></strong> <span v-html="t('contact.contact.sales.name')"></span></span>
                                <a data-aos="fade-up" data-aos-delay="1600" href="mailto:js.jung@jonsoft.co.kr?subject=입사를 희망합니다.&body=안녕하세요, 지원자 김조앤입니다.%0D%0A%0D%0A지원서와 함께 메일 송부드립니다.">js.jung@jonsoft.co.kr</a>
                            </dd>
                            <dd>
                                <span data-aos="fade-up" data-aos-delay="1800"><strong v-html="t('contact.contact.manager.team')"></strong> <span v-html="t('contact.contact.manager.name')"></span></span>
                                <a data-aos="fade-up" data-aos-delay="2000" href="mailto:hk.kim@jonsoft.co.kr?subject=입사를 희망합니다.&body=안녕하세요, 지원자 김조앤입니다.%0D%0A%0D%0A지원서와 함께 메일 송부드립니다.">hk.kim@jonsoft.co.kr</a>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="list-map">
                    <div class="item">
                        <div id="daumRoughmapContainer1693978036661" class="root_daum_roughmap root_daum_roughmap_landing" data-aos="fade-up" data-aos-delay="2200"></div>
                        <div class="wrap full">
                            <ul>
                                <li data-aos="fade-up" data-aos-delay="2400"><strong v-html="t('common.company.addressName')"></strong></li>
                                <li data-aos="fade-up" data-aos-delay="2600" v-html="t('common.company.address')"></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab">
            <ul>
                <li data-aos="fade-up" data-aos-delay="200"><a href="javascript:void(0)" v-html="t('contact.tab.location')"></a></li>
                <li class="active" data-aos="fade-up" data-aos-delay="400"><a href="javascript:void(0)" v-html="t('contact.tab.recruitment')"></a></li>
            </ul>
        </div>
        <div class="tab-content">
            <div class="recruit">
                <div class="wrap not-padding">
                    <h2 v-html="t('contact.recruit.title')" data-aos="fade-up" data-aos-delay="600"></h2>
                    <div class="info">
                        <dl>
                            <dt v-html="t('contact.recruit.developer.title')" data-aos="fade-up" data-aos-delay="800"></dt>
                            <dd data-aos="fade-up" data-aos-delay="1000" v-html="t('contact.recruit.developer.desc')"></dd>
                            <dd data-aos="fade-up" data-aos-delay="1200" v-html="t('contact.recruit.developer.recruitment')"></dd>
                        </dl>
                        <dl>
                            <dt v-html="t('contact.recruit.designer.title')" data-aos="fade-up" data-aos-delay="1400"></dt>
                            <dd data-aos="fade-up" data-aos-delay="1600" v-html="t('contact.recruit.designer.desc')"></dd>
                            <dd data-aos="fade-up" data-aos-delay="1800" v-html="t('contact.recruit.designer.recruitment')"></dd>
                        </dl>
                        <dl>
                            <dt v-html="t('contact.recruit.pm.title')" data-aos="fade-up" data-aos-delay="2000"></dt>
                            <dd data-aos="fade-up" data-aos-delay="2200" v-html="t('contact.recruit.pm.desc')"></dd>
                            <dd data-aos="fade-up" data-aos-delay="2400" v-html="t('contact.recruit.pm.recruitment')"></dd>
                        </dl>
                        <p>
                            <strong v-html="t('contact.recruit.inquiry')" data-aos="fade-up" data-aos-delay="2600"></strong>
                            <span data-aos="fade-up" data-aos-delay="2800"><span v-html="t('contact.contact.manager.name')"></span> <span v-html="t('contact.contact.manager.grade')"></span></span>
                            <a data-aos="fade-up" data-aos-delay="3000" href="mailto:hk.kim@jonsoft.co.kr?subject=입사를 희망합니다.&body=안녕하세요, 지원자 김조앤입니다.%0D%0A%0D%0A지원서와 함께 메일 송부드립니다.">hk.kim@jonsoft.co.kr</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <CommonPhilosophy />
</section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getI18nNamespaces } from '~/utils/route-i18n'
import { useLegacySectionRoot } from '~/composables/useLegacySectionRoot'
import CommonPhilosophy from '~/components/Section/CommonPhilosophy.vue'

definePageMeta({
  layout: 'default',
})

const locale = useLocaleStore()
const namespaces = getI18nNamespaces('/contact')
await useAsyncData('i18n-page-contact', () => locale.loadBundles(namespaces))

const { t } = useI18n()
const root = ref<HTMLElement | null>(null)
useLegacySectionRoot(root, namespaces)

declare global {
  interface Window {
    daum?: {
      roughmap?: {
        Lander: new (options: { timestamp: string; key: string }) => { render: () => void }
      }
    }
  }
}

const loadRoughmap = () =>
  new Promise<void>((resolve, reject) => {
    if (window.daum?.roughmap?.Lander) {
      resolve()
      return
    }

    const src = 'https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js'
    const loaded = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
    if (loaded) {
      if (window.daum?.roughmap?.Lander) {
        resolve()
        return
      }

      if (loaded.dataset.loaded === 'true') {
        loaded.remove()
      } else {
        loaded.addEventListener('load', () => resolve(), { once: true })
        loaded.addEventListener('error', () => reject(new Error('Failed to load roughmap')), { once: true })
        return
      }
    }

    const script = document.createElement('script')
    const write = document.write.bind(document)
    let isNestedScriptLoaded = false
    const restoreWrite = () => {
      document.write = write
    }

    document.write = (html: string) => {
      const template = document.createElement('template')
      template.innerHTML = html
      const nestedScript = template.content.querySelector<HTMLScriptElement>('script[src]')

      if (!nestedScript) {
        write(html)
        return
      }

      isNestedScriptLoaded = true
      const nextScript = document.createElement('script')
      nextScript.charset = nestedScript.charset || 'UTF-8'
      nextScript.src = nestedScript.src
      nextScript.onload = () => {
        restoreWrite()
        resolve()
      }
      nextScript.onerror = () => {
        restoreWrite()
        reject(new Error('Failed to load roughmap lander'))
      }
      document.head.appendChild(nextScript)
    }

    script.async = false
    script.charset = 'UTF-8'
    script.className = 'daum_roughmap_loader_script'
    script.src = src
    script.onload = () => {
      script.dataset.loaded = 'true'
      if (!isNestedScriptLoaded) {
        restoreWrite()
        resolve()
      }
    }
    script.onerror = () => {
      restoreWrite()
      reject(new Error('Failed to load roughmap'))
    }
    document.head.appendChild(script)
  })

onMounted(async () => {
  await nextTick()
  const container = document.getElementById('daumRoughmapContainer1693978036661')
  if (!container || container.children.length) return

  await loadRoughmap()
  window.daum?.roughmap?.Lander &&
    new window.daum.roughmap.Lander({
      timestamp: '1693978036661',
      key: '2g4fj',
    }).render()
})
</script>
