# Vue 3 Composition API: `ref()`, `reactive()`, and `computed()`

This guide provides short, detailed notes and practical code examples for Vue 3's core reactive primitives in the Composition API (`<script setup>` syntax).

---

## 1. `ref()`

### Overview

`ref()` accepts an inner value (primitive or object) and returns a reactive, mutable ref object. The underlying value is accessed and updated via the `.value` property. In `<template>`, refs are automatically unwrapped, so `.value` is omitted.

---

### Key Scenarios & Use Cases

#### Scenario A: Primitive State Management

Ideal for single values like numbers, booleans, strings, or null states.

```vue
<script setup>
import { ref } from "vue";

const count = ref(0);
const isVisible = ref(true);
const username = ref("Alice");

function increment() {
  count.value++; // Requires .value in script
}
</script>

<template>
  <div>
    <!-- Auto-unwrapped in template -->
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

---

#### Scenario B: Template / DOM References

Binding direct HTML DOM elements or child component instances to access native methods or component APIs.

```vue
<script setup>
import { ref, onMounted } from "vue";

// Ref name must match the HTML attribute `ref`
const inputRef = ref(null);

onMounted(() => {
  // Focus the HTML input element directly when mounted
  inputRef.value?.focus();
});
</script>

<template>
  <input ref="inputRef" placeholder="Auto-focused input" />
</template>
```

---

#### Scenario C: Reassigning Entire Arrays or Objects

When fetching new dataset responses from APIs and replacing the entire data reference, `ref()` preserves reactivity seamlessly.

```vue
<script setup>
import { ref } from "vue";

const users = ref([]);

async function fetchUsers() {
  const response = await fetch("/api/users");
  const data = await response.json();
  // Replacing the entire array reference works cleanly with ref
  users.value = data;
}
</script>
```

---

## 2. `reactive()`

### Overview

`reactive()` takes an object, array, or collection (e.g., `Map`, `Set`) and returns a reactive **Proxy** of the original object. Reactivity is **deep**, meaning nested properties are also reactive. Unlike `ref()`, property access does not require `.value`.

---

### Key Scenarios & Use Cases

#### Scenario A: Grouped Form or Module State

Best used when maintaining structured objects with multiple related fields.

```vue
<script setup>
import { reactive } from "vue";

const formData = reactive({
  username: "",
  email: "",
  password: "",
  errors: {
    email: null,
  },
});

function submitForm() {
  if (!formData.email.includes("@")) {
    formData.errors.email = "Invalid email address";
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <input v-model="formData.username" placeholder="Username" />
    <input v-model="formData.email" placeholder="Email" />
    <span v-if="formData.errors.email">{{ formData.errors.email }}</span>
  </form>
</template>
```

---

#### Scenario B: Reactive Collections (`Map` & `Set`)

Creating reactive JavaScript native collections.

```vue
<script setup>
import { reactive } from "vue";

const activeTags = reactive(new Set());
const userRoles = reactive(new Map());

function toggleTag(tag) {
  if (activeTags.has(tag)) {
    activeTags.delete(tag);
  } else {
    activeTags.add(tag);
  }
}
</script>
```

---

#### Scenario C: Maintaining Reactivity during Destructuring (`toRefs`)

_Warning:_ Destructuring a `reactive()` object directly strips reactivity. Use `toRefs()` to turn individual properties into refs.

```vue
<script setup>
import { reactive, toRefs } from "vue";

const state = reactive({
  count: 0,
  name: "Vue",
});

// Destructuring safely using toRefs
const { count, name } = toRefs(state);
// count and name are now standalone refs
</script>
```

---

## 3. `computed()`

### Overview

`computed()` accepts a getter function and returns a read-only reactive ref object that recalculates **only when its reactive dependencies change** (cached derivation). Optionally, it can accept an object with `get` and `set` methods to create a writable computed property.

---

### Key Scenarios & Use Cases

#### Scenario A: Read-Only Derived Data (Filtering & Calculations)

Efficiently compute summaries, totals, or filtered lists without re-running calculations on every render.

```vue
<script setup>
import { ref, computed } from "vue";

const searchQuery = ref("");
const products = ref([
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Phone", price: 699 },
  { id: 3, name: "Tablet", price: 399 },
]);

// Cached computed list
const filteredProducts = computed(() => {
  return products.value.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

// Compute aggregate total
const totalPrice = computed(() => {
  return filteredProducts.value.reduce((acc, item) => acc + item.price, 0);
});
</script>

<template>
  <input v-model="searchQuery" placeholder="Search product..." />
  <ul>
    <li v-for="item in filteredProducts" :key="item.id">
      {{ item.name }} - ${{ item.price }}
    </li>
  </ul>
  <p>Total: ${{ totalPrice }}</p>
</template>
```

---

#### Scenario B: Writable Computed Properties

Used when creating two-way getters & setters, such as dynamic inputs or string parsers.

```vue
<script setup>
import { ref, computed } from "vue";

const firstName = ref("John");
const lastName = ref("Doe");

// Writable computed property with getter & setter
const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`;
  },
  set(newValue) {
    const names = newValue.split(" ");
    firstName.value = names[0] || "";
    lastName.value = names[1] || "";
  },
});
</script>

<template>
  <input v-model="fullName" placeholder="Full Name" />
  <p>First: {{ firstName }} | Last: {{ lastName }}</p>
</template>
```

---

#### Scenario C: Computed Properties with Component Props (`v-model` Wrapper)

Creating clean two-way bindings inside custom components using `defineProps` and `defineEmits`.

```vue
<script setup>
import { computed } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});
</script>

<template>
  <input v-model="value" />
</template>
```

---

## Comparison Summary Table

| Feature / Primitive      | `ref()`                                              | `reactive()`                                                 | `computed()`                                                       |
| :----------------------- | :--------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------------- |
| **Data Types Supported** | Primitives & Objects                                 | Objects, Arrays, Collections (`Map`/`Set`)                   | Derived state (Function return value)                              |
| **Access Syntax**        | `.value` in JS (auto-unwrapped in `<template>`)      | Direct property access (`state.count`)                       | `.value` in JS (auto-unwrapped in `<template>`)                    |
| **Reassignability**      | Can reassign `.value` entirely                       | Cannot reassign root object (`state = {}` breaks reactivity) | Read-only by default (Writable with `get`/`set`)                   |
| **Caching Mechanism**    | No caching (holds raw state)                         | No caching (holds raw state)                                 | **Yes** (cached based on dependency changes)                       |
| **Primary Use Cases**    | Primitives, DOM Refs, API fetch response replacement | Grouped form state, deep nested objects                      | Data filtering, mathematical aggregations, dynamic getters/setters |
