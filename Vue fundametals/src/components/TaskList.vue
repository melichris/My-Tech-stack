<script setup lang="ts">
import TaskItem from './TaskItem.vue';
</script>

<template>
  <div>
    <p>
      <TaskItem title="Buy milk" :priority="2" :completed="false" />
    </p>
  </div>
</template>
