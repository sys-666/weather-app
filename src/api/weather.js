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
      timezone: 'auto'
    }
  })

  const current = weatherResponse.data.current

  return {
    city: city.admin1 ? `${city.name}, ${city.admin1}` : city.name,
    weather: getWeatherText(current.weather_code),
    temperature: current.temperature_2m,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m
  }
}
