<template>
    <header class="app-header" :class="{ open: menuOpen }">
        <div class="wrap">
            <div class="app-header__logo">
                <NuxtLink :key="activeLang" to="/" :aria-label="a11yLabels.home">
                    <img :src="assetPath('/assets/logos/word.svg')" alt="JO&amp;SOFT" />
                </NuxtLink>
            </div>
            <nav class="menu pc" :aria-label="a11yLabels.mainNavigation">
                <ul class="gnb">
                    <li :class="{ active: isActive('/about') }">
                        <NuxtLink to="/about" :aria-current="isActive('/about') ? 'page' : undefined">ABOUT US</NuxtLink>
                    </li>
                    <li :class="{ active: isActive('/business') }">
                        <NuxtLink to="/business" :aria-current="isActive('/business') ? 'page' : undefined">BUSINESS &amp; SOLUTION</NuxtLink>
                    </li>
                    <li :class="{ active: isActive('/customer') }">
                        <NuxtLink to="/customer" :aria-current="isActive('/customer') ? 'page' : undefined">CUSTOMER &amp; PARTNERS</NuxtLink>
                    </li>
                    <li :class="{ active: isActive('/contact') }">
                        <NuxtLink to="/contact" :aria-current="isActive('/contact') ? 'page' : undefined">CONTACT US</NuxtLink>
                    </li>
                </ul>
                <ul class="i18n" :aria-label="a11yLabels.language">
                    <li v-for="code in langs" :key="code" :class="{ active: activeLang === code }">
                        <button
                            type="button"
                            class="btn"
                            :aria-label="localeDefinitions[code].nativeName"
                            :aria-pressed="activeLang === code"
                            @click="setLang(code)"
                        >
                            {{ localeDefinitions[code].shortLabel }}
                        </button>
                    </li>
                </ul>
            </nav>
            <div class="menu mobile">
                <button
                    ref="menuButton"
                    type="button"
                    class="btn open-menu"
                    :aria-label="menuOpen ? a11yLabels.closeMenu : a11yLabels.openMenu"
                    :aria-expanded="menuOpen ? 'true' : 'false'"
                    aria-controls="mobile-nav"
                    @click="toggleMenu"
                >
                    <span>MENU</span>
                </button>
            </div>
        </div>

        <nav
            id="mobile-nav"
            ref="mobileNav"
            class="full-screen-menu"
            :aria-label="a11yLabels.mainNavigation"
            :aria-hidden="menuOpen ? 'false' : 'true'"
            :inert="menuOpen ? undefined : true"
        >
            <div class="wrap">
                <ul>
                    <li>
                        <NuxtLink to="/about" :aria-current="isActive('/about') ? 'page' : undefined" @click="closeMenu(false)">ABOUT US</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/business" :aria-current="isActive('/business') ? 'page' : undefined" @click="closeMenu(false)">
                            BUSINESS &amp; SOLUTION
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/customer" :aria-current="isActive('/customer') ? 'page' : undefined" @click="closeMenu(false)">
                            CUSTOMER &amp; PARTNERS
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/contact" :aria-current="isActive('/contact') ? 'page' : undefined" @click="closeMenu(false)">CONTACT US</NuxtLink>
                    </li>
                </ul>
                <ul class="i18n" :aria-label="a11yLabels.language">
                    <li v-for="code in langs" :key="`m-${code}`" :class="{ active: activeLang === code }">
                        <button
                            type="button"
                            class="btn"
                            :aria-label="localeDefinitions[code].nativeName"
                            :aria-pressed="activeLang === code"
                            @click="setLang(code)"
                        >
                            {{ localeDefinitions[code].shortLabel }}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { localeCodes, localeDefinitions } from '~/constants/locale';
import type { LocaleCode } from '~/stores/locale';
import { assetPath } from '~/utils/assetPath';

const route = useRoute();
const localeStore = useLocaleStore();
const { locale: i18nLocale } = useI18n();
const activeLang = computed(() => i18nLocale.value as LocaleCode);
const menuOpen = ref(false);
const menuButton = ref<HTMLButtonElement | null>(null);
const mobileNav = ref<HTMLElement | null>(null);
const langs = localeCodes;
const localizedA11yLabels = {
    ko: {
        home: '조앤소프트 홈',
        mainNavigation: '주요 메뉴',
        language: '언어 선택',
        openMenu: '메뉴 열기',
        closeMenu: '메뉴 닫기',
    },
    en: {
        home: 'JO&SOFT home',
        mainNavigation: 'Main navigation',
        language: 'Select language',
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
    },
    vi: {
        home: 'Trang chủ JO&SOFT',
        mainNavigation: 'Điều hướng chính',
        language: 'Chọn ngôn ngữ',
        openMenu: 'Mở menu',
        closeMenu: 'Đóng menu',
    },
};
const a11yLabels = computed(() => localizedA11yLabels[activeLang.value]);

function isActive(prefix: string) {
    return route.path === prefix || route.path.startsWith(`${prefix}/`);
}

function setLang(code: LocaleCode) {
    localeStore.setLang(code);
    closeMenu(false);
}

async function toggleMenu() {
    if (menuOpen.value) {
        closeMenu();
        return;
    }
    menuOpen.value = true;
    await nextTick();
    mobileNav.value?.querySelector<HTMLElement>('a, button')?.focus();
}

function closeMenu(restoreFocus = true) {
    menuOpen.value = false;
    if (restoreFocus) nextTick(() => menuButton.value?.focus());
}

function onKey(e: KeyboardEvent) {
    if (!menuOpen.value) return;
    if (e.key === 'Escape') {
        closeMenu();
        return;
    }
    if (e.key !== 'Tab' || !mobileNav.value || !menuButton.value) return;

    const focusable = [menuButton.value, ...mobileNav.value.querySelectorAll<HTMLElement>('a, button:not([disabled])')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
    }
}

onMounted(() => {
    document.addEventListener('keydown', onKey);
});
onUnmounted(() => {
    document.removeEventListener('keydown', onKey);
});
</script>
