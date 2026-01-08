<script setup lang="ts">
type Track = {
  title: string;
  file: string;
  duration: string; // manual string for UI (e.g., "3:45")
};

type CastMember = {
  name: string;
  role: string; // character name
  occupation: string; // e.g. "Actress", "Stunt Double"
  image: string;
  socials: {
    instagram?: string;
    twitter?: string;
    imdb?: string;
    web?: string;
  };
};

const isAudioPlayerOpen = ref(false);
const isAudioPlaying = ref(false);
const playlist = ref<Track[]>([]);
const currentIndex = ref(0);
const audioPlayer = ref<HTMLAudioElement | null>(null);

const isVideoPlayerOpen = ref(false);
const currentYoutubeId = ref("");

const isCastOpen = ref(false);

const castList = ref<CastMember[]>([
  {
    name: "新川千華 (Shinkawa Chiharu)",
    role: "Role 1",
    occupation:
      "俳優、モーションキャプチャ、国内外の企業CM、クラシックバレ (Actress, motioncapture artist, international business, classical Ballet)",
    image: "/images/cast/shinkawa-chiharu.jpeg",
    socials: {
      web: "https://chiharushinkawa.wixsite.com/minichiiharu",
    },
  },
  {
    name: "真田 煌生 (Sanada  Kōki)",
    role: "Role 2",
    occupation: "書道が得意なアーティストです (Künstler/Kaligraphist)",
    image: "/images/cast/sanada-koki.jpeg",
    socials: {
      instagram: "https://www.instagram.com/ko__oo__ki/",
    },
  },
  {
    name: "愛恵 (MANAE)",
    role: "Role 3",
    occupation: "舞台と映画の二刀流俳優 (theater and film actress)",
    image: "/images/cast/manae.jpeg",
    socials: {
      instagram: "https://www.instagram.com/ma_na_e1/",
      web: "https://lit.link/manae212",
    },
  },
  {
    name: "根本もえり (Nemoto Moeri)",
    role: "Role 4",
    occupation: "俳優,マルチタレント (Actress, Multitalent)",
    image: "/images/cast/nemoto-moeri.jpeg",
    socials: {
      instagram: "https://www.instagram.com/_moeri_n__/",
      web: "https//lit.link/moeri_nemoto",
    },
  },
  {
    name: "中野 響 (Nakano Hibiki)",
    role: "Role 5",
    occupation: "役者,アーティスト (Actress, Artist)",
    image: "/images/cast/nakano-hibiki.jpeg",
    socials: { instagram: "https://www.instagram.com/hibiki_n185/", imdb: "#" },
  },
  {
    name: "お名前 (Yamane Aya)",
    role: "Role 6",
    occupation: "映像、舞台を中心に活動中 (Working in film and theater)",
    image: "/images/cast/yamane-aya.jpeg",
    socials: {
      instagram: "https://www.instagram.com/aya_yamane/",
      web: "https://lit.link/ayayamane",
    },
  },
  {
    name: "遠藤幸介 (Endō Kōsuke)",
    role: "Role 7",
    occupation: "舞台 (Theater actor)",
    image: "/images/cast/endo-kosuke.jpeg",
    socials: { web: "https://a-and-h-promotion.com/artists/Kousuke_Endo/" },
  },
]);

const currentTrack = computed(() => playlist.value[currentIndex.value]);
const currentSrc = computed(() =>
  currentTrack.value ? `/audio/${currentTrack.value.file}` : "",
);
const hasNext = computed(() => currentIndex.value < playlist.value.length - 1);
const hasPrev = computed(() => currentIndex.value > 0);

const openAudioPlayer = (tracks: Track[]) => {
  playlist.value = tracks;
  currentIndex.value = 0;
  isAudioPlayerOpen.value = true;
  nextTick(() => {
    isAudioPlaying.value = true;
  });
};

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

watch(isAudioPlayerOpen, (isOpen) => {
  if (!isOpen && audioPlayer.value) {
    audioPlayer.value.pause();
    isAudioPlaying.value = false;
  }
});

const openVideoPlayer = (youtubeId: string) => {
  currentYoutubeId.value = youtubeId;
  isVideoPlayerOpen.value = true;
};

const openCastGallery = () => {
  isCastOpen.value = true;
};

const rooms = [
  { name: "Entrance", path: "/" },
  { name: "Kitchen", path: "/kitchen" },
];

// Define point-and-click hotspots
// Coordinates (x, y) are percentages relative to the IMAGE, not the screen
const hotspots = [
  {
    id: 1,
    x: 26,
    y: 53,
    label: "Listen to the score",
    action: () =>
      openAudioPlayer([
        { title: "Title Music", file: "track01.mp3", duration: "4:05" },
        { title: "The Discovery", file: "track02.mp3", duration: "1:36" },
        { title: "Running Away", file: "track03.mp3", duration: "2:12" },
      ]),
  },
  {
    id: 2,
    x: 48,
    y: 66,
    label: "Watch the BTS documentary",
    action: () => openVideoPlayer("NFVXPxwkyHc"),
  },
  {
    id: 3,
    x: 84,
    y: 48,
    label: "Meet the cast",
    action: () => openCastGallery(),
  },
];
</script>

<template>
  <div class="viewport">
    <div class="scene-container">
      <NuxtImg src="/images/bedroom.jpg" alt="Bedroom" class="scene-image" />

      <button
        v-for="spot in hotspots"
        :key="spot.id"
        class="hotspot"
        :style="{ left: `${spot.x}%`, top: `${spot.y}%` }"
        :aria-label="spot.label"
        @click="spot.action"
      >
        <span class="hotspot-ring"></span>
        <span class="hotspot-dot"></span>
        <span class="hotspot-label">{{ spot.label }}</span>
      </button>
    </div>

    <div class="ui-overlay">
      <div class="room-nav">
        <UButton
          v-for="room in rooms"
          :key="room.path"
          :to="room.path"
          color="secondary"
          size="lg"
        >
          Go to {{ room.name }}
        </UButton>
      </div>
    </div>

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

    <UModal v-model:open="isVideoPlayerOpen" :ui="{ content: 'sm:max-w-5xl' }">
      <template #content>
        <div class="relative w-full aspect-video bg-black">
          <iframe
            v-if="isVideoPlayerOpen"
            width="100%"
            height="100%"
            :src="`https://www.youtube.com/embed/${currentYoutubeId}?autoplay=1&rel=0`"
            title="Video Player"
            frameborder="0"
            allow="
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share;
            "
            allowfullscreen
            class="absolute inset-0 w-full h-full"
          ></iframe>
        </div>
      </template>
    </UModal>

    <UModal
      v-model:open="isCastOpen"
      :ui="{
        content: 'sm:max-w-7xl bg-transparent shadow-none ring-0',
        container: 'flex items-center justify-center min-h-full',
        overlay: ' backdrop-blur-md',
      }"
    >
      <template #content>
        <div class="w-full py-8">
          <div
            class="flex gap-8 overflow-x-auto px-12 pb-12 pt-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
          >
            <div
              v-for="(actor, index) in castList"
              :key="index"
              class="group relative flex-none w-80 snap-center flex flex-col gap-4"
            >
              <div class="text-left space-y-1">
                <h3 class="text-2xl font-bold text-white tracking-tight">
                  {{ actor.name }}
                </h3>
                <p
                  class="text-xs h-8 text-white/50 uppercase tracking-[0.2em] font-medium line-clamp-2"
                >
                  {{ actor.occupation }}
                </p>
              </div>

              <div
                class="relative w-full aspect-3/4 rounded-2xl overflow-hidden bg-gray-900 ring-1 ring-white/10 group-hover:ring-white/30 transition-all duration-500"
              >
                <img
                  :src="actor.image"
                  :alt="actor.name"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div
                  class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60"
                ></div>

                <div class="absolute bottom-4 left-4">
                  <span class="text-white/80 text-sm font-serif italic"
                    >as</span
                  >
                  <div class="text-white text-xl font-bold tracking-wide">
                    {{ actor.role }}
                  </div>
                </div>
              </div>

              <div class="flex gap-1 transition-opacity duration-300">
                <UButton
                  v-if="actor.socials.instagram"
                  icon="i-simple-icons-instagram"
                  variant="ghost"
                  color="white"
                  size="xl"
                  :to="actor.socials.instagram"
                  target="_blank"
                  class="hover:text-primary"
                />
                <UButton
                  v-if="actor.socials.twitter"
                  icon="i-simple-icons-twitter"
                  variant="ghost"
                  color="white"
                  size="xl"
                  :to="actor.socials.twitter"
                  target="_blank"
                />
                <UButton
                  v-if="actor.socials.imdb"
                  icon="i-simple-icons-imdb"
                  variant="ghost"
                  color="white"
                  size="xl"
                  :to="actor.socials.imdb"
                  target="_blank"
                  class="hover:text-primary"
                />
                <UButton
                  v-if="actor.socials.web"
                  icon="i-lucide-globe"
                  variant="ghost"
                  color="white"
                  size="xl"
                  :to="actor.socials.web"
                  target="_blank"
                  class="hover:text-primary"
                />
              </div>
            </div>

            <div class="w-12 flex-none"></div>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<style scoped>
.viewport {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
  display: grid;
  place-items: center;
}
.scene-container {
  position: relative;
  /* CRITICAL: Set this to the intrinsic aspect ratio of the background image */
  /* Example: 16/9, 4/3, or actual pixel dims like 1920/1080 */
  aspect-ratio: 16/9;
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
}
.scene-image {
  width: 100%;
  height: 100%;
  display: block;
}
.ui-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
}
.room-nav {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  pointer-events: auto;
}
.hotspot {
  position: absolute;
  transform: translate(-50%, -50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
}

/* The solid center dot */
.hotspot-dot {
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  transition: transform 0.2s ease;
}

/* The pulsing outer ring */
.hotspot-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 2s infinite;
  pointer-events: none;
}
.hotspot-label {
  margin-top: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
  opacity: 0;
  transform: translateY(5px);
  transition: all 0.2s ease;
  white-space: nowrap;
}

/* Hover Effects */
.hotspot:hover .hotspot-dot {
  transform: scale(1.3);
  background-color: #fbbf24;
}
.hotspot:hover .hotspot-label {
  opacity: 1;
  transform: translateY(0);
}
@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}
.animate-spin-slow {
  animation: spin 6s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Scrollbar Hide Utility */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
