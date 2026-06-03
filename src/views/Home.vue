<template>
  <main class="page">
    <section class="container">
      <header class="page-header">
        <p class="version">Weather Query V1.0</p>
        <h1>天气查询系统</h1>
      </header>

      <SearchBar :loading="loading" @search="handleSearch" />

      <p v-if="loading" class="message">正在查询天气信息，请稍候...</p>
      <p v-if="errorMessage" class="message error">{{ errorMessage }}</p>

      <WeatherCard v-if="weatherInfo" :weather="weatherInfo" />
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { getCurrentWeather } from '../api/weather'
import SearchBar from '../components/SearchBar.vue'
import WeatherCard from '../components/WeatherCard.vue'

const loading = ref(false)
const errorMessage = ref('')
const weatherInfo = ref(null)

async function handleSearch(cityName) {
  loading.value = true
  errorMessage.value = ''
  weatherInfo.value = null

  try {
    weatherInfo.value = await getCurrentWeather(cityName)
  } catch (error) {
    // 优先展示接口返回的业务错误，其次展示通用错误提示。
    errorMessage.value = error.message || '天气查询失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 48px 20px;
  background: #f3f6fb;
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
  color: #2563eb;
  font-size: 14px;
  font-weight: 700;
}

h1 {
  margin: 0;
  color: #111827;
  font-size: 36px;
  line-height: 1.2;
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
