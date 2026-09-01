# vue-ts-training

Structured Vue 3 + TypeScript practice projects — ticketed training exercises covering reactivity, components, composables, and TypeScript fundamentals.

**Type:** Training / Skill Development
**Stack:** Vue 3 (Composition API), TypeScript

## Overview

This repository is a collection of self-contained practice projects built to demonstrate Vue 3 Composition API and TypeScript competency. Each project is treated as a structured work item — with a defined objective, scope, acceptance criteria, and Definition of Done — rather than an open-ended learning exercise.

## Concepts Covered

**TypeScript**

- Primitive types, type inference, explicit annotations
- Interfaces and optional properties
- Union types and intersection types
- Generics
- Utility types: `Partial`, `Pick`, `Omit`, `Record`

**Vue 3 — Reactivity**

- `ref` and `reactive`
- `computed` properties
- `watch` and `watchEffect`
- Lifecycle hooks (`onMounted`, `onUnmounted`, `onUpdated`)

**Vue 3 — Components**

- Props and typed prop declarations
- Emits and typed custom events
- Default and named slots
- `provide` / `inject` for skip-level data sharing

**Vue 3 — Composables**

- Extracting reusable reactive logic into standalone composable functions

## Projects

| Project          | Description                                                                               | Status      |
| ---------------- | ----------------------------------------------------------------------------------------- | ----------- |
| `user-dashboard` | User profile viewer with simulated fetch, computed display logic, and profile update form | Complete    |
| `task-tracker`   | Task list with filtering, completion toggling, and task creation                          | Complete    |
| `recipe-book`    | Recipe browser with sorting, add/delete, and component-based card layout                  | In Progress |

Each project folder contains its own implementation and follows the same core structure: typed data models, reactive state, simulated async data loading, component composition, and (where applicable) a composable extraction.

## Project Structure

```
vue-fundamentals/
├── user-dashboard/
├── task-tracker/
├── recipe-book/
└── README.md
```

## Getting Started

Each project is a standalone Vue 3 + TypeScript app scaffolded with Vite.

```bash
cd <project-folder>
npm install
npm run dev
```

## Notes

Projects in this repository are training exercises intended to demonstrate applied competency in the Vue 3 / TypeScript stack. They are not production or client deliverables.
