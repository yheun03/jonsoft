import { withBase } from 'ufo'

export function assetPath(path: string) {
  let normalized = path
  if (path.startsWith('./')) normalized = `/${path.slice(2)}`
  else if (!path.startsWith('/')) normalized = `/${path}`

  return withBase(normalized, import.meta.env.BASE_URL || '/')
}
