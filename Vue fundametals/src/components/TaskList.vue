<script setup lang="ts">
import TaskItem from './TaskItem.vue'
</script>

<template>
  <TaskItem title="Buy milk" :priority="2" :completed="true"
    @toggle-completed="(val) => console.log('toggled:', val)" />
  <TaskItem title="Buy soap" :priority="1" :completed="false"
    @toggle-completed="(val) => console.log('toggled:', val)" />
  <TaskItem title="Buy brush" :priority="3" :completed="true"
    @toggle-completed="(val) => console.log('toggled:', val)" />
</template>
