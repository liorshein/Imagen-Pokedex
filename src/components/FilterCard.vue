<script setup lang="ts">
import {
  Card,
  CardContent,
  SearchInput,
  FavoriteToggleButton,
  ResetButton,
  TypeFilter,
} from '@/components'
</script>

<template>
  <Card class="bg-card/10 backdrop-blur-sm mb-8">
    <CardContent class="p-6">
      <div class="flex justify-between mb-4">
        <div class="flex gap-4 w-full">
          <SearchInput class="w-1/3" />
          <FavoriteToggleButton />
        </div>
        <ResetButton />
      </div>
      <TypeFilter />
    </CardContent>
  </Card>
</template>
