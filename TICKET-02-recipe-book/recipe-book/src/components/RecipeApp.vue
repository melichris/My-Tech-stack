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
import { useRecipes } from '@/composables/useRecipes'

const { status, recipes, sortBy, sortedRecipes, vegetarianCount, totalCount, handleAddRecipe, handleDeleteRecipe } = useRecipes()
</script>
