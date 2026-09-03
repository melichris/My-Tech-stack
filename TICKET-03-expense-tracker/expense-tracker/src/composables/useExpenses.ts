import { ref, computed, onMounted, provide } from 'vue'
import type { Expense, NewExpense, Category, Status } from '@/types/types'
import { mockExpenses } from '@/types/types'

export function useExpenses() {
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
    const target = expenses.value.find((e) => e.id === expenseId)
    if (target) {
      target.paid = !target.paid
    }
  }
  provide('currencySymbol', '$')
  return {
    status,
    expenses,
    activeCategory,
    filteredExpenses,
    totalAmount,
    unpaidCount,
    handleAddExpense,
    handleTogglePaid,
  }
}
