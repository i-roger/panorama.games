# R36S Game Collection

## Visão Geral
Site mobile-first para navegar ~14.389 jogos retrô (22 plataformas, do Arcade ao PlayStation).
Usuários podem favoritar jogos e copiar a lista formatada com nome + plataforma.

## Stack
- **Vite 8** + **React 19** + **TypeScript 6**
- **Tailwind CSS v4** + **Shadcn/ui** (base-ui)
- Parsing do `LISTA_DE_JOGOS.md` em build time (`scripts/parseGames.ts` → `src/data/games.json`)

## Estrutura

```
src/
  data/games.json              # Gerado automaticamente na build
  types/index.ts               # Game { name: string; platform: string }
  hooks/
    useFavorites.ts            # localStorage + useSyncExternalStore (cache estabilizado p/ evitar loop)
    useTheme.ts                # Dark/Light c/ persistência, aplicado no módulo (síncrono)
    useMediaQuery.ts           # Detecção mobile (max-width: 767px)
    usePlatformGames.ts        # Acesso aos dados parseados
    useSearch.ts               # Filtro por nome ou plataforma
  components/
    layout/
      Header.tsx               # Busca, tema, favoritos, contagem total
      Sidebar.tsx              # Lista de plataformas + "All Games"
      MainContent.tsx          # Grid com badge da plataforma
      ThemeToggle.tsx          # Botão sol/lua
    games/
      GameCard.tsx             # Card com nome + botão favorito (max-w-full p/ evitar overflow)
      GameGrid.tsx             # Render progressivo (batch 10 mobile / 50 desktop, IntersectionObserver)
    favorites/
      FavoritesButton.tsx      # Sheet lateral com scroll, copiar, limpar, toast de confirmação
    ui/                        # Button, Card, Sheet, ScrollArea, Badge, Input, Skeleton, Separator
  lib/
    utils.ts                   # cn(), formatGameName()
    clipboard.ts               # copyToClipboard c/ fallback execCommand (funciona em iOS HTTP)
  App.tsx
scripts/
  parseGames.ts                # Parser do .md → JSON
DOCUMENT.md                    # Este arquivo
```

## Funcionalidades Implementadas

### Tema Dark/Light
- Persiste em `localStorage('r36s-theme')`
- Inicializa respeitando `prefers-color-scheme`
- Aplicado sincronamente no módulo (sem flash)
- CSS com duas camadas: `@theme inline` → `var(--*)` → `:root` / `.dark`

### Favoritos
- Salvos em `localStorage('r36s-favorites')`
- `useSyncExternalStore` com variável `cached` para estabilizar referência
- Sheet lateral com scroll (`min-h-0` + `overflow-hidden`)
- Copiar lista com fallback para iOS (`execCommand('copy')`)
- Toast de confirmação ao copiar (`fixed`, auto-dismiss 2s)

### Sidebar
- Scroll gerenciado internamente (`flex-1 overflow-y-auto min-h-0`), sem dependência de ScrollArea externo
- Wrapper em App.tsx apenas constrange altura (`min-h-0`)
- Cabeçalho "Panorama" visível em mobile e desktop, mesmo estilo do header de favoritos
- Sheet mobile fecha ao selecionar plataforma (estado controlado `open`/`onOpenChange`)

### Responsividade
- Sidebar em desktop (`w-60 lg:w-72`), vira `Sheet` (drawer) em mobile com scroll independente
- Batch loading: 10 jogos por vez mobile, 50 desktop
- Cards com `max-w-full overflow-hidden` para não vazar

### Dados
- 22 plataformas, ~14.389 jogos
- Parsing em build time via `npx tsx scripts/parseGames.ts`
- Duplicatas ignoradas (ex: Nintendo Entertainment System - NES aparece 2x no .md)

## Comandos

```bash
npm run dev       # Dev server
npm run build     # Parse → tsc → vite build
```

## Estado Atual
- Build: OK (1.35MB JS, 40KB CSS)
- Tema: funcional
- Favoritos: funcional c/ fallback iOS e toast de confirmação
- Sidebar: scroll independente em desktop e mobile, fecha ao selecionar
- Responsivo: funcional
- Toast de cópia: implementado

## Pendências / Ideias Futuras
- Code-splitting por plataforma para reduzir bundle
- Imagens via API externa (RAWG)
- Badge de plataforma com cor distinta
- Scroll suave na navegação entre plataformas
