import { useMemo, useState } from 'react'
import type { Game } from '@/types'

export function useSearch(games: Game[]) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return games
    const q = query.toLowerCase().trim()
    return games.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.platform.toLowerCase().includes(q),
    )
  }, [games, query])

  return { query, setQuery, filtered }
}
