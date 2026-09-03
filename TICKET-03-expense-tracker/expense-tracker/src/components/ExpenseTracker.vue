<template>
  <div v-if="status === 'loading'">Loading expenses...</div>
  <div v-else-if="status === 'error'">Failed to load expenses.</div>

  <div v-else-if="status === 'success'">
    <TotalsDisplay :totalAmount="totalAmount" :unpaidCount="unpaidCount" />

    <div class="filters">
      <button @click="activeCategory = 'all'">All</button>
      <button @click="activeCategory = 'food'">Food</button>
      <button @click="activeCategory = 'transport'">Transport</button>
      <button @click="activeCategory = 'bills'">Bills</button>
      <button @click="activeCategory = 'others'">Others</button>
    </div>

    <ExpenseForm @add-expense="handleAddExpense" />

    <ExpenseList :expenses="filteredExpenses" @toggle-paid="handleTogglePaid" />
  </div>
</template>

<script setup lang="ts">

import TotalsDisplay from './TotalsDisplay.vue'
import ExpenseForm from './ExpenseForm.vue'
import ExpenseList from './ExpenseList.vue'
import { useExpenses } from '@/composables/useExpenses'
const { status, expenses, activeCategory, filteredExpenses, totalAmount, unpaidCount, handleAddExpense, handleTogglePaid } = useExpenses()


</script>

<style scoped></style>
