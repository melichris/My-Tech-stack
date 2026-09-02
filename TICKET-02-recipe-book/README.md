# Recipe Management — TICKET-02-recipe-book

This folder contains a small Vue 3 + TypeScript reference implementation of a Recipe Management application built as a training / onboarding exercise.

Overview
- Purpose: demonstrate Vue 3 + TypeScript best practices including typed interfaces, Composition API composables, reactive state, lifecycle-based data loading, and a modular component structure.
- Scope: client-side only. No backend or persistent storage is included — initial data is provided via an in-repo mock dataset.

Contents
- `recipe-book/` — the runnable Vue 3 project (Vite + TypeScript)
- `TICKET.md` — ticket description and acceptance criteria
- `Approach.md` — implementation approach and technical decisions

Quickstart (recipe-book)

Requirements
- Node.js 16+ and npm or pnpm

Commands
```bash
cd recipe-book
npm install
npm run dev       # development server (Vite)
npm run build     # build production bundle
npm run preview   # preview production build
```

Project highlights
- API style: Vue 3 Composition API (`<script setup>`) with a `useRecipes` composable as the single source of truth for application state and logic.
- Types: `src/types/types.ts` contains `Recipe`, `NewRecipe`, `Status`, `SortBy`, and a `mockRecipes` dataset.
- Components: `RecipeApp.vue` (container), `RecipeForm.vue`, `RecipeList.vue`, `RecipeItem.vue`, `StatsDisplay.vue`.
- Composable: `src/composables/useRecipes.ts` — implements CRUD operations, sorting, derived statistics, and lifecycle data loading via `onMounted`.

Testing and type checking
- Use `npx vue-tsc --noEmit` to type-check `.vue` files and TypeScript types.

Notes for reviewers
- The app uses numeric `createdAt` timestamps (`Date.now()`) and generates `id`/`createdAt` in the composable when a new recipe is added.
- Sorting supports `name`, `createdAt`, and `vegetarian` keys; vegetarian is represented by `isVegetarian: boolean`.

Contact
- For questions about implementation decisions, see `Approach.md` or open an issue/PR against this folder.
