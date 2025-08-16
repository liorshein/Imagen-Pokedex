<script setup lang="ts">
import { onMounted, nextTick, ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInfiniteScroll } from '@vueuse/core'
import { usePokemonStore } from '@/stores/pokemon'
import { toast } from 'vue-sonner'
import {
  PokemonDetailsModal,
  ErrorMessage,
  FilterCard,
  ThemeToggle,
  LoadingSpinner,
  PokemonEmptyState,
  PokemonGrid,
} from '@/components'
import type { Pokemon } from '@/types/pokemon'

const route = useRoute()
const router = useRouter()
const pokemonStore = usePokemonStore()

const selectedPokemon = ref<Pokemon | null>(null)

const isModalOpen = computed(() => !!route.params.name)
const pokemonName = computed(() => {
  const name = route.params.name as string
  return name ? name.toLowerCase() : null
})

const filterStatusText = computed(() => {
  const displayedCount = pokemonStore.pokemons.length
  const totalCount = pokemonStore.filteredPokemonIds.length
  const searchQuery = pokemonStore.filters.searchQuery.trim()
  const selectedTypes = pokemonStore.filters.selectedTypes
  const showFavoritesOnly = pokemonStore.filters.showFavoritesOnly

  let text = `Showing ${displayedCount} of ${totalCount} Pokémon`

  if (searchQuery) {
    text += ` matching "${searchQuery}"`
  }

  if (selectedTypes.length > 0) {
    const typeText = selectedTypes.join(' + ')
    text += ` of type "${typeText}"`
  }

  if (showFavoritesOnly) {
    text += ' (favorites only)'
  }

  return text
})

const loadPokemonFromRoute = async () => {
  const name = pokemonName.value
  if (name) {
    try {
      const pokemon = await pokemonStore.getPokemonByName(name)
      selectedPokemon.value = pokemon
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Pokemon not found', {
        description: 'The requested Pokemon could not be loaded.',
      })
      router.push('/')
      return
    }
  } else {
    selectedPokemon.value = null
  }
}

watch(
  pokemonName,
  async (newName) => {
    if (newName) {
      await loadPokemonFromRoute()
    } else {
      selectedPokemon.value = null
    }
  }
)

const handlePokemonClick = (pokemon: Pokemon) => {
  router.push(`/${pokemon.name}`)
}

const handleModalClose = () => {
  router.push('/')
}

const handleRetry = async () => {
  pokemonStore.clearError()
  await pokemonStore.initialize()
}

onMounted(async () => {
  await pokemonStore.initialize()
  await loadPokemonFromRoute()

  await nextTick()
  useInfiniteScroll(
    window,
    async () => {
      await pokemonStore.loadMorePokemon()
    },
    {
      distance: 500,
      interval: 100,
      canLoadMore: () =>
        !pokemonStore.error && !pokemonStore.loadingMore && pokemonStore.hasMorePokemon,
    },
  )
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-center text-white mb-4">Pokédex Explorer</h1>
      <p class="text-center text-white text-lg">Discover and explore 151 amazing Pokémon</p>
    </div>

    <div class="absolute top-4 right-4 flex gap-2">
      <ThemeToggle />
    </div>

    <FilterCard />

    <div v-if="!pokemonStore.loading && !pokemonStore.error" class="text-center my-6">
      <p class="text-white/80 text-sm">{{ filterStatusText }}</p>
    </div>

    <LoadingSpinner v-if="pokemonStore.loading" size="large" />

    <ErrorMessage v-else-if="pokemonStore.error" :error="pokemonStore.error" @retry="handleRetry" />

    <div v-else>
      <PokemonEmptyState
        v-if="
          !pokemonStore.loadingMore &&
          pokemonStore.pokemons.length === 0 &&
          pokemonStore.filteredPokemonIds.length === 0
        "
      />

      <PokemonGrid v-else :pokemons="pokemonStore.pokemons" @pokemon-click="handlePokemonClick" />

      <LoadingSpinner
        v-if="pokemonStore.loadingMore"
        size="medium"
        text="Loading more Pokémon..."
        class="mt-8"
      />
    </div>

    <PokemonDetailsModal
      v-if="selectedPokemon"
      :pokemon="selectedPokemon"
      :open="isModalOpen"
      @update:open="(open) => !open && handleModalClose()"
    />
  </div>
</template>
