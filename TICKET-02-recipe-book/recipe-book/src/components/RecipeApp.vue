<template>
  <div v-if="status === 'loading'">Loading recipes...</div>
  <div v-else-if="status === 'error'">Failed to load recipes.</div>

  <div v-else-if="status === 'success'">
    <StatsDisplay :totalCount="totalCount" :vegetarianCount="vegetarianCount" />

    <div class="sort-controls">
      <button @click="sortBy = 'name'">Sort by Name</button>
      <button @click="sortBy = 'createdAt'">Sort by Date</button>
      <button @click="sortBy = 'vegetarian'">Sort by Vegetarian</button>
    </div>

    <RecipeForm @add-recipe="handleAddRecipe" />

    <RecipeList :recipes="sortedRecipes" @delete-recipe="handleDeleteRecipe" />
  </div>
</template>

<script setup lang="ts">
import RecipeForm from './RecipeForm.vue'
import RecipeList from './RecipeList.vue'
import StatsDisplay from './StatsDisplay.vue'
import type { NewRecipe, Status, Recipe, SortBy } from '@/types/types'
import { computed, onMounted, ref } from 'vue'
import { mockRecipes } from '@/types/types'

const status = ref<Status>('loading')
const recipes = ref<Recipe[]>([])
const sortBy = ref<SortBy>('name')
const sortedRecipes = computed(() => {
  const sorted = [...recipes.value]
  if (sortBy.value === 'name') {
    return sorted.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'createdAt') {
    return sorted.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
  } else {
    // vegetarian: group vegetarian recipes first
    return sorted.sort((a, b) => Number(b.isVegetarian) - Number(a.isVegetarian))
  }
})
const vegetarianCount = computed(() => {
  return recipes.value.filter(recipe => recipe.isVegetarian === true).length
})
const totalCount = computed(() => {
  return recipes.value.length
})

onMounted(() => {
  status.value = 'loading'
  setTimeout(() => {
    try {
      const data = Object.values(mockRecipes)
      if (!data.length) throw new Error('No recipes found')
      recipes.value = data
      status.value = 'success'
    } catch (error) {
      console.error('Error fetching recipes:', error)
      status.value = 'error'
    }
  }, 2000)
})
function handleAddRecipe(newRecipe: NewRecipe) {
  const recipe: Recipe = {
    ...newRecipe,
    id: Date.now(),
    createdAt: Date.now()
  }
  recipes.value.push(recipe)
}

function handleDeleteRecipe(recipeId: number) {
  recipes.value = recipes.value.filter(r => r.id !== recipeId)
}
</script>
