import { promises as fs } from 'node:fs'
import { join, relative, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..', '..')
const imagesRoot = join(root, 'assets', 'images')

const textExts = new Set(['.vue', '.ts', '.js', '.mjs', '.json', '.scss', '.css', '.md'])
const imageExts = new Set(['.png', '.jpg', '.jpeg'])
const skipDirs = new Set(['.git', 'node_modules', '.nuxt', '.output', 'dist'])

async function walk(dir, out = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) {
      if (skipDirs.has(e.name)) continue
      await walk(full, out)
      continue
    }
    out.push(full)
  }
  return out
}

async function convertImagesToWebp() {
  const files = await walk(imagesRoot)
  let converted = 0
  for (const file of files) {
    const ext = extname(file).toLowerCase()
    if (!imageExts.has(ext)) continue
    const webpPath = file.replace(/\.(png|jpe?g)$/i, '.webp')
    const source = sharp(file, { failOn: 'none' })
    await source.webp({ quality: 82, effort: 5 }).toFile(webpPath)
    converted++
  }
  return converted
}

async function replaceImageRefs() {
  const files = await walk(root)
  let updated = 0
  for (const file of files) {
    const ext = extname(file).toLowerCase()
    if (!textExts.has(ext)) continue

    const before = await fs.readFile(file, 'utf8')
    const after = before.replace(
      /((?:\/|\.\/)assets\/images\/[^"'`)\s]+\.(?:png|jpg|jpeg))/gi,
      (m) => m.replace(/\.(png|jpg|jpeg)$/i, '.webp'),
    )

    if (after !== before) {
      await fs.writeFile(file, after, 'utf8')
      updated++
    }
  }
  return updated
}

const converted = await convertImagesToWebp()
const updatedFiles = await replaceImageRefs()

console.log(`[optimize-images] converted: ${converted}`)
console.log(`[optimize-images] updated files: ${updatedFiles}`)
console.log(`[optimize-images] root: ${relative(process.cwd(), root) || '.'}`)
