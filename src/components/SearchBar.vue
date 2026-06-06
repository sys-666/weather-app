<template>
  <form class="search-bar" @submit.prevent="handleSubmit">
    <input
      v-model.trim="city"
      class="search-input"
      type="text"
      placeholder="请输入城市名称，例如：北京"
      :disabled="loading"
    />

    <div class="button-group">
      <button class="search-button" type="submit" :disabled="loading">
        {{ loading ? '查询中...' : '查询天气' }}
      </button>
      <button
        class="refresh-button"
        type="button"
        :disabled="loading || refreshDisabled"
        @click="emit('refresh')"
      >
        刷新
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  refreshDisabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['search', 'refresh'])
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
  border-radius: 14px;
  font-size: 16px;
  color: #111827;
  background: #ffffff;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.button-group {
  display: flex;
  gap: 8px;
}

.search-button,
.refresh-button {
  height: 46px;
  padding: 0 18px;
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.search-button {
  background: #2563eb;
  box-shadow: 0 10px 18px rgba(37, 99, 235, 0.18);
}

.refresh-button {
  background: #0f766e;
}

.search-button:hover:not(:disabled),
.refresh-button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.search-button:hover:not(:disabled) {
  background: #1d4ed8;
}

.refresh-button:hover:not(:disabled) {
  background: #115e59;
}

.search-button:disabled,
.refresh-button:disabled,
.search-input:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

@media (max-width: 640px) {
  .search-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .button-group {
    width: 100%;
  }

  .search-button,
  .refresh-button {
    width: 100%;
  }
}

</style>
