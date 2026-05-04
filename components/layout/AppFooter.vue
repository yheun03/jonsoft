<template>
  <footer>
    <div class="wrap not-padding">
      <div>
        <NuxtLink to="/" class="logo-jon">
          <img :src="logoSrc" :alt="logoAlt" />
        </NuxtLink>
      </div>
      <div class="wrap-text">
        <ul class="gnb">
          <li><NuxtLink to="/about">ABOUT US</NuxtLink></li>
          <li><NuxtLink to="/business">BUSINESS & SOLUTION</NuxtLink></li>
          <li><NuxtLink to="/customer">CUSTOMER & PATNERS</NuxtLink></li>
          <li><NuxtLink to="/contact">CONTACT US</NuxtLink></li>
        </ul>
        <address>{{ address }}</address>
        <p>{{ companyInfo }}</p>
        <p class="copyright">{{ copyright }}</p>
      </div>
      <div>
        <a href="https://www.innobiz.net/" class="logo-inobiz">
          <img :src="inobizSrc" :alt="inobizAlt" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const locale = useLocaleStore()
const { t } = useLocaleMessage()

function assetPath(p: string) {
  if (p.startsWith('./')) return `/${p.slice(2)}`
  if (p.startsWith('/')) return p
  return `/${p}`
}

const logoSrc = computed(() => {
  const raw = locale.bundles.common?.company as Record<string, unknown> | undefined
  const logo = raw?.logo as Record<string, unknown> | undefined
  const src = logo?.src
  return typeof src === 'string' ? assetPath(src) : '/assets/logos/logo.svg'
})

const logoAlt = computed(() => t('common', 'company.logo.alt'))

const address = computed(() => t('common', 'company.address'))
const companyInfo = computed(() => t('common', 'company.info'))
const copyright = computed(() => {
  const c = locale.bundles.common?.copyright
  return typeof c === 'string' ? c : '© JO&SOFT. All Rights Reserved.'
})

const inobizSrc = computed(() => assetPath(t('common', 'inobiz.src')))
const inobizAlt = computed(() => t('common', 'inobiz.alt'))
</script>
