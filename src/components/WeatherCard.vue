<template>
  <section class="weather-card">
    <div class="card-header">
      <p class="label">当前城市</p>
      <h2>{{ weather.city }}</h2>
    </div>

    <div class="weather-main">
      <span class="temperature">{{ weather.temperature }}°C</span>
      <span class="status">{{ weather.weather }}</span>
    </div>

    <div class="weather-details">
      <div class="detail-item">
        <span class="detail-label">湿度</span>
        <strong>{{ weather.humidity }}%</strong>
      </div>
      <div class="detail-item">
        <span class="detail-label">风速</span>
        <strong>{{ weather.windSpeed }} km/h</strong>
      </div>
    </div>
  </section>
</template>

<script setup>
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
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 18px 45px rgba(31, 41, 55, 0.08);
}

.card-header {
  margin-bottom: 22px;
}

.label,
.detail-label {
  margin: 0;
  color: #667085;
  font-size: 14px;
}

h2 {
  margin: 6px 0 0;
  color: #111827;
  font-size: 28px;
  line-height: 1.2;
}

.weather-main {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid #eef2f7;
}

.temperature {
  color: #2563eb;
  font-size: 52px;
  font-weight: 700;
  line-height: 1;
}

.status {
  color: #1f2937;
  font-size: 20px;
  font-weight: 600;
}

.weather-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 22px;
}

.detail-item {
  padding: 16px;
  border-radius: 8px;
  background: #f8fafc;
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
