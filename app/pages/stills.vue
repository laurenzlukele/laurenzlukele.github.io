<script setup lang="ts">
definePageMeta({
  layout: "closeup",
});

const isGalleryOpen = ref(false);
const areLightsOn = ref(false);
const isFlickering = ref(false);
const currentStillIndex = ref(0);

const stills = ref([
  "images/stills/still01.jpg",
  "images/stills/still02.jpg",
  "images/stills/still03.jpg",
  "images/stills/still04.jpg",
  "images/stills/still05.jpg",
  "images/stills/still06.jpg",
  "images/stills/still07.jpg",
  "images/stills/still08.jpg",
  "images/stills/still09.jpg",
  "images/stills/still10.jpg",
  "images/stills/still11.jpg",
  "images/stills/still12.jpg",
  "images/stills/still13.jpg",
  "images/stills/still14.jpg",
]);

const currentStill = computed(() => stills.value[currentStillIndex.value]);
const hasNextStill = computed(
  () => currentStillIndex.value < stills.value.length - 1,
);
const hasPrevStill = computed(() => currentStillIndex.value > 0);

const openGallery = () => {
  currentStillIndex.value = 0;

  isFlickering.value = true;

  // Change the image in the middle of the flicker (150ms in)
  setTimeout(() => {
    areLightsOn.value = true;
  }, 150);

  setTimeout(() => {
    isFlickering.value = false;
  }, 600);

  // Open the modal after the lights are fully stable
  setTimeout(() => {
    isGalleryOpen.value = true;
  }, 800);
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
    <div class="scene-container relative overflow-hidden">
      <NuxtImg
        :src="areLightsOn ? '/images/lights-on.jpg' : '/images/lights-off.jpg'"
        alt="Wall with lights"
        class="scene-image"
        preload
      />

      <!-- ghost image for nuxt crawler (only necessary for SSG)  -->
      <div style="display: none" aria-hidden="true">
        <NuxtImg src="/images/lights-on.jpg" />
      </div>

      <div
        class="absolute inset-0 bg-white pointer-events-none transition-opacity duration-100 ease-out z-10"
        :class="
          isFlickering
            ? 'opacity-60 mix-blend-hard-light animate-flicker'
            : 'opacity-0'
        "
      ></div>

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
        <div class="crt-turn-on">
          <div
            class="relative max-w-full max-h-full flex items-center justify-center"
          >
            <div
              class="absolute inset-0 z-20 pointer-events-none bg-[url('/noise.svg')] opacity-10"
            ></div>

            <Transition name="retro-fade" mode="out-in">
              <img
                :key="currentStillIndex"
                :src="currentStill"
                class="max-w-full max-h-[75vh] object-contain shadow-2xl"
                alt="Movie Still"
              />
            </Transition>
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

<style scoped>
@keyframes flicker {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0.5;
  }
  20% {
    opacity: 0.1;
  }
  30% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0;
  }
}

.animate-flicker {
  animation: flicker 0.6s linear forwards;
}

.crt-turn-on {
  animation: crtOpen 0.4s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  transform-origin: center;
}

@keyframes crtOpen {
  0% {
    opacity: 0;
    transform: scaleY(0.01) scaleX(0);
  }
  50% {
    opacity: 1;
    transform: scaleY(0.01) scaleX(1);
  }
  100% {
    transform: scaleY(1) scaleX(1);
  }
}

.retro-fade-enter-active,
.retro-fade-leave-active {
  transition: opacity 0.4s ease;
}

.retro-fade-enter-from,
.retro-fade-leave-to {
  opacity: 0;
}
</style>
