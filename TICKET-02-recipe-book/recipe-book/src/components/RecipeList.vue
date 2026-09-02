<template>
  <div v-for="recipe in recipes" :key="recipe.id">
    <RecipeItem :recipe="recipe" @delete-recipe="emit('delete-recipe', $event)" />

  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '@/types/types';
import RecipeItem from './RecipeItem.vue'

defineProps<{
  recipes: Recipe[]
}>()
const emit = defineEmits<{
  'delete-recipe': [recipeId: number]
}>()
</script>
