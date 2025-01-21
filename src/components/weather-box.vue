<template>
  <div v-if="weatherData" class="pa-4 d-flex flex-column ga-4">

    <div class="d-flex align-center justify-start" >
        <p class="fs-20" >{{ weatherData?.main.temp }}°</p>
      <img class="d-flex mr-n5" v-if="weatherICon" :src="weatherICon" alt="" />
     
    </div>
    <p>
      {{
        weatherData.weather[0].description
      }}
    </p>
<div class="d-flex align-center ga-3" >

    <p class="d-flex align-center ga-1 fs-12"  >
       <span>{{ weatherData?.main.temp_min }}°</span> حداقل
    </p>
    
    <p class="d-flex align-center ga-1" >
        <span>{{ weatherData?.main.temp_max }}°</span> حداکثر
    </p>
</div>
    <p>humidity: {{ weatherData?.main.humidity }}</p>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { apiService } from "../core/services/axios.interseptor";
const cityName = ref("ahvaz");
const weatherData = ref<any>();
const weatherICon = ref();
const getWeatherData = async () => {
  weatherData.value = (await apiService.weatherDataByCity({
    cityName: cityName.value,
  })) as any;
  weatherData.value = weatherData.value?.data;
  //  dateElem.innerHTML=`${days[date.getDay()]} ${date.getDay()} ${months[date.getMonth()]} ${date.getFullYear()}`
  //  citynameElem.innerHTML=`${data.name},${data.sys.country}`
  //  cityweather.innerHTML=`${data.weather[0].main}`
  //  feeltemp.innerHTML=`${data.main.feels_like}`
  //  citytemp.innerHTML=`${data.main.temp}°c`
  //  cityhiLow.innerHTML=`${Math.round(data.main.temp_max)}°c/${Math.round(data.main.temp_min)}°c`
  //  cityInputElem.value=""

// const url = `./../assets/images/svgs/weather/${weatherData.value.weather[0].icon}.svg`
const url = `./../assets/images/svgs/weather/02n.svg`
  weatherICon.value = new URL(url, import.meta.url).href;
};
getWeatherData();


</script>
<style></style>
