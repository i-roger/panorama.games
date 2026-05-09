import { useMemo } from 'react'
import type { Game, Platform } from '@/types'
import gamesData from '@/data/games.json'

const typedData = gamesData as { platforms: Platform[]; totalGames: number }

export function usePlatformGames() {
  const platforms = typedData.platforms

  const allGames: Game[] = useMemo(
    () => platforms.flatMap((p) => p.games),
    [platforms],
  )

  const getPlatformGames = (name: string): Game[] => {
    if (name === 'all') return allGames
    return platforms.find((p) => p.name === name)?.games ?? []
  }

  return { platforms, allGames, totalGames: typedData.totalGames, getPlatformGames }
}
