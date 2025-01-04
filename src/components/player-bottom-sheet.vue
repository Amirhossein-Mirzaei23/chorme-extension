<template>
  <v-bottom-sheet v-model="isOpen" inset>
    <audio ref="audioPlayerRef" :src="audioDetail.audio"></audio>
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
            >{{ audioDetail.name }} - 90:
            {{ musicProgress }}</v-list-item-subtitle
          >

          <template v-slot:append>
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
          </template>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-bottom-sheet>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

const isOpen = ref(true);
const props = defineProps(["audioDetail"]);
const emits = defineEmits(["next", "previos"]);
const musicProgress = ref(0);
const isPlayed = ref<boolean>(false);
const audioPlayerRef = ref<HTMLAudioElement>();

const nextMusic = (): void => {
  emits("next");
  console.log("next music");
  audioPlayerRef.value.load();
  setTimeout(() => {
    playMusic();
  }, 1000);
};
const previousMusic = (): void => {
  emits("previos");
  console.log("previous music");
  audioPlayerRef.value.load();
  playMusic();
};
const playMusic = (): void => {
  console.log("played");

  audioPlayerRef.value
    .play()
    .then((e) => {
      console.log("then");
      // console.log(e);
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

setInterval(() => {
  musicProgress.value =
    (audioPlayerRef.value?.currentTime / audioPlayerRef.value?.duration) * 100;
}, 500);
const updateCurrentTime = (time: number) => {
  audioPlayerRef.value.currentTime =
    audioPlayerRef.value.duration * (time / 100);
};
// 1e47cd34
// Function to fetch popular tracks

//https://api.jamendo.com/v3.0/oauth/authorize
</script>
<style lang="scss" scoped></style>
