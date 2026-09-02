export interface Recipe {
  id: number
  name: string
  ingredients: string[]
  isVegetarian: boolean
  createdAt?: number
}
export type Status = 'loading' | 'success' | 'error'
export type SortBy = 'name' | 'createdAt' | 'vegetarian'
export type NewRecipe = Omit<Recipe, 'id'>
export const mockRecipes: Record<number, Recipe> = {
  1: {
    id: 1,
    name: 'Recipe 1',
    ingredients: ['cube', 'salt', 'water'],
    isVegetarian: true,
    createdAt: Date.now(),
  },
  2: {
    id: 2,
    name: 'Recipe 2',
    ingredients: ['palm oil', 'salt', 'water'],
    isVegetarian: false,
    createdAt: Date.now(),
  },
  3: {
    id: 3,
    name: 'Recipe 3',
    ingredients: ['corn', 'flour', 'water'],
    isVegetarian: true,
    createdAt: Date.now(),
  },
  4: {
    id: 4,
    name: 'Recipe 4',
    ingredients: ['fish', 'oil', 'pepper'],
    isVegetarian: false,
    createdAt: Date.now(),
  },
}
// }
