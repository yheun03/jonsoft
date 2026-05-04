import AOS from 'aos'

export default defineNuxtPlugin((nuxtApp) => {
  const run = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    nextTick(() => {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 0,
      })
      AOS.refresh()
    })
  }

  nuxtApp.hook('page:finish', run)
  nuxtApp.hook('app:mounted', run)
})
