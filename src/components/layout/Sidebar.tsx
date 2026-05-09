import { cn } from '@/lib/utils'
import { Gamepad2 } from 'lucide-react'
import type { Platform } from '@/types'

interface SidebarProps {
  platforms: Platform[]
  selectedPlatform: string
  onSelectPlatform: (name: string) => void
  totalGames: number
}

export default function Sidebar({
  platforms,
  selectedPlatform,
  onSelectPlatform,
  totalGames,
}: SidebarProps) {
  return (
    <aside className="flex flex-col h-full border-r bg-muted/20 min-h-0">
      <div className="flex flex-col gap-0.5 p-4 border-b shrink-0">
        <div className="flex items-center gap-2 text-base font-medium text-foreground">
          <Gamepad2 className="h-4 w-4 text-primary md:hidden" />
          <span className='md:hidden'>Panorama</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto min-h-0 py-1">
        <button
          onClick={() => onSelectPlatform('all')}
          className={cn(
            'w-full text-left px-3 py-2 text-sm transition-colors hover:bg-accent',
            selectedPlatform === 'all'
              ? 'bg-accent font-medium text-accent-foreground'
              : 'text-muted-foreground',
          )}
        >
          <div className="flex items-center justify-between">
            <span>Todos os jogos</span>
            <span className="text-xs tabular-nums">{totalGames.toLocaleString()}</span>
          </div>
        </button>
        <div className="mx-3 my-1 h-px bg-border" />
        {platforms.map((p) => (
          <button
            key={p.name}
            onClick={() => onSelectPlatform(p.name)}
            className={cn(
              'w-full text-left px-3 py-1.5 text-sm transition-colors hover:bg-accent',
              selectedPlatform === p.name
                ? 'bg-accent font-medium text-accent-foreground'
                : 'text-muted-foreground',
            )}
          >
            <div className="flex items-center justify-between">
              <span className="truncate">{p.name}</span>
              <span className="text-xs tabular-nums shrink-0 ml-2">
                {p.games.length.toLocaleString()}
              </span>
            </div>
          </button>
        ))}
      </div>
    </aside>
  )
}
