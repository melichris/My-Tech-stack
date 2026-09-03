<template>
  <div class="expense-list">
    <div v-if="props.expenses.length === 0">No expenses to display.</div>
    <ExpenseRow v-for="expense in props.expenses" :key="expense.id" :expense="expense"
      @toggle-paid="emit('toggle-paid', $event)" />
  </div>
</template>

<script setup lang="ts">
import type { Expense } from '@/types/types'
import ExpenseRow from './ExpenseRow.vue'


const props = defineProps<{
  expenses: Expense[]
}>()

const emit = defineEmits<{
  'toggle-paid': [payload: number]
}>()
</script>
