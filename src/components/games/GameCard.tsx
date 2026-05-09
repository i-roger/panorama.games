import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Game } from '@/types'

interface GameCardProps {
  game: Game
  isFavorite: boolean
  onToggleFavorite: (key: string) => void
}

export default function GameCard({ game, isFavorite, onToggleFavorite }: GameCardProps) {
  const gameKey = `${game.platform}::${game.name}`

  return (
    <Card className="group flex flex-col w-xs gap-2 p-2.5 transition-colors hover:bg-accent/50 max-w-full overflow-hidden">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium break-all">{game.name}</p>
        <p className="text-xs text-muted-foreground truncate">{game.platform}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 h-8 w-8"
        onClick={() => onToggleFavorite(gameKey)}
        aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        <Heart
          className={cn(
            'h-4 w-4 transition-colors',
            isFavorite
              ? 'fill-red-500 text-red-500'
              : 'text-muted-foreground group-hover:text-foreground',
          )}
        />
      </Button>
    </Card>
  )
}
