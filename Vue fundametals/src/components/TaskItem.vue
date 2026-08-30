<template>
  <div>
    <p>{{ }}</p>
    <input type="checkbox" name="" id="" @click="toggleCompleted">
  </div>
</template>
<script lang="ts">
import Task from "@/components/TaskTracker.vue"
import { computed } from "vue"
const toggleCompleted: <Task> = computed(() => {
  Task.
})

defineProps<{
  title: string,
  priority: number,
  completed: boolean
}>()

</script>
