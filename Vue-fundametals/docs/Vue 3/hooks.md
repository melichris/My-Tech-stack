## 5. Lifecycle Hooks (The Component's Timeline)

Lifecycle hooks let you trigger code at specific moments in a component's life (birth, updates, and death).

_Note: In the Composition API, there is no `beforeCreate` or `created` hook. Any code you write directly inside your `<script setup>` runs at that time._

### Hook Summary

- **`onMounted`**: "The component is now visible on the screen." (Best for fetching API data or touching the actual HTML).
- **`onUpdated`**: "The HTML just redrew because some data changed." (Best for debugging layout updates).
- **`onUnmounted`**: "The component is being destroyed and removed." (Best for clearing timers or event listeners).
- **`onBeforeMount`**: Runs right before the HTML hits the screen.
- **`onBeforeUpdate`**: Runs right after data changes, but _before_ the HTML is redrawn.
- **`onBeforeUnmount`**: Runs right before the component is destroyed.

### Code Example

```html
<script setup lang="ts">
import { ref, onMounted, onUpdated, onUnmounted } from 'vue';

const timerText = ref<string>('Live!');
let intervalId: number;

// 1. Component is born and visible
onMounted(() => {
  console.log('Component is ready!');
  intervalId = window.setInterval(() => {
    console.log('Tick...');
  }, 1000);
});

// 2. Something changed and the HTML updated
onUpdated(() => {
  console.log('The UI just re-rendered!');
});

// 3. Component is being deleted
onUnmounted(() => {
  console.log('Component is gone. Cleaning up...');
  clearInterval(intervalId); // Prevents memory leaks
});
```
