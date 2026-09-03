<template>
  <div class="expense-form">
    <form @submit.prevent="submitForm">
      <input v-model="form.description" placeholder="Description" />
      <input v-model="form.amount" placeholder="Amount" />
      <select v-model="category">
        <option value="food">Food</option>
        <option value="transport">Transport</option>
        <option value="bills">Bills</option>
        <option value="others">Others</option>
      </select>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <button type="submit">Add Expense</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { NewExpense, Category } from '@/types/types'
import { reactive, ref } from 'vue'

const form = reactive({
  description: '',
  amount: '',
})

const category = ref<Category>('food')
const errorMessage = ref('')

const emit = defineEmits<{
  'add-expense': [payload: NewExpense]
}>()

function validate(): boolean {
  if (!form.description.trim()) {
    errorMessage.value = 'Description is required.'
    return false
  }

  const parsedAmount = parseFloat(form.amount)
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    errorMessage.value = 'Amount must be a positive number.'
    return false
  }

  errorMessage.value = ''
  return true
}

function submitForm() {
  if (!validate()) return

  const newExpense: NewExpense = {
    description: form.description.trim(),
    amount: parseFloat(form.amount),
    date: new Date().toISOString(),
    category: category.value,
    paid: false,
  }

  emit('add-expense', newExpense)

  form.description = ''
  form.amount = ''
  category.value = 'food'
}
</script>
