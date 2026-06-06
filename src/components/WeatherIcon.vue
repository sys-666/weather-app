<template>
  <div class="weather-icon" :class="type" :aria-label="weatherText">
    <span class="icon-symbol">{{ iconInfo.symbol }}</span>
    <span class="icon-label">{{ iconInfo.label }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'cloudy'
  },
  weatherText: {
    type: String,
    default: '天气'
  }
})

const iconMap = {
  sunny: { symbol: '☀️', label: '晴天' },
  cloudy: { symbol: '⛅', label: '多云' },
  rain: { symbol: '🌧️', label: '雨天' },
  snow: { symbol: '❄️', label: '雪天' },
  storm: { symbol: '⛈️', label: '雷暴' }
}

const iconInfo = computed(() => iconMap[props.type] || iconMap.cloudy)
</script>

<style scoped>
.weather-icon {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid #dbe6ff;
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(37, 99, 235, 0.08);
}

.icon-symbol {
  font-size: 22px;
  line-height: 1;
}

.icon-label {
  color: #1f2937;
  font-size: 13px;
  font-weight: 700;
}
</style>
