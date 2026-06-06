<template>
  <section class="forecast-section">
    <div class="forecast-header">
      <h3>未来 7 天天气趋势</h3>
      <p>平滑曲线展示最高温度与最低温度，同时保留天气图标与天气描述</p>
    </div>

    <div class="chart-panel">
      <svg class="forecast-chart" viewBox="0 0 700 220" aria-label="未来 7 天天气趋势图">
        <defs>
          <linearGradient id="maxLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stop-color="#2563eb" />
            <stop offset="100%" stop-color="#60a5fa" />
          </linearGradient>
          <linearGradient id="minLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stop-color="#0f766e" />
            <stop offset="100%" stop-color="#2dd4bf" />
          </linearGradient>
        </defs>

        <g class="chart-grid">
          <line v-for="index in 4" :key="index" :x1="28" :x2="672" :y1="40 + index * 35" :y2="40 + index * 35" />
        </g>

        <path class="curve max" :d="maxPath" />
        <path class="curve min" :d="minPath" />

        <g v-for="(item, index) in forecasts" :key="item.date">
          <circle class="point max" :cx="chartPoints.max[index]?.x" :cy="chartPoints.max[index]?.y" r="4.5" />
          <circle class="point min" :cx="chartPoints.min[index]?.x" :cy="chartPoints.min[index]?.y" r="4.2" />
          <text class="point-label" :x="chartPoints.max[index]?.x" :y="210" text-anchor="middle">{{ item.dayLabel || item.label }}</text>
        </g>
      </svg>
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
import { computed } from 'vue'
import ForecastCard from './ForecastCard.vue'

const props = defineProps({
  forecasts: {
    type: Array,
    default: () => []
  }
})

const chartWidth = 700
const chartHeight = 220
const paddingLeft = 28
const paddingRight = 28
const paddingTop = 22
const paddingBottom = 32

const maxTemps = computed(() => props.forecasts.map((item) => Number(item.maxTemp) || 0))
const minTemps = computed(() => props.forecasts.map((item) => Number(item.minTemp) || 0))

const maxTempValue = computed(() => Math.max(...maxTemps.value, 0))
const minTempValue = computed(() => Math.min(...minTemps.value, 0))
const tempRange = computed(() => Math.max(maxTempValue.value - minTempValue.value, 1))

function toPoint(values, index) {
  const x = paddingLeft + ((chartWidth - paddingLeft - paddingRight) * index) / Math.max(values.length - 1, 1)
  const y = chartHeight - paddingBottom - ((values[index] - minTempValue.value) / tempRange.value) * (chartHeight - paddingTop - paddingBottom)
  return { x, y }
}

const chartPoints = computed(() => ({
  max: maxTemps.value.map((_, index) => toPoint(maxTemps.value, index)),
  min: minTemps.value.map((_, index) => toPoint(minTemps.value, index))
}))

function createSmoothPath(points) {
  if (!points.length) return ''

  let path = `M ${points[0].x} ${points[0].y}`

  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index]
    const next = points[index + 1]
    const controlX = current.x + (next.x - current.x) / 2

    path += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`
  }

  return path
}

const maxPath = computed(() => createSmoothPath(chartPoints.value.max))
const minPath = computed(() => createSmoothPath(chartPoints.value.min))
</script>

<style scoped>
.forecast-section {
  margin-top: 24px;
  padding: 18px;
  border: 1px solid #e5ecf8;
  border-radius: 24px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.10);
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

.chart-panel {
  margin-top: 14px;
  padding: 10px;
  border-radius: 18px;
  background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
  border: 1px solid #edf3ff;
}

.forecast-chart {
  width: 100%;
  height: auto;
  overflow: visible;
}

.chart-grid line {
  stroke: #e5ecf8;
  stroke-dasharray: 4 4;
}

.curve {
  fill: none;
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.curve.max {
  stroke: url(#maxLine);
}

.curve.min {
  stroke: url(#minLine);
}

.point {
  stroke: #ffffff;
  stroke-width: 2;
}

.point.max {
  fill: #2563eb;
}

.point.min {
  fill: #0f766e;
}

.point-label {
  fill: #475467;
  font-size: 11px;
  font-weight: 700;
}

.forecast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  margin-top: 16px;
}

@media (max-width: 640px) {
  .forecast-section {
    padding: 16px;
  }

  .forecast-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .forecast-grid {
    grid-template-columns: 1fr;
  }
}
</style>
