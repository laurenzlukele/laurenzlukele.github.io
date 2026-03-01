<script setup lang="ts">
import { ref } from "vue";

const config = useAppConfig();
const roomName = "Balcony";

useSeoMeta({
  title: roomName,
  ogTitle: `${roomName} | ${config.siteName}`,
});

const isVideoPlayerOpen = ref(false);
const youtubeId = "J8XGf_Ik_0M";

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

    <VideoPlayerModal
      v-model:open="isVideoPlayerOpen"
      :youtube-id="youtubeId"
      title="Trailer"
    />
  </div>
</template>
