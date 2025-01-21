<template>
  <v-bottom-sheet :persistent="true" v-model="isOpen" inset>
    <audio ref="audioPlayerRef" :src="audioSource"></audio>
    <v-sheet>
      <v-progress-linear
        :clickable="true"
        @update:modelValue="updateCurrentTime"
        :model-value="musicProgress"
      ></v-progress-linear>
      <v-list>
        <v-list-item>
          <v-list-item-title></v-list-item-title>

          <v-list-item-subtitle
            >{{ audioName }} -
            {{ Math.floor(audioPlayerRef?.currentTime) }}</v-list-item-subtitle
          >

          <template v-slot:append>
            <div class="volume-container" >
              <v-icon size="xs" v-if="soundVolume > 70" >mdi-volume-high</v-icon>
              <v-icon size="xs" v-else-if="soundVolume > 30" >mdi-volume-medium</v-icon>
              <v-icon size="xs" v-else >mdi-volume-low</v-icon>    
              <v-progress-linear
                :clickable="true"
                @update:modelValue="updateSoundVolume"
                :model-value="soundVolume"
              ></v-progress-linear>
            </div>
            <v-btn @click="previousMusic" variant="text">
              <v-icon>mdi-rewind</v-icon>
            </v-btn>

            <v-btn @click="playPauseMusic" variant="text">
              <v-icon v-if="isPlayed">mdi-pause</v-icon>
              <v-icon v-else>mdi-play</v-icon>
            </v-btn>

            <v-btn @click="nextMusic" class="ms-0" variant="text">
              <v-icon>mdi-fast-forward</v-icon>
            </v-btn>

            <v-btn @click="openList" class="ms-0" variant="text">
              <v-icon v-if="!openListHandler">mdi-chevron-double-up</v-icon>
              <v-icon v-else>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      </v-list>

      <v-list
        v-if="openListHandler"
        class="d-flex flex-column align-center h-500px"
      >
        <v-list-item
          v-for="(item, index) in audioList"
          :key="index"
          class="w-100 cursor-pointer"
        >
          <v-btn
            @click="selectSong(item)"
            variant="text"
            class="d-flex justify-space-between align-center w-100 rounded-lg"
          >
            <div class="w-100 d-flex justify-space-between align-center">
              <div
                class="w-100 d-flex flex-column justify-space-between align-start"
              >
                <span>{{ item.name }}</span>
                <span class="fs-6">{{ item.artist_name }}</span>
              </div>
              <div>{{ duration(item.duration) }}</div>
            </div>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-bottom-sheet>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { duration } from "./../combosable/duration";
import { apiService } from "../core/services/axios.interseptor";

const isOpen = ref(true);

const audioList = ref<any>([]);
const soundVolume = ref<number>(100);

const audioDetail = ref({
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
  audiodownload: "https://prod-1.storage.jamendo.com/download/track/168/mp32/",
  prourl: "",
  shorturl: "https://jamen.do/t/168",
  shareurl: "https://www.jamendo.com/track/168",
  audiodownload_allowed: true,
  image:
    "https://usercontent.jamendo.com?type=album&id=24&width=300&trackid=168",
});
const audioSource = ref(audioDetail.value.audio);
const audioName = ref<string>();
const isPlayed = ref<boolean>(false);
const audioPlayerRef = ref<HTMLAudioElement>();
const openListHandler = ref<boolean>(false);
const musicProgress = ref<number>();
const index = ref<number>(0);
audioName.value = audioDetail.value.name;
const openList = (): void => {
  openListHandler.value = !openListHandler.value;
};

const loadAudioSource = (src: string) => {
  audioSource.value = src;
  audioPlayerRef.value?.load();
  setTimeout(() => {
    playMusic();
  }, 500);
};
const loadAudioName = (name: string): void => {
  audioName.value = name;
};

const nextMusic = (): void => {
  if (audioList.value.length - 1 <= index.value) {
    index.value = 0;
  } else {
    index.value++;
  }
  loadAudioSource(audioList.value[index.value].audio);
  loadAudioName(audioList.value[index.value].name);
};
const previousMusic = (): void => {
  if (index.value == 0) {
    index.value = audioList.value.length - 1;
  } else {
    index.value--;
  }
  loadAudioSource(audioList.value[index.value].audio);
  loadAudioName(audioList.value[index.value].name);
};
const playMusic = (): void => {
  audioPlayerRef.value
    ?.play()
    .then((e) => {
      isPlayed.value = true;
    })
    .catch((e) => {
      console.log("catch");
      console.log(e);
    });
  console.log("playSong music");
};
const pauseMusic = (): void => {
  const audio = audioPlayerRef.value as any;
  audio.pause();

  isPlayed.value = false;
  console.log("pauseSong music");
};

const playPauseMusic = () => {
  if (isPlayed.value) {
    pauseMusic();
  } else {
    playMusic();
  }
};

const updateCurrentTime = (time: number): void => {
  console.log(time,  audioPlayerRef.value.duration * (time / 100));
  musicProgress.value = time
  audioPlayerRef.value.currentTime =
    audioPlayerRef.value.duration * (time / 100);
};

const updateSoundVolume = (newVolume: number): void => {
  console.log(newVolume);
  audioPlayerRef.value.volume = newVolume/100
  soundVolume.value = newVolume;
};

const selectSong = (item: any): void => {
  loadAudioSource(item.audio);
  loadAudioName(item.name);
};

const fetchPopularTracks = async (): Promise<any> => {
  const JAMENDO_CLIENT_ID = import.meta.env.VITE_JAMENDO_AUTHORIZATION_KEY;
  try {
    const tracksListPayload = {
      client_id: JAMENDO_CLIENT_ID,
      order: "popularity_total",
      limit: 20,
    } as any;

    const tracksList = (await apiService.PopularTracks(
      tracksListPayload
    )) as any;
    console.log(tracksList);

    audioList.value = tracksList.data.results;
  } catch (error: any) {
    console.error("Error fetching tracks:", error.message);
  }
};
fetchPopularTracks();

</script>
<style lang="scss" scoped>
:deep(.v-btn__content) {
  width: 100% !important;
}
.fs-6 {
  font-size: 11px;
}
.h-500px {
  height: 500px;
  overflow-y: scroll;
}
.volume-container {
  width: 70px;
  display: flex;
  align-items: center;
  gap: 3px;

}
</style>
