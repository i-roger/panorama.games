import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Gamepad2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Game } from '@/types'

interface GameCardProps {
  game: Game
  isFavorite: boolean
  onToggleFavorite: (key: string) => void
}

export default function GameCard({ game, isFavorite, onToggleFavorite }: GameCardProps) {
  const gameKey = `${game.platform}::${game.name}`
  const imageUrl = game.imageUrl ?? null

  return (
    <Card className="group flex flex-col w-xs gap-0 p-0 transition-colors hover:bg-accent/50 max-w-full overflow-hidden">
      <div className="relative aspect-video bg-muted overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={game.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <Gamepad2 className="h-8 w-8" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'absolute top-1 right-1 h-8 w-8 bg-background/60 backdrop-blur-sm hover:bg-background/80',
          )}
          onClick={() => onToggleFavorite(gameKey)}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart
            className={cn(
              'h-4 w-4 transition-colors',
              isFavorite
                ? 'fill-red-500 text-red-500'
                : 'text-muted-foreground',
            )}
          />
        </Button>
      </div>
      <div className="flex flex-col gap-0.5 p-2.5">
        <p className="text-sm font-medium break-all leading-tight">{game.name}</p>
        <p className="text-xs text-muted-foreground truncate">{game.platform}</p>
      </div>
    </Card>
  )
}
