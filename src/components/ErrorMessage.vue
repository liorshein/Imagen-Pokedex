<script setup lang="ts">
import { Button } from '@/components'

defineProps<{
  error: string
}>()

defineEmits<{
  retry: []
}>()
</script>

<template>
  <div class="max-w-md mx-auto mb-8">
    <div
      class="bg-destructive/10 border-2 border-destructive/50 rounded-lg p-6 text-center shadow-lg backdrop-blur-sm dark:shadow-white/10"
    >
      <div
        class="bg-destructive/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center"
      >
        <svg
          class="w-8 h-8 text-destructive"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>

      <h3 class="text-xl font-bold text-destructive mb-2">Oops! Something went wrong</h3>
      <p class="text-destructive/80 mb-4">We couldn't load the Pokémon data</p>

      <p
        class="text-sm bg-destructive/5 border border-destructive/20 rounded px-3 py-2 font-mono text-destructive/70 mb-4"
      >
        {{ error }}
      </p>

      <Button
        @click="$emit('retry')"
        variant="destructive"
        class="transition-colors"
      >
        Try Again
      </Button>
    </div>
  </div>
</template>
