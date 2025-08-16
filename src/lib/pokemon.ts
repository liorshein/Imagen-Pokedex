import { Heart, Sword, Shield, Zap, ShieldCheck, Wind } from 'lucide-vue-next'
import type { Component } from 'vue'

const getTypeClass = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: 'bg-gray-400 text-white',
    fire: 'bg-red-500 text-white',
    water: 'bg-blue-500 text-white',
    electric: 'bg-yellow-400 text-black',
    grass: 'bg-green-500 text-white',
    ice: 'bg-blue-300 text-black',
    fighting: 'bg-red-700 text-white',
    poison: 'bg-purple-500 text-white',
    ground: 'bg-yellow-600 text-white',
    flying: 'bg-indigo-400 text-white',
    psychic: 'bg-pink-500 text-white',
    bug: 'bg-green-400 text-black',
    rock: 'bg-yellow-800 text-white',
    ghost: 'bg-purple-700 text-white',
    dragon: 'bg-indigo-700 text-white',
    dark: 'bg-gray-800 text-white',
    steel: 'bg-gray-500 text-white',
    fairy: 'bg-pink-300 text-black',
  }
  return typeColors[type] || 'bg-gray-400 text-white'
}

const getStatIcon = (statName: string) => {
  const iconMap: Record<string, Component> = {
    hp: Heart,
    attack: Sword,
    defense: Shield,
    'special-attack': Zap,
    'special-defense': ShieldCheck,
    speed: Wind,
  }
  return iconMap[statName] || Heart
}

const getStatLabel = (statName: string) => {
  const labelMap: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Attack',
    'special-defense': 'Sp. Defense',
    speed: 'Speed',
  }
  return labelMap[statName] || statName
}

const POKEMON_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
] as const

export { getTypeClass, getStatIcon, getStatLabel, POKEMON_TYPES }
