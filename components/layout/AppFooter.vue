<template>
  <footer>
    <div class="wrap not-padding">
      <div>
        <NuxtLink to="/" class="logo-jon">
          <img :src="assetPath(t('common.company.logo.src') || '/assets/logos/logo.svg')" :alt="t('common.company.logo.alt')" />
        </NuxtLink>
      </div>
      <div class="wrap-text">
        <ul class="gnb">
          <li><NuxtLink to="/about">ABOUT US</NuxtLink></li>
          <li><NuxtLink to="/business">BUSINESS & SOLUTION</NuxtLink></li>
          <li><NuxtLink to="/customer">CUSTOMER & PATNERS</NuxtLink></li>
          <li><NuxtLink to="/contact">CONTACT US</NuxtLink></li>
        </ul>
        <address>{{ t('common.company.address') }}</address>
        <p>{{ t('common.company.info') }}</p>
        <p class="copyright">{{ t('common.copyright') }}</p>
      </div>
      <div>
        <a href="https://www.innobiz.net/" class="logo-inobiz">
          <img :src="assetPath(t('common.inobiz.src'))" :alt="t('common.inobiz.alt')" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

function assetPath(p: string) {
  if (p.startsWith('./')) return `/${p.slice(2)}`
  if (p.startsWith('/')) return p
  return `/${p}`
}
</script>
