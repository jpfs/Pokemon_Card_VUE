<template>
  <div class="mb-6">
    <h3 class="text-lg font-semibold text-gray-700 mb-3 text-center">
      Filter by Type
    </h3>

    <div class="flex flex-wrap justify-center gap-2 mb-3">
      <button
        @click="selectType(null)"
        :class="getAllTypesButtonClasses()"
        :disabled="isLoading"
        :aria-pressed="!selectedType"
        aria-label="Show all Pokémon types"
      >
        All
      </button>

      <button
        v-for="type in availableTypes"
        :key="type"
        @click="selectType(type)"
        :class="getTypeButtonClasses(type)"
        :disabled="isLoading"
        :aria-pressed="isTypeSelected(type)"
        :title="'Filter by ' + type + ' type'"
      >
        {{ type }}
      </button>
    </div>

    <transition name="fade">
      <p v-if="filterStatusMessage" class="text-center text-sm text-gray-600">
        {{ filterStatusMessage }}
        <strong class="capitalize">{{ selectedType }}</strong>
      </p>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { POKEMON_TYPES } from "../utils/constants";

const props = defineProps({
  selectedType: {
    type: String,
    default: null,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["type-selected"]);

const availableTypes = ref([
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "dragon",
  "fighting",
  "poison",
  "ice",
  "ghost",
  "rock",
  "flying",
]);

const filterStatusMessage = computed(() => {
  if (!props.selectedType) return null;
  return `Showing only Pokémon of type ${props.selectedType}`;
});

const hasActiveFilter = computed(() => {
  return Boolean(props.selectedType);
});

const selectType = (type) => {
  if (props.isLoading) return;

  const newType = props.selectedType === type ? null : type;
  emit("type-selected", newType);
};

const getTypeStyles = (type) => {
  return (
    POKEMON_TYPES[type] || {
      bg: "bg-gray-400",
      text: "text-white",
    }
  );
};

const isTypeSelected = (type) => {
  return props.selectedType === type;
};

const getTypeButtonClasses = (type) => {
  const baseClasses = [
    "type-filter-button",
    "px-3",
    "py-2",
    "rounded-full",
    "text-sm",
    "font-bold",
    "uppercase",
    "tracking-wide",
    "border-2",
    "transition-all",
    "duration-200",
  ];

  const typeStyles = getTypeStyles(type);
  const stateClasses = [typeStyles.bg, typeStyles.text];

  const interactionClasses = isTypeSelected(type)
    ? ["active", "shadow-lg", "border-white", "border-opacity-50"]
    : ["border-transparent", "hover:border-white", "hover:border-opacity-30"];

  const loadingClasses = props.isLoading
    ? ["opacity-50", "cursor-not-allowed"]
    : ["cursor-pointer"];

  return [
    ...baseClasses,
    ...stateClasses,
    ...interactionClasses,
    ...loadingClasses,
  ];
};

const getAllTypesButtonClasses = () => {
  const baseClasses = [
    "type-filter-button",
    "px-3",
    "py-2",
    "rounded-full",
    "text-sm",
    "font-bold",
    "uppercase",
    "tracking-wide",
    "border-2",
    "transition-all",
    "duration-200",
  ];

  const stateClasses = !props.selectedType
    ? ["bg-gray-600", "text-white", "border-gray-600", "active", "shadow-lg"]
    : ["bg-gray-200", "text-gray-600", "border-gray-200", "hover:bg-gray-300"];

  const loadingClasses = props.isLoading
    ? ["opacity-50", "cursor-not-allowed"]
    : ["cursor-pointer"];

  return [...baseClasses, ...stateClasses, ...loadingClasses];
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
