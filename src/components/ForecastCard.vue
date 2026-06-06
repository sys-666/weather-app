<template>
  <article class="forecast-card">
    <div class="forecast-top">
      <p class="forecast-day">{{ forecast.dayLabel || forecast.label }}</p>
      <WeatherIcon :type="forecast.iconType || 'cloudy'" :weatherText="forecast.weather" />
    </div>

    <p class="forecast-weather">{{ forecast.weather }}</p>

    <div class="forecast-temp">
      <span class="temp-pill max">高 {{ forecast.maxTemp }}°</span>
      <span class="temp-pill min">低 {{ forecast.minTemp }}°</span>
    </div>
  </article>
</template>

<script setup>
import WeatherIcon from './WeatherIcon.vue'

defineProps({
  forecast: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.forecast-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 148px;
  padding: 14px;
  border: 1px solid #e5ecf8;
  border-radius: 18px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
  border-left: 3px solid #bfdbfe;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.forecast-card:hover {
  transform: translateY(-2px);
  border-color: #bfdbfe;
  box-shadow: 0 16px 30px rgba(37, 99, 235, 0.14);
}

.forecast-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.forecast-day {
  margin: 0;
  color: #111827;
  font-size: 14px;
  font-weight: 800;
}

.forecast-weather {
  min-height: 2.6em;
  margin: 0;
  color: #475467;
  font-size: 13px;
  line-height: 1.4;
}

.forecast-temp {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: auto;
}

.temp-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.temp-pill.max {
  background: #eff6ff;
  color: #1d4ed8;
}

.temp-pill.min {
  background: #f3f4f6;
  color: #475467;
}
</style>
