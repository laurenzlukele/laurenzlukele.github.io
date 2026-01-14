<script setup lang="ts">
const isGalleryOpen = ref(false);
const currentStillIndex = ref(0);

const isScriptOpen = ref(false);

const stills = ref([
  "images/stills/still01.jpg",
  "images/stills/still02.jpg",
  "images/stills/still03.jpg",
  "images/stills/still04.jpg",
]);

const currentStill = computed(() => stills.value[currentStillIndex.value]);
const hasNextStill = computed(
  () => currentStillIndex.value < stills.value.length - 1,
);
const hasPrevStill = computed(() => currentStillIndex.value > 0);

const openGallery = () => {
  currentStillIndex.value = 0;
  isGalleryOpen.value = true;
};

const nextStill = () => {
  if (hasNextStill.value) currentStillIndex.value++;
  else currentStillIndex.value = 0; // Loop back to start
};

const prevStill = () => {
  if (hasPrevStill.value) currentStillIndex.value--;
  else currentStillIndex.value = stills.value.length - 1; // Loop to end
};

// Keyboard navigation for gallery
const handleKeydown = (e: KeyboardEvent) => {
  if (!isGalleryOpen.value) return;
  if (e.key === "ArrowRight") nextStill();
  if (e.key === "ArrowLeft") prevStill();
};

onMounted(() => window.addEventListener("keydown", handleKeydown));
onUnmounted(() => window.removeEventListener("keydown", handleKeydown));

const rooms = [
  { name: "Entrance", path: "/" },
  { name: "Bedroom", path: "/bedroom" },
];

const hotspots = [
  {
    id: 1,
    x: 13,
    y: 62,
    label: "Explore the storyboard",
    action: () => console.log("Storyboard clicked"),
  },
  {
    id: 2,
    x: 54,
    y: 20,
    label: "Flick through movie stills",
    action: () => openGallery(),
  },
  {
    id: 3,
    x: 73,
    y: 83,
    label: "Read the script",
    action: () => (isScriptOpen.value = true),
  },
];
</script>

<template>
  <div class="viewport">
    <div class="scene-container">
      <NuxtImg src="/images/kitchen.jpg" alt="Kitchen" class="scene-image" />
      <div class="vignette"></div>
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

    <RoomNavigation :rooms="rooms"></RoomNavigation>

    <UModal
      v-model:open="isGalleryOpen"
      :ui="{
        content: 'sm:max-w-7xl',
        overlay: 'backdrop-blur-sm',
      }"
    >
      <template #content>
        <div>
          <div
            class="relative max-w-full max-h-full flex items-center justify-center"
          >
            <img
              :src="currentStill"
              class="max-w-full max-h-[75vh] object-contain shadow-2xl rounded-sm ring-1 ring-white/10"
              alt="Movie Still"
            />
          </div>

          <div
            class="absolute inset-0 pointer-events-none flex items-center justify-between px-4 md:px-14"
          >
            <UButton
              icon="i-heroicons-chevron-left-20-solid"
              size="xl"
              color="black"
              variant="solid"
              :ui="{ rounded: 'rounded-full' }"
              class="pointer-events-auto bg-black/50 text-white hover:bg-white hover:text-black transition-transform hover:scale-110"
              @click.stop="prevStill"
            />

            <UButton
              icon="i-heroicons-chevron-right-20-solid"
              size="xl"
              color="black"
              variant="solid"
              :ui="{ rounded: 'rounded-full' }"
              class="pointer-events-auto bg-black/50 text-white hover:bg-white hover:text-black transition-transform hover:scale-110"
              @click.stop="nextStill"
            />
          </div>

          <div class="absolute bottom-4 left-1/2 -translate-x-1/2">
            <UBadge
              color="gray"
              variant="subtle"
              size="lg"
              class="font-mono tracking-widest bg-black/40 text-white/50 backdrop-blur-md border-none"
            >
              {{ currentStillIndex + 1 }} / {{ stills.length }}
            </UBadge>
          </div>
        </div>
      </template>
    </UModal>

    <UModal
      v-model:open="isScriptOpen"
      :ui="{
        overlay: 'backdrop-blur-sm',
      }"
    >
      <template #content>
        <div class="h-[90vh]">
          <iframe
            src="documents/script.pdf"
            class="w-full h-[90vh]"
            frameborder="0"
          ></iframe>
        </div>
      </template>
    </UModal>
  </div>
</template>

<style scoped>
.viewport {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
  display: grid;
  place-items: center;
}

.scene-container {
  position: relative;
  aspect-ratio: 16/9;
  min-width: 100vw;
  min-height: 100vh;
}

.scene-image {
  width: 100%;
  height: 100%;
  display: block;
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

.hotspot-dot {
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  transition: transform 0.2s ease;
}

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

.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.2) 85%,
    rgba(0, 0, 0, 0.8) 100%
  );
  backdrop-filter: blur(1px); /* Slight blur to focus attention on content */
}
</style>
