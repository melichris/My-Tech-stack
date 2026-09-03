# Ticket: Implement Expense Tracker — CRUD, Categorization & Reactive Totals with Vue 3 + TypeScript

**Type:** Training / Skill Development
**Category:** Frontend — Vue 3 / TypeScript Fundamentals
**Status:** Not Started

## Description

Build a small Vue 3 + TypeScript application that allows users to log expenses, categorize them, filter by category, and view reactive totals — reinforcing typed interfaces, reactive state management, lifecycle-based data loading, and component/composable architecture through a second, distinct domain from the Recipe Book ticket.

## Context / Background

This ticket exists to provide additional repetition of the same architectural patterns established in TICKET-02-recipe-book, applied to a new domain (financial tracking rather than recipe management), in order to reinforce transfer of the patterns rather than memorization of a single example.

Without repetition across varied domains, there is a risk of:

- Pattern recognition being tied to one specific example rather than generalized understanding
- Difficulty applying the same architecture to unfamiliar problems in future client work

## Detailed Description

### Core Features

**Expense Listing**

- Display a list of expenses
- Each expense includes:
  - Description
  - Amount
  - Category
  - Paid status (optional metadata)
    **Add Expense**
- Provide a form to add a new expense
- Validate inputs before submission (description required, amount must be a positive number)
- Update the UI reactively upon creation
  **Toggle Paid Status**
- Allow users to mark an expense as paid/unpaid
- Ensure state updates immediately
  **Category Filtering**
- Allow filtering expenses by category (e.g. food, transport, bills, other)
- Include an "all categories" option
  **Aggregate Statistics**
- Display total amount across all (or filtered) expenses
- Display count of unpaid expenses
- Ensure stats update reactively when data changes

### Technical Requirements

**TypeScript Integration**

- Define an `Expense` interface
- Enforce type safety across components and state
  **Reactive State Management**
- Use Vue reactivity (`ref`, `reactive`, `computed`)
- Maintain a single source of truth for expenses
  **Lifecycle Data Loading**
- Load initial expense data using `onMounted`
  **Component Architecture**
- Split UI into reusable components:
  - `ExpenseList`
  - `ExpenseRow`
  - `ExpenseForm`
  - `TotalsDisplay`
    **Composable Logic**
- Extract reusable logic into a composable (`useExpenses`)
- Handle CRUD operations, filtering logic, and derived state (totals)
  **State Derivation**
- Use computed properties for:
  - Filtered expense list
  - Total amount
  - Unpaid count
    **Provide/Inject**
- Provide a `currencySymbol` value from a top-level component, consumed by a descendant component without prop drilling

### Out of Scope

- Backend/API integration
- Authentication or user accounts
- Persistent storage
- Advanced UI styling or animations
- Multi-currency conversion (a single provided currency symbol is display-only)

## Acceptance Criteria

- [ ] Application displays a list of expenses
- [ ] Users can add new expenses via a validated form
- [ ] Users can toggle an expense's paid status
- [ ] Expenses can be filtered by category, including an "all" option
- [ ] Total amount and unpaid count are displayed and reactive
- [ ] TypeScript interfaces are correctly implemented and exported
- [ ] Reactive state is properly managed with a single source of truth
- [ ] Lifecycle hook is used for initial (simulated) data loading
- [ ] Components are modular, each with a single responsibility
- [ ] Composable pattern is used for shared logic
- [ ] `provide`/`inject` is used for at least one cross-component value (`currencySymbol`)

## Risks & Open Points

- **Risk:** Treating this as a copy of the Recipe Book structure without genuine re-derivation of the logic.
  → **Mitigation:** Each piece of logic (filtering, totals, form validation) should be written fresh, referring back to Recipe Book's patterns only for structure, not by copying code directly.
- **Risk:** Amount validation edge cases (negative numbers, non-numeric input).
  → **Mitigation:** Explicit validation checks in `ExpenseForm` before emitting.
- **Open Point:** Should `amount` be stored in whole currency units (e.g. `25.50`) or smallest units (e.g. cents, `2550`) to avoid floating-point rounding issues? To be decided during implementation and documented as a technical decision.

## Definition of Done

- [ ] Application fully implemented and functional
- [ ] Code compiles with zero TypeScript errors (`vue-tsc --noEmit`)
- [ ] Components are reusable and follow single-responsibility structure
- [ ] State management and composable are validated through manual testing
- [ ] No runtime or type errors
- [ ] README added
- [ ] Ready for demo or onboarding reference use
