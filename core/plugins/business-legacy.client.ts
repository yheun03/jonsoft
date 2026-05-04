// @ts-nocheck: jQuery/Slick globals without types
function loadScriptOnce(src: string, loadedHint: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if ([...document.scripts].some((s) => s.src.includes(loadedHint))) {
      resolve()
      return
    }
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(s)
  })
}

function destroySlick() {
  const w = window as Window & { jQuery?: (sel: Element) => { hasClass: (c: string) => boolean; slick?: (cmd: string) => void } }
  const $ = w.jQuery
  const el = document.querySelector('.list-solution')
  if (!$ || !el) return
  const $el = $(el)
  if (typeof $el.hasClass === 'function' && $el.hasClass('slick-initialized') && typeof $el.slick === 'function') {
    try {
      $el.slick('unslick')
    } catch {
      /* noop */
    }
  }
}

function bindModalsOnce() {
  const w = window as Window & { __jonsoftModalBound?: boolean }
  if (w.__jonsoftModalBound) return
  w.__jonsoftModalBound = true

  document.body.addEventListener('click', (e) => {
    const t = (e.target as HTMLElement | null)?.closest?.('[data-modal-target]')
    if (t) {
      const id = t.getAttribute('data-modal-target')
      const type = t.getAttribute('data-modal-type') || 'solution'
      if (!id) return
      const inner = document.querySelector(
        `.modal .content-${type}[data-modal-id="${id}"]`,
      ) as HTMLElement | null
      const modal = inner?.closest('.modal')
      document.querySelectorAll('.modal.active').forEach((m) => m.classList.remove('active'))
      document.body.classList.remove('modal-open')
      if (modal) {
        modal.classList.add('active')
        document.body.classList.add('modal-open')
      }
      return
    }

    const closeBtn = (e.target as HTMLElement | null)?.closest?.('.modal .btn.type-round')
    if (closeBtn) {
      closeBtn.closest('.modal')?.classList.remove('active')
      document.body.classList.remove('modal-open')
      return
    }

    const hit = (e.target as HTMLElement | null)?.closest?.('.modal')
    if (hit && (e.target as HTMLElement).classList.contains('modal')) {
      hit.classList.remove('active')
      document.body.classList.remove('modal-open')
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return
    document.querySelectorAll('.modal.active').forEach((m) => m.classList.remove('active'))
    document.body.classList.remove('modal-open')
  })
}

export default defineNuxtPlugin((nuxtApp) => {
  bindModalsOnce()

  nuxtApp.hook('page:finish', async () => {
    await nextTick()
    await new Promise<void>((r) => requestAnimationFrame(() => r()))

    const path = useRoute().path
    if (path !== '/business') {
      destroySlick()
      return
    }

    try {
      await loadScriptOnce('/assets/scripts/jquery-3.7.1.min.js', 'jquery-3.7.1')
      await loadScriptOnce('/assets/library/slick/slick.min.js', 'slick.min')
    } catch (err) {
      console.warn('[business-legacy]', err)
      return
    }

    const w = window as Window & { jQuery?: (sel: Element) => { hasClass: (c: string) => boolean; slick?: (opts: object) => void } }
    const $ = w.jQuery
    const el = document.querySelector('.list-solution')
    if (!$ || !el) return
    const $el = $(el)
    if (typeof $el.hasClass === 'function' && $el.hasClass('slick-initialized')) return

    $el.slick?.({
      slidesToShow: 7,
      centerMode: true,
      infinite: true,
      arrows: false,
      dots: true,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 2000,
      variableWidth: true,
      swipe: true,
      draggable: true,
      focusOnSelect: true,
      touchThreshold: 10,
      swipeThreshold: 10,
      slidesToScroll: 1,
      swipeToSlide: true,
      edgeFriction: 0.1,
    })
  })
})
