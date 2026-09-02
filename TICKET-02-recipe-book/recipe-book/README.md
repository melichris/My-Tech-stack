# Recipe Management Application

A small Vue 3 + TypeScript application for viewing, adding, deleting, and sorting recipes, with reactive aggregate statistics — built as a training exercise demonstrating typed interfaces, reactive state management, lifecycle-based data loading, and reusable component/composable architecture.

**Ticket:** TICKET-02-recipe-book
**Type:** Training / Skill Development
**Stack:** Vue 3 (Composition API), TypeScript

## Features

- View a list of recipes with name, ingredients, and vegetarian status
- Add a new recipe via a validated form
- Delete a recipe
- Sort recipes by name, creation date, or vegetarian status
- Live aggregate statistics: total recipe count and vegetarian count
- Simulated asynchronous data loading with loading/success/error states

## Tech & Patterns Demonstrated

- **TypeScript:** `Recipe` interface, union types, `Omit`, `Record`
- **Reactivity:** `ref`, `computed`, `onMounted`
- **Component architecture:** four dedicated components (`RecipeList`, `RecipeItem`, `RecipeForm`, `StatsDisplay`), each with a single responsibility
- **Component communication:** typed `props` and `emits`, with events forwarded up through intermediate components
- **Composables:** all state and business logic extracted into `useRecipes.ts`, keeping components focused on presentation and orchestration

## Project Structure

```
recipe-book/
├── src/
│   ├── components/
│   │   ├── RecipeList.vue
│   │   ├── RecipeItem.vue
│   │   ├── RecipeForm.vue
│   │   └── StatsDisplay.vue
│   ├── composables/
│   │   └── useRecipes.ts
│   ├── types/
│   │   └── types.ts
│   └── App.vue
├── TICKET.md
├── APPROACH.md
├── REPORT.md
└── README.md
```

## Getting Started

```bash
npm install
npm run dev
```

## Type Checking

```bash
npx vue-tsc --noEmit
```

## Out of Scope

- Backend/API integration (mock data only)
- Persistent storage (data resets on reload)
- Authentication or multi-user support
- Advanced styling or animations

## Related Documents

- [`TICKET.md`](./TICKET.md) — objective, scope, acceptance criteria, Definition of Done
- [`APPROACH.md`](./APPROACH.md) — planned implementation approach
- [`REPORT.md`](./REPORT.md) — work completed, technical decisions, difficulties, evidence
