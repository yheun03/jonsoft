import type { LocaleCode } from 'core/stores/locale'
import { applyLegacyDomI18n } from 'core/utils/applyLegacyDomI18n'
import { historyTimelineYears } from './history-layout.generated'

/**
 * 연혁 트리에 `data-i18n` 노드를 추가한 뒤 호출하면 현재 언어로 채워집니다.
 * (예: 마케팅에서 TS로 신규 항목만 붙일 때 `mountHistoryTimeline`과 동일한 규칙을 쓸 수 있습니다.)
 */
export function refreshHistoryDomI18n(
  scope: HTMLElement,
  bundles: Record<string, Record<string, unknown>>,
  lang: LocaleCode,
) {
  applyLegacyDomI18n(scope, bundles, lang)
}

/**
 * about 정적 HTML의 연혁 래퍼에 연·월 구조 DOM을 채웁니다.
 * `data-i18n`만 부여하고 텍스트는 `applyLegacyDomI18n`이 언어별로 반영합니다.
 */
export function mountHistoryTimeline(historyRoot: HTMLElement | null | undefined) {
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
        itemLi.setAttribute('data-i18n', path)
        itemsUl.appendChild(itemLi)
      }
      monthLi.appendChild(itemsUl)
      innerUl.appendChild(monthLi)
    })

    yearLi.appendChild(innerUl)
    contentUl.appendChild(yearLi)
  })
}
