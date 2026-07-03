<template>
  <header :class="{ open: menuOpen }">
    <div v-if="showWelcome" class="banner type-welcome">
      <div class="wrap">
        <p class="pc">{{ t('common.banner.welcome.title') }}</p>
        <p class="mobile">{{ t('common.banner.welcome.title') }}</p>
        <a :href="t('common.banner.welcome.src')" target="_blank" rel="noopener">{{ t('common.banner.welcome.button') }}</a>
      </div>
      <button type="button" class="btn close-welcome" aria-label="닫기" @click="closeWelcome" />
    </div>
    <div class="wrap">
      <h1>
        <NuxtLink to="/">
          <img src="/assets/logos/word.svg" alt="조앤소프트(주)의 로고입니다." />
        </NuxtLink>
      </h1>
      <div class="menu pc">
        <ul class="gnb">
          <li :class="{ active: isActive('/about') }">
            <NuxtLink to="/about">ABOUT US</NuxtLink>
          </li>
          <li :class="{ active: isActive('/business') }">
            <NuxtLink to="/business">BUSINESS & SOLUTION</NuxtLink>
          </li>
          <li :class="{ active: isActive('/customer') }">
            <NuxtLink to="/customer">CUSTOMER & PATNERS</NuxtLink>
          </li>
          <li :class="{ active: isActive('/contact') }">
            <NuxtLink to="/contact">CONTACT US</NuxtLink>
          </li>
        </ul>
        <ul class="i18n">
          <li v-for="code in langs" :key="code" :class="{ active: locale.lang === code }">
            <button type="button" class="btn" @click="setLang(code)">{{ labels[code] }}</button>
          </li>
        </ul>
      </div>
      <div class="menu mobile">
        <button
          type="button"
          class="btn open-menu"
          aria-label="메뉴 열기"
          :aria-expanded="menuOpen ? 'true' : 'false'"
          aria-controls="mobile-nav"
          @click="menuOpen = !menuOpen"
        >
          <span>MENU</span>
        </button>
      </div>
    </div>

    <div id="mobile-nav" class="full-screen-menu" :aria-hidden="menuOpen ? 'false' : 'true'">
      <div class="wrap">
        <ul>
          <li><NuxtLink to="/about" @click="menuOpen = false">ABOUT US</NuxtLink></li>
          <li><NuxtLink to="/business" @click="menuOpen = false">BUSINESS & SOLUTION</NuxtLink></li>
          <li><NuxtLink to="/customer" @click="menuOpen = false">CUSTOMER & PATNERS</NuxtLink></li>
          <li><NuxtLink to="/contact" @click="menuOpen = false">CONTACT US</NuxtLink></li>
        </ul>
        <ul class="i18n">
          <li v-for="code in langs" :key="`m-${code}`" :class="{ active: locale.lang === code }">
            <button type="button" class="btn" @click="setLang(code)">{{ labels[code] }}</button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { LocaleCode } from '~/stores/locale'

const route = useRoute()
const locale = useLocaleStore()
const { t } = useI18n()

const menuOpen = ref(false)
const langs: LocaleCode[] = ['ko', 'en', 'ja', 'vi']
const labels: Record<LocaleCode, string> = {
  ko: 'KOR',
  en: 'ENG',
  ja: 'JPN',
  vi: 'VIE',
}

const showWelcome = ref(true)

onMounted(() => {
  if (import.meta.client && localStorage.getItem('welcomeBannerClosed') === '1') {
    showWelcome.value = false
  }
})

function closeWelcome() {
  showWelcome.value = false
  if (import.meta.client) localStorage.setItem('welcomeBannerClosed', '1')
}

function isActive(prefix: string) {
  return route.path === prefix || route.path.startsWith(`${prefix}/`)
}

function setLang(code: LocaleCode) {
  locale.setLang(code)
  menuOpen.value = false
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') menuOpen.value = false
}

onMounted(() => {
  document.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
})
</script>
