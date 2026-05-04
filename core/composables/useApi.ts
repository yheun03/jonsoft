import type { AxiosInstance, AxiosRequestConfig } from 'axios'

export type Api = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig) => Promise<T>
  post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<T>
}

/**
 * 공통 HTTP 클라이언트.
 * - 클라이언트: 플러그인으로 주입된 Axios (`$api`)
 * - 서버: **상대 경로** `$fetch`로 Nitro 내부 호출(자기 HTTP 요청으로 막히지 않음)
 */
export function useApi(): Api {
  const nuxtApp = useNuxtApp()

  if (import.meta.client) {
    const ax = nuxtApp.$api as AxiosInstance
    return {
      get: <T>(url: string, config?: AxiosRequestConfig) =>
        ax.get<T>(url, config).then((r) => r.data),
      post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        ax.post<T>(url, data, config).then((r) => r.data),
    }
  }

  const toPath = (url: string) => (url.startsWith('/') ? url : `/${url}`)

  return {
    get: <T>(url: string) => $fetch<T>(toPath(url)),
    post: <T>(url: string, data?: unknown) =>
      $fetch<T>(toPath(url), { method: 'POST', body: data }),
  }
}
