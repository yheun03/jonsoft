import type { LocaleCode } from 'core/stores/locale'

function getVal(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((o, k) => {
    if (o && typeof o === 'object' && k in (o as object)) return (o as Record<string, unknown>)[k]
    return undefined
  }, obj)
}

function pickLocalized(node: unknown, lang: LocaleCode): string {
  if (node == null) return ''
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return ''
  if (typeof node === 'object' && node !== null && lang in node) {
    return String((node as Record<string, unknown>)[lang] ?? '')
  }
  return ''
}

/** 레이아웃 등에서 `common.json` 등 로드된 번들 값을 꺼낼 때 사용 */
export function useLocaleMessage() {
  const locale = useLocaleStore()

  function t(bundle: string, path: string): string {
    const b = locale.bundles[bundle]
    if (!b) return ''
    return pickLocalized(getVal(b, path), locale.lang)
  }

  return { t }
}
