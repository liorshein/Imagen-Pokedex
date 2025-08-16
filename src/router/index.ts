import { createWebHistory, createRouter } from 'vue-router'

import PokemonListView from '../views/PokemonListView.vue'

const routes = [
  { path: '/:name([a-z-]+)?', component: PokemonListView, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
