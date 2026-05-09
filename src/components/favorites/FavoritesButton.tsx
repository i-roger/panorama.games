import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Heart, Copy, Trash2, Check } from 'lucide-react'
import { useFavorites } from '@/hooks/useFavorites'
import { usePlatformGames } from '@/hooks/usePlatformGames'
import { useCallback, useState } from 'react'
import { copyToClipboard } from '@/lib/clipboard'

export default function FavoritesButton() {
  const { favorites, toggle, clear } = useFavorites()
  const { allGames } = usePlatformGames()
  const [copied, setCopied] = useState(false)

  const favoriteGames = allGames.filter((g) =>
    favorites.includes(`${g.platform}::${g.name}`),
  )

  const copyList = useCallback(async () => {
    const text = favoriteGames
      .map((g) => `${g.name} - ${g.platform}`)
      .join('\n')
    const ok = await copyToClipboard(text)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [favoriteGames])

  return (
    <Sheet>
      <SheetTrigger className="relative inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent size-8 hover:bg-muted hover:text-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
        <Heart
          className={`h-5 w-5 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`}
        />
        {favorites.length > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1.5 -right-1.5 h-4 min-w-4 px-1 text-[10px] flex items-center justify-center"
          >
            {favorites.length}
          </Badge>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col overflow-hidden">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500" />
            Favoritos ({favorites.length})
          </SheetTitle>
        </SheetHeader>

        {favoriteGames.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
            <p>Nenhum jogo favoritado ainda</p>
          </div>
        ) : (
          <>
            <div className="flex gap-2 py-3 px-2 shrink-0">
              <Button size="sm" className="flex-1 gap-1.5" onClick={copyList}>
                <Copy className="h-3.5 w-3.5" />
                Copiar lista
              </Button>
              <Button size="sm" variant="outline" className="gap-1.5" onClick={clear}>
                <Trash2 className="h-3.5 w-3.5" />
                Limpar
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0 pr-4">
              <div className="space-y-1">
                {favoriteGames.map((g) => {
                  const key = `${g.platform}::${g.name}`
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm group"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{g.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{g.platform}</p>
                      </div>
                      <button
                        onClick={() => toggle(key)}
                        className="shrink-0 ml-2 text-muted-foreground opacity-100 transition-opacity hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}
        {copied && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-popover text-popover-foreground px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium border flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            <Check className="h-4 w-4 text-green-500 shrink-0" />
            Lista copiada!
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
