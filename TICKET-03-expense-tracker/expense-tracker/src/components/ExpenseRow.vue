<template>
  <div class="expense-row">
    <span>{{ props.expense.description }}</span>
    <span>{{ currencySymbol }}{{ props.expense.amount.toFixed(2) }}</span>
    <span>{{ props.expense.category }}</span>
    <span>{{ props.expense.paid ? 'Paid' : 'Unpaid' }}</span>
    <button @click="emit('toggle-paid', props.expense.id)">
      {{ props.expense.paid ? 'Mark as Unpaid' : 'Mark as Paid' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Expense } from '@/types/types'
import { inject } from 'vue'

const props = defineProps<{
  expense: Expense
}>()

const emit = defineEmits<{
  'toggle-paid': [payload: number]
}>()
const currencySymbol = inject<string>('currencySymbol', '$')
</script>
