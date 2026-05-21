import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'
import FavoritesButton from '@/components/favorites/FavoritesButton'
import ThemeToggle from './ThemeToggle'
import type { Platform } from '@/types'
import logoBlack from '@/assets/logo/PANORAMALOGOBLACK.png'
import logoWhite from '@/assets/logo/PANORAMALOGOWHITE.png'

interface HeaderProps {
  platforms: Platform[]
  selectedPlatform: string
  onSelectPlatform: (name: string) => void
  totalGames: number
  query: string
  onSearchChange: (q: string) => void
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function Header({
  platforms,
  selectedPlatform,
  onSelectPlatform,
  totalGames,
  query,
  onSearchChange,
  theme,
  onToggleTheme,
}: HeaderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSelectPlatform = (name: string) => {
    onSelectPlatform(name)
    setSidebarOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-3 px-3 md:px-4">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger className="md:hidden inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent size-8 hover:bg-muted hover:text-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <Sidebar
              platforms={platforms}
              selectedPlatform={selectedPlatform}
              onSelectPlatform={handleSelectPlatform}
              totalGames={totalGames}
            />
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2 shrink-0">
          <img
            src={theme === 'dark' ? logoWhite : logoBlack}
            alt="PANORAMA"
            width={90}
            height={17.88007268322229}
            className="hidden sm:inline transform-all duration-700"
          />
        </div>

        <div className="flex-1 max-w-md mx-auto">
          <input
            type="search"
            placeholder="Buscar jogos..."
            value={query}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base md:text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>

        <ThemeToggle theme={theme} onToggle={onToggleTheme} />

        <FavoritesButton />

        <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground shrink-0">
          <span className="font-medium text-foreground">{totalGames.toLocaleString()}</span>
          <span className="hidden md:inline">jogos</span>
        </div>
      </div>
    </header>
  )
}
