<template>
  <div>
    <p>{{ }}</p>
  </div>
</template>
<script lang="ts">
defineProps<{
  title: string,
  priority: number,
  completed: boolean
}>()
</script>
