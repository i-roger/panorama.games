import { useState, useEffect, useRef } from 'react'
import GameCard from './GameCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { Game } from '@/types'

const BATCH_SIZE_DESKTOP = 50
const BATCH_SIZE_MOBILE = 10

interface GameGridProps {
  games: Game[]
  isFavorite: (key: string) => boolean
  onToggleFavorite: (key: string) => void
  showSkeleton?: boolean
}

export default function GameGrid({
  games,
  isFavorite,
  onToggleFavorite,
  showSkeleton = true,
}: GameGridProps) {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const batchSize = isMobile ? BATCH_SIZE_MOBILE : BATCH_SIZE_DESKTOP
  const [displayCount, setDisplayCount] = useState(batchSize)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setDisplayCount(batchSize)
  }, [games, batchSize])

  useEffect(() => {
    if (games.length <= displayCount) return

    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDisplayCount((prev) => Math.min(prev + batchSize, games.length))
        }
      },
      { rootMargin: '200px' },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [games.length, displayCount])

  if (showSkeleton && games.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-0 overflow-hidden rounded-xl border">
            <Skeleton className="aspect-video w-full rounded-none" />
            <div className="space-y-1 p-2.5">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <p className="text-lg">Nenhum jogo encontrado</p>
        <p className="text-sm">Tente ajustar sua busca</p>
      </div>
    )
  }

  const visibleGames = games.slice(0, displayCount)
  const hasMore = displayCount < games.length

  return (
    <>
      {/* <div className="flex flex-row flex-wrap bg-red-300 gap-1.5 justify-center md:justify-center max-w-full"> */}
      <div className="grid justify-items-center grid-cols-1 md:grid-cols-4 gap-4 max-w-full">
        {visibleGames.map((game) => {
          const key = `${game.platform}::${game.name}`
          return (
            <GameCard
              key={key}
              game={game}
              
              isFavorite={isFavorite(key)}
              onToggleFavorite={onToggleFavorite}
            />
          )
        })}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-6 max-w-full">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-primary" />
            Carregando mais jogos...
          </div>
        </div>
      )}

      {!hasMore && games.length > batchSize && (
        <p className="text-center text-xs text-muted-foreground py-4">
          Mostrando todos os {games.length.toLocaleString()} jogos
        </p>
      )}
    </>
  )
}
