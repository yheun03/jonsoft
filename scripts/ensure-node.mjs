import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function readRequiredMajor() {
  try {
    const nvm = readFileSync(join(root, '.nvmrc'), 'utf8').trim()
    const m = /^(\d+)/.exec(nvm)
    if (m) return Number.parseInt(m[1], 10)
  } catch {
    /* no .nvmrc */
  }
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
  const engine = pkg.engines?.node
  if (!engine) return null
  const s = String(engine).trim()
  const m = /^(\d+)/.exec(s.replace(/^[\^>=~]+\s*/, ''))
  if (m) return Number.parseInt(m[1], 10)
  return null
}

const requiredMajor = readRequiredMajor()
const currentMajor = Number.parseInt(process.version.slice(1).split('.')[0], 10)

if (requiredMajor != null && currentMajor < requiredMajor) {
  console.error(
    `\n[jonsoft] Node 버전이 너무 낮습니다.\n` +
      `  현재: ${process.version}\n` +
      `  필요: Node ${requiredMajor} 이상 (.nvmrc / package.json engines)\n\n` +
      `  nvm-windows 사용 시:\n` +
      `    nvm install ${requiredMajor}\n` +
      `    nvm use ${requiredMajor}\n` +
      `  그다음 Cursor를 완전히 종료했다가 다시 열면 터미널 PATH가 맞는 경우가 많습니다.\n\n`,
  )
  process.exit(1)
}
