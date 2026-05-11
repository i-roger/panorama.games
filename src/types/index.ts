export interface Game {
  name: string
  platform: string
  imageUrl?: string
}

export interface Platform {
  name: string
  games: Game[]
  count: number
}

export interface GamesData {
  platforms: Platform[]
  totalGames: number
}
