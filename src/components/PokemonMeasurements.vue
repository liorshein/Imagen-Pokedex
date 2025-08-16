<script setup lang="ts">
import { Ruler, Weight } from 'lucide-vue-next'

defineProps<{
  height: number
  weight: number
}>()
</script>

<template>
  <div class="grid grid-cols-2 gap-3">
    <div class="text-center bg-muted/20 rounded-lg p-2">
      <div class="flex items-center justify-center gap-1 mb-1">
        <Ruler :size="16" class="text-muted-foreground" />
        <p class="text-muted-foreground text-sm">Height</p>
      </div>
      <p class="text-lg font-semibold">{{ (height / 10).toFixed(1) }}m</p>
    </div>
    <div class="text-center bg-muted/20 rounded-lg p-2">
      <div class="flex items-center justify-center gap-1 mb-1">
        <Weight :size="16" class="text-muted-foreground" />
        <p class="text-muted-foreground text-sm">Weight</p>
      </div>
      <p class="text-lg font-semibold">{{ (weight / 10).toFixed(1) }}kg</p>
    </div>
  </div>
</template>
