/** 라우트별 i18n 번들 목록 — 정책은 여기서만 확장합니다. */
export const routeI18nNamespaces: Record<string, string[]> = {
  '/': ['index', 'common'],
  '/about': ['about', 'history', 'common'],
  '/business': ['business', 'common'],
  '/customer': ['common'],
  '/contact': ['contact', 'common'],
}

export function getI18nNamespaces(path: string) {
  return routeI18nNamespaces[path] ?? ['common']
}
