import AOS from 'aos'

export default defineNuxtPlugin((nuxtApp) => {
  const run = () => {
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
