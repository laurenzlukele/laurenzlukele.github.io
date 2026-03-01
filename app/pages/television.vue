<script setup lang="ts">
definePageMeta({
  layout: "closeup",
});

const config = useAppConfig();
const roomName = "Television";

useSeoMeta({
  title: roomName,
  ogTitle: `${roomName} | ${config.siteName}`,
});

const isVideoPlayerOpen = ref(false);
const youtubeId = "p2A3K8Z1d-k";

const openVideoPlayer = () => {
  isVideoPlayerOpen.value = true;
};

const hotspots = computed(() => [
  {
    id: 1,
    x: 35,
    y: 78,
    label: $t("tooltip.remote"),
    action: () => openVideoPlayer(),
  },
]);
</script>

<template>
  <div class="viewport">
    <div class="scene-container">
      <NuxtImg
        src="/images/television.webp"
        alt="Television closeup"
        class="scene-image"
      />

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
      title="Behind the Scenes"
    />
  </div>
</template>
