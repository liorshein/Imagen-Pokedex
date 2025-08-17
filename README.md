# Pokédex Explorer

A modern, responsive Vue 3 Pokemon discovery application (Gen 1) featuring advanced filtering, favorites management, and detailed Pokemon information. Built with TypeScript, Tailwind CSS, and shadcn-vue components.

## **Core Requirements**

### **Pokémon List Implementation**

**Objective**: Display a paginated Pokemon list from [PokéAPI](https://pokeapi.co/api/v2/pokemon) with name and image for each Pokemon.

**API Challenge**:
The base endpoint returns only `name` and `url` properties. To display images and types requires additional API calls for each Pokemon's detailed data.

**Solution Strategy**:

1. **Initial Fetch**: Load all 151 Gen 1 Pokemon names from [PokéAPI](https://pokeapi.co/api/v2/pokemon?limit=151)
2. **Lazy Loading**: Fetch detailed Pokemon data (images, stats, types) only when needed for pagination
3. **Cache Management**: Store fetched details (only necessary ones) to avoid redundant API calls

**Another Possible Strategy**:

1. **Initial Fetch**: Load 20 Pokemon from [PokéAPI](https://pokeapi.co/api/v2/pokemon)
2. **Load Images**: Load appropriate images from (PNG Url)[https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png] - Changing the Id number appropriately.
3. **Additional Details**: Fetch detailed Pokemon data (images, stats, types) only when clicked
4. **Cache Management**: Store fetched details (only necessary ones) to avoid redundant API calls

### **Search by Name**

**Objective**: Provide a search input to filter Pokémon by name, updating the list in real-time as the user types.

**API Challenge**:
The base endpoint lacks search query parameters. Direct searches only work with exact Pokemon names (e.g., `https://pokeapi.co/api/v2/pokemon/pikachu`).

**Solution Strategy**:

1. **Pre-load Pokemon Names**: Cache all 151 Gen 1 Pokemon names and IDs from `/pokemon?limit=151`
2. **Client-Side Filtering**: Filter the cached name list using `startsWith()` matching names
3. **Throttled Input**: Implement 150ms throttling to prevent excessive filtering during rapid typing
4. **Cache-First Results**: Display results from cached data instantly, fetch details only for visible Pokemon

## Features

### **Smart Search & Discovery**

- **Instant Search**: Search Pokemon by name or Pokedex ID with 150ms throttled input
- **Infinite Scroll**: Seamless pagination with 20 Pokemon per page
- **Cache-First Strategy**: Intelligent caching for instant loading of previously viewed Pokemon

### **Advanced Filtering System**

- **Multi-Type Filtering**: Filter by Pokemon types with AND logic (e.g., Fire + Flying)
- **Favorites Filter**: Toggle between all Pokemon and favorites-only view
- **Real-time Updates**: Filters apply instantly with visual feedback
- **Filter Status Display**: Shows count and active filter description

### **Favorites Management**

- **Persistent Storage**: Favorites saved to localStorage
- **Quick Toggle**: One-click favorite/unfavorite from Pokemon cards or modal
- **Counter Display**: Visual indicator of favorites count
- **Integrated Filtering**: Filter to show only favorited Pokemon

### **Rich UI Experience**

- **Type-Based Styling**: Pokemon types displayed with accurate colors
- **Detailed Modal**: Comprehensive Pokemon stats, abilities, and measurements
- **Loading States**: Smooth loading animations and skeleton states
- **Error Handling**: Graceful error recovery with retry options

## **Architecture**

### **Tech Stack**

- **Frontend**: Vue 3 with Composition API & `<script setup>`
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS 4 with CSS custom properties
- **Components**: shadcn-vue (Reka UI) component library
- **State**: Pinia stores with reactive patterns
- **Routing**: Vue Router 4 with dynamic routes
- **Build**: Vite with Vue DevTools integration

### **Data Flow Patterns**

1. **Cache-First Strategy**: Check local cache before API calls
2. **Reactive Filters**: Real-time UI updates via computed properties
3. **Optimistic UI**: Immediate feedback for user actions
4. **Progressive Loading**: Infinite scroll with loading states

### **Future Plan If Possible**

1. **Testing**: Create e2e and integration testing using playwright and vitest
2. **Additional Gens**: Include additional pokemons from other generations
