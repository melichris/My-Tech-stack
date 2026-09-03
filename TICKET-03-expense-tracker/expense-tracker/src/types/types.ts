import { computed, onMounted, ref } from 'vue'

export interface Expense {
  id: number
  amount: number
  description: string
  date: string
  category: Category
  paid?: boolean
}

export type Category = 'food' | 'transport' | 'bills' | 'others'

export type NewExpense = Omit<Expense, 'id'>

export const mockExpenses: Record<number, Expense> = {
  1: {
    id: 1,
    amount: 50,
    description: 'Groceries',
    date: '2023-06-01',
    category: 'food',
    paid: true,
  },
  2: {
    id: 2,
    amount: 20,
    description: 'Bus fare',
    date: '2023-06-02',
    category: 'transport',
    paid: false,
  },
  3: {
    id: 3,
    amount: 100,
    description: 'Electricity bill',
    date: '2023-06-03',
    category: 'bills',
    paid: true,
  },
  4: {
    id: 4,
    amount: 30,
    description: 'Movie tickets',
    date: '2023-06-04',
    category: 'others',
    paid: false,
  },
}
export type Status = 'loading' | 'success' | 'error'
