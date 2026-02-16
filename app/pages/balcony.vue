<script setup lang="ts">
import { ref } from "vue";

const config = useAppConfig();
const roomName = "Balcony";

useSeoMeta({
  title: roomName,
  ogTitle: `${roomName} | ${config.siteName}`,
});

const isVideoPlayerOpen = ref(false);
const currentYoutubeId = "NFVXPxwkyHc";

const openVideoPlayer = () => {
  isVideoPlayerOpen.value = true;
};

const hotspots = computed(() => [
  {
    id: 1,
    x: 34,
    y: 59,
    label: $t("tooltip.city"),
    action: () => openVideoPlayer(),
  },
]);
</script>

<template>
  <div class="viewport">
    <div class="scene-container">
      <NuxtImg src="/images/balcony.webp" alt="Balcony" class="scene-image" />

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

    <UModal
      v-model:open="isVideoPlayerOpen"
      :ui="{
        content: 'max-w-5xl bg-transparent shadow-none ring-0',
        overlay: 'backdrop-blur-md',
      }"
      title="Trailer"
    >
      <template #content>
        <div class="aspect-video w-full max-h-[90vh] max-w-[142vh] mx-auto">
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
            "
            allowfullscreen
          ></iframe>
        </div>
      </template>
    </UModal>
  </div>
</template>
