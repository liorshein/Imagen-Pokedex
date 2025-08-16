<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemon'
import { ref, computed, watch } from 'vue'
import { toast } from 'vue-sonner'
import { Input } from '@/components'
import { Search } from 'lucide-vue-next'

const pokemonStore = usePokemonStore()

const searchQuery = ref(pokemonStore.filters.searchQuery)
let searchTimeout: ReturnType<typeof setTimeout> | null = null

watch(
  () => pokemonStore.filters.searchQuery,
  (newValue) => {
    searchQuery.value = newValue
  }
)

const handleSearch = (value: string) => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  searchTimeout = setTimeout(async () => {
    try {
      await pokemonStore.setSearchFilter(value)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Search failed', {
        description: 'Unable to search Pokemon. Please try again.',
      })
    }
    searchTimeout = null
  }, 150)
}

const updateSearch = (value: string) => {
  searchQuery.value = value
  handleSearch(value)
}

const syncedSearchQuery = computed({
  get: () => searchQuery.value,
  set: updateSearch,
})
</script>

<template>
  <div class="relative">
    <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" :size="16" />
    <Input
      v-model="syncedSearchQuery"
      placeholder="Search Pokemon by name..."
      class="placeholder:text-white pl-10 bg-background/20 border-border text-white"
    />
  </div>
</template>
