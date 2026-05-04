import axios, { type AxiosInstance } from 'axios'

/**
 * 브라우저 전용 Axios 인스턴스.
 * SSR에서는 `useApi()`가 상대 경로 `$fetch`를 사용합니다.
 */
export function createBrowserApiClient(baseURL?: string): AxiosInstance {
  return axios.create({
    baseURL: baseURL ?? '',
    timeout: 30_000,
    headers: { Accept: 'application/json' },
  })
}
