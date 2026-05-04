import type { LocaleCode } from 'core/stores/locale'

function getVal(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((o, k) => {
    if (o && typeof o === 'object' && k in (o as object)) return (o as Record<string, unknown>)[k]
    return undefined
  }, obj)
}

function applyAttrFromValue(
  el: HTMLElement,
  v: unknown,
  lang: LocaleCode,
  apply: (s: string) => void,
) {
  if (v === undefined || v === null) return
  if (typeof v === 'string') {
    apply(v)
    return
  }
  if (typeof v === 'object' && v !== null && lang in v) {
    apply(String((v as Record<string, unknown>)[lang] ?? ''))
  }
}

/**
 * 기존 정적 HTML(`data-i18n`, `data-i18n-src` 등)에 번역 값을 반영합니다.
 * 번들은 언어별 플랫 객체(문자열·문자열 배열 리프) 또는 레거시 { ko, en, … } 리프를 지원합니다.
 */
export function applyLegacyDomI18n(
  root: HTMLElement,
  bundles: Record<string, Record<string, unknown>>,
  lang: LocaleCode,
) {
  const i18nData = bundles

  root.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const attr = el.getAttribute('data-i18n')
    if (!attr) return
    const [f, ...kParts] = attr.split('.')
    const key = kParts.join('.')
    const keyParts = key.split('.')
    const lastPart = keyParts[keyParts.length - 1] ?? ''
    const isArrayIndex = !Number.isNaN(parseInt(lastPart, 10))

    if (isArrayIndex) {
      const arrayKey = keyParts.slice(0, -1).join('.')
      const index = parseInt(lastPart, 10)
      const v = getVal(i18nData[f], arrayKey)
      if (Array.isArray(v) && v[index] !== undefined) {
        el.innerHTML = String(v[index])
        return
      }
      if (v && typeof v === 'object' && v !== null && lang in v) {
        const cur = (v as Record<string, unknown>)[lang]
        if (Array.isArray(cur) && cur[index] !== undefined) {
          el.innerHTML = String(cur[index])
        }
      }
      return
    }

    const v = getVal(i18nData[f], key)
    if (v === undefined || v === null) return

    if (typeof v === 'string') {
      el.innerHTML = v
      return
    }
    if (Array.isArray(v)) {
      el.innerHTML = v.map((i) => `<li>${String(i)}</li>`).join('')
      return
    }
    if (typeof v === 'object' && v !== null && lang in v) {
      const cur = (v as Record<string, unknown>)[lang]
      if (Array.isArray(cur)) {
        el.innerHTML = cur.map((i) => `<li>${String(i)}</li>`).join('')
      } else {
        el.innerHTML = String(cur ?? '')
      }
    }
  })

  root.querySelectorAll<HTMLElement>('[data-common]').forEach((el) => {
    const key = el.getAttribute('data-common')
    if (!key) return
    const keyParts = key.split('.')
    const lastPart = keyParts[keyParts.length - 1] ?? ''
    const isArrayIndex = !Number.isNaN(parseInt(lastPart, 10))

    if (isArrayIndex) {
      const arrayKey = keyParts.slice(0, -1).join('.')
      const index = parseInt(lastPart, 10)
      const v = getVal(i18nData.common, arrayKey)
      if (Array.isArray(v) && v[index] !== undefined) {
        el.innerHTML = String(v[index])
        return
      }
      if (v && typeof v === 'object' && v !== null && lang in v) {
        const cur = (v as Record<string, unknown>)[lang]
        if (Array.isArray(cur) && cur[index] !== undefined) {
          el.innerHTML = String(cur[index])
        }
      }
      return
    }

    const v = getVal(i18nData.common, key)
    if (v === undefined || v === null) return

    if (typeof v === 'string') {
      el.innerHTML = v
      return
    }
    if (Array.isArray(v)) {
      el.innerHTML = v.map((i) => `<li>${String(i)}</li>`).join('')
      return
    }
    if (typeof v === 'object' && v !== null && lang in v) {
      const cur = (v as Record<string, unknown>)[lang]
      if (Array.isArray(cur)) {
        el.innerHTML = cur.map((i) => `<li>${String(i)}</li>`).join('')
      } else {
        el.innerHTML = String(cur ?? '')
      }
    }
  })

  root.querySelectorAll<HTMLImageElement>('[data-i18n-src]').forEach((el) => {
    const attr = el.getAttribute('data-i18n-src')
    if (!attr) return
    const [f, ...parts] = attr.split('.')
    const v = getVal(i18nData[f], parts.join('.'))
    applyAttrFromValue(el, v, lang, (s) => {
      el.src = s
    })
  })

  root.querySelectorAll<HTMLImageElement>('[data-i18n-alt]').forEach((el) => {
    const attr = el.getAttribute('data-i18n-alt')
    if (!attr) return
    const [f, ...parts] = attr.split('.')
    const v = getVal(i18nData[f], parts.join('.'))
    applyAttrFromValue(el, v, lang, (s) => {
      el.alt = s
    })
  })

  root.querySelectorAll<HTMLAnchorElement>('[data-i18n-href]').forEach((el) => {
    const attr = el.getAttribute('data-i18n-href')
    if (!attr) return
    const [f, ...parts] = attr.split('.')
    const v = getVal(i18nData[f], parts.join('.'))
    applyAttrFromValue(el, v, lang, (s) => {
      el.href = s
    })
  })
}
