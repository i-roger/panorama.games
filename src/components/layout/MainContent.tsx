import { useMemo } from 'react'
import GameGrid from '@/components/games/GameGrid'
import { Badge } from '@/components/ui/badge'
import type { Game, Platform } from '@/types'

interface MainContentProps {
  selectedPlatform: string
  platforms: Platform[]
  allGames: Game[]
  getPlatformGames: (name: string) => Game[]
  query: string
  isFavorite: (key: string) => boolean
  onToggleFavorite: (key: string) => void
}

export default function MainContent({
  selectedPlatform,
  platforms,
  allGames,
  getPlatformGames,
  query,
  isFavorite,
  onToggleFavorite,
}: MainContentProps) {
  const sourceGames = selectedPlatform === 'all' ? allGames : getPlatformGames(selectedPlatform)

  const filtered = useMemo(() => {
    if (!query.trim()) return sourceGames
    const q = query.toLowerCase().trim()
    return sourceGames.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.platform.toLowerCase().includes(q),
    )
  }, [sourceGames, query])

  const platformName =
    selectedPlatform === 'all'
      ? 'All Games'
      : platforms.find((p) => p.name === selectedPlatform)?.name ?? ''

  return (
    <main className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center gap-2 px-3 md:px-4 py-2 border-b bg-background/50">
        <h1 className="text-sm font-semibold truncate">{platformName}</h1>
        <Badge variant="secondary" className="text-xs tabular-nums shrink-0">
          {filtered.length.toLocaleString()}
        </Badge>
        {query.trim() && (
          <Badge variant="outline" className="text-xs shrink-0">
            filtro: "{query}"
          </Badge>
        )}
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 md:p-4 max-w-full">
        <GameGrid
          games={filtered}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      </div>
    </main>
  )
}
