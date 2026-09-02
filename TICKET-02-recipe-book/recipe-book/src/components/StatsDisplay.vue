<template>
  <div class="stats-display">
    <p>Total Recipes: {{ totalCount }}</p>
    <p>Vegetarian Recipes: {{ vegetarianCount }}</p>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  vegetarianCount: number
  totalCount: number
}>()
</script>
