import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')
  if (!name || !/^[a-z-]+$/.test(name)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid bundle name' })
  }

  const filePath = join(process.cwd(), 'assets', 'i18n', `${name}.json`)
  if (!existsSync(filePath)) {
    throw createError({ statusCode: 404, statusMessage: 'Bundle not found' })
  }

  const raw = await readFile(filePath, 'utf-8')
  return JSON.parse(raw) as unknown
})
