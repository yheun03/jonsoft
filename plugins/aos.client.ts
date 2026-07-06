import AOS from 'aos'

export default defineNuxtPlugin((nuxtApp) => {
  const run = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    nextTick(() => {
      AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
      })
      AOS.refresh()
    })
  }

  nuxtApp.hook('page:finish', run)
  nuxtApp.hook('app:mounted', run)
})
