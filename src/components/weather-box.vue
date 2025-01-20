<template>
    <div class="pa-4 d-flex flex-column ga-4" >
        <p>
            icon:{{ weatherData.weather[0].icon }} - description:{{ weatherData.weather[0].description }}
        </p>
<p>
    temp: {{ weatherData?.main.temp }}
</p>
<p>
   min: {{ weatherData?.main.temp_min }} max: {{ weatherData?.main.temp_max }}
</p>
<p>
    humidity: {{ weatherData?.main.humidity }}
</p>
    </div>
</template>
<script setup lang="ts" >
import { ref } from 'vue';
import { apiService } from '../core/services/axios.interseptor';
const cityName = ref('tehran')
const weatherData = ref<any>()
const getWeatherData = async ()=>{
    weatherData.value  = await apiService.weatherDataByCity(
        {cityName:cityName.value}
    ) as any;
    weatherData.value =  weatherData.value?.data
      //  dateElem.innerHTML=`${days[date.getDay()]} ${date.getDay()} ${months[date.getMonth()]} ${date.getFullYear()}`
      //  citynameElem.innerHTML=`${data.name},${data.sys.country}`
      //  cityweather.innerHTML=`${data.weather[0].main}`
      //  feeltemp.innerHTML=`${data.main.feels_like}`
      //  citytemp.innerHTML=`${data.main.temp}°c`
      //  cityhiLow.innerHTML=`${Math.round(data.main.temp_max)}°c/${Math.round(data.main.temp_min)}°c`
      //  cityInputElem.value=""

    console.log('weatherData:',weatherData);
}
getWeatherData()


</script>
<style>
</style>