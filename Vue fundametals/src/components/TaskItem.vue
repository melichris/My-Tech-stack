<script setup lang="ts">
const props = defineProps<{
  title: string
  priority: number
  completed: boolean
}>()

const emit = defineEmits<{
  'toggle-completed': [value: boolean]
}>()
</script>

<template>
  <div>
    <p>{{ props.title }}</p>
    <p>{{ props.priority }}</p>
    <p>{{ props.completed }}</p>
    <input type="checkbox" :checked="props.completed" @change="emit('toggle-completed', !props.completed)" />
  </div>
</template>
