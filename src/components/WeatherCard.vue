<template>
  <section class="weather-card">
    <div class="card-header">
      <p class="label">当前城市</p>
      <div class="card-title-row">
        <h2>{{ weather.city }}</h2>
        <WeatherIcon :type="weather.iconType || 'cloudy'" :weatherText="weather.weather" />
      </div>
      <p class="subtle">实时天气状况 · 由 Open-Meteo 提供</p>
    </div>

    <div class="weather-main">
      <div>
        <p class="status-label">当前温度</p>
        <span class="temperature">{{ weather.temperature }}°C</span>
      </div>
      <div class="status-chip">
        <span class="status-dot"></span>
        <span class="status">{{ weather.weather }}</span>
      </div>
    </div>

    <div class="weather-details">
      <article class="detail-item">
        <span class="detail-label">湿度</span>
        <strong>{{ weather.humidity }}%</strong>
      </article>
      <article class="detail-item">
        <span class="detail-label">风速</span>
        <strong>{{ weather.windSpeed }} km/h</strong>
      </article>
    </div>
  </section>
</template>

<script setup>
import WeatherIcon from './WeatherIcon.vue'

defineProps({
  weather: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.weather-card {
  margin-top: 24px;
  padding: 28px;
  border: 1px solid #e5eaf3;
  border-radius: 24px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.10);
}

.card-header {
  margin-bottom: 22px;
}

.label,
.detail-label,
.status-label,
.subtle {
  margin: 0;
  color: #667085;
  font-size: 14px;
}

.card-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 6px;
}

h2 {
  margin: 0;
  color: #111827;
  font-size: 28px;
  line-height: 1.2;
}

.weather-main {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  padding: 18px;
  border: 1px solid #e5ecf8;
  border-radius: 18px;
  background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%);
}

.temperature {
  display: block;
  margin-top: 6px;
  color: #2563eb;
  font-size: 52px;
  font-weight: 700;
  line-height: 1;
}

.status-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 999px;
  background: #eff6ff;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #2563eb;
}

.status {
  color: #1f2937;
  font-size: 16px;
  font-weight: 600;
}

.weather-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 18px;
}

.detail-item {
  padding: 16px;
  border-radius: 14px;
  background: #f8fafc;
  border: 1px solid #edf2f7;
}

.detail-item strong {
  display: block;
  margin-top: 8px;
  color: #111827;
  font-size: 22px;
}

@media (max-width: 640px) {
  .weather-card {
    padding: 22px;
  }

  .card-title-row,
  .weather-main {
    align-items: flex-start;
    flex-direction: column;
  }

  .temperature {
    font-size: 44px;
  }

  .weather-details {
    grid-template-columns: 1fr;
  }
}
</style>
