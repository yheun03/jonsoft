function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if ([...document.scripts].some((s) => s.src.includes('roughmapLoader'))) {
      resolve()
      return
    }
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.charset = 'UTF-8'
    s.onload = () => resolve()
    s.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(s)
  })
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', async () => {
    if (useRoute().path !== '/contact') return
    await nextTick()
    await new Promise<void>((r) => requestAnimationFrame(() => r()))

    try {
      await loadScript('https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js')
    } catch (e) {
      console.warn('[contact-map]', e)
      return
    }

    const w = window as Window & {
      daum?: { roughmap?: { Lander: new (o: object) => { render: () => void } } }
    }
    const Lander = w.daum?.roughmap?.Lander
    if (!Lander) return

    try {
      new Lander({
        timestamp: '1693978036661',
        key: '2g4fj',
      }).render()
    } catch (e) {
      console.warn('[contact-map] render', e)
    }
  })
})
