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
import type { NewExpense, Expense, Category, Status } from '@/types/types'
import { ref, computed, onMounted } from 'vue'
import { mockExpenses } from '@/types/types'
import { provide } from 'vue'
import TotalsDisplay from './TotalsDisplay.vue'
import ExpenseForm from './ExpenseForm.vue'
import ExpenseList from './ExpenseList.vue'

const status = ref<Status>('loading')

const expenses = ref<Expense[]>([])

const activeCategory = ref<Category | 'all'>('all')

const filteredExpenses = computed(() => {
  if (activeCategory.value === 'all') {
    return expenses.value
  }
  return expenses.value.filter((expense) => expense.category === activeCategory.value)
})
const totalAmount = computed(() => {
  return expenses.value.reduce((sum, expense) => sum + expense.amount, 0)
})
const unpaidCount = computed(() => {
  return expenses.value.filter((expense) => !expense.paid).length
})

onMounted(() => {
  status.value = 'loading'
  setTimeout(() => {
    expenses.value = Object.values(mockExpenses)
    status.value = 'success'
  }, 2000)
})

function handleAddExpense(newExpense: NewExpense) {
  const expense: Expense = {
    ...newExpense,
    id: Date.now(),
  }
  expenses.value.push(expense)
}

function handleTogglePaid(expenseId: number) {
  const target = expenses.value.find(e => e.id === expenseId)
  if (target) {
    target.paid = !target.paid
  }
}
provide('currencySymbol', '$')
</script>

<style scoped></style>
