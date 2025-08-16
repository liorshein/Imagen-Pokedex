<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Button
} from '@/components'
import { Heart } from 'lucide-vue-next'
import { useFavoritesStore } from '@/stores/favorites'
import type { Pokemon } from '@/types/pokemon'
import PokemonImage from './PokemonImage.vue'
import PokemonTypes from './PokemonTypes.vue'
import PokemonMeasurements from './PokemonMeasurements.vue'
import PokemonStats from './PokemonStats.vue'
import PokemonAbilities from './PokemonAbilities.vue'

defineProps<{
  pokemon: Pokemon
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const favoritesStore = useFavoritesStore()

const handleOpenChange = (value: boolean) => {
  emit('update:open', value)
}
</script>

<template>
  <Dialog :open="open" @update:open="handleOpenChange">
    <DialogContent class="max-w-2xl border-border">
      <DialogHeader>
        <DialogTitle class="text-2xl font-bold capitalize flex items-center gap-4">
          {{ pokemon.name }}
          <span
            class="bg-muted px-2 py-1 rounded-full text-sm font-medium self-end text-muted-foreground"
            >#{{ pokemon.id.toString().padStart(3, '0') }}</span
          >
        </DialogTitle>
        <DialogDescription class="sr-only">
          Pokemon details for {{ pokemon.name }}
        </DialogDescription>
      </DialogHeader>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex flex-col items-center space-y-4 h-full">
          <PokemonImage
            :src="pokemon.sprites.other['official-artwork'].front_default"
            :alt="pokemon.name"
            size="large"
          />

          <PokemonTypes :types="pokemon.types" size="large" />

          <PokemonMeasurements :height="pokemon.height" :weight="pokemon.weight" />

          <Button
            @click="favoritesStore.toggleFavorite(pokemon.id)"
            class="flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border hover:bg-muted/50 transition-all duration-200 self-start mt-auto"
            :class="
              favoritesStore.isFavorite(pokemon.id)
                ? 'text-red-500 border-red-300'
                : 'text-muted-foreground hover:text-red-400'
            "
          >
            <Heart
              :size="16"
              :fill="favoritesStore.isFavorite(pokemon.id) ? 'currentColor' : 'none'"
            />
            <span class="text-sm font-medium">
              {{
                favoritesStore.isFavorite(pokemon.id) ? 'Remove from Favorites' : 'Add to Favorites'
              }}
            </span>
          </Button>
        </div>

        <div class="space-y-4">
          <PokemonStats :stats="pokemon.stats" />
          <PokemonAbilities :abilities="pokemon.abilities" />
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
