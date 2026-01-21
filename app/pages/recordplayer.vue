<script setup lang="ts">
type Track = {
  title: string;
  file: string;
  duration: string; // manual string for UI (e.g., "3:45")
};

const isLidOpen = ref(false); 
const isAudioPlayerOpen = ref(false); 
const isAudioPlaying = ref(false);

const playlist = ref<Track[]>([]);
const currentIndex = ref(0);
const audioPlayer = ref<HTMLAudioElement | null>(null);

const currentTrack = computed(() => playlist.value[currentIndex.value]);
const currentSrc = computed(() =>
  currentTrack.value ? `/audio/${currentTrack.value.file}` : "",
);
const hasNext = computed(() => currentIndex.value < playlist.value.length - 1);
const hasPrev = computed(() => currentIndex.value > 0);

const togglePlay = () => {
  if (!audioPlayer.value) return;
  if (audioPlayer.value.paused) {
    audioPlayer.value.play().catch((e) => console.error(e));
    isAudioPlaying.value = true;
  } else {
    audioPlayer.value.pause();
    isAudioPlaying.value = false;
  }
};

const playTrackAtIndex = (index: number) => {
  currentIndex.value = index;
  isAudioPlaying.value = true;
};

const nextTrack = () => {
  if (hasNext.value) {
    currentIndex.value++;
    isAudioPlaying.value = true;
  } else {
    isAudioPlaying.value = false;
  }
};

const prevTrack = () => {
  if (hasPrev.value) {
    currentIndex.value--;
    isAudioPlaying.value = true;
  }
};

const openAudioPlayer = (tracks: Track[]) => {
  playlist.value = tracks;
  currentIndex.value = 0;
  
  isLidOpen.value = true;

  // 0.8s delay before audio player opens
  setTimeout(() => {
    isAudioPlayerOpen.value = true;
    nextTick(() => {
      isAudioPlaying.value = true;
    });
  }, 500);
};

// Watch for UI closing to reset the Scene
watch(isAudioPlayerOpen, (isOpen) => {
  if (!isOpen) {
    if (audioPlayer.value) {
      audioPlayer.value.pause();
      isAudioPlaying.value = false;
    }

    setTimeout(() => {
      isLidOpen.value = false;
    }, 300);
  }
});

const hotspots = [
  {
    id: 1,
    x: 46,
    y: 60,
    label: "Open record player",
    // Hide hotspot if lid is already open to prevent double clicking during transition
    visible: () => !isLidOpen.value, 
    action: () =>
      openAudioPlayer([
        { title: "Title Music", file: "track01.mp3", duration: "4:05" },
        { title: "The Discovery", file: "track02.mp3", duration: "1:36" },
        { title: "Running Away", file: "track03.mp3", duration: "2:12" },
      ]),
  },
];

const rooms = [{ name: "Bedroom", path: "/bedroom" }];
</script>

<template>
  <div class="viewport">
    <div class="scene-container">
      <NuxtImg
        :src="isLidOpen ? '/images/recordplayer-open.jpg' : '/images/recordplayer-closed.jpg'"
        alt="Record player closeup"
        class="scene-image"
        preload 
      />

      <template v-for="spot in hotspots" :key="spot.id">
        <button
          v-if="spot.visible ? spot.visible() : true"
          class="hotspot"
          :style="{ left: `${spot.x}%`, top: `${spot.y}%` }"
          :aria-label="spot.label"
          @click="spot.action"
        >
          <span class="hotspot-ring"></span>
          <span class="hotspot-dot"></span>
          <span class="hotspot-label">{{ spot.label }}</span>
        </button>
      </template>
    </div>

    <RoomNavigation :rooms="rooms"></RoomNavigation>

    <UModal
      v-model:open="isAudioPlayerOpen"
      :ui="{ content: 'sm:max-w-4xl' }"
      title="Now Playing"
    >
      <template #content>
        <div
          class="flex flex-col md:flex-row h-125 overflow-hidden bg-gray-900 text-white"
        >
          <div
            class="w-full md:w-5/12 bg-linear-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-8 relative"
          >
            <div
              class="relative w-48 h-48 md:w-56 md:h-56 shadow-2xl rounded-full border-4 border-white/10 flex items-center justify-center"
            >
              <div
                class="w-full h-full rounded-full overflow-hidden bg-black"
                :class="{ 'animate-spin-slow': isAudioPlaying }"
              >
                <div
                  class="w-full h-full bg-[url('https://placehold.co/400')] bg-cover opacity-80"
                ></div>
              </div>
              <div
                class="absolute w-16 h-16 bg-red-600 rounded-full border-4 border-black z-10"
              ></div>
            </div>
            <div class="mt-8 text-center">
              <h2 class="text-2xl font-bold tracking-tight">Tethered</h2>
              <p class="text-white/60 text-sm mt-1 uppercase tracking-widest">
                Original Soundtrack
              </p>
            </div>
          </div>
          <div class="w-full md:w-7/12 bg-gray-950 flex flex-col">
            <div class="p-6 border-b border-white/10">
              <h3 class="text-lg font-medium text-white/90">Tracklist</h3>
            </div>
            <div class="flex-1 overflow-y-auto p-2 space-y-1">
              <button
                v-for="(track, index) in playlist"
                :key="index"
                class="w-full flex items-center justify-between p-3 rounded-md transition-colors group text-left"
                :class="
                  currentIndex === index ? 'bg-white/10' : 'hover:bg-white/5'
                "
                @click="playTrackAtIndex(index)"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="w-6 text-center text-sm font-medium text-white/50"
                  >
                    <UIcon
                      v-if="currentIndex === index && isAudioPlaying"
                      name="i-heroicons-musical-note-20-solid"
                      class="text-primary-400 animate-pulse"
                    />
                    <span v-else>{{ index + 1 }}</span>
                  </div>
                  <div
                    :class="
                      currentIndex === index
                        ? 'text-primary-400 font-bold'
                        : 'text-white/90'
                    "
                  >
                    {{ track.title }}
                  </div>
                </div>
                <div class="text-xs text-white/40 font-mono">
                  {{ track.duration }}
                </div>
              </button>
            </div>
             <div class="p-6 bg-gray-900 border-t border-white/10">
              <div class="mb-4 text-center">
                <div class="text-sm font-bold text-white">
                  {{ currentTrack?.title }}
                </div>
              </div>
              <div class="flex items-center justify-center gap-6">
                <audio
                  ref="audioPlayer"
                  :src="currentSrc"
                  autoplay
                  @ended="nextTrack"
                  @play="isAudioPlaying = true"
                  @pause="isAudioPlaying = false"
                ></audio>
                <UButton
                  icon="i-heroicons-backward-20-solid"
                  variant="ghost"
                  color="neutral"
                  :disabled="!hasPrev"
                  @click="prevTrack"
                />
                <UButton
                  size="xl"
                  color="primary"
                  variant="solid"
                  class="rounded-full w-14 h-14 flex items-center justify-center shadow-lg shadow-primary-500/20"
                  @click="togglePlay"
                >
                  <UIcon
                    v-if="isAudioPlaying"
                    name="i-heroicons-pause-20-solid"
                    class="size-5"
                  />
                  <UIcon
                    v-else
                    name="i-heroicons-play-20-solid"
                    class="size-5"
                  ></UIcon>
                </UButton>
                <UButton
                  icon="i-heroicons-forward-20-solid"
                  variant="ghost"
                  color="neutral"
                  :disabled="!hasNext"
                  @click="nextTrack"
                />
              </div>
            </div>
                </div>
          </div>
       </template>
    </UModal>
  </div>
</template>