## 3. Watchers (`watch` & `watchEffect`)

### `watch` (The Targeted Spy)

- **In Plain English:** Tell Vue to **spy on a specific variable**. When that variable changes, run a specific piece of code. It gives you both the **new value** and the **old value**, and it doesn't run until the variable actually changes for the first time.
- **Code Example:**

  ```typescript
  import { ref, watch } from "vue";

  const count = ref<number>(0);

  // Spying specifically on 'count'
  watch(count, (newValue, oldValue) => {
    console.log(`Count changed from ${oldValue} to ${newValue}`);
  });
  ```

### `watchEffect` (The Automatic Overhearer)

- **In Plain English:** Put a piece of code inside a tracker box. Vue automatically figures out which variables are inside that box. Whenever _any_ of those variables change, the whole box runs again. It also **runs immediately once** when the component loads.
- **Code Example:**

  ```typescript
  import { ref, watchEffect } from "vue";

  const userId = ref<number>(1);

  // Runs immediately, and re-runs whenever 'userId' changes
  watchEffect(() => {
    console.log(`Fetching data for user ID: ${userId.value}`);
  });
  ```
