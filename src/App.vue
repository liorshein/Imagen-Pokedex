<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import { Toaster } from '@/components'
import 'vue-sonner/style.css'

useTheme()
</script>

<template>
  <div class="min-h-screen transition-colors duration-200" style="background: var(--gradient-bg)">
    <Toaster />
    <RouterView />
  </div>
</template>
