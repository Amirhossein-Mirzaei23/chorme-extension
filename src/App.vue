<script setup lang="ts">
import { ref } from "vue";
import playBottomSheet from "./components/player-bottom-sheet.vue";
import { apiService } from "./core/services/axios.interseptor";
import axios from "axios";


const songsData = ref([
  {
    id: "168",
    name: "J'm'e FPM",
    duration: 183,
    artist_id: "7",
    artist_name: "TriFace",
    artist_idstr: "triface",
    album_name: "Premiers Jets",
    album_id: "24",
    license_ccurl: "",
    position: 1,
    releasedate: "2004-12-17",
    album_image:
      "https://usercontent.jamendo.com?type=album&id=24&width=300&trackid=168",
    audio:
      "https://prod-1.storage.jamendo.com/?trackid=168&format=mp31&from=bXAHLdh8tMNeLhNdcxuMhQ%3D%3D%7CjCbp9p6D2rWxFZ5rvd9bFQ%3D%3D",
    audiodownload:
      "https://prod-1.storage.jamendo.com/download/track/168/mp32/",
    prourl: "",
    shorturl: "https://jamen.do/t/168",
    shareurl: "https://www.jamendo.com/track/168",
    audiodownload_allowed: true,
    image:
      "https://usercontent.jamendo.com?type=album&id=24&width=300&trackid=168",
  },
]);

const nextMusic = (): void => {
  if (songsData.value.length - 1 <= index.value) {
    index.value = 0;
  } else {
    index.value++;
  }
};
const previosMusic = (): void => {
  if (index.value == 0) {
    index.value = songsData.value.length - 1;
  } else {
    index.value--;
  }
};


const playerSourceData = ref([{
  callmeback: "",
  dispname: "Rock Radio",
  id: 3,
  image: "https://images.jamendo.com/new_jamendo_radios/rock150.jpg",
  name: "rock",
  playingnow: {
    track_id: 0, artist_id: 0, album_id: 0, album_name: "", track_name: "", track_image: "", artist_name
      :
      ""
  },
  album_id: 0,
  album_name: "",
  artist_id: 0,
  artist_name: "", track_id: 0,
  track_image: "",
  track_name: "", stream: "https://streaming.jamendo.com/JamRock",
  type: "www"
}])
//search?query=people
const PIXEL_BASE_USRL = "https://api.pexels.com/v1/";
const PixelAuthorizationKey =
  "m8a0nH7SrLkCt4KZpbKDyoIwehb2OHKjHx1JlXWt4JLR0SFfID4uDVSN";

const JAMENDO_BASE_URL = "https://api.jamendo.com/v3.0";
const JAMENDO_CLIENT_ID = import.meta.env.VITE_JAMENDO_AUTHORIZATION_KEY;



const fetchPopularTracks = async (): Promise<any> => {
  try {
    const tracksListPayload = {
      client_id: JAMENDO_CLIENT_ID, // App key for authentication
      order: "popularity_total",
      limit: 10,
    } as any

    const tracksList = await apiService.PopularTracks(tracksListPayload) as any
    console.log(tracksList);

    songsData.value = tracksList.data.results;
  } catch (error: any) {
    console.error("Error fetching tracks:", error.message);
  }
}
fetchPopularTracks();
const fetchRadioStream = async (category: string): Promise<any> => {

  const radiStreamsPayload = {
    client_id: JAMENDO_CLIENT_ID, // App key for authentication
    name: category,
    limit: 10, // Number of tracks to fetch
  }

  try {
    const radioStreamsList = await apiService.radioStreams(radiStreamsPayload)
    playerSourceData.value = radioStreamsList.data.results;
  } catch (error) {
    console.log(error);
  }
}
fetchRadioStream('pop')

const fetchBackGroundImage = async (): Promise<any> => {
  try {
    const payload = {
      query: 'people',
      headers: { Authorization: PixelAuthorizationKey },
      params: { limit: 10 }
    }

    const backGroundImages = await apiService.backgroundImages(payload)
    console.log(backGroundImages);

  } catch (error: any) {
    console.log(error);
  }
};
fetchBackGroundImage();

const index = ref<number>(0);






// async function fetchPopularTracks() {
//   try {
// const response = await axios.get(`${JAMENDO_BASE_URL}/tracks`, {
//   params: {
//     client_id: import.meta.env.JAMENDO_Authorization_Key, // App key for authentication
//     order: "popularity_total",
//     // redirect_uri: 'http://192.168.93.135:5173/'
//     // format: 'json',       // Response format
//     limit: 10, // Number of tracks to fetch
//   },
// });



//     fetchPopularTracks();
// const fetchRadioStream = async (category: string): Promise<any> => {
//   const radiStreamsPayload = {
//         client_id: JAMENDO_CLIENT_ID, // App key for authentication
//         name: category,
//         limit: 10, // Number of tracks to fetch
//       }
//   try {
//     const response = await axios.get(`${JAMENDO_BASE_URL}/radios/stream`, {
//       params: {
//         client_id: JAMENDO_CLIENT_ID, // App key for authentication
//         name: category,
//         limit: 10, // Number of tracks to fetch
//       },
//     })








// const response = await axios.get(`${PIXEL_BASE_USRL}/search?query=people` ,{
//       headers: {
//         Authorization: PixelAuthorizationKey,
//       },
//       params: {
//         // App key for authentication
//         // redirect_uri: 'http://192.168.93.135:5173/'
//         // format: 'json',       // Response format
//         limit: 10, // Number of tracks to fetch
//       },
//     });

</script>

<template>
  <div>
    <playBottomSheet @next="nextMusic" @previos="previosMusic" :audioDetail="songsData[index]"></playBottomSheet>
  </div>
</template>

<style scoped></style>
