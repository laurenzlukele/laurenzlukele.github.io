<script setup lang="ts">
const isPlayerOpen = ref(false);
const isPlaying = ref(false);
const currentTrack = ref({ title: "", src: "" });

const audioPlayer = ref<HTMLAudioElement | null>(null);

const openPlayer = (title: string, fileName: string) => {
  currentTrack.value = {
    title,
    src: `/audio/${fileName}`,
  };
  console.log("nigga");
  isPlayerOpen.value = true;
  isPlaying.value = true; // Auto-play when opened
};

const togglePlay = () => {
  if (!audioPlayer.value) return;

  if (audioPlayer.value.paused) {
    audioPlayer.value.play().catch((e) => console.error("Playback failed:", e));
    isPlaying.value = true;
  } else {
    audioPlayer.value.pause();
    isPlaying.value = false;
  }
};

watch(isPlayerOpen, (isOpen) => {
  if (!isOpen && audioPlayer.value) {
    audioPlayer.value.pause();
    isPlaying.value = false;
  }
});

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
    action: () => openPlayer("Mystery Theme", "score.mp3"),
  },
  {
    id: 2,
    x: 48,
    y: 66,
    label: "Watch the BTS documentary",
    action: () => console.log("TV clicked"),
  },
  {
    id: 3,
    x: 84,
    y: 48,
    label: "Meet the cast",
    action: () => console.log("Bed clicked"),
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

    <UModal v-model:open="isPlayerOpen" title="Now Playing">
      <template #content>
        <div class="text-center py-4">
          <div class="mb-6 relative inline-block">
            <div
              :class="[
                'w-24 h-24 rounded-full bg-gray-800 border-4 border-gray-600 flex items-center justify-center shadow-xl',
                isPlaying ? 'animate-spin-slow' : '',
              ]"
            >
              <div class="w-8 h-8 rounded-full bg-red-500"></div>
            </div>
          </div>

          <h4 class="text-xl font-bold mb-6">{{ currentTrack.title }}</h4>

          <audio
            ref="audioPlayer"
            :src="currentTrack.src"
            autoplay
            @ended="isPlaying = false"
          ></audio>

          <div class="flex justify-center gap-4">
            <UButton
              :icon="
                isPlaying
                  ? 'i-heroicons-pause-circle-20-solid'
                  : 'i-heroicons-play-circle-20-solid'
              "
              size="xl"
              color="primary"
              variant="solid"
              @click="togglePlay"
            >
              {{ isPlaying ? "Pause" : "Play" }}
            </UButton>
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
}

.scene-image {
  width: 100%;
  height: 100%;
  display: block;
}

.ui-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none; /* Let clicks pass through */
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
  transform: translate(-50%, -50%); /* Centers the coordinate */
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

/* The Label (Hidden by default, shown on hover) */
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
  animation: spin 3s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
