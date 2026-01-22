<script setup lang="ts">
const isGalleryOpen = ref(false);
const areLightsOn = ref(false);
const currentStillIndex = ref(0);

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

  areLightsOn.value = true;

  // 0.5s delay before gallery opens
  setTimeout(() => {
    isGalleryOpen.value = true;
  }, 400);
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

watch(isGalleryOpen, (isOpen) => {
  if (!isOpen) {
    setTimeout(() => {
      areLightsOn.value = false;
    }, 400);
  }
});

const hotspots = [
  {
    id: 1,
    x: 67,
    y: 63,
    label: "Turn on lights",
    visible: () => !areLightsOn.value,
    action: () => openGallery(),
  },
];

const rooms = [{ name: "Kitchen", path: "/kitchen" }];
</script>

<template>
  <div class="viewport">
    <div class="scene-container">
      <NuxtImg
        :src="areLightsOn ? '/images/lights-on.jpg' : '/images/lights-off.jpg'"
        alt="Wall with lights"
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
  </div>
</template>
