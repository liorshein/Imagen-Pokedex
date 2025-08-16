<script setup lang="ts">
import { Switch } from '@/components'
import { Sun, Moon } from 'lucide-vue-next'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode({
  modes: {
    light: 'light',
    dark: 'dark',
  },
})

const toggleTheme = (checked: boolean) => {
  colorMode.value = checked ? 'dark' : 'light'
}
</script>

<template>
  <Sun :size="16" class="text-white" />
  <Switch :checked="colorMode === 'dark'" @update:model-value="toggleTheme" />
  <Moon :size="16" class="text-white" />
</template>
