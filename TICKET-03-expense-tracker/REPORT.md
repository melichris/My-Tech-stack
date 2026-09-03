# Weekly Work Report

**Ticket:** TICKET-03-expense-tracker — Expense Tracker
**Type:** Training / Skill Development
**API Style:** Vue 3 Composition API (`<script setup>`)

---

## Work Completed

- Defined a fully typed `Expense` data model (`id`, `description`, `amount`, `date`, `category`, `paid?`), plus supporting types: `Category` (union), `NewExpense` (`Omit<Expense, "id">`), `Status`, and a mock dataset (`Record<number, Expense>`) with a mix of categories and paid/unpaid states
- Implemented reactive core state (`status`, `expenses`, `activeCategory`) and derived state (`filteredExpenses`, `totalAmount`, `unpaidCount`) using `ref` and `computed`, in a top-level container component (`ExpenseTracker.vue`)
- Implemented simulated asynchronous data loading via `onMounted`, with loading/success states
- Built four components per the ticket's required architecture:
  - `TotalsDisplay.vue` — presentational, displays total amount and unpaid count
  - `ExpenseRow.vue` — displays a single expense, injects `currencySymbol` for display, emits `toggle-paid` with the expense's `id`
  - `ExpenseForm.vue` — controlled form with validation (required description, positive-number amount check), emits `add-expense` with a typed `NewExpense` payload
  - `ExpenseList.vue` — renders the filtered list, forwards `toggle-paid` events upward, shows an empty-state message when there are no expenses
- Implemented `provide`/`inject` for `currencySymbol`, provided once at the top level and consumed in `ExpenseRow.vue` without prop drilling
- Integrated all components in `ExpenseTracker.vue`, wiring add-expense and toggle-paid handlers, plus category filter controls
- Extracted all state and logic into a composable (`useExpenses.ts`), leaving `ExpenseTracker.vue` as orchestration only
- Verified the application end-to-end: loading state, category filtering (including "all"), adding an expense, toggling paid status, and reactive totals all confirmed working in the browser

## How It Was Done

Implementation followed the confirmed approach document, in the same order established on TICKET-02: types first, then reactive state built inline in the top-level container (`ExpenseTracker.vue`), then split into the four required components, then wired together, then extracted into a composable last. Logic was written independently for this domain rather than copied from the Recipe Book implementation, using that project only as a structural reference, per the ticket's stated risk mitigation around genuine repetition versus copying.

## Technical Decisions

**Decision:** `amount` is stored as a whole currency unit (e.g. `25.50`), not smallest units (cents).
**Why:** Simpler for this training scope; avoids introducing integer-cents conversion logic that isn't the focus of this exercise.
**Alternative considered:** Storing as integer cents to avoid floating-point rounding — flagged in the ticket as an open point; noted here as a would-need-reconsideration item for a production financial application, not resolved as a hard requirement for this exercise.

**Decision:** Amount validation explicitly checks `isNaN(parsedAmount) || parsedAmount <= 0`, rather than a simple truthiness check.
**Why:** A truthy check alone would incorrectly accept non-numeric strings and negative numbers as valid input. Explicit numeric and range validation was required to meet the ticket's "amount must be a positive number" acceptance criterion.
**Alternative considered:** None — this was the minimum correct validation for the stated requirement.

**Decision:** `handleTogglePaid` mutates the `paid` property on the matched object inside the `expenses` array, rather than replacing the whole array.
**Why:** Vue's reactivity proxies into array contents, so in-place mutation of a found object correctly triggers reactivity without the overhead of rebuilding the array.

**Decision:** `currencySymbol` is provided as a plain string (`'$'`) rather than a reactive `ref`.
**Why:** The value does not change during the application's runtime in this scope, so a static provided value is sufficient; a `ref` would be warranted if currency switching were in scope, which it explicitly is not per the ticket's "Out of Scope" section.

## Difficulties / Blockers

**Problem:** Type definitions, reactive state, and lifecycle logic were initially all placed in `types.ts`, and `onMounted` was called at the module level rather than inside a component.
**Impact:** Mixed concerns between data modeling and application logic; `onMounted` called outside an active component setup context would not correctly register the lifecycle hook.
**Investigation:** Reviewed the distinction (established during Day 6 composable work) that `onMounted` only registers correctly when called synchronously during a component's setup, or inside a composable invoked during setup — not from a plain module-level script.
**Resolution / Current status:** Resolved by restructuring `types.ts` to contain only type declarations and mock data, and moving all reactive state and `onMounted` logic into `ExpenseTracker.vue` (later extracted into `useExpenses.ts`).

**Problem:** `export` keywords were mistakenly added to reactive state declarations (`ref`, `computed`) inside a `<script setup>` block.
**Impact:** Redundant and inconsistent with `<script setup>`'s automatic template exposure of top-level bindings; a `Status` type was also incorrectly declared inline in the component rather than in `types.ts`.
**Resolution / Current status:** Resolved by removing unnecessary `export` keywords from component-level reactive state and relocating the `Status` type declaration to `types.ts`, consistent with the project's type-organization convention.

**Problem:** Initial `ExpenseRow.vue` implementation confused `inject` with `emit`, attempting to pass a callback function as `inject`'s second argument and incorrectly declaring `currencySymbol` as an emitted event rather than an injected value.
**Impact:** `currencySymbol` would not have functioned as intended; conflated two unrelated Vue APIs (dependency injection vs. component event emission).
**Resolution / Current status:** Resolved by using `inject<string>('currencySymbol', '$')` to directly retrieve the provided value, and removing the incorrect `currencySymbol` entry from `defineEmits`.

**Problem:** Initial `ExpenseForm.vue` validation only checked truthiness of `amount`, and a `validateForm` function was misnamed — it performed a form reset rather than validation. Unreachable code followed a `return` statement.
**Impact:** Negative or non-numeric amounts would have passed validation; the error path returned a string with no consumer, so no error would display to the user.
**Resolution / Current status:** Resolved by implementing explicit numeric validation (`isNaN` and `<= 0` checks) writing to an `errorMessage` ref displayed in the template, and separating validation logic from form-reset logic into distinct functions.

**Problem:** The top-level container component's name (`ExpenseTracker.vue`) was not explicitly specified in the original approach document, unlike the four child components which were named directly in the ticket.
**Impact:** Risk of inconsistent naming relative to the precedent set by TICKET-02 (`RecipeApp.vue`).
**Resolution / Current status:** Resolved by explicitly updating `APPROACH.md` to name `ExpenseTracker.vue` as the top-level container, mounted from `App.vue`, for consistency with the established pattern.

## Evidence

- Local commit history reflecting scaffold, type definitions, component implementation, integration, and composable extraction stages
- Screenshots: loading state, full working application (totals, filters, form, list), post-add state, post-toggle-paid state _(to be attached by developer from local capture)_
- `vue-tsc --noEmit` run with zero errors, confirming no outstanding type issues

## Acceptance Criteria Status

| Acceptance Criteria                                               | Status | Evidence                                                                                                  |
| ----------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| Application displays a list of expenses                           | ✅     | Screenshot — success state                                                                                |
| Users can add new expenses via a validated form                   | ✅     | Screenshot — post-add state; validation tested for empty description, negative amount, non-numeric amount |
| Users can toggle an expense's paid status                         | ✅     | Screenshot — post-toggle state                                                                            |
| Expenses can be filtered by category, including an "all" option   | ✅     | Manually verified across all four categories plus "all"                                                   |
| Total amount and unpaid count are displayed and reactive          | ✅     | `TotalsDisplay.vue`, updates confirmed on add/toggle                                                      |
| TypeScript interfaces are correctly implemented and exported      | ✅     | `types.ts`, verified via `vue-tsc --noEmit`                                                               |
| Reactive state is properly managed with a single source of truth  | ✅     | Centralized in `useExpenses.ts`                                                                           |
| Lifecycle hook is used for initial (simulated) data loading       | ✅     | `onMounted` in `useExpenses.ts`                                                                           |
| Components are modular, each with a single responsibility         | ✅     | `ExpenseList`, `ExpenseRow`, `ExpenseForm`, `TotalsDisplay`                                               |
| Composable pattern is used for shared logic                       | ✅     | `useExpenses.ts`                                                                                          |
| `provide`/`inject` is used for at least one cross-component value | ✅     | `currencySymbol` provided in `ExpenseTracker.vue`, injected in `ExpenseRow.vue`                           |

## Definition of Done

| Requirement                                                          | Status                        |
| -------------------------------------------------------------------- | ----------------------------- |
| Application fully implemented and functional                         | ✅                            |
| Code compiles with zero TypeScript errors                            | ✅ (`vue-tsc --noEmit` clean) |
| Components are reusable and follow single-responsibility structure   | ✅                            |
| State management and composable are validated through manual testing | ✅                            |
| No runtime or type errors                                            | ✅                            |
| README added                                                         | ⬜ Pending                    |
| Ready for demo or onboarding reference use                           | ✅                            |
| Code reviewed                                                        | ⬜ Pending reviewer sign-off  |

## Next Step

**Next action:** Add project README, attach evidence screenshots, and submit this report along with the repository (`TICKET-03-expense-tracker` folder) for reviewer sign-off and code review.
**Expected outcome:** Reviewer validates the implementation against acceptance criteria and confirms Definition of Done, or returns specific, actionable feedback for revision.
