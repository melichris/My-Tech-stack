<script setup lang="ts">
import { inject, ref } from 'vue';
const props = defineProps<{
  title: string
  priority: number
  completed: boolean
}>()

const emit = defineEmits<{
  'toggle-completed': [value: boolean]
}>()


const theme = inject('theme', ref('daark-one'))
</script>

<template>
  <div>
    <p>{{ props.title }}</p>
    <p>{{ props.priority }}</p>
    <p>{{ props.completed }}</p>
    <input type="checkbox" :checked="props.completed" @change="emit('toggle-completed', !props.completed)" />
    <p>{{ theme }}</p>
  </div>
</template>
