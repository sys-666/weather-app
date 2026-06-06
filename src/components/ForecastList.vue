<template>
  <section class="forecast-section">
    <div class="forecast-header">
      <h3>未来 7 天天气预报</h3>
      <p>按天展示最高温度、最低温度与天气状况</p>
    </div>

    <div class="forecast-grid">
      <ForecastCard
        v-for="item in forecasts"
        :key="item.date"
        :forecast="item"
      />
    </div>
  </section>
</template>

<script setup>
import ForecastCard from './ForecastCard.vue'

defineProps({
  forecasts: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.forecast-section {
  margin-top: 24px;
  padding: 18px;
  border: 1px solid #e5ecf8;
  border-radius: 22px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  box-shadow: 0 18px 45px rgba(31, 41, 55, 0.08);
}

.forecast-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.forecast-header h3 {
  margin: 0;
  color: #111827;
  font-size: 18px;
}

.forecast-header p {
  margin: 0;
  color: #667085;
  font-size: 14px;
}

.forecast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
  margin-top: 16px;
  align-items: stretch;
}

@media (max-width: 640px) {
  .forecast-section {
    padding: 16px;
  }

  .forecast-grid {
    gap: 10px;
  }
}
</style>
