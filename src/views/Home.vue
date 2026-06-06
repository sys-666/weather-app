<template>
  <main
    class="page"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div
      class="pull-indicator"
      :class="{ active: pullDistance > 0, loading: loading }"
      :style="{ transform: `translate(-50%, ${Math.min(pullDistance, 88)}px)` }"
    >
      {{ refreshLabel }}
    </div>
    <section class="container">
      <header class="page-header">
        <p class="version">Weather Query V2.0</p>
        <h1>天气查询系统</h1>
      </header>

      <SearchBar
        :loading="loading"
        :refresh-disabled="!lastCityName || loading"
        @search="handleSearch"
        @refresh="handleRefresh"
      />

      <p v-if="loading" class="message">正在查询天气信息，请稍候...</p>
      <p v-if="errorMessage" class="message error">{{ errorMessage }}</p>

      <WeatherCard v-if="weatherInfo" :weather="weatherInfo" />
      <ForecastList v-if="weatherInfo?.forecast?.length" :forecasts="weatherInfo.forecast" />
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { getCurrentWeather } from '../api/weather'
import SearchBar from '../components/SearchBar.vue'
import WeatherCard from '../components/WeatherCard.vue'
import ForecastList from '../components/ForecastList.vue'

const loading = ref(false)
const errorMessage = ref('')
const weatherInfo = ref(null)
const lastCityName = ref('')
const pullStartY = ref(0)
const pullDistance = ref(0)

const refreshLabel = computed(() => {
  if (loading.value) return '刷新中...'
  return pullDistance.value >= 70 ? '松开立即刷新' : '下拉刷新天气'
})

async function handleSearch(cityName) {
  loading.value = true
  errorMessage.value = ''
  lastCityName.value = cityName
  weatherInfo.value = null

  try {
    weatherInfo.value = await getCurrentWeather(cityName)
  } catch (error) {
    errorMessage.value = error.message || '天气查询失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

async function handleRefresh() {
  if (!lastCityName.value || loading.value) {
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    weatherInfo.value = await getCurrentWeather(lastCityName.value)
  } catch (error) {
    errorMessage.value = error.message || '刷新失败，请稍后重试'
  } finally {
    loading.value = false
    pullDistance.value = 0
  }
}

function handleTouchStart(event) {
  if (window.scrollY > 0 || loading.value) return
  pullStartY.value = event.touches[0].clientY
}

function handleTouchMove(event) {
  if (window.scrollY > 0 || loading.value) return

  const currentY = event.touches[0].clientY
  const deltaY = currentY - pullStartY.value

  if (deltaY > 0) {
    event.preventDefault()
    pullDistance.value = Math.min(deltaY * 0.6, 88)
  }
}

function handleTouchEnd() {
  if (pullDistance.value < 70) {
    pullDistance.value = 0
    return
  }

  handleRefresh()
}
</script>

<style scoped>
.page {
  position: relative;
  min-height: 100vh;
  padding: 48px 20px 32px;
  background:
    radial-gradient(circle at top, #ffffff 0%, #eff6ff 38%, #f3f6fb 100%);
  touch-action: pan-y;
}

.pull-indicator {
  position: fixed;
  top: 12px;
  left: 50%;
  z-index: 20;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(17, 24, 39, 0.92);
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  transform: translate(-50%, -120%);
  transition: transform 0.12s ease, opacity 0.12s ease;
  opacity: 0;
}

.pull-indicator.active {
  opacity: 1;
}

.pull-indicator.loading {
  background: rgba(37, 99, 235, 0.95);
}

.container {
  width: min(100%, 720px);
  margin: 0 auto;
}

.page-header {
  margin-bottom: 28px;
  text-align: center;
}

.version {
  margin: 0 0 8px;
  color: #1d4ed8;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  color: #0f172a;
  font-size: 36px;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.message {
  margin: 18px 0 0;
  padding: 12px 14px;
  border-radius: 8px;
  background: #ffffff;
  color: #475467;
  font-size: 15px;
}

.error {
  border: 1px solid #fecaca;
  background: #fff1f2;
  color: #b42318;
}

@media (max-width: 640px) {
  .page {
    padding: 32px 16px;
  }

  h1 {
    font-size: 30px;
  }
}
</style>
