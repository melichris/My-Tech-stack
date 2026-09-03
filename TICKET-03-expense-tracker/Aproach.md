# Implementation Approach — Expense Tracker

**Ticket:** TICKET-03-expense-tracker
**Confirmed API style:** Vue 3 Composition API (`<script setup>`)

## Planned Approach

1. **Types first** — define the `Expense` interface (`id`, `description`, `amount`, `category`, `paid?`), a `Category` union type (`"food" | "transport" | "bills" | "other"`), `NewExpense = Omit<Expense, "id">`, and a mock dataset (`Record<number, Expense>`) with a mix of categories and paid/unpaid states.
2. **Reactive state inline first** — build `status`, `expenses`, `activeCategory` (including an `"all"` option), and computed values (`filteredExpenses`, `totalAmount`, `unpaidCount`) directly in a working prototype, alongside a simulated `onMounted` load. Logic will be written fresh rather than copied from the Recipe Book implementation, using that project only as a structural reference.
3. **Component split**, matching the ticket's required architecture:
   - `ExpenseList.vue` — renders `filteredExpenses`, delegates each row to `ExpenseRow`
   - `ExpenseRow.vue` — displays one expense, emits `toggle-paid` with the expense's `id`
   - `ExpenseForm.vue` — validated form (description required, amount must be a positive number), emits `add-expense` with a `NewExpense` payload
   - `TotalsDisplay.vue` — presentational, receives `totalAmount` and `unpaidCount` via props
4. **Provide/inject** — a `currencySymbol` value provided from the top-level component, injected in `ExpenseRow.vue` for display alongside each amount.
5. **Composable extraction last** — once the full component tree works correctly, extract all state and logic into `useExpenses.ts`.
6. **Evidence capture throughout** — screenshots at each milestone, meaningful commit messages per step.

## Why This Order

Same sequencing as TICKET-02: data shape → reactive behavior → component boundaries → reusable logic, keeping each concern independently testable and avoiding compounding errors across multiple new concepts at once.

## Open Question / Risk (carried from ticket)

Whether `amount` should be stored in whole currency units or smallest units (cents) to avoid floating-point rounding issues. Initial approach: store as whole units (e.g. `25.50`) for simplicity at this scope, with the tradeoff documented as a technical decision in the final report — this is a reasonable simplification for a training exercise but would need reconsideration for a production financial application.
