<template>
  <div class="totals-display">
    <p>Total: ${{ totalAmount.toFixed(2) }}</p>
    <p>Unpaid: {{ unpaidCount }}</p>
  </div>
</template>

<script setup lang="ts">


const props = defineProps<{
  totalAmount: number
  unpaidCount: number
}>()
</script>

<style scoped></style>
