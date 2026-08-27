<template>
    <section>
        <div class="navigator">
            <nav class="tab" :aria-label="contactNavLabel">
                <ul>
                    <li class="active" data-aos="fade-up" data-aos-delay="100">
                        <a href="#contact-location" @click.prevent="scrollToSection('location')" v-html="t('contact.tab.location')"></a>
                    </li>
                    <li data-aos="fade-up" data-aos-delay="200">
                        <a href="#contact-recruit" @click.prevent="scrollToSection('recruit')" v-html="t('contact.tab.recruitment')"></a>
                    </li>
                </ul>
            </nav>
            <div class="tab-content">
                <div id="contact-location" ref="locationSection" class="contact" tabindex="-1">
                    <div class="wrap not-padding">
                        <h1 v-html="t('contact.contact.title')" data-aos="fade-up" data-aos-delay="300"></h1>
                        <div class="info">
                            <dl data-aos="fade-up" data-aos-delay="400">
                                <dt v-html="t('contact.contact.headquarters')"></dt>
                                <dd>
                                    <strong>T</strong> <a class="contact-phone" href="tel:+82317178816">031-717-8816</a> /
                                    <strong>F</strong> 031-718-8817
                                </dd>
                            </dl>
                            <dl data-aos="fade-up" data-aos-delay="500">
                                <dt v-html="t('contact.contact.email')"></dt>
                                <dd>
                                    <span>
                                        <strong v-html="t('contact.contact.sales.grade')"></strong>
                                        <span v-html="t('contact.contact.sales.name')"></span>
                                    </span>
                                    <a
                                        href="mailto:js.jung@jonsoft.co.kr?subject=입사를 희망합니다.&body=안녕하세요, 지원자 김조앤입니다.%0D%0A%0D%0A지원서와 함께 메일 송부드립니다."
                                        >js.jung@jonsoft.co.kr</a
                                    >
                                </dd>
                                <dd>
                                    <span>
                                        <strong v-html="t('contact.contact.manager.team')"></strong>
                                        <span v-html="t('contact.contact.manager.name')"></span>
                                    </span>
                                    <a
                                        href="mailto:hk.kim@jonsoft.co.kr?subject=입사를 희망합니다.&body=안녕하세요, 지원자 김조앤입니다.%0D%0A%0D%0A지원서와 함께 메일 송부드립니다."
                                        >hk.kim@jonsoft.co.kr</a
                                    >
                                </dd>
                            </dl>
                        </div>
                    </div>
                    <div class="list-map">
                        <div class="item">
                            <div
                                id="daumRoughmapContainer1693978036661"
                                class="root_daum_roughmap root_daum_roughmap_landing"
                                role="region"
                                :aria-label="mapLabel"
                                data-aos="fade-up"
                                data-aos-delay="100"
                            ></div>
                            <div class="wrap full">
                                <ul data-aos="fade-up" data-aos-delay="200">
                                    <li><strong v-html="t('common.company.addressName')"></strong></li>
                                    <li v-html="t('common.company.address')"></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav class="tab" :aria-label="contactNavLabel">
                <ul>
                    <li data-aos="fade-up" data-aos-delay="100">
                        <a href="#contact-location" @click.prevent="scrollToSection('location')" v-html="t('contact.tab.location')"></a>
                    </li>
                    <li class="active" data-aos="fade-up" data-aos-delay="200">
                        <a href="#contact-recruit" @click.prevent="scrollToSection('recruit')" v-html="t('contact.tab.recruitment')"></a>
                    </li>
                </ul>
            </nav>
            <div class="tab-content">
                <div id="contact-recruit" ref="recruitSection" class="recruit" tabindex="-1">
                    <div class="wrap not-padding">
                        <h2 v-html="t('contact.recruit.title')" data-aos="fade-up" data-aos-delay="300"></h2>
                        <div class="info">
                            <dl data-aos="fade-up" data-aos-delay="400">
                                <dt v-html="t('contact.recruit.developer.title')"></dt>
                                <dd v-html="t('contact.recruit.developer.desc')"></dd>
                                <dd v-html="t('contact.recruit.developer.recruitment')"></dd>
                            </dl>
                            <dl data-aos="fade-up" data-aos-delay="500">
                                <dt v-html="t('contact.recruit.designer.title')"></dt>
                                <dd v-html="t('contact.recruit.designer.desc')"></dd>
                                <dd v-html="t('contact.recruit.designer.recruitment')"></dd>
                            </dl>
                            <dl data-aos="fade-up" data-aos-delay="600">
                                <dt v-html="t('contact.recruit.pm.title')"></dt>
                                <dd v-html="t('contact.recruit.pm.desc')"></dd>
                                <dd v-html="t('contact.recruit.pm.recruitment')"></dd>
                            </dl>
                            <p data-aos="fade-up" data-aos-delay="700">
                                <strong v-html="t('contact.recruit.inquiry')"></strong>
                                <span>
                                    <span v-html="t('contact.contact.manager.name')"></span>
                                    <span v-html="t('contact.contact.manager.grade')"></span>
                                </span>
                                <a
                                    href="mailto:hk.kim@jonsoft.co.kr?subject=입사를 희망합니다.&body=안녕하세요, 지원자 김조앤입니다.%0D%0A%0D%0A지원서와 함께 메일 송부드립니다."
                                    >hk.kim@jonsoft.co.kr</a
                                >
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
import { useI18n } from 'vue-i18n';
import CommonPhilosophy from '~/components/section/CommonPhilosophy.vue';

definePageMeta({
    layout: 'default',
});

const { t, locale } = useI18n();
const contactNavLabels = { ko: '문의 페이지 바로가기', en: 'Contact page sections', vi: 'Các mục trang liên hệ' };
const mapLabels = { ko: '조앤소프트 본사 위치 지도', en: 'Map of JO&SOFT headquarters', vi: 'Bản đồ trụ sở JO&SOFT' };
const contactNavLabel = computed(() => contactNavLabels[locale.value as keyof typeof contactNavLabels]);
const mapLabel = computed(() => mapLabels[locale.value as keyof typeof mapLabels]);
usePageSeo('contact');
const locationSection = ref<HTMLElement | null>(null);
const recruitSection = ref<HTMLElement | null>(null);

const scrollToSection = (target: 'location' | 'recruit') => {
    const section = target === 'location' ? locationSection.value : recruitSection.value;
    if (!section) return;

    const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0;
    const top = window.scrollY + section.getBoundingClientRect().top - headerHeight - 20;
    window.scrollTo({ top, behavior: 'smooth' });
    section.focus({ preventScroll: true });
};

declare global {
    interface Window {
        daum?: {
            roughmap?: {
                Lander: new (options: { timestamp: string; key: string }) => { render: () => void };
            };
        };
    }
}

const loadRoughmap = () =>
    new Promise<void>((resolve, reject) => {
        if (window.daum?.roughmap?.Lander) {
            resolve();
            return;
        }

        const src = 'https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js';
        const loaded = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
        if (loaded) {
            if (window.daum?.roughmap?.Lander) {
                resolve();
                return;
            }

            if (loaded.dataset.loaded === 'true') {
                loaded.remove();
            } else {
                loaded.addEventListener('load', () => resolve(), { once: true });
                loaded.addEventListener('error', () => reject(new Error('Failed to load roughmap')), { once: true });
                return;
            }
        }

        const script = document.createElement('script');
        const write = document.write.bind(document);
        let isNestedScriptLoaded = false;
        const restoreWrite = () => {
            document.write = write;
        };

        document.write = (html: string) => {
            const template = document.createElement('template');
            template.innerHTML = html;
            const nestedScript = template.content.querySelector<HTMLScriptElement>('script[src]');

            if (!nestedScript) {
                write(html);
                return;
            }

            isNestedScriptLoaded = true;
            const nextScript = document.createElement('script');
            nextScript.charset = nestedScript.charset || 'UTF-8';
            nextScript.src = nestedScript.src;
            nextScript.onload = () => {
                restoreWrite();
                resolve();
            };
            nextScript.onerror = () => {
                restoreWrite();
                reject(new Error('Failed to load roughmap lander'));
            };
            document.head.appendChild(nextScript);
        };

        script.async = false;
        script.charset = 'UTF-8';
        script.className = 'daum_roughmap_loader_script';
        script.src = src;
        script.onload = () => {
            script.dataset.loaded = 'true';
            if (!isNestedScriptLoaded) {
                restoreWrite();
                resolve();
            }
        };
        script.onerror = () => {
            restoreWrite();
            reject(new Error('Failed to load roughmap'));
        };
        document.head.appendChild(script);
    });

onMounted(async () => {
    await nextTick();
    const container = document.getElementById('daumRoughmapContainer1693978036661');
    if (!container || container.children.length) return;

    await loadRoughmap();
    window.daum?.roughmap?.Lander &&
        new window.daum.roughmap.Lander({
            timestamp: '1693978036661',
            key: '2g4fj',
        }).render();
});
</script>
