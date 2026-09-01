<template>
  <div>
    <h1>User Profile Dashboard</h1>

    <div v-if="status === 'loading'">
      Loading user data...
    </div>

    <div v-else-if="status === 'error'">
      Failed to load user profile.
    </div>

    <div v-else-if="status === 'success' && currentUser">
      <div>
        <h2>Profile Preview</h2>
        <p><strong>Display Name:</strong> {{ displayName }}</p>
        <p><strong>Age:</strong> {{ currentUser.age }}</p>
        <p><strong>Status:</strong> {{ isAdult ? 'Adult' : 'Minor' }}</p>
      </div>

      <form @submit.prevent="handleUpdate">
        <h2>Update Details</h2>

        <div>
          <label for="name">Name:</label>
          <input id="name" v-model="updateForm.name" type="text" required />
        </div>

        <div>
          <label for="age">Age:</label>
          <input id="age" v-model.number="updateForm.age" type="number" required />
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, watchEffect, onMounted } from 'vue';

interface User {
  id: number;
  name: string;
  age: number;
  isAdmin?: boolean;
}

type Status = "loading" | "success" | "error";

type UserPreview = Pick<User, "name" | "age">;

const mockDatabase: Record<string, User> = {
  "user_101": {
    id: 101,
    name: "Chris",
    age: 28,
    isAdmin: true
  },
  "user_102": {
    id: 102,
    name: "Alex",
    age: 16,
    isAdmin: false
  }
};

const status = ref<Status>("loading");
const currentUser = ref<User | null>(null);

const updateForm = reactive<UserPreview>({
  name: '',
  age: 0
});

const isAdult = computed<boolean>(() => {
  if (!currentUser.value) return false;
  return currentUser.value.age >= 18;
});

const displayName = computed<string>(() => {
  if (!currentUser.value) return '';
  return currentUser.value.isAdmin
    ? `${currentUser.value.name} (Admin)`
    : currentUser.value.name;
});

onMounted(() => {
  status.value = "loading";

  setTimeout(() => {
    try {
      const fetchedUser = mockDatabase["user_101"];

      if (!fetchedUser) throw new Error("User not found");

      currentUser.value = fetchedUser;
      updateForm.name = fetchedUser.name;
      updateForm.age = fetchedUser.age;
      status.value = "success";
    } catch (e) {
      status.value = "error";
    }
  }, 1500);
});

watch(currentUser, (newUser, oldUser) => {
  console.log("currentUser wrapper updated:", { old: oldUser, new: newUser });
}, { deep: true });

watchEffect(() => {
  console.log(`[WatchEffect Log] Status: "${status.value}" | Display Name: "${displayName.value}"`);
});

const updateProfile = (fieldsToUpdate: Partial<User>): void => {
  if (!currentUser.value) return;

  currentUser.value = {
    ...currentUser.value,
    ...fieldsToUpdate
  };
};

const handleUpdate = (): void => {
  updateProfile({
    name: updateForm.name,
    age: updateForm.age
  });
};
</script>
