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

const carousel = useTemplateRef("carousel");
const activeIndex = ref(0);

const onClickPrev = () => {
  activeIndex.value--;
};
const onClickNext = () => {
  activeIndex.value++;
};
function onSelect(index: number) {
  activeIndex.value = index;
}

function select(index: number) {
  activeIndex.value = index;

  carousel.value?.emblaApi?.scrollTo(index);
}

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

    <UModal
      v-model:open="isGalleryOpen"
      :ui="{
        content: 'sm:max-w-5xl bg-transparent shadow-none ring-0',
        overlay: 'backdrop-blur-sm',
      }"
    >
      <template #content>
        <div class="flex-1 w-full">
          <UCarousel
            ref="carousel"
            v-slot="{ item }"
            arrows
            :items="stills"
            :prev="{ onClick: onClickPrev }"
            :next="{ onClick: onClickNext }"
            class="w-full max-w-4xl mx-auto"
            @select="onSelect"
          >
            <img :src="item" width="1280" height="1280" class="rounded-lg" />
          </UCarousel>

          <div class="flex gap-1 justify-between pt-4 max-w-4xl mx-auto">
            <div
              v-for="(item, index) in stills"
              :key="index"
              class="size-16 opacity-25 hover:opacity-100 transition-opacity"
              :class="{ 'opacity-100': activeIndex === index }"
              @click="select(index)"
            >
              <img :src="item" width="88" height="88" class="rounded-lg" />
            </div>
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
