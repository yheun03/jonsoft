/**
 * assets/i18n/*.json → ~/i18n/locales/{ko,en,ja,vi}.ts
 * 및 연혁 타임라인 메타데이터 ~/i18n/history-layout.generated.ts 생성
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const srcDir = path.join(root, 'i18n', 'source')
const outLocales = path.join(root, 'i18n', 'locales')
const outLayout = path.join(root, 'i18n', 'history-layout.generated.ts')

const FILES = ['common', 'about', 'history', 'index', 'business', 'customer', 'contact', 'partner']

function isLocalizedRecord(node) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return false
  const langs = ['ko', 'en', 'ja', 'vi']
  if (!langs.every((l) => Object.prototype.hasOwnProperty.call(node, l))) return false
  const sample = node.ko
  return typeof sample === 'string' || Array.isArray(sample)
}

function splitTree(node, lang) {
  if (node === null || node === undefined) return node
  if (typeof node !== 'object') return node
  if (Array.isArray(node)) return node.map((x) => splitTree(x, lang))
  if (isLocalizedRecord(node)) return node[lang]
  const out = {}
  for (const [k, v] of Object.entries(node)) {
    out[k] = splitTree(v, lang)
  }
  return out
}

function parseYearKey(k) {
  const m = /^year_(\d+)$/.exec(k)
  return m ? parseInt(m[1], 10) : 0
}

function parseMonthKey(k) {
  const m = /^month_(\d+)$/.exec(k)
  return m ? parseInt(m[1], 10) : 0
}

function parseDayKey(k) {
  const m = /^day_(\d+)$/.exec(k)
  return m ? parseInt(m[1], 10) : 0
}

function buildHistoryLayout(historyJson) {
  const hist = historyJson.history
  if (!hist || typeof hist !== 'object') return []
  const years = Object.keys(hist)
    .filter((k) => k.startsWith('year_'))
    .sort((a, b) => parseYearKey(b) - parseYearKey(a))

  const timeline = []
  for (const yearKey of years) {
    const yearNum = parseYearKey(yearKey)
    const yearObj = hist[yearKey]
    const months = Object.keys(yearObj)
      .filter((k) => k.startsWith('month_'))
      .sort((a, b) => parseMonthKey(b) - parseMonthKey(a))

    const blocks = []
    for (const monthKey of months) {
      const monthNum = parseMonthKey(monthKey)
      const val = yearObj[monthKey]
      const monthLabel = `${yearNum}.${String(monthNum).padStart(2, '0')}`
      let paths = []

      if (isLocalizedRecord(val)) {
        paths = [`history.history.${yearKey}.${monthKey}`]
      } else if (val && typeof val === 'object' && !Array.isArray(val)) {
        const days = Object.keys(val)
          .filter((k) => k.startsWith('day_'))
          .sort((a, b) => parseDayKey(b) - parseDayKey(a))
        paths = days.map((d) => `history.history.${yearKey}.${monthKey}.${d}`)
      }

      if (paths.length) blocks.push({ monthLabel, paths })
    }
    timeline.push({ year: yearNum, blocks })
  }
  return timeline
}

for (const dir of [outLocales]) {
  fs.mkdirSync(dir, { recursive: true })
}

const mergedByLang = { ko: {}, en: {}, ja: {}, vi: {} }

for (const name of FILES) {
  const fp = path.join(srcDir, `${name}.json`)
  const raw = JSON.parse(fs.readFileSync(fp, 'utf8'))
  for (const lang of ['ko', 'en', 'ja', 'vi']) {
    mergedByLang[lang][name] = splitTree(raw, lang)
  }
}

for (const lang of ['ko', 'en', 'ja', 'vi']) {
  const body = `/* eslint-disable prettier/prettier */\n/** 자동 생성 — scripts/generate-locale-ts.mjs */\nexport default ${JSON.stringify(mergedByLang[lang], null, 2)} as Record<string, Record<string, unknown>>\n`
  fs.writeFileSync(path.join(outLocales, `${lang}.ts`), body, 'utf8')
}

const historyRaw = JSON.parse(fs.readFileSync(path.join(srcDir, 'history.json'), 'utf8'))
const layout = buildHistoryLayout(historyRaw)

const layoutTs = `/* eslint-disable prettier/prettier */\n/** 자동 생성 — scripts/generate-locale-ts.mjs */\nexport type HistoryTimelineBlock = { monthLabel: string; paths: readonly string[] }\nexport type HistoryTimelineYear = { year: number; blocks: readonly HistoryTimelineBlock[] }\nexport const historyTimelineYears: readonly HistoryTimelineYear[] = ${JSON.stringify(layout, null, 2)}\n`

fs.writeFileSync(outLayout, layoutTs, 'utf8')

console.log('Wrote locales:', FILES.join(', '))
console.log('Wrote history layout:', layout.length, 'years')
