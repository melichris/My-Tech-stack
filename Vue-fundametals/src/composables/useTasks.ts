import { reactive, ref, computed, onMounted, watch, watchEffect } from "vue";
export function useTasks() {
  interface Task {
    id: number;
    title: string;
    priority: number;
    completed?: boolean;
  }
  type Status = "loading..." | "success" | "error";

  type FilterStatus = "all" | "active" | "completed";

  type NewTask = Omit<Task, "id">;

  type PreviewTask = Pick<Task, "title" | "priority">;

  const mockDatabase: Record<number, Task> = {
    1: {
      id: 1,
      title: "task 1",
      priority: 1,
      completed: true,
    },
    2: {
      id: 2,
      title: "task 2",
      priority: 1,
      completed: false,
    },
  };

  const status = ref<Status>("loading...");

  const tasks = ref<Task[]>([]);

  const newTaskForm = reactive<PreviewTask>({
    title: "Task Form",
    priority: 1,
  });

  const completedCount = computed(() => {
    return tasks.value.filter((task) => task.completed).length;
  });

  const filter = ref<FilterStatus>("all");

  const filteredTasks = computed(() => {
    if (filter.value === "all") return tasks.value;
    if (filter.value === "active")
      return tasks.value.filter((task) => !task.completed);
    return tasks.value.filter((task) => task.completed);
  });

  onMounted(() => {
    status.value = "loading...";

    setTimeout(() => {
      try {
        const fetchedTask = mockDatabase[1];
        if (!fetchedTask) throw new Error("No task found");
        tasks.value = Object.values(mockDatabase); // populate the array, not just check one task
        status.value = "success";
      } catch (e) {
        status.value = "error";
      }
    }, 2000);
  });

  watch(filter, (newFilter, oldFilter) => {
    console.log(`Filter changed from ${oldFilter} to ${newFilter}`);
  });

  watchEffect(() => {
    console.log(`Completed: ${completedCount.value} | Filter: ${filter.value}`);
  });

  function addTask() {
    const newTask: Task = {
      id: Date.now() /* generate one somehow  -  Date.now() is a simple option */,
      title: newTaskForm.title,
      priority: newTaskForm.priority,
      completed: false,
    };
    tasks.value.push(newTask);
    newTaskForm.title = "";
    newTaskForm.priority = 0;
  }
  return {
    status,
    tasks,
    filter,
    filteredTasks,
    completedCount,
    newTaskForm,
    addTask,
  };
}
