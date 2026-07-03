import type { LocaleCode } from 'core/stores/locale'
import { historyTimelineYears } from './history-layout.generated'

function getVal(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((o, k) => {
    if (o && typeof o === 'object' && k in (o as object)) return (o as Record<string, unknown>)[k]
    return undefined
  }, obj)
}

function pickLocalized(node: unknown, lang: LocaleCode) {
  if (node == null) return ''
  if (typeof node === 'string') return node
  if (typeof node === 'object' && node !== null && lang in node) {
    return String((node as Record<string, unknown>)[lang] ?? '')
  }
  return ''
}

function getHistoryMessage(path: string, bundles: Record<string, Record<string, unknown>>, lang: LocaleCode) {
  const [bundle, ...keys] = path.split('.')
  return pickLocalized(getVal(bundles[bundle], keys.join('.')), lang)
}

/**
 * about 정적 HTML의 연혁 래퍼에 연·월 구조 DOM을 채웁니다.
 */
export function mountHistoryTimeline(
  historyRoot: HTMLElement | null | undefined,
  bundles: Record<string, Record<string, unknown>>,
  lang: LocaleCode,
) {
  if (!historyRoot) return

  const yearUl = historyRoot.querySelector<HTMLUListElement>('.history-year ul')
  const contentUl = historyRoot.querySelector<HTMLUListElement>('.history-content')
  if (!yearUl || !contentUl) return

  yearUl.replaceChildren()
  contentUl.replaceChildren()

  historyTimelineYears.forEach(({ year }, index) => {
    const li = document.createElement('li')
    if (index === 0) li.classList.add('active')
    li.setAttribute('data-aos', 'fade-up')
    li.setAttribute('data-aos-delay', String(350 + index * 50))
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'btn'
    btn.tabIndex = 0
    btn.textContent = String(year)
    li.appendChild(btn)
    yearUl.appendChild(li)
  })

  historyTimelineYears.forEach(({ blocks }) => {
    const yearLi = document.createElement('li')
    const innerUl = document.createElement('ul')

    blocks.forEach(({ monthLabel, paths }) => {
      const monthLi = document.createElement('li')
      monthLi.className = 'month'
      const label = document.createElement('span')
      label.className = 'month-label'
      label.textContent = monthLabel
      monthLi.appendChild(label)

      const itemsUl = document.createElement('ul')
      for (const path of paths) {
        const itemLi = document.createElement('li')
        itemLi.className = 'item'
        itemLi.innerHTML = getHistoryMessage(path, bundles, lang)
        itemsUl.appendChild(itemLi)
      }
      monthLi.appendChild(itemsUl)
      innerUl.appendChild(monthLi)
    })

    yearLi.appendChild(innerUl)
    contentUl.appendChild(yearLi)
  })
}
