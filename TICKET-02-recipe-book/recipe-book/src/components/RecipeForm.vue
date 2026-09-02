<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.name" placeholder="Recipe name" />
    <input v-model="form.ingredients" placeholder="Ingredients (comma-separated)" />
    <label>
      <input type="checkbox" v-model="form.isVegetarian" /> Vegetarian
    </label>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <button type="submit">Add Recipe</button>
  </form>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { NewRecipe } from '@/types/types'

const form = reactive({
  name: '',
  ingredients: '',
  isVegetarian: false,
})
const errorMessage = ref('')

function validate(): boolean {
  if (!form.name.trim()) {
    errorMessage.value = 'Recipe name is required.'
    return false
  }
  if (!form.ingredients.trim()) {
    errorMessage.value = 'At least one ingredient is required.'
    return false
  }
  errorMessage.value = ''
  return true
}
const emit = defineEmits<{
  'add-recipe': [recipe: NewRecipe]
}>()

function handleSubmit() {
  if (!validate()) return

  const newRecipe: NewRecipe = {
    name: form.name.trim(),
    ingredients: form.ingredients.split(',').map(i => i.trim()).filter(i => i.length > 0),
    isVegetarian: form.isVegetarian
  }

  emit('add-recipe', newRecipe)

  form.name = ''
  form.ingredients = ''
  form.isVegetarian = false
}
</script>
