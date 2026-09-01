import {
  computed,
  onMounted,
  provide,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";

interface Recipe {
  id: number;
  title: string;
  cookTime: number;
  servings: string;
  isVegetarian?: boolean;
}
type SortBy = "name" | "time" | "servings";

type newRecipe = Omit<Recipe, "id">;

type listView = Pick<Recipe, "title" | "cookTime">;

type status = "loading..." | "Success";
const mockDatabase: Record<number, Recipe> = {
  1: {
    id: 1,
    title: "Recipe 1",
    cookTime: Date.now(),
    servings: "15.000XAF",
    isVegetarian: true,
  },
  2: {
    id: 2,
    title: "Recipe 1",
    cookTime: Date.now(),
    servings: "15.000XAF",
    isVegetarian: true,
  },
  3: {
    id: 3,
    title: "Recipe 1",
    cookTime: Date.now(),
    servings: "15.000XAF",
    isVegetarian: true,
  },
};
const recipes = ref(0);
const status = ref<string>("loading...");

const sortBy = ref(0);

const recipeForm = reactive<newRecipe>({
  title: "Recipe 1",
  cookTime: Date.now(),
  servings: "15.000XAF",
  isVegetarian: false,
});
const vegetarianCount = computed(() => {});
const sortedRecipes = computed(() => {});

// watch(sortBy, (old, new)){
//   console.log()
// }

watchEffect(() => {
  console.log;
});
onMounted(() => {
  status.value = "loading...";

  setTimeout(() => {
    try {
      const fetchedBook = mockDatabase[1];
      if (!fetchedBook) throw new Error("No Book Found");

      status.value = "success";
    } catch (e) {
      console.log(e);
    }
  }, 2000);
});
// defineProps{

// } ()

// const emit = defineEmits{ [delete -recipe], }()

// provide()
