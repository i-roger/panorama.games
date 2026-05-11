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
  types/index.ts               # Game { name: string; platform: string; imageUrl?: string }
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
      GameCard.tsx             # Card vertical com imagem (aspect-video), placeholder Gamepad2 e botão favorito
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
- Campo opcional `imageUrl?: string` no tipo `Game` para imagens manuais

### GameCard
- Layout vertical: imagem no topo (`aspect-video` + `object-cover` com hover `scale-105`)
- Placeholder: ícone `Gamepad2` quando `imageUrl` é `null`
- Nome + plataforma abaixo da imagem
- Botão favorito absoluto no canto superior direito da imagem

## Comandos

```bash
npm run dev       # Dev server
npm run build     # Parse → tsc → vite build
```

## Estado Atual
- Build: OK (1.35MB JS, 42KB CSS)
- Tema: funcional
- Favoritos: funcional c/ fallback iOS e toast de confirmação
- Sidebar: scroll independente em desktop e mobile, fecha ao selecionar
- Responsivo: funcional
- Toast de cópia: implementado
- GameCard: layout vertical com imagem (aspect-video), placeholder Gamepad2
- Imagens: sistema manual via `imageUrl` no JSON (URLs externas ou `public/images/`)

## Backup

Criada branch `backup-pre-rawg` (commit `793a9e0`) como ponto de referência anterior ao início da integração RAWG.

## Pendências / Ideias Futuras
- Code-splitting por plataforma para reduzir bundle
- Adicionar imagens manualmente via `imageUrl` no `games.json`
- Badge de plataforma com cor distinta
- Scroll suave na navegação entre plataformas

## Imagens — Sistema Manual

### Abordagem
O campo `imageUrl?: string` no tipo `Game` permite adicionar imagens aos cards sem depender de APIs externas em runtime. O card lê o campo diretamente do `games.json` — se preenchido, exibe a imagem; se vazio, mostra o placeholder `Gamepad2`.

### Como adicionar

Editar `src/data/games.json` e adicionar `"imageUrl"` aos jogos desejados:

```json
{
  "name": "nome do jogo",
  "platform": "Arcade",
  "imageUrl": "/images/nome-do-jogo.webp"
}
```

### Fontes suportadas
- **URLs externas**: `"imageUrl": "https://exemplo.com/imagem.jpg"`
- **Arquivos locais**: colocar em `public/images/` e referenciar como `"/images/arquivo.ext"`

### GameCard
- Layout vertical: imagem no topo (`aspect-video` + `object-cover`)
- Placeholder: ícone `Gamepad2` quando `imageUrl` for `null` ou vazio
- Hover: imagem escala 105% (`scale-105`)
- Botão favorito absoluto no canto superior direito com backdrop blur
- Nome + plataforma abaixo da imagem

### Vantagens
- Zero dependência de API externa
- Sem impacto em build, deploy ou runtime
- Compatível com qualquer fonte de imagem (CDN, storage próprio, etc.)
