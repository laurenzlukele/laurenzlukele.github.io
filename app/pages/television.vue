<script setup lang="ts">
definePageMeta({
  layout: "closeup",
});

const isVideoPlayerOpen = ref(false);
const currentYoutubeId = ref("");

const openVideoPlayer = (youtubeId: string) => {
  currentYoutubeId.value = youtubeId;
  isVideoPlayerOpen.value = true;
};

const hotspots = computed(() => [
  {
    id: 1,
    x: 35,
    y: 78,
    label: $t("tooltip.remote"),
    action: () => openVideoPlayer("NFVXPxwkyHc"),
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
