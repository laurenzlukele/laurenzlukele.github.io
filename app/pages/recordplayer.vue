<script setup lang="ts">
definePageMeta({
  layout: "closeup",
});

const config = useAppConfig();
const roomName = "Official Soundtrack";

useSeoMeta({
  title: roomName,
  ogTitle: `${roomName} | ${config.siteName}`,
});

type Track = {
  title: string;
  file: string;
  duration: string; // manual string for UI (e.g., "3:45")
};

const isLidOpen = ref(false);
const isAudioPlayerOpen = ref(false);
const isAudioPlaying = ref(false);

const playlist: Track[] = [
  { title: "Up to Fate", file: "up-to-fate.mp3", duration: "1:21" },
  {
    title: "Who is this Hako?",
    file: "who-is-this-hako.mp3",
    duration: "1:26",
  },
  { title: "Helenes Theme", file: "helenes-theme.mp3", duration: "5:36" },
  { title: "The Gift", file: "the-gift.mp3", duration: "2:05" },
  { title: "Shiny Road", file: "shiny-road.mp3", duration: "5:42" },
  { title: "Wet Spot", file: "wet-spot.mp3", duration: "4:53" },
  {
    title: "A Rush of Happiness",
    file: "a-rush-of-happiness.mp3",
    duration: "2:00",
  },
  { title: "Walk of Shame", file: "walk-of-shame.mp3", duration: "1:34" },
  {
    title: "Blue isn't the only Color",
    file: "blue-isnt-the-only-color.mp3",
    duration: "3:31",
  },
  { title: "Humanity", file: "humanity.mp3", duration: "2:50" },
  { title: "Apfelstrudel", file: "apfelstrudel.mp3", duration: "3:00" },
  {
    title: "Up to Fate (reprise)",
    file: "up-to-fate-reprise.mp3",
    duration: "2:18",
  },
  {
    title: "Trip to the bottom of the Ocean",
    file: "trip-to-the-bottom-of-the-ocean.mp3",
    duration: "2:42",
  },
  { title: "The Escape", file: "the-escape.mp3", duration: "3:37" },
  { title: "Goodbye Song", file: "goodbye-song.mp3", duration: "3:34" },
];

const currentIndex = ref(0);
const audioPlayer = ref<HTMLAudioElement | null>(null);

const currentTrack = computed(() => {
  return playlist[currentIndex.value];
});
const currentSrc = computed(() =>
  currentTrack.value ? `/audio/${currentTrack.value.file}` : "",
);
const hasNext = computed(() => currentIndex.value < playlist.length - 1);
const hasPrev = computed(() => currentIndex.value > 0);

const isAudioLoading = ref(false);

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

const openAudioPlayer = () => {
  currentIndex.value = 0;

  isLidOpen.value = true;

  setTimeout(() => {
    isAudioPlayerOpen.value = true;
    nextTick(() => {
      isAudioPlaying.value = true;
    });
  }, 500);
};

watch(isAudioPlayerOpen, (isOpen) => {
  if (!isOpen) {
    if (audioPlayer.value) {
      audioPlayer.value.pause();
      isAudioPlaying.value = false;
    }

    setTimeout(() => {
      isLidOpen.value = false;
    }, 500);
  }
});

const hotspots = computed(() => [
  {
    id: 1,
    x: 46,
    y: 60,
    label: $t("tooltip.play"),
    // Hide hotspot if lid is already open to prevent double clicking during transition
    visible: () => !isLidOpen.value,
    action: () => openAudioPlayer(),
  },
]);
</script>

<template>
  <div class="viewport">
    <div class="scene-container">
      <NuxtImg
        :src="
          isLidOpen
            ? '/images/recordplayer-open.webp'
            : '/images/recordplayer-closed.webp'
        "
        alt="Record player closeup"
        class="scene-image"
        preload
      />

      <!-- ghost image for nuxt crawler (only necessary for SSG)  -->
      <div style="display: none" aria-hidden="true">
        <NuxtImg src="/images/recordplayer-open.webp" />
      </div>

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

    <UModal
      v-model:open="isAudioPlayerOpen"
      :ui="{ content: 'max-w-4xl', overlay: 'backdrop-blur-md' }"
      title="Tracklist"
    >
      <template #content>
        <div
          class="flex flex-col landscape:flex-row md:flex-row h-[85vh] md:h-125 overflow-hidden bg-gray-900 text-white"
        >
          <div
            class="w-full landscape:w-5/12 md:w-5/12 bg-linear-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-4 landscape:p-2 lg:p-8 relative shrink-0"
          >
            <div
              class="shrink-0 relative w-48 h-48 landscape:w-50 landscape:h-50 landscape:lg:w-56 landscape:lg:h-56 shadow-2xl rounded-full border-4 border-white/10 flex items-center justify-center"
            >
              <div
                class="w-full h-full rounded-full overflow-hidden bg-black"
                :class="{ 'animate-spin-slow': isAudioPlaying }"
              >
                <div
                  class="w-full h-full bg-[url('/images/album.webp')] bg-cover opacity-80"
                ></div>
              </div>
              <div
                class="absolute w-16 h-16 landscape:w-8 landscape:h-8 bg-neutral-800 rounded-full border-4 border-black z-10"
              ></div>
            </div>

            <div class="mt-5 landscape:mt-2 lg:mt-8 text-center">
              <h2 class="text-2xl landscape:text-lg font-bold tracking-tight">
                Tethered
              </h2>
              <p class="text-white/60 text-sm mt-1 uppercase tracking-widest">
                {{ $t("player.original-soundtrack") }}
              </p>
            </div>
          </div>

          <div
            class="w-full landscape:w-7/12 md:w-7/12 bg-gray-950 flex flex-col min-h-0"
          >
            <div class="hidden lg:block p-6 border-b border-white/10">
              <h3 class="text-lg font-medium text-white/90">
                {{ $t("player.tracklist") }}
              </h3>
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
                    class="truncate"
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

            <div class="p-6 landscape:p-3 bg-gray-900 border-t border-white/10">
              <div class="mb-4 landscape:mb-2 text-center">
                <div class="text-sm font-bold text-white">
                  {{ currentTrack?.title }}
                </div>
              </div>
              <div class="flex items-center justify-center gap-6">
                <audio
                  ref="audioPlayer"
                  :src="currentSrc"
                  autoplay
                  preload="auto"
                  @loadstart="isAudioLoading = true"
                  @canplay="isAudioLoading = false"
                  @playing="isAudioLoading = false"
                  @waiting="isAudioLoading = true"
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
                  :disabled="isAudioLoading"
                  @click="togglePlay"
                >
                  <UIcon
                    v-if="isAudioLoading"
                    name="i-heroicons-arrow-path-20-solid"
                    class="size-5 animate-spin"
                  />
                  <UIcon
                    v-else-if="isAudioPlaying"
                    name="i-heroicons-pause-20-solid"
                    class="size-5"
                  />
                  <UIcon
                    v-else
                    name="i-heroicons-play-20-solid"
                    class="size-5"
                  />
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
