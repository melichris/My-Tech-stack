# Implementation Approach — Recipe Management Application

**Ticket:** TICKET-02-recipe-book
**Confirmed API style:** Vue 3 Composition API (`<script setup>`)

## Planned Approach

1. **Types first** — define the `Recipe` interface matching the ticket's data model (`id`, `name`, `ingredients`, `isVegetarian`, optional `createdAt`), plus a `SortBy` union type (`"name" | "createdAt" | "vegetarian"`), `Omit<Recipe, "id">` for new-recipe form input, and `Record<number, Recipe>` for the mock initial dataset.
2. **Reactive state inline, in the top-level component first** — build `status` (loading/success/error), `recipes`, `sortBy`, and the `sortedRecipes`/`vegetarianCount`/`totalCount` computed values directly in a working prototype, alongside a simulated `onMounted` data load. Use Composition API primitives (`ref`, `reactive`, `computed`, `onMounted`) so the prototype directly maps to the eventual implementation.
3. **Component split**, per the ticket's required architecture:
   - `RecipeList.vue` — renders the sorted list, receives recipes via props, delegates each row to `RecipeItem`
   - `RecipeItem.vue` — renders a single recipe, receives recipe data via props, emits a `delete-recipe` event
   - `RecipeForm.vue` — controlled form for adding a new recipe, validates required fields before emitting an `add-recipe` event with the new recipe data (using the `Omit<Recipe, "id">` type)
   - `StatsDisplay.vue` — receives total count and vegetarian count via props, purely presentational
4. **Input validation** — `RecipeForm.vue` will check that `name` is non-empty and `ingredients` has at least one entry before emitting `add-recipe`, per the ticket's "validate inputs before submission" requirement.
5. **Composable extraction last** — once the full component tree works correctly with state lifted to the top-level parent, extract all state and logic (CRUD operations, sorting, derived statistics) into `useRecipes.ts` (a Composition API composable). The parent component will orchestrate and call the composable; child components remain presentational and event-driven.
6. **Evidence capture throughout** — screenshots at each milestone (loading state, sorted list, add/delete working, stats updating reactively), plus meaningful commit messages per step.

## Why This Order

Building state and logic inline first, then splitting into the four required components, then extracting to a composable last, keeps each concern independently testable: data shape → reactive behavior → component boundaries → reusable logic. This avoids debugging multiple new concepts simultaneously and mirrors the ticket's own listed technical requirements in the order they're likely to compound in complexity.

## Risks Carried Over From the Ticket

- **Over-engineering risk:** given the ticket's own caution against this, component boundaries will be kept to exactly the four named components — no further sub-splitting unless a clear duplication problem emerges during implementation.
- **Separation of concerns:** child components (`RecipeItem`, `RecipeForm`, `StatsDisplay`) will remain presentational and event-driven only — no direct state mutation or business logic inside them. All CRUD/sorting/derived-state logic will live in `useRecipes.ts`.

## Open Question / Risk

`RecipeItem.vue` and `RecipeForm.vue` will need typed props/emits matching the `Recipe` interface — if the optional `createdAt` field causes friction (e.g. sorting by a possibly-undefined value), the resolution will be documented as a technical decision in the final report rather than silently worked around.
