/**
 * about 페이지 연혁 블록: 연도 버튼·스크롤 연동을 바닐라로 초기화합니다.
 * DOM은 `mountHistoryTimeline` 이후에 존재하므로, 레이아웃 마운트 직후 호출해야 합니다.
 */
export function bindHistoryLegacyControls(root: HTMLElement | null | undefined): () => void {
  if (!root) return () => {}

  const historyRoot = root.querySelector<HTMLElement>('.history')
  if (!historyRoot) return () => {}

  const ac = new AbortController()
  const { signal } = ac

  function checkHistoryActive(r: HTMLElement) {
    const items = r.querySelectorAll<HTMLElement>('.history .history-content > li')
    const yearLis = r.querySelectorAll<HTMLElement>('.history .history-year ul li')
    if (!items.length || !yearLis.length) return

    const scrollTop = window.scrollY
    const viewportCenter = scrollTop + window.innerHeight / 2
    let closestIndex = 0
    let minDistance = Infinity

    items.forEach((li, index) => {
      const rect = li.getBoundingClientRect()
      const elementTop = scrollTop + rect.top
      const elementCenter = elementTop + rect.height / 2
      const distance = Math.abs(viewportCenter - elementCenter)
      if (distance < minDistance) {
        minDistance = distance
        closestIndex = index
      }
    })

    yearLis.forEach((li, i) => {
      li.classList.toggle('active', i === closestIndex)
    })
  }

  const yearBtns = historyRoot.querySelectorAll<HTMLButtonElement>('.history-year ul li .btn')
  const contents = historyRoot.querySelectorAll<HTMLElement>('.history-content > li')

  yearBtns.forEach((btn, index) => {
    btn.addEventListener(
      'click',
      () => {
        const target = contents[index]
        if (target) {
          const top = window.scrollY + target.getBoundingClientRect().top - 100
          window.scrollTo({ top, behavior: 'smooth' })
        }
        requestAnimationFrame(() => checkHistoryActive(root))
      },
      { signal },
    )
    btn.addEventListener(
      'keydown',
      (e) => {
        const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', ' ']
        if (!keys.includes(e.key)) return
        e.preventDefault()
        const all = [...yearBtns]
        const i = all.indexOf(btn)
        let next = i
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = Math.max(0, i - 1)
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = Math.min(all.length - 1, i + 1)
        if (e.key === 'Enter' || e.key === ' ') {
          btn.click()
          return
        }
        all[next]?.focus()
      },
      { signal },
    )
  })

  let scrollTimer: ReturnType<typeof setTimeout>
  const onScroll = () => {
    checkHistoryActive(root)
    clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => checkHistoryActive(root), 200)
  }
  window.addEventListener('scroll', onScroll, { passive: true, signal })

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') document.querySelector('header')?.classList.remove('open')
  }
  document.addEventListener('keydown', onKey, { signal })

  queueMicrotask(() => checkHistoryActive(root))

  return () => {
    ac.abort()
  }
}
