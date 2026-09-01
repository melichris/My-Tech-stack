## Description

Build a small Vue 3 + TypeScript application that allows users to view, add, delete, and sort recipes, while also displaying aggregate statistics such as the number of vegetarian recipes.

The application serves as a practical implementation of modern frontend engineering patterns including typed interfaces, reactive state management, lifecycle-based data loading, and reusable component/composable architecture.

## Context / Background

This ticket exists to provide a structured, real-world example of how to build a well-architected Vue 3 application using TypeScript.

It addresses the need for:

- Demonstrating best practices in Vue 3 (Option or Composition API depending on project standards)
- Enforcing type safety using TypeScript interfaces
- Showcasing reactive state management patterns
- Illustrating component reusability and separation of concerns
- Providing a reference implementation for onboarding and training

Without such a reference, developers may implement inconsistent patterns, leading to:

- Poor state management practices
- Weak type safety
- Tight coupling between components
- Reduced maintainability and scalability

## Detailed Description

Develop a recipe management application with the following core capabilities:

### Core Features

#### Recipe Listing

- Display a list of recipes
- Each recipe includes:
  - Name
  - Ingredients
  - Vegetarian flag
  - Optional metadata (e.g., creation date)

#### Add Recipe

- Provide a form to add a new recipe
- Validate inputs before submission
- Update the UI reactively upon creation

#### Delete Recipe

- Allow users to remove recipes from the list
- Ensure state updates immediately after deletion

#### Sorting

- Allow sorting recipes by:
  - Name
  - Creation date
  - Vegetarian status

#### Aggregate Statistics

- Display total number of recipes
- Display number of vegetarian recipes
- Ensure stats update reactively when data changes

---

### Technical Requirements

#### TypeScript Integration

- Define a `Recipe` interface
- Enforce type safety across components and state

#### Reactive State Management

- Use Vue reactivity (`ref`, `reactive`, or Option API equivalents)
- Maintain a single source of truth for recipes

#### Lifecycle Data Loading

- Load initial recipe data using lifecycle hooks (e.g., `onMounted`)

#### Component Architecture

- Split UI into reusable components:
  - RecipeList
  - RecipeItem
  - RecipeForm
  - StatsDisplay

#### Composable Logic

- Extract reusable logic into composables (e.g., `useRecipes`)
- Handle:
  - CRUD operations
  - Sorting logic
  - Derived state (statistics)

#### State Derivation

- Use computed properties for:
  - Sorted recipe list
  - Vegetarian count
  - Total count

**Out of scope:**

- Backend/API integration
- Authentication or user accounts
- Persistent storage (optional extension)
- Advanced UI styling or animations

## Acceptance Criteria

- [ ] Application displays a list of recipes
- [ ] Users can add new recipes via a form
- [ ] Users can delete recipes
- [ ] Recipes can be sorted by multiple criteria
- [ ] Aggregate statistics are displayed and reactive
- [ ] TypeScript interfaces are correctly implemented
- [ ] Reactive state is properly managed
- [ ] Lifecycle hook is used for initial data loading
- [ ] Components are modular and reusable
- [ ] Composable pattern is used for shared logic

## Risks & Open Points

- Risk: Over-engineering for a small application
  → Mitigation: Keep architecture simple while demonstrating patterns

## Definition of Done

- [ ] Application fully implemented and functional
- [ ] Code reviewed and follows Vue + TypeScript best practices
- [ ] Components are reusable and well-structured
- [ ] State management and composables are validated
- [ ] No runtime or type errors
- [ ] Documentation or README added (optional)
- [ ] Ready for demo or onboarding reference use
