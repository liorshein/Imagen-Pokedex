<script setup lang="ts">
import { getStatIcon, getStatLabel } from '@/lib/pokemon'
import type { PokemonStat } from '@/types/pokemon'

defineProps<{
  stats: PokemonStat[]
}>()
</script>

<template>
  <div class="space-y-3">
    <h3 class="text-lg font-semibold text-foreground border-b border-border pb-1">Base Stats</h3>
    <div class="space-y-3">
      <div v-for="stat in stats" :key="stat.stat.name" class="space-y-1">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <component :is="getStatIcon(stat.stat.name)" :size="16" class="text-muted-foreground" />
            <span class="text-sm font-medium text-foreground">{{
              getStatLabel(stat.stat.name)
            }}</span>
          </div>
          <span class="text-sm font-bold text-foreground">{{ stat.base_stat }}</span>
        </div>

        <div class="w-full bg-muted rounded-full h-2">
          <div
            class="bg-primary h-2 rounded-full transition-all duration-500"
            :style="{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
