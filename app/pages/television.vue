<script setup lang="ts">
const isVideoPlayerOpen = ref(false);
const currentYoutubeId = ref("");

const openVideoPlayer = (youtubeId: string) => {
  currentYoutubeId.value = youtubeId;
  isVideoPlayerOpen.value = true;
};

const hotspots = [
  {
    id: 1,
    x: 35,
    y: 78,
    label: "Click remote",
    action: () => openVideoPlayer("NFVXPxwkyHc"),
  },
];

const rooms = [{ name: "Bedroom", path: "/bedroom" }];
</script>

<template>
  <div class="viewport">
    <div class="scene-container">
      <NuxtImg
        src="/images/television.jpg"
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

    <RoomNavigation :rooms="rooms"></RoomNavigation>

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
  </div>
</template>
