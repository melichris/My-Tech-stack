<script setup lang="ts">
import Card from './Card.vue';
import TaskItem from './TaskItem.vue'
import { provide, ref } from 'vue';

const currentTheme = ref<string>("dark")

provide('theme', currentTheme)
</script>

<template>
  <TaskItem title="Buy milk" :priority="2" :completed="true"
    @toggle-completed="(val) => console.log('toggled:', val)" />
  <TaskItem title="Buy soap" :priority="1" :completed="false"
    @toggle-completed="(val) => console.log('toggled:', val)" />
  <TaskItem title="Buy brush" :priority="3" :completed="true"
    @toggle-completed="(val) => console.log('toggled:', val)" />
  <Card>
    <template #header>
      <h2>My Tasks</h2>
    </template>
    <p>Some task content goes here</p>
  </Card>
</template>
