<template>
  <div>
    <h2>{{ recipe.name }}</h2>
    <p>Ingredients: {{ recipe.ingredients?.join(', ') || 'N/A' }}</p>
    <p>Created At: {{ recipe.createdAt ? new Date(recipe.createdAt).toLocaleDateString() : 'N/A' }}</p>
    <p>Vegetarian: {{ recipe.isVegetarian ? 'Yes' : 'No' }}</p>
  </div>
  <div>
    <button @click="emit('delete-recipe', recipe.id)">Delete</button>
  </div>
</template>
<script setup lang="ts">
import type { Recipe } from '@/types/types'
defineProps<{
  recipe: Recipe
}>()
const emit = defineEmits<{
  'delete-recipe': [recipeId: number]
}>()
</script>
