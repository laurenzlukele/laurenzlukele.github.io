<script setup lang="ts">
definePageMeta({
  layout: "closeup",
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
  { title: "Title Music", file: "track01.mp3", duration: "4:05" },
  { title: "The Discovery", file: "track02.mp3", duration: "1:36" },
  { title: "Running Away", file: "track03.mp3", duration: "2:12" },
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
              class="shrink-0 relative w-48 h-48 landscape:w-32 landscape:h-32 lg:w-56 lg:h-56 shadow-2xl rounded-full border-4 border-white/10 flex items-center justify-center"
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
                class="absolute w-16 h-16 landscape:w-10 landscape:h-10 bg-red-600 rounded-full border-4 border-black z-10"
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
