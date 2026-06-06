import axios from 'axios'

const GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast'

const weatherTextMap = {
  0: '晴朗',
  1: '大部分晴朗',
  2: '局部多云',
  3: '阴天',
  45: '雾',
  48: '雾凇',
  51: '小毛毛雨',
  53: '中等毛毛雨',
  55: '大毛毛雨',
  61: '小雨',
  63: '中雨',
  65: '大雨',
  71: '小雪',
  73: '中雪',
  75: '大雪',
  80: '小阵雨',
  81: '中等阵雨',
  82: '强阵雨',
  95: '雷暴'
}

function getWeatherText(code) {
  return weatherTextMap[code] || '未知天气'
}

function getWeatherType(code) {
  if ([0, 1].includes(code)) return 'sunny'
  if ([2, 3, 45, 48].includes(code)) return 'cloudy'
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'rain'
  if ([71, 73, 75].includes(code)) return 'snow'
  if (code === 95) return 'storm'

  return 'cloudy'
}

function formatForecastDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`)
  const today = new Date()
  const isToday = date.toDateString() === today.toDateString()

  if (isToday) {
    return '今天'
  }

  return date.toLocaleDateString('zh-CN', {
    weekday: 'short'
  })
}

// 先通过城市名称获取经纬度，再查询当前天气。
export async function getCurrentWeather(cityName) {
  const geoResponse = await axios.get(GEO_API_URL, {
    params: {
      name: cityName,
      count: 1,
      language: 'zh',
      format: 'json'
    }
  })

  const city = geoResponse.data.results?.[0]

  if (!city) {
    throw new Error('未找到该城市，请检查城市名称')
  }

  const weatherResponse = await axios.get(WEATHER_API_URL, {
    params: {
      latitude: city.latitude,
      longitude: city.longitude,
      current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min',
      forecast_days: 7,
      timezone: 'auto'
    }
  })

  const current = weatherResponse.data.current
  const daily = weatherResponse.data.daily || {}

  return {
    city: city.admin1 ? `${city.name}, ${city.admin1}` : city.name,
    weather: getWeatherText(current.weather_code),
    weatherCode: current.weather_code,
    iconType: getWeatherType(current.weather_code),
    temperature: current.temperature_2m,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    forecast: (daily.time || []).slice(0, 7).map((date, index) => ({
      date,
      label: formatForecastDate(date),
      dayLabel: formatForecastDate(date),
      weather: getWeatherText(daily.weather_code[index]),
      iconType: getWeatherType(daily.weather_code[index]),
      maxTemp: daily.temperature_2m_max[index],
      minTemp: daily.temperature_2m_min[index]
    }))
  }
}
