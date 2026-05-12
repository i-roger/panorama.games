import { useState, useCallback } from 'react'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import MainContent from '@/components/layout/MainContent'
import { useFavorites } from '@/hooks/useFavorites'
import { usePlatformGames } from '@/hooks/usePlatformGames'
import { useTheme } from '@/hooks/useTheme'
import { Analytics } from "@vercel/analytics/react"

import Topbanner from './components/layout/Topbanner'
import Navbar from './components/layout/Navbar'

export default function App() {
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [query, setQuery] = useState('')
  const { toggle, isFavorite } = useFavorites()
  const { platforms, allGames, totalGames, getPlatformGames } = usePlatformGames()
  const { theme, toggle: toggleTheme } = useTheme()

  const handleSelectPlatform = useCallback((name: string) => {
    setSelectedPlatform(name)
    setQuery('')
  }, [])

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <Topbanner/>
      <Header
        platforms={platforms}
        selectedPlatform={selectedPlatform}
        onSelectPlatform={handleSelectPlatform}
        totalGames={totalGames}
        query={query}
        onSearchChange={setQuery}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <Navbar/>
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <div className="hidden md:block w-60 lg:w-72 shrink-0 min-h-0">
          <Sidebar
            platforms={platforms}
            selectedPlatform={selectedPlatform}
            onSelectPlatform={handleSelectPlatform}
            totalGames={totalGames}
          />
        </div>

        <MainContent
          selectedPlatform={selectedPlatform}
          platforms={platforms}
          allGames={allGames}
          getPlatformGames={getPlatformGames}
          query={query}
          isFavorite={isFavorite}
          onToggleFavorite={toggle}
        />
      </div>
      <Analytics/> 
    </div>
  )
}
