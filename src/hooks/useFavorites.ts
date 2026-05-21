import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'panorama-games-favorites'

function readStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

let cached = readStorage()

function getSnapshot(): string[] {
  return cached
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

function emit() {
  window.dispatchEvent(new Event('storage'))
}

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const toggle = useCallback((gameKey: string) => {
    const next = cached.includes(gameKey)
      ? cached.filter((k) => k !== gameKey)
      : [...cached, gameKey]
    cached = next
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    emit()
  }, [])

  const isFavorite = useCallback(
    (gameKey: string) => favorites.includes(gameKey),
    [favorites],
  )

  const clear = useCallback(() => {
    cached = []
    localStorage.setItem(STORAGE_KEY, '[]')
    emit()
  }, [])

  return { favorites, toggle, isFavorite, clear }
}
