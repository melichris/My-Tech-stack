<template>
  <div class="task-tracker">
    <h1>Task Tracker</h1>


    <div v-if="status === 'loading...'">Loading tasks...</div>
    <div v-else-if="status === 'error'">Failed to load tasks.</div>

    <div v-else-if="status === 'success'">

      <div class="filters">
        <button @click="filter = 'all'">All</button>
        <button @click="filter = 'active'">Active</button>
        <button @click="filter = 'completed'">Completed</button>
      </div>

      <p>Completed: {{ completedCount }} / {{ tasks.length }}</p>


      <ul>
        <li v-for="task in filteredTasks" :key="task.id">
          <input type="checkbox" v-model="task.completed" />
          {{ task.title }} (priority: {{ task.priority }})
        </li>
      </ul>

      <!-- 3. Add task form -->
      <form @submit.prevent="addTask">
        <input v-model="newTaskForm.title" placeholder="Task title" required />
        <input v-model.number="newTaskForm.priority" type="number" placeholder="Priority" required />
        <button type="submit">Add Task</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTasks } from '@/composables/useTasks';

const { status, tasks, filter, filteredTasks, completedCount, newTaskForm, addTask } = useTasks()
</script>
