<template>
  <div :class="containerClasses">
    <div :class="spinnerClasses"></div>
    <p class="text-gray-600 text-lg font-medium mb-4">{{ message }}</p>
    <div class="flex justify-center space-x-2">
      <div
        class="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce"
      ></div>
      <div
        class="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-bounce"
        style="animation-delay: 0.1s"
      ></div>
      <div
        class="w-3 h-3 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-bounce"
        style="animation-delay: 0.2s"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  message: {
    type: String,
    default: "Loading new Pokémons...",
  },
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
});

const spinnerClasses = computed(() => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-16 h-16",
  };

  return `loading-spinner ${sizeClasses[props.size]} mx-auto mb-4`;
});

const containerClasses = computed(() => {
  return "text-center animate-pulse";
});
</script>

<style scoped>
.loading-spinner {
  border: 3px solid #f3f4f6;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>
