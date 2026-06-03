<template>
  <form class="search-bar" @submit.prevent="handleSubmit">
    <input
      v-model.trim="city"
      class="search-input"
      type="text"
      placeholder="请输入城市名称，例如：北京"
      :disabled="loading"
    />
    <button class="search-button" type="submit" :disabled="loading">
      {{ loading ? '查询中...' : '查询天气' }}
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['search'])
const city = ref('')

function handleSubmit() {
  if (!city.value) {
    return
  }

  emit('search', city.value)
}
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 12px;
  width: 100%;
}

.search-input {
  flex: 1;
  min-width: 0;
  height: 46px;
  padding: 0 16px;
  border: 1px solid #d7dde8;
  border-radius: 8px;
  font-size: 16px;
  color: #1f2937;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.search-button {
  height: 46px;
  padding: 0 22px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.search-button:hover:not(:disabled) {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.search-button:disabled,
.search-input:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

@media (max-width: 640px) {
  .search-bar {
    flex-direction: column;
  }

  .search-button {
    width: 100%;
  }
}
</style>
