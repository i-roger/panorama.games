import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface Game {
  name: string
  platform: string
}

interface Platform {
  name: string
  games: Game[]
}

interface GamesData {
  platforms: Platform[]
  totalGames: number
}

function formatGameName(fileName: string): string {
  return fileName.replace(/\.(zip|cdi|ldb|easyrpg)$/i, '').trim()
}

function pushCurrent(platforms: Platform[], current: Platform | null) {
  if (current && current.games.length > 0) {
    platforms.push(current)
  }
}

const mdPath = resolve(__dirname, '..', 'LISTA_DE_JOGOS.md')
const content = readFileSync(mdPath, 'utf-8')
const lines = content.split('\n')

const seenPlatforms = new Set<string>()
const platforms: Platform[] = []
let currentPlatform: Platform | null = null

for (const line of lines) {
  const trimmed = line.trim()

  if (trimmed.startsWith('## ')) {
    const headerMatch = trimmed.match(/^##\s+(.+?)\s*\(([\d,~]+)\s*jogos?\)\s*$/)
    if (headerMatch) {
      const platformName = headerMatch[1].trim()
      if (!seenPlatforms.has(platformName)) {
        seenPlatforms.add(platformName)
        pushCurrent(platforms, currentPlatform)
        currentPlatform = { name: platformName, games: [] }
      } else {
        pushCurrent(platforms, currentPlatform)
        currentPlatform = null
      }
    } else {
      pushCurrent(platforms, currentPlatform)
      currentPlatform = null
    }
    continue
  }

  const gameMatch = trimmed.match(/^-\s+(.+)$/)
  if (gameMatch && currentPlatform) {
    currentPlatform.games.push({
      name: formatGameName(gameMatch[1].trim()),
      platform: currentPlatform.name,
    })
  }
}

pushCurrent(platforms, currentPlatform)

const data: GamesData = {
  platforms,
  totalGames: platforms.reduce((sum, p) => sum + p.games.length, 0),
}

const outputPath = resolve(__dirname, '..', 'src', 'data', 'games.json')
writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8')

console.log(`Parsed ${data.totalGames} games across ${platforms.length} platforms`)
for (const p of platforms) {
  console.log(`  ${p.name}: ${p.games.length} jogos`)
}
