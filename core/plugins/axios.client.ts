import { createBrowserApiClient } from 'core/utils/createBrowserApiClient'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const api = createBrowserApiClient(config.public.siteUrl || undefined)

  return {
    provide: {
      api,
    },
  }
})
