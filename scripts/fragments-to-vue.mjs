/**
 * (선택) HTML 조각 → Vue SFC. 소스는 ~/i18n 외 별도 폴더에 둘 때 사용.
 * 출력: components/*.vue
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const fragDir = path.join(root, 'assets', 'fragments')
const outDir = path.join(root, 'components')

const MAP = [
  { fragment: 'about-section.html', component: 'AboutSection.vue', route: '/about' },
  { fragment: 'index-section.html', component: 'IndexSection.vue', route: '/' },
  { fragment: 'business-section.html', component: 'BusinessSection.vue', route: '/business' },
  { fragment: 'customer-section.html', component: 'CustomerSection.vue', route: '/customer' },
  { fragment: 'contact-section.html', component: 'ContactSection.vue', route: '/contact' },
]

function stripIndent(src) {
  return src
    .split(/\r?\n/)
    .map((line) => line.replace(/^ {4}/, ''))
    .join('\n')
    .trim()
}

function fixContactTypos(html) {
  return html.replace(
    /<a  data-aos="fade-up" data-aos-delay="1600"href=/g,
    '<a data-aos="fade-up" data-aos-delay="1600" href=',
  )
}

fs.mkdirSync(outDir, { recursive: true })

for (const { fragment, component, route } of MAP) {
  const fp = path.join(fragDir, fragment)
  let body = stripIndent(fs.readFileSync(fp, 'utf8'))
  if (fragment === 'contact-section.html') body = fixContactTypos(body)

  const templateInner = `<div ref="root" class="legacy-section-root">\n${body}\n</div>`

  const vue = `<template>
${templateInner}
</template>

<script setup lang="ts">
import { getI18nNamespaces } from '~/utils/route-i18n'
import { useLegacySectionRoot } from '~/composables/useLegacySectionRoot'

const root = ref<HTMLElement | null>(null)
useLegacySectionRoot(root, getI18nNamespaces('${route}'))
</script>
`

  fs.writeFileSync(path.join(outDir, component), vue, 'utf8')
  console.log('Wrote', component)
}
