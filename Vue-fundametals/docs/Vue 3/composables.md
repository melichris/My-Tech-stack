# Vue 3 Composables with TypeScript

A **composable** is a function that leverages Vue's Composition API to encapsulate and reuse **stateful, reactive logic**. When combined with **TypeScript**, composables provide excellent type safety, autocompletion, and clearer development workflows.

---

## 🛠️ Example 1: Synchronous State (`useCounter`)

This example demonstrates a basic reactive counter with a customizable step size and type-safe arguments.

### 1. The Composable (`src/composables/useCounter.ts`)

```typescript
import { ref, computed, Ref, ComputedRef } from "vue";

// Define interfaces for options and return values
interface UseCounterOptions {
  initialValue?: number;
  step?: number;
}

interface UseCounterReturn {
  count: Ref<number>;
  doubleCount: ComputedRef<number>;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export function useCounter(options: UseCounterOptions = {}): UseCounterReturn {
  const { initialValue = 0, step = 1 } = options;

  // Reactive state
  const count = ref<number>(initialValue);

  // Computed property
  const doubleCount = computed<number>(() => count.value * 2);

  // Methods
  const increment = (): void => {
    count.value += step;
  };

  const decrement = (): void => {
    count.value -= step;
  };

  const reset = (): void => {
    count.value = initialValue;
  };

  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset,
  };
}
```

### 2. The Component (`src/components/Counter.vue`)

```html
<script setup lang="ts">
  import { useCounter } from "../composables/useCounter";

  // TypeScript infers types automatically upon destructuring
  const { count, doubleCount, increment, decrement, reset } = useCounter({
    initialValue: 10,
    step: 2,
  });
</script>

<template>
  <div class="counter">
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <button @click="increment">+2</button>
    <button @click="decrement">-2</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

---

## 🚀 Example 2: Asynchronous Lifecycle (`useFetch`)

This advanced example showcases an asynchronous API fetch wrapper featuring generic type parameters (`<T>`) for strongly-typed data payloads.

### 1. The Composable (`src/composables/useFetch.ts`)

```typescript
import { ref, onMounted, Ref } from "vue";

interface UseFetchReturn<T> {
  data: Ref<T | null>;
  error: Ref<string | null>;
  loading: Ref<boolean>;
}

// Accepts a generic type parameter <T> to enforce type-safety on the response data
export function useFetch<T>(url: string): UseFetchReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>;
  const error = ref<string | null>(null);
  const loading = ref<boolean>(true);

  const fetchData = async (): Promise<void> => {
    loading.value = true;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      data.value = json as T;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "An unknown error occurred";
    } finally {
      loading.value = false;
    }
  };

  // Hook into component lifecycle automatically
  onMounted(() => {
    fetchData();
  });

  return { data, error, loading };
}
```

### 2. The Component (`src/components/UserList.vue`)

```html
<script setup lang="ts">
  import { useFetch } from "../composables/useFetch";

  // Define the shape of the data expected from the API
  interface User {
    id: number;
    name: string;
    email: string;
  }

  // Pass the User array interface as a generic type parameter
  const {
    data: users,
    error,
    loading,
  } = useFetch<User[]>("https://jsonplaceholder.typicode.com/users");
</script>

<template>
  <div class="user-list">
    <div v-if="loading">Loading users...</div>
    <div v-else-if="error" class="error">Error: {{ error }}</div>
    <ul v-else-if="users">
      <li v-for="user in users" :key="user.id">
        <strong>{{ user.name }}</strong> - {{ user.email }}
      </li>
    </ul>
  </div>
</template>
```

---

## 🎯 TypeScript Coding Conventions

1. **Explicit Return Typing:** Explicitly define the return interface for your composables (e.g., `UseCounterReturn`). This makes unit testing easier and clarifies the contract of the function.
2. **Generics for Dynamism:** Use standard TypeScript generics (`<T>`) whenever data shapes depend on input, such as API clients, storage lockers, or form handlers.
3. **Ref Type Casts:** When initializing a ref with `null`, cast it using `ref<T | null>(null) as Ref<T | null>` or simply `ref<T | null>(null)` to prevent TypeScript from falling back to `Ref<null>`.
